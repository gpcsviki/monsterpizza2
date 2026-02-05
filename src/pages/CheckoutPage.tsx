import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { httpsCallable } from "firebase/functions"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import { functions } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/sections/Navbar"
import { Footer } from "@/components/sections/Footer"

const checkoutSchema = z
  .object({
    fulfillment: z.enum(["PICKUP", "DELIVERY"]),
    name: z.string().min(2, "Meno musí mať aspoň 2 znaky"),
    phone: z.string().min(6, "Zadajte platné telefónne číslo"),
    street: z.string().optional(),
    city: z.string().optional(),
    zip: z.string().optional(),
    note: z.string().max(500).optional(),
  })
  .refine(
    (data) => {
      if (data.fulfillment === "DELIVERY") {
        return data.street && data.street.length >= 2
      }
      return true
    },
    { message: "Ulica je povinná pri donáške", path: ["street"] }
  )
  .refine(
    (data) => {
      if (data.fulfillment === "DELIVERY") {
        return data.city && data.city.length >= 2
      }
      return true
    },
    { message: "Mesto je povinné pri donáške", path: ["city"] }
  )
  .refine(
    (data) => {
      if (data.fulfillment === "DELIVERY") {
        return data.zip && data.zip.length >= 3
      }
      return true
    },
    { message: "PSČ je povinné pri donáške", path: ["zip"] }
  )

type CheckoutFormData = z.infer<typeof checkoutSchema>

export function CheckoutPage() {
  const navigate = useNavigate()
  const { items, subtotal, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fulfillment: "PICKUP",
    },
  })

  const fulfillment = watch("fulfillment")

  const formatPrice = (price: number) => {
    return price.toFixed(2).replace(".", ",") + " €"
  }

  const onSubmit = async (data: CheckoutFormData) => {
    if (items.length === 0) {
      toast.error("Košík je prázdny")
      return
    }

    setIsSubmitting(true)

    try {
      const payload = {
        fulfillment: data.fulfillment,
        customer: {
          name: data.name,
          phone: data.phone,
          address:
            data.fulfillment === "DELIVERY"
              ? {
                  street: data.street!,
                  city: data.city!,
                  zip: data.zip!,
                }
              : null,
        },
        note: data.note || null,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          sizeLabel: item.sizeLabel,
          extras: item.extras.map((e) => e.id),
        })),
      }

      const createOrderFn = httpsCallable<typeof payload, { orderId: string; publicToken: string; orderNumber: string }>(functions, "createOrderCallable")
      const result = await createOrderFn(payload)

      clearCart()
      toast.success("Objednávka bola odoslaná!")
      navigate(`/order/${result.data.orderId}?t=${result.data.publicToken}`)
    } catch (err: any) {
      toast.error(err.message || "Nepodarilo sa odoslať objednávku")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background pt-24 pb-16">
          <div className="container-custom text-center">
            <h1 className="text-2xl font-bold mb-4">Košík je prázdny</h1>
            <Link to="/#menu">
              <Button>Prejsť na menu</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container-custom">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/cart">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-display font-bold">Dokončiť objednávku</h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-3">
                      <Label>Spôsob prevzatia</Label>
                      <div className="flex rounded-full bg-muted p-1">
                        <button
                          type="button"
                          onClick={() => setValue("fulfillment", "PICKUP")}
                          className={`flex-1 py-3 px-6 rounded-full font-display font-semibold transition-all ${
                            fulfillment === "PICKUP"
                              ? "bg-charcoal text-cream dark:bg-cream dark:text-charcoal"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          Osobný odber
                        </button>
                        <button
                          type="button"
                          onClick={() => setValue("fulfillment", "DELIVERY")}
                          className={`flex-1 py-3 px-6 rounded-full font-display font-semibold transition-all ${
                            fulfillment === "DELIVERY"
                              ? "bg-charcoal text-cream dark:bg-cream dark:text-charcoal"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          Donáška
                        </button>
                      </div>
                      {fulfillment === "DELIVERY" && (
                        <p className="text-sm text-muted-foreground">
                          Momentálne iba cez taxi službu Bolt.
                        </p>
                      )}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Meno *</Label>
                        <Input
                          id="name"
                          placeholder="Vaše meno"
                          {...register("name")}
                          className={errors.name ? "border-tomato" : ""}
                        />
                        {errors.name && (
                          <p className="text-sm text-tomato">{errors.name.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefón *</Label>
                        <Input
                          id="phone"
                          placeholder="0918 123 456"
                          {...register("phone")}
                          className={errors.phone ? "border-tomato" : ""}
                        />
                        {errors.phone && (
                          <p className="text-sm text-tomato">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    {fulfillment === "DELIVERY" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="street">Ulica a číslo *</Label>
                          <Input
                            id="street"
                            placeholder="Hlavná 123"
                            {...register("street")}
                            className={errors.street ? "border-tomato" : ""}
                          />
                          {errors.street && (
                            <p className="text-sm text-tomato">{errors.street.message}</p>
                          )}
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">Mesto *</Label>
                            <Input
                              id="city"
                              placeholder="Bratislava"
                              {...register("city")}
                              className={errors.city ? "border-tomato" : ""}
                            />
                            {errors.city && (
                              <p className="text-sm text-tomato">{errors.city.message}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="zip">PSČ *</Label>
                            <Input
                              id="zip"
                              placeholder="821 01"
                              {...register("zip")}
                              className={errors.zip ? "border-tomato" : ""}
                            />
                            {errors.zip && (
                              <p className="text-sm text-tomato">{errors.zip.message}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="note">Poznámka k objednávke</Label>
                      <Textarea
                        id="note"
                        placeholder="Napr. bez cibule, zazvoniť 2x..."
                        {...register("note")}
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Odosielam...
                        </>
                      ) : (
                        "Odoslať objednávku"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="font-display font-bold text-xl mb-4">Vaša objednávka</h2>
                  <div className="space-y-3 mb-4">
                    {items.map((item) => {
                      const unitPrice =
                        item.basePrice +
                        item.sizeDelta +
                        item.extras.reduce((s, e) => s + e.price, 0)
                      return (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>
                            {item.quantity}× {item.name} ({item.sizeLabel})
                          </span>
                          <span>{formatPrice(unitPrice * item.quantity)}</span>
                        </div>
                      )
                    })}
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Celkom</span>
                      <span className="text-monster-green">{formatPrice(subtotal)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
