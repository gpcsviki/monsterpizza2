import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SectionHeading } from "@/components/ui/section-heading"
import { toast } from "sonner"
import { Clock, Flame } from "lucide-react"

const specials = [
  {
    title: "Obedové Menu do 14:00 (Po-Pi)",
    description: "33 cm pizza. Šunková, syrová, salámová, šunka + šampiňóny, šunka + kukurica.",
    price: "6,90 €",
    originalPrice: "8,80 €",
    gradient: "from-monster-green to-emerald-600",
    icon: Clock,
  },
  {
    title: "Akcie",
    description: "3 pizze + 1 zadarmo | 2 pizze + 2 dresingy zadarmo",
    price: "",
    originalPrice: "",
    gradient: "from-tomato to-red-600",
    icon: Flame,
  },
]

export function Specials() {
  const handleAddToOrder = (title: string) => {
    toast.success(`${title} pridané do objednávky!`)
  }

  return (
    <section id="specials" className="section-padding bg-charcoal dark:bg-charcoal relative overflow-hidden">
      {/* Background effects - warm pizza vibes */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal to-amber-950/30" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-orange-600/20 to-transparent rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-red-600/15 to-transparent rounded-full blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            title="Aktuálne Akcie"
            subtitle="Výhodné ponuky, ktoré nemôžete odolať"
            className="text-cream [&_p]:text-cream/70"
          />
        </motion.div>

        {/* Hot badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <Badge variant="destructive" className="text-base px-4 py-2 animate-pulse">
            <Flame className="mr-2 h-4 w-4" />
            Práve teraz
          </Badge>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {specials.map((special, index) => (
            <motion.div
              key={special.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <Card className="overflow-hidden bg-charcoal-light border-white/10 hover:border-monster-green transition-all duration-300 hover:glow-green">
                <div className={`h-48 bg-gradient-to-br ${special.gradient} flex items-center justify-center`}>
                  <special.icon className="h-16 w-16 text-cream/90 drop-shadow-sm" />
                </div>
                <CardContent className="p-6 text-cream">
                  <h3 className="font-display font-bold text-2xl mb-2">
                    {special.title}
                  </h3>
                  <p className="text-cream/70 mb-4">
                    {special.description}
                  </p>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-display font-bold text-3xl text-monster-green">
                      {special.price}
                    </span>
                    <span className="text-lg text-cream/50 line-through">
                      {special.originalPrice}
                    </span>
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => handleAddToOrder(special.title)}
                  >
                    Pridať do objednávky
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
