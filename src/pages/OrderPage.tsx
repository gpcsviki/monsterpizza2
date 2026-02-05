import { useEffect, useState } from "react"
import { useParams, useSearchParams, Link } from "react-router-dom"
import { httpsCallable } from "firebase/functions"
import { CheckCircle, Clock, Truck, ChefHat, Package, XCircle, Loader2 } from "lucide-react"
import { functions } from "@/lib/firebase"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/sections/Navbar"
import { Footer } from "@/components/sections/Footer"

type OrderStatus =
  | "NEW"
  | "ACCEPTED"
  | "PREPARING"
  | "READY"
  | "OUT_FOR_DELIVERY"
  | "COMPLETED"
  | "CANCELED"

type OrderData = {
  orderId: string
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
    unitPrice: number
    lineTotal: number
  }>
  pricing: {
    subtotal: number
    deliveryFee: number
    packagingFee: number
    total: number
    currency: string
    vatRate?: number
    netAmount?: number
    vatAmount?: number
  }
  businessInfo?: {
    companyName: string
    ico: string
    dic: string
    icDph: string
    address: string
  }
  createdAt: any
}

const statusConfig: Record<
  OrderStatus,
  { label: string; icon: typeof Clock; color: string }
> = {
  NEW: { label: "Nová", icon: Clock, color: "text-yellow-500" },
  ACCEPTED: { label: "Prijatá", icon: CheckCircle, color: "text-blue-500" },
  PREPARING: { label: "Pripravuje sa", icon: ChefHat, color: "text-orange-500" },
  READY: { label: "Pripravená", icon: Package, color: "text-green-500" },
  OUT_FOR_DELIVERY: { label: "Na ceste", icon: Truck, color: "text-purple-500" },
  COMPLETED: { label: "Dokončená", icon: CheckCircle, color: "text-monster-green" },
  CANCELED: { label: "Zrušená", icon: XCircle, color: "text-tomato" },
}

export function OrderPage() {
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const token = searchParams.get("t") || ""

  const [order, setOrder] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id || !token) {
      setError("Chýba ID objednávky alebo token")
      setLoading(false)
      return
    }

    const getOrderFn = httpsCallable<{ orderId: string; token: string }, OrderData>(functions, "getOrderByTokenCallable")
    getOrderFn({ orderId: id, token })
      .then((result) => {
        setOrder(result.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || "Objednávka nenájdená")
        setLoading(false)
      })
  }, [id, token])

  const formatPrice = (price: number) => {
    return price.toFixed(2).replace(".", ",") + " €"
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background pt-24 pb-16 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-monster-green" />
        </main>
        <Footer />
      </>
    )
  }

  if (error || !order) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background pt-24 pb-16">
          <div className="container-custom text-center">
            <h1 className="text-2xl font-bold mb-4 text-tomato">
              {error || "Objednávka nenájdená"}
            </h1>
            <Link to="/">
              <Button>Späť na hlavnú stránku</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const StatusIcon = statusConfig[order.status].icon

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container-custom max-w-2xl">
          <Card>
            <CardContent className="p-6 md:p-8">
              <div className="text-center mb-8">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4 ${statusConfig[order.status].color}`}
                >
                  <StatusIcon className="h-8 w-8" />
                </div>
                <h1 className="text-2xl font-display font-bold mb-2">
                  Objednávka {order.orderNumber}
                </h1>
                <p className={`text-lg font-semibold ${statusConfig[order.status].color}`}>
                  {statusConfig[order.status].label}
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="font-semibold mb-2">Kontaktné údaje</h2>
                  <p>{order.customer.name}</p>
                  <p>{order.customer.phone}</p>
                  {order.customer.address && (
                    <p>
                      {order.customer.address.street}, {order.customer.address.zip}{" "}
                      {order.customer.address.city}
                    </p>
                  )}
                </div>

                <div>
                  <h2 className="font-semibold mb-2">Položky</h2>
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>
                          {item.quantity}× {item.nameSnapshot} ({item.sizeLabel})
                          {item.extras.length > 0 && (
                            <span className="text-muted-foreground">
                              {" "}
                              + {item.extras.map((e) => e.label).join(", ")}
                            </span>
                          )}
                        </span>
                        <span>{formatPrice(item.lineTotal)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {order.note && (
                  <div>
                    <h2 className="font-semibold mb-2">Poznámka</h2>
                    <p className="text-muted-foreground">{order.note}</p>
                  </div>
                )}

                <div className="border-t pt-4">
                  {order.pricing.netAmount && order.pricing.vatAmount && (
                    <>
                      <div className="flex justify-between mb-1 text-sm">
                        <span className="text-muted-foreground">Základ DPH</span>
                        <span>{formatPrice(order.pricing.netAmount)}</span>
                      </div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span className="text-muted-foreground">DPH 23%</span>
                        <span>{formatPrice(order.pricing.vatAmount)}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between font-semibold text-lg mt-2">
                    <span>Celkom</span>
                    <span className="text-monster-green">
                      {formatPrice(order.pricing.total)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Cena obsahuje DPH 23%
                  </p>
                </div>

                {order.businessInfo && (
                  <div className="border-t pt-4 text-xs text-muted-foreground">
                    <p className="font-semibold mb-1">Dodávateľ:</p>
                    <p>{order.businessInfo.companyName}</p>
                    <p>{order.businessInfo.address}</p>
                    <p>IČO: {order.businessInfo.ico} | DIČ: {order.businessInfo.dic}</p>
                    <p>IČ DPH: {order.businessInfo.icDph}</p>
                  </div>
                )}

                <div className="text-center pt-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    {order.fulfillment === "PICKUP"
                      ? "Vyzdvihnite si objednávku v prevádzke."
                      : "Objednávka bude doručená cez Bolt."}
                  </p>
                  <Link to="/">
                    <Button variant="outline">Späť na hlavnú stránku</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
