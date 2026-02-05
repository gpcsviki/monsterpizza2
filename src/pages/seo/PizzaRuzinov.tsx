import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/sections/Navbar"
import { Footer } from "@/components/sections/Footer"
import { ArrowRight, Clock, MapPin, Phone, Truck } from "lucide-react"
import { SEOHead, getLocalBusinessData, getBreadcrumbData } from "@/components/SEOHead"

export function PizzaRuzinov() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      getLocalBusinessData("Ružinov"),
      getBreadcrumbData([
        { name: "Domov", url: "/" },
        { name: "Pizza Ružinov", url: "/pizza-ruzinov" }
      ])
    ]
  }

  return (
    <>
      <SEOHead
        title="Pizza Ružinov"
        description="Pizza Ružinov - bezlepková pizza s rozvozom do Ružinova. Kvalitne pripravovaná pizza z Monster Pizza Bratislava."
        canonical="/pizza-ruzinov"
        keywords={[
          "pizza ružinov",
          "ružinov pizza",
          "rozvoz pizze ružinov",
          "pizza donáška ružinov",
          "bezlepková pizza ružinov"
        ]}
        structuredData={structuredData}
      />
      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container-custom">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              <span className="text-monster-green">Ružinov</span> Pizza
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Kvalitná pizza pre Ružinov a okolie. Bezlepkové cesto, čerstvé ingrediencie a pohodlný rozvoz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group" asChild>
                <Link to="/#menu">
                  Pozrieť menu
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:0918127810">
                  <Phone className="mr-2 h-4 w-4" />
                  0918 127 810
                </a>
              </Button>
            </div>
          </section>

          {/* Info Cards */}
          <section className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-card rounded-xl p-6 text-center">
              <Truck className="h-10 w-10 text-monster-green mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Rozvoz do Ružinova</h3>
              <p className="text-muted-foreground">Doručenie cez Bolt k vám domov</p>
            </div>
            <div className="bg-card rounded-xl p-6 text-center">
              <Clock className="h-10 w-10 text-monster-green mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Otváracie hodiny</h3>
              <p className="text-muted-foreground">Po–Pi: 10:00–20:00<br />So–Ne: 11:00–20:00</p>
            </div>
            <div className="bg-card rounded-xl p-6 text-center">
              <MapPin className="h-10 w-10 text-monster-green mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Shopping Palace</h3>
              <p className="text-muted-foreground">Dostupné z celého Ružinova</p>
            </div>
          </section>

          {/* Main Content */}
          <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
            <h2>Pizza pre Ružinov – kvalita na dosah ruky</h2>
            <p>
              Ružinov patrí medzi najobľúbenejšie mestské časti Bratislavy. Je to miesto, kde sa stretáva moderný životný štýl s pokojným bývaním. Pre obyvateľov Ružinova ponúkame Monster Pizza – pizzériu, ktorá kladie dôraz na kvalitu, čerstvosť a pohodlie.
            </p>

            <h2>Čo nás odlišuje od konkurencie?</h2>
            <p>
              Naša hlavná prednosť je bezlepkové cesto. Pripravujeme ho denne z kvalitných surovín, bez použitia lepku. To znamená, že naša pizza je vhodná pre ľudí s celiakiou, ale aj pre všetkých, ktorí preferujú ľahšie a lepšie stráviteľné jedlo.
            </p>
            <p>
              Okrem toho kladieme dôraz na čerstvosť. Každá pizza je pripravovaná na objednávku – žiadne vopred pripravené polotovary, žiadne mrazené suroviny. Len čerstvé ingrediencie a osvedčené recepty.
            </p>

            <h2>Jednoduchá objednávka, rýchle doručenie</h2>
            <p>
              Objednať si pizzu do Ružinova je jednoduché. Stačí navštíviť naše online menu, vybrať si obľúbenú pizzu a zadať doručovaciu adresu. O zvyšok sa postaráme my. Rozvoz zabezpečujeme prostredníctvom služby Bolt, čo zaručuje rýchle a spoľahlivé doručenie.
            </p>
            <p>
              Preferujete osobný odber? Žiadny problém. Naša prevádzka v Shopping Palace je ľahko dostupná z celého Ružinova. Stačí si objednať online a prísť si pre pizzu v dohodnutom čase.
            </p>

            <h2>Pizza pre každú príležitosť</h2>
            <ul>
              <li><strong>Pracovný obed</strong> – Rýchle a chutné jedlo počas prestávky.</li>
              <li><strong>Večera s rodinou</strong> – Pizza, ktorú si vychutnajú všetci.</li>
              <li><strong>Filmový večer</strong> – Ideálny spoločník k dobrému filmu.</li>
              <li><strong>Oslava</strong> – Objednajte viac pizz a potešte hostí.</li>
            </ul>

            <h2>Naša ponuka</h2>
            <p>
              V našom menu nájdete klasické pizze ako Margherita či Šunková, ale aj originálne kombinácie pre náročnejších gurmánov. Všetky pizze sú dostupné v rôznych veľkostiach, takže si vyberie každý – od jednotlivcov až po veľké rodiny.
            </p>
            <p>
              Okrem pizz ponúkame aj ďalšie pochúťky a nápoje. Kompletné menu nájdete na našej webovej stránke.
            </p>

            <h2>Vyskúšajte Monster Pizza v Ružinove</h2>
            <p>
              Ak hľadáte kvalitnú pizzu s rozvozom do Ružinova, ste na správnom mieste. Naša pizzéria kombinuje tradičné recepty s modernými postupmi, aby ste dostali to najlepšie. Objednajte si ešte dnes a presvedčte sa sami.
            </p>
          </article>

          {/* CTA Section */}
          <section className="mt-16 text-center bg-card rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Objednajte si pizzu do Ružinova
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Čerstvá pizza, rýchle doručenie, bezlepkové cesto. Čo viac si priať?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/#menu">Objednať online</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/#location">Kde nás nájdete</Link>
              </Button>
            </div>
          </section>

          {/* Internal Links */}
          <section className="mt-16">
            <h3 className="text-xl font-semibold mb-6 text-center">Ďalšie stránky</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/pizza-rozvoz-bratislava" className="text-monster-green hover:underline">Pizza rozvoz Bratislava</Link>
              <Link to="/pizza-petrzalka" className="text-monster-green hover:underline">Pizza Petržalka</Link>
              <Link to="/rodinna-pizza-bratislava" className="text-monster-green hover:underline">Rodinná pizza 40cm</Link>
              <Link to="/#menu" className="text-monster-green hover:underline">Naše menu</Link>
              <Link to="/#about" className="text-monster-green hover:underline">O nás</Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
