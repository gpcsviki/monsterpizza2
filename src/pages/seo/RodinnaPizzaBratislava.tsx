import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/sections/Navbar"
import { Footer } from "@/components/sections/Footer"
import { ArrowRight, Clock, MapPin, Phone, Users } from "lucide-react"
import { SEOHead, getLocalBusinessData, getBreadcrumbData } from "@/components/SEOHead"

export function RodinnaPizzaBratislava() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      getLocalBusinessData("Bratislava"),
      getBreadcrumbData([
        { name: "Domov", url: "/" },
        { name: "Rodinná pizza 40cm", url: "/rodinna-pizza-bratislava" }
      ])
    ]
  }

  return (
    <>
      <SEOHead
        title="Rodinná Pizza 40cm Bratislava"
        description="Rodinná pizza 40cm Bratislava - veľká bezlepková pizza pre celú rodinu. Ideálna voľba pre 3-4 osoby z Monster Pizza."
        canonical="/rodinna-pizza-bratislava"
        keywords={[
          "rodinná pizza bratislava",
          "veľká pizza bratislava",
          "pizza 40cm bratislava",
          "pizza pre rodinu",
          "bezlepková rodinná pizza"
        ]}
        structuredData={structuredData}
      />
      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container-custom">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Rodinná Pizza 40 cm <span className="text-monster-green">Bratislava</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Veľká pizza pre celú rodinu. 40 cm čistej chuti, bezlepkové cesto a dostatok pre všetkých.
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
              <Users className="h-10 w-10 text-monster-green mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Pre 3-4 osoby</h3>
              <p className="text-muted-foreground">Ideálna veľkosť pre rodinnú večeru</p>
            </div>
            <div className="bg-card rounded-xl p-6 text-center">
              <Clock className="h-10 w-10 text-monster-green mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Otváracie hodiny</h3>
              <p className="text-muted-foreground">Po–Pi: 10:00–20:00<br />So–Ne: 11:00–20:00</p>
            </div>
            <div className="bg-card rounded-xl p-6 text-center">
              <MapPin className="h-10 w-10 text-monster-green mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Shopping Palace</h3>
              <p className="text-muted-foreground">Bratislava, osobný odber aj rozvoz</p>
            </div>
          </section>

          {/* Main Content */}
          <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
            <h2>Rodinná pizza 40 cm – ideálna voľba pre väčšiu skupinu</h2>
            <p>
              Keď sa rodina stretne pri stole, pizza je často tou najlepšou voľbou. Naša rodinná pizza s priemerom 40 cm je navrhnutá tak, aby nasýtila 3-4 osoby. Je to ideálne riešenie pre rodinné večere, oslavy narodenín, alebo jednoducho pre chvíle, keď chcete zdieľať dobrú pizzu s blízkymi.
            </p>

            <h2>Prečo si vybrať veľkú pizzu?</h2>
            <p>
              Veľká pizza má niekoľko výhod oproti objednávaniu viacerých menších. Predovšetkým je to ekonomickejšie – cena za porciu je nižšia. Okrem toho je to praktickejšie – jedna veľká pizza sa ľahšie zdieľa a každý si môže vziať toľko, koľko chce.
            </p>
            <p>
              Naša 40 cm pizza je dostatočne veľká, aby nasýtila celú rodinu, ale zároveň nie je príliš veľká na to, aby sa nedala zjesť. Je to ideálna rovnováha medzi množstvom a kvalitou.
            </p>

            <h2>Bezlepkové cesto pre všetkých</h2>
            <p>
              Jednou z našich hlavných predností je bezlepkové cesto. To znamená, že našu pizzu si môžu vychutnať aj členovia rodiny s intoleranciou na lepok. Nemusíte objednávať zvlášť – všetci môžu jesť tú istú pizzu bez obáv.
            </p>
            <p>
              Bezlepkové cesto je navyše ľahšie a lepšie stráviteľné. Po jedle sa nebudete cítiť ťažko ani unavene. Je to pizza, ktorú si môžete vychutnať bez výčitiek.
            </p>

            <h2>Kedy je rodinná pizza ideálna?</h2>
            <ul>
              <li><strong>Nedeľný obed</strong> – Tradičné rodinné stretnutie si zaslúži výnimočné jedlo.</li>
              <li><strong>Detské oslavy</strong> – Deti pizzu milujú a veľká pizza stačí pre všetkých.</li>
              <li><strong>Filmový večer</strong> – Pohodlný večer s rodinou a dobrou pizzou.</li>
              <li><strong>Návšteva priateľov</strong> – Keď prídu hostia, pizza je vždy dobrá voľba.</li>
              <li><strong>Pracovné stretnutia</strong> – Aj v práci sa hodí väčšia pizza pre tím.</li>
            </ul>

            <h2>Ako objednať rodinnú pizzu?</h2>
            <p>
              Objednávanie je jednoduché. Navštívte naše online menu a vyberte si pizzu vo veľkosti "Veľká" alebo "Rodinná". Pridajte do košíka, vyplňte doručovacie údaje a počkajte na doručenie. Rozvoz zabezpečujeme cez službu Bolt po celej Bratislave.
            </p>
            <p>
              Ak preferujete osobný odber, môžete si pizzu vyzdvihnúť v našej prevádzke v Shopping Palace. Je to rýchle a pohodlné.
            </p>

            <h2>Kvalita, ktorá spája rodinu</h2>
            <p>
              V Monster Pizza veríme, že dobré jedlo spája ľudí. Preto sa snažíme, aby každá naša pizza bola nielen chutná, ale aj pripravená s láskou a starostlivosťou. Používame kvalitné suroviny, osvedčené recepty a moderné postupy prípravy.
            </p>
            <p>
              Objednajte si rodinnú pizzu ešte dnes a vytvorte si nezabudnuteľné chvíle s vašimi blízkymi.
            </p>
          </article>

          {/* CTA Section */}
          <section className="mt-16 text-center bg-card rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Pizza pre celú rodinu
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              40 cm čerstvej pizze, bezlepkové cesto, rozvoz po Bratislave. Objednajte teraz!
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
