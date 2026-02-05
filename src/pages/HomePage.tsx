import { Navbar } from "@/components/sections/Navbar"
import { Hero } from "@/components/sections/Hero"
import { Highlights } from "@/components/sections/Highlights"
import { Menu } from "@/components/sections/Menu"
import { Specials } from "@/components/sections/Specials"
import { About } from "@/components/sections/About"
import { Gallery } from "@/components/sections/Gallery"
import { Reviews } from "@/components/sections/Reviews"
import { Location } from "@/components/sections/Location"
import { Footer } from "@/components/sections/Footer"
import { FloatingOrderButton } from "@/components/FloatingOrderButton"
import { SEOHead, restaurantStructuredData } from "@/components/SEOHead"

export function HomePage() {
  return (
    <>
      <SEOHead
        title="Bezlepková Pizza Bratislava"
        description="Monster Pizza Bratislava - najlepšia bezlepková pizza v meste. Čerstvé suroviny, rýchly rozvoz po celej Bratislave. Objednajte online!"
        canonical="/"
        keywords={[
          "pizza bratislava",
          "bezlepková pizza",
          "pizza rozvoz bratislava",
          "gluten free pizza",
          "pizzéria bratislava",
          "monster pizza"
        ]}
        structuredData={restaurantStructuredData}
      />
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
      </main>
      <Footer />
      <FloatingOrderButton />
    </>
  )
}
