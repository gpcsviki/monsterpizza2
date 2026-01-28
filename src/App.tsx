import { Toaster } from "sonner"
import { ThemeProvider } from "@/hooks/theme-provider"
import { Navbar } from "@/components/sections/Navbar"
import { Hero } from "@/components/sections/Hero"
import { Highlights } from "@/components/sections/Highlights"
import { Menu } from "@/components/sections/Menu"
import { Specials } from "@/components/sections/Specials"
import { About } from "@/components/sections/About"
import { Gallery } from "@/components/sections/Gallery"
import { Reviews } from "@/components/sections/Reviews"
import { Location } from "@/components/sections/Location"
import { OrderForm } from "@/components/sections/OrderForm"
import { Footer } from "@/components/sections/Footer"
import { FloatingOrderButton } from "@/components/FloatingOrderButton"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="monster-pizza-theme">
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <Highlights />
          <Menu />
          <Specials />
          <About />
          <Gallery />
          <Reviews />
          <Location />
          <OrderForm />
        </main>
        <Footer />
        <FloatingOrderButton />
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
    </ThemeProvider>
  )
}

export default App
