import { Link } from "react-router-dom"
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/sections/Navbar"
import { Footer } from "@/components/sections/Footer"

export function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart()

  const formatPrice = (price: number) => {
    return price.toFixed(2).replace(".", ",") + " €"
  }

  const getItemTotal = (item: (typeof items)[0]) => {
    const unitPrice =
      item.basePrice + item.sizeDelta + item.extras.reduce((s, e) => s + e.price, 0)
    return unitPrice * item.quantity
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container-custom">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-display font-bold">Košík</h1>
            {itemCount > 0 && (
              <span className="bg-monster-green text-charcoal px-3 py-1 rounded-full text-sm font-semibold">
                {itemCount} {itemCount === 1 ? "položka" : itemCount < 5 ? "položky" : "položiek"}
              </span>
            )}
          </div>

          {items.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-xl font-semibold mb-2">Váš košík je prázdny</h2>
                <p className="text-muted-foreground mb-6">
                  Pridajte si niečo chutné z nášho menu!
                </p>
                <Link to="/#menu">
                  <Button>Prejsť na menu</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                Veľkosť: {item.sizeLabel}
                              </p>
                              {item.extras.length > 0 && (
                                <p className="text-sm text-muted-foreground">
                                  Extra: {item.extras.map((e) => e.label).join(", ")}
                                </p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                              className="text-muted-foreground hover:text-tomato"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center font-semibold">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <span className="font-semibold text-lg">
                              {formatPrice(getItemTotal(item))}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <h2 className="font-display font-bold text-xl mb-4">Súhrn objednávky</h2>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Medzisúčet</span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Balné</span>
                        <span>{formatPrice(0)}</span>
                      </div>
                    </div>
                    <div className="border-t pt-4 mb-6">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Celkom</span>
                        <span className="text-monster-green">{formatPrice(subtotal)}</span>
                      </div>
                    </div>
                    <Link to="/checkout">
                      <Button className="w-full" size="lg">
                        Pokračovať k objednávke
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
