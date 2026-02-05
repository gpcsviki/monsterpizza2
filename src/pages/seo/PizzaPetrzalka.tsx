import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/sections/Navbar"
import { Footer } from "@/components/sections/Footer"
import { ArrowRight, Clock, MapPin, Phone, Truck } from "lucide-react"
import { SEOHead, getLocalBusinessData, getBreadcrumbData } from "@/components/SEOHead"

export function PizzaPetrzalka() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      getLocalBusinessData("Petržalka"),
      getBreadcrumbData([
        { name: "Domov", url: "/" },
        { name: "Pizza Petržalka", url: "/pizza-petrzalka" }
      ])
    ]
  }

  return (
    <>
      <SEOHead
        title="Pizza Petržalka"
        description="Pizza Petržalka - bezlepková pizza s rozvozom do Petržalky. Čerstvo pripravovaná pizza z Monster Pizza Bratislava."
        canonical="/pizza-petrzalka"
        keywords={[
          "pizza petržalka",
          "petržalka pizza",
          "rozvoz pizze petržalka",
          "pizza donáška petržalka",
          "bezlepková pizza petržalka"
        ]}
        structuredData={structuredData}
      />
      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container-custom">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              <span className="text-monster-green">Petržalka</span> Pizza
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Najlepšia pizza pre obyvateľov Petržalky. Bezlepkové cesto, čerstvé suroviny a rýchle doručenie.
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
              <h3 className="font-semibold text-lg mb-2">Rozvoz do Petržalky</h3>
              <p className="text-muted-foreground">Rýchle doručenie cez Bolt priamo k vám</p>
            </div>
            <div className="bg-card rounded-xl p-6 text-center">
              <Clock className="h-10 w-10 text-monster-green mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Otváracie hodiny</h3>
              <p className="text-muted-foreground">Po–Pi: 10:00–20:00<br />So–Ne: 11:00–20:00</p>
            </div>
            <div className="bg-card rounded-xl p-6 text-center">
              <MapPin className="h-10 w-10 text-monster-green mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Shopping Palace</h3>
              <p className="text-muted-foreground">Blízko Petržalky, ľahká dostupnosť</p>
            </div>
          </section>

          {/* Main Content */}
          <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
            <h2>Pizza pre Petržalku – rýchlo a chutne</h2>
            <p>
              Petržalka je najväčšia mestská časť Bratislavy a domov pre tisíce rodín, študentov a pracujúcich ľudí. Práve pre vás sme tu – Monster Pizza ponúka kvalitné pizze s možnosťou rozvozu priamo do Petržalky. Či bývate pri Auparku, na Hálovej, alebo kdekoľvek inde v tejto mestskej časti, pizza k vám dorazí čerstvá a teplá.
            </p>

            <h2>Prečo si vybrať Monster Pizza?</h2>
            <p>
              Naša pizzéria sa odlišuje od ostatných niekoľkými kľúčovými vlastnosťami. Predovšetkým, naše cesto je bezlepkové. To znamená, že si pizzu môžu vychutnať aj ľudia s celiakiou alebo tí, ktorí sa snažia obmedziť príjem lepku. Zároveň je naše cesto ľahké a dobre stráviteľné.
            </p>
            <p>
              Každá pizza je pripravovaná na objednávku z čerstvých surovín. Nepoužívame polotovary ani mrazené ingrediencie. Výsledkom je pizza, ktorá chutí tak, ako má – autenticky a lahodne.
            </p>

            <h2>Ako objednať pizzu do Petržalky?</h2>
            <p>
              Objednávanie je jednoduché. Navštívte naše online menu, vyberte si z ponuky pizz a pridajte do košíka. Pri objednávke zadajte svoju adresu v Petržalke a my zabezpečíme doručenie prostredníctvom služby Bolt. Celý proces trvá len pár minút.
            </p>
            <p>
              Ak máte radšej osobný kontakt, môžete nám zavolať na číslo 0918 127 810 a objednať si telefonicky. Radi vám poradíme s výberom a odpovieme na vaše otázky.
            </p>

            <h2>Ideálna voľba pre každú príležitosť</h2>
            <ul>
              <li><strong>Rodinné večere</strong> – Objednajte väčšiu pizzu a zdieľajte ju s celou rodinou.</li>
              <li><strong>Stretnutia s priateľmi</strong> – Pizza je ideálna na spoločné posedenie.</li>
              <li><strong>Rýchly obed</strong> – Keď nemáte čas variť, pizza je rýchle a chutné riešenie.</li>
              <li><strong>Detské oslavy</strong> – Deti pizzu milujú a vy máte menej starostí.</li>
            </ul>

            <h2>Kvalita, ktorej môžete dôverovať</h2>
            <p>
              V Monster Pizza dbáme na spokojnosť každého zákazníka. Naším cieľom je poskytovať konzistentnú kvalitu pri každej objednávke. Preto používame osvedčené recepty a starostlivo vyberáme dodávateľov surovín.
            </p>
            <p>
              Veríme, že dobrá pizza dokáže spríjemniť deň. Preto sa snažíme, aby každá naša pizza bola malým kulinárskym zážitkom – od prvého pohľadu až po posledné sústo.
            </p>

            <h2>Objednajte si pizzu do Petržalky ešte dnes</h2>
            <p>
              Nemusíte nikam chodiť, nemusíte čakať v rade. Stačí pár kliknutí a čerstvá pizza bude na ceste k vám. Vyskúšajte Monster Pizza a presvedčte sa sami o kvalite, ktorú ponúkame.
            </p>
          </article>

          {/* CTA Section */}
          <section className="mt-16 text-center bg-card rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Hladní? Pizza je na ceste!
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Objednajte si teraz a užite si čerstvú pizzu priamo v Petržalke.
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
