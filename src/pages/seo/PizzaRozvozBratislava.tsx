import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/sections/Navbar"
import { Footer } from "@/components/sections/Footer"
import { ArrowRight, Clock, MapPin, Phone, Truck } from "lucide-react"
import { SEOHead, getLocalBusinessData, getBreadcrumbData } from "@/components/SEOHead"

export function PizzaRozvozBratislava() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      getLocalBusinessData("Bratislava"),
      getBreadcrumbData([
        { name: "Domov", url: "/" },
        { name: "Pizza rozvoz Bratislava", url: "/pizza-rozvoz-bratislava" }
      ])
    ]
  }

  return (
    <>
      <SEOHead
        title="Pizza Rozvoz Bratislava"
        description="Pizza rozvoz Bratislava - rýchle doručenie bezlepkovej pizze priamo k vám domov. Objednajte online z Monster Pizza!"
        canonical="/pizza-rozvoz-bratislava"
        keywords={[
          "pizza rozvoz bratislava",
          "rozvoz pizze bratislava",
          "pizza donáška bratislava",
          "pizza delivery bratislava",
          "bezlepková pizza rozvoz"
        ]}
        structuredData={structuredData}
      />
      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container-custom">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Pizza Rozvoz <span className="text-monster-green">Bratislava</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Čerstvá pizza priamo k vám domov. Objednajte online a vychutnajte si pravú taliansku chuť bez čakania.
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
              <h3 className="font-semibold text-lg mb-2">Rýchly rozvoz</h3>
              <p className="text-muted-foreground">Doručenie v rámci Bratislavy cez službu Bolt</p>
            </div>
            <div className="bg-card rounded-xl p-6 text-center">
              <Clock className="h-10 w-10 text-monster-green mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Otváracie hodiny</h3>
              <p className="text-muted-foreground">Po–Pi: 10:00–20:00<br />So–Ne: 11:00–20:00</p>
            </div>
            <div className="bg-card rounded-xl p-6 text-center">
              <MapPin className="h-10 w-10 text-monster-green mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Naša adresa</h3>
              <p className="text-muted-foreground">Shopping Palace, Bratislava</p>
            </div>
          </section>

          {/* Main Content */}
          <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
            <h2>Prečo si objednať pizzu s rozvozom v Bratislave?</h2>
            <p>
              Bratislava je dynamické mesto, kde čas hrá dôležitú úlohu. Či už ste zaneprázdnení prácou, trávite čas s rodinou, alebo si jednoducho chcete dopriať pohodlný večer doma, rozvoz pizze je ideálnym riešením. Nemusíte nikam chodiť, nemusíte čakať v rade – stačí si vybrať z nášho menu a my sa postaráme o zvyšok.
            </p>

            <h2>Čo robí našu pizzu výnimočnou?</h2>
            <p>
              V Monster Pizza kladieme dôraz na kvalitu surovín a tradičné postupy prípravy. Naše cesto je bezlepkové, čo ocenia nielen ľudia s intoleranciou na lepok, ale aj všetci, ktorí hľadajú ľahšiu alternatívu. Každá pizza je pripravovaná čerstvo na objednávku, aby ste dostali ten najlepší zážitok.
            </p>
            <p>
              Používame kvalitné ingrediencie a dbáme na to, aby každý kúsok bol rovnako chutný ako prvý. Naša ponuka zahŕňa klasické aj originálne kombinácie, takže si každý nájde to svoje.
            </p>

            <h2>Ako funguje rozvoz pizze v Bratislave?</h2>
            <p>
              Objednávanie je jednoduché a rýchle. Stačí si vybrať pizzu z nášho online menu, pridať ju do košíka a vyplniť doručovacie údaje. Rozvoz zabezpečujeme prostredníctvom služby Bolt, čo zaručuje rýchle a spoľahlivé doručenie priamo k vašim dverám.
            </p>
            <p>
              Ak preferujete osobný odber, môžete si pizzu vyzdvihnúť v našej prevádzke v Shopping Palace. Stačí si objednať online a prísť si pre ňu v dohodnutom čase.
            </p>

            <h2>Pre koho je rozvoz pizze ideálny?</h2>
            <ul>
              <li><strong>Rodiny s deťmi</strong> – Žiadne obliekanie, žiadne cestovanie. Pizza príde priamo k vám.</li>
              <li><strong>Pracujúci ľudia</strong> – Rýchly obed alebo večera bez straty času.</li>
              <li><strong>Študenti</strong> – Cenovo dostupné jedlo s doručením na internát alebo byt.</li>
              <li><strong>Firemné akcie</strong> – Objednajte pizzu pre celý tím a spravte radosť kolegom.</li>
            </ul>

            <h2>Objednajte si ešte dnes</h2>
            <p>
              Neváhajte a vyskúšajte našu pizzu s rozvozom po Bratislave. Garantujeme čerstvosť, kvalitu a rýchle doručenie. Či už máte chuť na klasickú Margheritu, šťavnatú šunkovú pizzu, alebo niečo pikantnejšie – máme pre vás to pravé.
            </p>
          </article>

          {/* CTA Section */}
          <section className="mt-16 text-center bg-card rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Máte chuť na pizzu?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Objednajte si teraz a vychutnajte si čerstvú pizzu s rozvozom po celej Bratislave.
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
              <Link to="/pizza-petrzalka" className="text-monster-green hover:underline">Pizza Petržalka</Link>
              <Link to="/pizza-ruzinov" className="text-monster-green hover:underline">Pizza Ružinov</Link>
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
