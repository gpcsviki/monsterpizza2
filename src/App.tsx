import { Routes, Route } from "react-router-dom"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/hooks/theme-provider"
import { CartProvider } from "@/contexts/CartContext"
import { HomePage } from "@/pages/HomePage"
import { CartPage } from "@/pages/CartPage"
import { CheckoutPage } from "@/pages/CheckoutPage"
import { OrderPage } from "@/pages/OrderPage"
import { AdminPage } from "@/pages/AdminPage"
import { PizzaRozvozBratislava } from "@/pages/seo/PizzaRozvozBratislava"
import { PizzaPetrzalka } from "@/pages/seo/PizzaPetrzalka"
import { PizzaRuzinov } from "@/pages/seo/PizzaRuzinov"
import { RodinnaPizzaBratislava } from "@/pages/seo/RodinnaPizzaBratislava"
import { PizzaNoveMesto } from "@/pages/seo/PizzaNoveMesto"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="monster-pizza-theme">
      <CartProvider>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order/:id" element={<OrderPage />} />
            <Route path="/admin" element={<AdminPage />} />
            {/* SEO Landing Pages */}
            <Route path="/pizza-rozvoz-bratislava" element={<PizzaRozvozBratislava />} />
            <Route path="/pizza-petrzalka" element={<PizzaPetrzalka />} />
            <Route path="/pizza-ruzinov" element={<PizzaRuzinov />} />
            <Route path="/rodinna-pizza-bratislava" element={<RodinnaPizzaBratislava />} />
            <Route path="/pizza-nove-mesto" element={<PizzaNoveMesto />} />
          </Routes>
          <Toaster 
            position="bottom-center" 
            toastOptions={{
              style: {
                background: "hsl(var(--card))",
                color: "hsl(var(--card-foreground))",
                border: "1px solid hsl(var(--border))",
              },
            }}
          />
        </div>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
