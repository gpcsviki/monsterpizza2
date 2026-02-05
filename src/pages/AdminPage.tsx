import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  type User,
} from "firebase/auth"
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  where,
} from "firebase/firestore"
import { httpsCallable } from "firebase/functions"
import { getToken } from "firebase/messaging"
import { toast } from "sonner"
import {
  LogOut,
  Bell,
  BellOff,
  Loader2,
  Printer,
} from "lucide-react"
import { auth, db, functions, getMessagingInstance } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type OrderStatus =
  | "NEW"
  | "ACCEPTED"
  | "PREPARING"
  | "READY"
  | "OUT_FOR_DELIVERY"
  | "COMPLETED"
  | "CANCELED"

type Order = {
  id: string
  orderNumber: string
  status: OrderStatus
  fulfillment: "DELIVERY" | "PICKUP"
  customer: {
    name: string
    phone: string
    address: { street: string; city: string; zip: string } | null
  }
  note: string | null
  items: Array<{
    nameSnapshot: string
    sizeLabel: string
    extras: Array<{ label: string; price: number }>
    quantity: number
    lineTotal: number
  }>
  pricing: {
    subtotal: number
    deliveryFee: number
    packagingFee: number
    total: number
  }
  createdAt: any
}

const statusLabels: Record<OrderStatus, string> = {
  NEW: "Nová",
  ACCEPTED: "Prijatá",
  PREPARING: "Pripravuje sa",
  READY: "Pripravená",
  OUT_FOR_DELIVERY: "Na ceste",
  COMPLETED: "Dokončená",
  CANCELED: "Zrušená",
}

const statusColors: Record<OrderStatus, string> = {
  NEW: "bg-yellow-500",
  ACCEPTED: "bg-blue-500",
  PREPARING: "bg-orange-500",
  READY: "bg-green-500",
  OUT_FOR_DELIVERY: "bg-purple-500",
  COMPLETED: "bg-gray-500",
  CANCELED: "bg-red-500",
}

const NOTIFICATION_SOUND_URL = "/notification.mp3"

export function AdminPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "ALL">("ALL")
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [newOrderFlash, setNewOrderFlash] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const prevOrderCountRef = useRef(0)

  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginLoading, setLoginLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u)
      if (u) {
        const tokenResult = await u.getIdTokenResult()
        setIsAdmin(tokenResult.claims.admin === true)
      } else {
        setIsAdmin(false)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (!isAdmin) return

    const q =
      statusFilter === "ALL"
        ? query(collection(db, "orders"), orderBy("createdAt", "desc"), limit(100))
        : query(
            collection(db, "orders"),
            where("status", "==", statusFilter),
            orderBy("createdAt", "desc"),
            limit(100)
          )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[]

      const newCount = newOrders.filter((o) => o.status === "NEW").length
      if (newCount > prevOrderCountRef.current && prevOrderCountRef.current > 0) {
        playNotificationSound()
        triggerFlashEffect()
      }
      prevOrderCountRef.current = newCount

      setOrders(newOrders)
    })

    return () => unsubscribe()
  }, [isAdmin, statusFilter])

  const playNotificationSound = () => {
    // Try to play notification sound, use Web Audio API as fallback
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(NOTIFICATION_SOUND_URL)
      }
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {
        // Fallback: use Web Audio API beep
        playBeep()
      })
    } catch {
      playBeep()
    }
  }

  const playBeep = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      oscillator.frequency.value = 800
      oscillator.type = "sine"
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    } catch {
      // Audio not supported
    }
  }

  const triggerFlashEffect = () => {
    setNewOrderFlash(true)
    setTimeout(() => setNewOrderFlash(false), 1500)
  }

  const acceptOrder = async (orderId: string) => {
    await updateOrderStatus(orderId, "ACCEPTED")
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginLoading(true)
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    } catch (err: any) {
      toast.error(err.message || "Prihlásenie zlyhalo")
    } finally {
      setLoginLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    navigate("/")
  }

  const enableNotifications = async () => {
    try {
      const messaging = await getMessagingInstance()
      if (!messaging) {
        toast.error("Push notifikácie nie sú podporované")
        return
      }

      const permission = await Notification.requestPermission()
      if (permission !== "granted") {
        toast.error("Notifikácie boli zamietnuté")
        return
      }

      const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY
      if (!vapidKey) {
        toast.error("Chýba VAPID key")
        return
      }

      const token = await getToken(messaging, { vapidKey })

      const registerToken = httpsCallable(functions, "registerAdminToken")
      await registerToken({ fcmToken: token, userAgent: navigator.userAgent })

      setNotificationsEnabled(true)
      toast.success("Notifikácie zapnuté")
    } catch (err: any) {
      toast.error(err.message || "Nepodarilo sa zapnúť notifikácie")
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const setStatus = httpsCallable(functions, "setOrderStatus")
      await setStatus({ orderId, status: newStatus })
      toast.success(`Stav zmenený na: ${statusLabels[newStatus]}`)
    } catch (err: any) {
      toast.error(err.message || "Nepodarilo sa zmeniť stav")
    }
  }

  const formatPrice = (price: number) => {
    return price.toFixed(2).replace(".", ",") + " €"
  }

  const formatTime = (timestamp: any) => {
    if (!timestamp) return ""
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleString("sk-SK", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <h1 className="text-2xl font-display font-bold mb-6 text-center">
              Admin prihlásenie
            </h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Heslo</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loginLoading}>
                {loginLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Prihlásiť sa"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h1 className="text-xl font-bold mb-4 text-tomato">Prístup zamietnutý</h1>
            <p className="text-muted-foreground mb-4">
              Tento účet nemá admin oprávnenia.
            </p>
            <Button onClick={handleLogout}>Odhlásiť sa</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const newOrdersCount = orders.filter((o) => o.status === "NEW").length

  return (
    <div className={`min-h-screen bg-background transition-all duration-300 ${newOrderFlash ? "ring-4 ring-inset ring-monster-green" : ""}`}>
      <header className="sticky top-0 z-50 bg-card border-b px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-display font-bold">Monster Pizza Admin</h1>
            {newOrdersCount > 0 && (
              <span className="bg-tomato text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                {newOrdersCount} NOVÉ
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={enableNotifications}
              title={notificationsEnabled ? "Notifikácie zapnuté" : "Zapnúť notifikácie"}
            >
              {notificationsEnabled ? (
                <Bell className="h-4 w-4 text-monster-green" />
              ) : (
                <BellOff className="h-4 w-4" />
              )}
            </Button>
            <Button variant="outline" size="icon" onClick={handleLogout} title="Odhlásiť">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4">
        <div className="flex items-center gap-4 mb-6">
          <Select
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v as OrderStatus | "ALL")}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter podľa stavu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Všetky</SelectItem>
              {Object.entries(statusLabels).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h2 className="font-semibold text-lg">Objednávky ({orders.length})</h2>
            {orders.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  Žiadne objednávky
                </CardContent>
              </Card>
            ) : (
              orders.map((order) => (
                <Card
                  key={order.id}
                  className={`cursor-pointer transition-all ${
                    selectedOrder?.id === order.id ? "ring-2 ring-monster-green" : ""
                  } ${order.status === "NEW" ? "border-yellow-500 border-2" : ""}`}
                  onClick={() => setSelectedOrder(order)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{order.orderNumber}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-xs text-white ${statusColors[order.status]}`}
                        >
                          {statusLabels[order.status]}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {formatTime(order.createdAt)}
                      </span>
                    </div>
                    <div className="text-sm">
                      <p>
                        {order.customer.name} • {order.customer.phone}
                      </p>
                      <p className="text-muted-foreground">
                        {order.fulfillment === "PICKUP" ? "Osobný odber" : "Donáška"}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm">
                        {order.items.length}{" "}
                        {order.items.length === 1
                          ? "položka"
                          : order.items.length < 5
                            ? "položky"
                            : "položiek"}
                      </span>
                      <span className="font-semibold">
                        {formatPrice(order.pricing.total)}
                      </span>
                    </div>
                    {order.status === "NEW" && (
                      <Button
                        className="w-full mt-3 bg-monster-green hover:bg-monster-green/90"
                        onClick={(e) => {
                          e.stopPropagation()
                          acceptOrder(order.id)
                        }}
                      >
                        ✓ Prijať objednávku
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          <div className="lg:sticky lg:top-20 lg:self-start">
            {selectedOrder ? (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">{selectedOrder.orderNumber}</h2>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => window.print()}
                      title="Tlačiť"
                    >
                      <Printer className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-muted-foreground">Stav</Label>
                      <Select
                        value={selectedOrder.status}
                        onValueChange={(v) =>
                          updateOrderStatus(selectedOrder.id, v as OrderStatus)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(statusLabels).map(([key, label]) => (
                            <SelectItem key={key} value={key}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-muted-foreground">Zákazník</Label>
                      <p className="font-medium">{selectedOrder.customer.name}</p>
                      <p>{selectedOrder.customer.phone}</p>
                      {selectedOrder.customer.address && (
                        <p>
                          {selectedOrder.customer.address.street},{" "}
                          {selectedOrder.customer.address.zip}{" "}
                          {selectedOrder.customer.address.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label className="text-muted-foreground">Položky</Label>
                      <div className="space-y-2 mt-1">
                        {selectedOrder.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between bg-muted p-2 rounded"
                          >
                            <div>
                              <p className="font-medium">
                                {item.quantity}× {item.nameSnapshot}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {item.sizeLabel}
                                {item.extras.length > 0 &&
                                  ` + ${item.extras.map((e) => e.label).join(", ")}`}
                              </p>
                            </div>
                            <span className="font-medium">
                              {formatPrice(item.lineTotal)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedOrder.note && (
                      <div>
                        <Label className="text-muted-foreground">Poznámka</Label>
                        <p className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded">
                          {selectedOrder.note}
                        </p>
                      </div>
                    )}

                    <div className="border-t pt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Celkom</span>
                        <span className="text-monster-green">
                          {formatPrice(selectedOrder.pricing.total)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  Vyberte objednávku zo zoznamu
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
