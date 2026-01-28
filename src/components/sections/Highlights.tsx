import { motion } from "framer-motion"
import { Flame, Clock, Truck, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const highlights = [
  {
    icon: Flame,
    title: "Poctivá Pizza",
    description: "Len kvalitné suroviny a chuť, ktorá nezradí",
  },
  {
    icon: Clock,
    title: "Čerstvé Cesto",
    description: "Každý deň pripravujeme od základov",
  },
  {
    icon: Star,
    title: "Monster Porcie",
    description: "Férové ceny, veľké porcie",
    approved: true,
  },
  {
    icon: Truck,
    title: "Rodinný Podnik",
    description: "Malý podnik s veľkým srdcom",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function Highlights() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {highlights.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className={`relative h-full text-center p-6 ${item.approved ? 'border-2 border-monster-green' : ''} hover:glow-green`}>
                {item.approved && (
                  <Badge className="absolute -top-3 -right-2 rotate-12 shadow-md">
                    Monster schválené! ✓
                  </Badge>
                )}
                <CardContent className="p-0 pt-2">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-monster-green/10 flex items-center justify-center text-monster-green">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-semibold text-xl mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
