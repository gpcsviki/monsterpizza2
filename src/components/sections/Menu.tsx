import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/ui/section-heading"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { ChefHat, Sparkles, Leaf, UtensilsCrossed, CupSoda, ShoppingCart, AlertTriangle } from "lucide-react"
import { useCart } from "@/contexts/CartContext"

const picImages = import.meta.glob("/src/assets/pic/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", {
  eager: true,
}) as Record<string, { default: string }>

const drinkImages = import.meta.glob("/src/assets/drinks/*.svg", {
  eager: true,
}) as Record<string, { default: string }>

const picImageByFilename = Object.fromEntries(
  Object.entries(picImages).map(([path, mod]) => [path.split("/").pop() ?? path, mod.default])
)

const drinkImageByFilename = Object.fromEntries(
  Object.entries(drinkImages).map(([path, mod]) => [path.split("/").pop() ?? path, mod.default])
)

type MenuItem = {
  name: string
  description: string
  price: string
  priceNum: number
  badge?: "popular" | "spicy" | "new"
  imageFilename?: string
  allergens?: string[]
  ingredients?: string[]
  productId: string
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
      { productId: "sunkova", name: "Šunková", description: "Pomodoro, šunka, syr", price: "6,90 €", priceNum: 6.9, badge: "popular", imageFilename: "sunkova.jpeg", ingredients: ["pomodoro", "šunka", "syr"], allergens: ["lepok", "mlieko"] },
      { productId: "salamova", name: "Salámová", description: "Pomodoro, saláma, syr", price: "6,90 €", priceNum: 6.9, imageFilename: "salamova-klasic.jpeg", ingredients: ["pomodoro", "saláma", "syr"], allergens: ["lepok", "mlieko"] },
      { productId: "margherita", name: "Margherita", description: "Pomodoro, syr", price: "6,90 €", priceNum: 6.9, badge: "popular", imageFilename: "margarita.jpeg", ingredients: ["pomodoro", "syr"], allergens: ["lepok", "mlieko"] },
    ],
  },
  {
    id: "specials",
    label: "Monster Špeciály",
    items: [
      { productId: "sedliacka", name: "Sedliacka", description: "Pomodoro, syr, červená cibuľa, oravská slanina, klobása", price: "6,90 €", priceNum: 6.9, badge: "popular", imageFilename: "sedliacka.jpeg", ingredients: ["pomodoro", "syr", "červená cibuľa", "oravská slanina", "klobása"], allergens: ["lepok", "mlieko"] },
      { productId: "capri", name: "Capri", description: "Pomodoro, šunka, syr, šampiňóny, kukurica", price: "6,90 €", priceNum: 6.9, badge: "new", imageFilename: "capri.jpeg", ingredients: ["pomodoro", "šunka", "syr", "šampiňóny", "kukurica"], allergens: ["lepok", "mlieko"] },
      { productId: "kukuricova", name: "Kukuricová", description: "Pomodoro, šunka, syr, kukurica", price: "6,90 €", priceNum: 6.9, imageFilename: "kukuricova.jpeg", ingredients: ["pomodoro", "šunka", "syr", "kukurica"], allergens: ["lepok", "mlieko"] },
      { productId: "bryndzova", name: "Bryndzová", description: "Smotanový základ, oravská slanina, bryndza, jarná cibuľka", price: "6,90 €", priceNum: 6.9, badge: "spicy", imageFilename: "bryndzova.jpeg", ingredients: ["smotanový základ", "oravská slanina", "bryndza", "jarná cibuľka"], allergens: ["lepok", "mlieko"] },
      { productId: "slovensky-posuch", name: "Slovenský Posúch", description: "Smotanový základ, syr, oravská slanina, jarná cibuľka", price: "6,90 €", priceNum: 6.9, badge: "new", imageFilename: "slovensky-posuch.jpeg", ingredients: ["smotanový základ", "syr", "oravská slanina", "jarná cibuľka"], allergens: ["lepok", "mlieko"] },
    ],
  },
  {
    id: "veggie",
    label: "Vegetariánske",
    items: [
      { productId: "vegetariana", name: "Vegetariána", description: "Pomodoro, syr, kukurica, paradajky, paprika, rukola, balsamico", price: "6,90 €", priceNum: 6.9, badge: "popular", imageFilename: "vegeterian.jpeg", ingredients: ["pomodoro", "syr", "kukurica", "paradajky", "paprika", "rukola", "balsamico"], allergens: ["lepok", "mlieko"] },
    ],
  },
  {
    id: "sides",
    label: "Prílohy",
    items: [
      { productId: "klasicke-stangle", name: "Klasické Štangle", description: "Chrumkavé štangle s cesnakovým maslom", price: "3,50 €", priceNum: 3.5, badge: "popular", imageFilename: "klasicke-stangle.jpeg", ingredients: ["cesto", "cesnak", "maslo"], allergens: ["lepok", "mlieko"] },
      { productId: "plnene-stangle-sunkove", name: "Plnené Štangle Šunkové", description: "Štangle plnené šunkou a syrom", price: "4,50 €", priceNum: 4.5, imageFilename: "plnene-stangle-sunkove.jpeg", ingredients: ["cesto", "šunka", "syr"], allergens: ["lepok", "mlieko"] },
      { productId: "plnene-stangle-salama", name: "Plnené Štangle Salámové", description: "Štangle plnené salámou a syrom", price: "4,50 €", priceNum: 4.5, imageFilename: "plnene-stangle-salama.jpeg", ingredients: ["cesto", "saláma", "syr"], allergens: ["lepok", "mlieko"] },
      { productId: "cesnakovy-dip", name: "Cesnakový Dip", description: "Domáci cesnakový dip", price: "0,50 €", priceNum: 0.5, ingredients: ["smotana", "cesnak", "bylinky"], allergens: ["mlieko"] },
    ],
  },
  {
    id: "drinks",
    label: "Nápoje",
    items: [
      { productId: "kofola", name: "Kofola", description: "Originál Kofola 0,5l", price: "1,90 €", priceNum: 1.9, badge: "popular", imageFilename: "kofola.svg", ingredients: ["Kofola"], allergens: [] },
      { productId: "mineralka", name: "Minerálka", description: "Perlivá alebo neperlivá", price: "1,50 €", priceNum: 1.5, imageFilename: "mineralka.svg", ingredients: ["voda"], allergens: [] },
      { productId: "dzus", name: "Džús", description: "Pomarančový, jablkový alebo multivitamín", price: "1,90 €", priceNum: 1.9, imageFilename: "dzus.svg", ingredients: ["ovocný džús"], allergens: [] },
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
  const { addItem } = useCart()
  const [allergenModal, setAllergenModal] = useState<MenuItem | null>(null)

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      productId: item.productId,
      name: item.name,
      description: item.description,
      basePrice: item.priceNum,
      sizeLabel: "Štandardná",
      sizeDelta: 0,
      extras: [],
      quantity: 1,
      imageUrl: item.imageFilename ? picImageByFilename[item.imageFilename] : undefined,
    })
    toast.success(`${item.name} pridané do košíka`)
  }

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
                      <Card className="overflow-hidden h-full flex flex-col">
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
                          ) : item.imageFilename && drinkImageByFilename[item.imageFilename] ? (
                            <img
                              src={drinkImageByFilename[item.imageFilename]}
                              alt={item.name}
                              loading="lazy"
                              decoding="async"
                              className="h-28 w-auto object-contain drop-shadow-lg"
                            />
                          ) : (
                            (() => {
                              const Icon = categoryIcons[category.id as keyof typeof categoryIcons]
                              return <Icon className="h-12 w-12 text-white/90 drop-shadow-sm" />
                            })()
                          )}
                        </div>
                        <CardContent className="p-5 flex-1 flex flex-col">
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
                          <div className="mt-auto">
                            <span className="font-display font-bold text-xl text-monster-green-dark block mb-3">
                              {item.price}
                            </span>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="flex-1"
                                onClick={() => handleAddToCart(item)}
                              >
                                <ShoppingCart className="h-4 w-4 mr-1" />
                                Kúpiť
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setAllergenModal(item)}
                              >
                                <AlertTriangle className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>

        <Dialog open={!!allergenModal} onOpenChange={() => setAllergenModal(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{allergenModal?.name}</DialogTitle>
              <DialogDescription>Zloženie a alergény</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {allergenModal?.ingredients && allergenModal.ingredients.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Ingrediencie:</h4>
                  <p className="text-muted-foreground">
                    {allergenModal.ingredients.join(", ")}
                  </p>
                </div>
              )}
              {allergenModal?.allergens && allergenModal.allergens.length > 0 ? (
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    Alergény:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {allergenModal.allergens.map((allergen) => (
                      <span
                        key={allergen}
                        className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-full text-sm"
                      >
                        {allergen}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">Žiadne známe alergény.</p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
