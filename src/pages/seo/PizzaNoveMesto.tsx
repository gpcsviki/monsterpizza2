import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/sections/Navbar"
import { Footer } from "@/components/sections/Footer"
import { ArrowRight, Clock, MapPin, Phone, Truck } from "lucide-react"
import { SEOHead, getLocalBusinessData, getBreadcrumbData } from "@/components/SEOHead"

export function PizzaNoveMesto() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      getLocalBusinessData("Nové Mesto"),
      getBreadcrumbData([
        { name: "Domov", url: "/" },
        { name: "Pizza Nové Mesto", url: "/pizza-nove-mesto" }
      ])
    ]
  }

  return (
    <>
      <SEOHead
        title="Pizza Nové Mesto Bratislava"
        description="Pizza Nové Mesto - bezlepková pizza s rozvozom do Nového Mesta. Čerstvo pripravovaná pizza z Monster Pizza Bratislava."
        canonical="/pizza-nove-mesto"
        keywords={[
          "pizza nové mesto",
          "nové mesto pizza",
          "rozvoz pizze nové mesto",
          "pizza donáška nové mesto",
          "bezlepková pizza nové mesto"
        ]}
        structuredData={structuredData}
      />
      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container-custom">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              <span className="text-monster-green">Nové Mesto</span> Pizza
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Čerstvá pizza pre Nové Mesto a okolie. Bezlepkové cesto, kvalitné suroviny a rýchle doručenie.
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
              <h3 className="font-semibold text-lg mb-2">Rozvoz do Nového Mesta</h3>
              <p className="text-muted-foreground">Rýchle doručenie cez Bolt</p>
            </div>
            <div className="bg-card rounded-xl p-6 text-center">
              <Clock className="h-10 w-10 text-monster-green mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Otváracie hodiny</h3>
              <p className="text-muted-foreground">Po–Pi: 10:00–20:00<br />So–Ne: 11:00–20:00</p>
            </div>
            <div className="bg-card rounded-xl p-6 text-center">
              <MapPin className="h-10 w-10 text-monster-green mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Shopping Palace</h3>
              <p className="text-muted-foreground">Dostupné z Nového Mesta</p>
            </div>
          </section>

          {/* Main Content */}
          <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
            <h2>Pizza pre Nové Mesto – tradícia a kvalita</h2>
            <p>
              Nové Mesto je jednou z centrálnych mestských častí Bratislavy s bohatou históriou a živou atmosférou. Pre obyvateľov tejto oblasti ponúkame Monster Pizza – pizzériu, ktorá spája tradičné recepty s modernými postupmi prípravy. Naša pizza je pripravovaná z čerstvých surovín a bezlepkového cesta.
            </p>

            <h2>Bezlepková pizza pre každého</h2>
            <p>
              Jednou z našich hlavných predností je bezlepkové cesto. Pripravujeme ho denne z kvalitných ingrediencií bez obsahu lepku. To znamená, že našu pizzu si môžu vychutnať aj ľudia s celiakiou alebo tí, ktorí preferujú stravu bez lepku.
            </p>
            <p>
              Bezlepkové cesto je ľahké, chrumkavé a dobre stráviteľné. Po jedle sa nebudete cítiť ťažko. Je to pizza, ktorú si môžete dopriať kedykoľvek bez výčitiek.
            </p>

            <h2>Ako objednať pizzu do Nového Mesta?</h2>
            <p>
              Objednávanie je rýchle a jednoduché. Navštívte naše online menu, vyberte si z ponuky pizz a pridajte do košíka. Pri objednávke zadajte svoju adresu v Novom Meste a my zabezpečíme doručenie prostredníctvom služby Bolt.
            </p>
            <p>
              Ak preferujete osobný odber, môžete si pizzu vyzdvihnúť v našej prevádzke v Shopping Palace. Stačí si objednať online a prísť si pre ňu v dohodnutom čase.
            </p>

            <h2>Pre koho je naša pizza ideálna?</h2>
            <ul>
              <li><strong>Študenti</strong> – Cenovo dostupné a chutné jedlo.</li>
              <li><strong>Pracujúci</strong> – Rýchly obed alebo večera bez čakania.</li>
              <li><strong>Rodiny</strong> – Pizza, ktorú si vychutnajú všetci členovia rodiny.</li>
              <li><strong>Páry</strong> – Romantická večera s dobrou pizzou.</li>
              <li><strong>Priatelia</strong> – Ideálne jedlo na spoločné posedenie.</li>
            </ul>

            <h2>Naša ponuka</h2>
            <p>
              V menu nájdete klasické pizze ako Margherita, Šunková či Syrová, ale aj špeciality pre náročnejších. Všetky pizze sú dostupné v rôznych veľkostiach – od menších porcií pre jednotlivcov až po veľké rodinné pizze.
            </p>
            <p>
              Používame kvalitné suroviny od overených dodávateľov. Každá pizza je pripravovaná čerstvo na objednávku, aby ste dostali ten najlepší zážitok.
            </p>

            <h2>Kvalita a spokojnosť zákazníkov</h2>
            <p>
              V Monster Pizza je spokojnosť zákazníkov na prvom mieste. Snažíme sa, aby každá objednávka bola vybavená rýchlo a kvalitne. Naším cieľom je, aby ste sa k nám vracali a odporúčali nás svojim známym.
            </p>
            <p>
              Vyskúšajte našu pizzu a presvedčte sa sami o kvalite, ktorú ponúkame. Objednajte si ešte dnes a vychutnajte si čerstvú pizzu priamo v Novom Meste.
            </p>
          </article>

          {/* CTA Section */}
          <section className="mt-16 text-center bg-card rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Objednajte si pizzu do Nového Mesta
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Čerstvá pizza, bezlepkové cesto, rýchle doručenie. Vyskúšajte Monster Pizza!
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
              <Link to="/pizza-ruzinov" className="text-monster-green hover:underline">Pizza Ružinov</Link>
              <Link to="/rodinna-pizza-bratislava" className="text-monster-green hover:underline">Rodinná pizza 40cm</Link>
              <Link to="/#menu" className="text-monster-green hover:underline">Naše menu</Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
