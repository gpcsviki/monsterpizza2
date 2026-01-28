import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionHeading } from "@/components/ui/section-heading"
import { ChefHat, Sparkles, Leaf, UtensilsCrossed, CupSoda } from "lucide-react"

const picImages = import.meta.glob("/src/assets/pic/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", {
  eager: true,
}) as Record<string, { default: string }>

const picImageByFilename = Object.fromEntries(
  Object.entries(picImages).map(([path, mod]) => [path.split("/").pop() ?? path, mod.default])
)

type MenuItem = {
  name: string
  description: string
  price: string
  badge?: "popular" | "spicy" | "new"
  imageFilename?: string
}

type MenuCategory = {
  id: string
  label: string
  items: MenuItem[]
}

const menuData: MenuCategory[] = [
  {
    id: "classics",
    label: "Klasiky",
    items: [
      { name: "Šunková", description: "Paradajkový základ, mozzarella, šunka", price: "6,90 €", badge: "popular", imageFilename: "pizza18.jpg.webp" },
      { name: "Syrová", description: "Paradajkový základ, mozzarella, eidam, nivа", price: "6,90 €", imageFilename: "pizza20.jpg.webp" },
      { name: "Salámová", description: "Paradajkový základ, mozzarella, saláma", price: "6,90 €", imageFilename: "pizza19.jpg.webp" },
    ],
  },
  {
    id: "specials",
    label: "Monster Špeciály",
    items: [
      { name: "Šunka + Šampiňóny", description: "Paradajkový základ, mozzarella, šunka, čerstvé šampiňóny", price: "7,90 €", badge: "popular", imageFilename: "pizza12.jpg.webp" },
      { name: "Šunka + Kukurica", description: "Paradajkový základ, mozzarella, šunka, sladká kukurica", price: "7,90 €", badge: "new", imageFilename: "pizza16.jpg.webp" },
      { name: "Monster Mix", description: "Paradajkový základ, mozzarella, šunka, saláma, syr, olivy", price: "8,90 €", badge: "spicy", imageFilename: "pizza17.jpg.jpg" },
    ],
  },
  {
    id: "veggie",
    label: "Vegetariánske",
    items: [
      { name: "Margherita", description: "Paradajkový základ, čerstvá mozzarella, bazalka", price: "6,90 €", badge: "popular", imageFilename: "pizza15.jpg.webp" },
      { name: "Šampiňónová", description: "Smotanový základ, mozzarella, čerstvé šampiňóny", price: "7,50 €", imageFilename: "pizza12.jpg.webp" },
      { name: "Vegetarián", description: "Paradajkový základ, mozzarella, paprika, kukurica, olivy", price: "7,90 €", badge: "new", imageFilename: "pizza9.jpg.webp" },
    ],
  },
  {
    id: "sides",
    label: "Prílohy",
    items: [
      { name: "Cesnakový Chlieb", description: "Chrumkavý chlieb s cesnakovým maslom", price: "2,50 €", badge: "popular", imageFilename: "pizza10.jpg.webp" },
      { name: "Hranolky", description: "Chrumkavé hranolky s kečupom", price: "2,90 €" },
      { name: "Cesnakový Dip", description: "Domáci cesnakový dip", price: "0,50 €" },
    ],
  },
  {
    id: "drinks",
    label: "Nápoje",
    items: [
      { name: "Kofola", description: "Originál Kofola 0,5l", price: "1,90 €", badge: "popular" },
      { name: "Minerálka", description: "Perlivá alebo neperlivá", price: "1,50 €" },
      { name: "Džús", description: "Pomarančový, jablkový alebo multivitamín", price: "1,90 €" },
    ],
  },
]

const categoryGradients: Record<string, string> = {
  classics: "from-amber-400 to-orange-500",
  specials: "from-monster-green to-emerald-600",
  veggie: "from-green-400 to-emerald-500",
  sides: "from-yellow-400 to-amber-500",
  drinks: "from-blue-400 to-cyan-500",
}

const categoryIcons = {
  classics: ChefHat,
  specials: Sparkles,
  veggie: Leaf,
  sides: UtensilsCrossed,
  drinks: CupSoda,
} as const

const categoriesWithPizzaImages = new Set(["classics", "specials", "veggie", "sides"])

export function Menu() {
  return (
    <section id="menu" className="section-padding bg-secondary/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            title="Naše Menu"
            subtitle="Jednoduché menu, žiadne pózy – len kvalitné suroviny"
          />
        </motion.div>

        <Tabs defaultValue="classics" className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <TabsList className="flex-wrap h-auto">
              {menuData.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </motion.div>

          {menuData.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {category.items.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden h-full">
                        <div className={`h-32 bg-gradient-to-br ${categoryGradients[category.id]} flex items-center justify-center relative overflow-hidden`}>
                          {categoriesWithPizzaImages.has(category.id) && item.imageFilename && picImageByFilename[item.imageFilename] ? (
                            <>
                              <img
                                src={picImageByFilename[item.imageFilename]}
                                alt={item.name}
                                loading="lazy"
                                decoding="async"
                                className="absolute inset-0 h-full w-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
                            </>
                          ) : (
                            (() => {
                              const Icon = categoryIcons[category.id as keyof typeof categoryIcons]
                              return <Icon className="h-12 w-12 text-white/90 drop-shadow-sm" />
                            })()
                          )}
                        </div>
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="font-display font-semibold text-lg">
                              {item.name}
                            </h3>
                            {item.badge && (
                              <Badge variant={item.badge} className="shrink-0">
                                {item.badge === "popular" && "Obľúbené"}
                                {item.badge === "spicy" && "Pikantné"}
                                {item.badge === "new" && "Nové"}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {item.description}
                          </p>
                          <span className="font-display font-bold text-xl text-monster-green-dark">
                            {item.price}
                          </span>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
