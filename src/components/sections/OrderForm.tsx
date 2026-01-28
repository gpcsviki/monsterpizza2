import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeading } from "@/components/ui/section-heading"

const orderSchema = z.object({
  orderType: z.enum(["pickup", "delivery"]),
  name: z.string().min(2, "Meno musí mať aspoň 2 znaky"),
  phone: z.string().min(10, "Zadajte platné telefónne číslo"),
  pizza: z.string().min(1, "Vyberte si pizzu"),
  size: z.enum(["small", "medium", "large"]),
  extraCheese: z.boolean().optional(),
  chiliFlakes: z.boolean().optional(),
  garlicDip: z.boolean().optional(),
  notes: z.string().optional(),
})

type OrderFormData = z.infer<typeof orderSchema>

const pizzaOptions = [
  { value: "sunkova", label: "Šunková - 6,90 €", group: "Klasiky" },
  { value: "syrova", label: "Syrová - 6,90 €", group: "Klasiky" },
  { value: "salamova", label: "Salámová - 6,90 €", group: "Klasiky" },
  { value: "sampinony", label: "Šunka + Šampiňóny - 7,90 €", group: "Monster Špeciály" },
  { value: "kukurica", label: "Šunka + Kukurica - 7,90 €", group: "Monster Špeciály" },
  { value: "mix", label: "Monster Mix - 8,90 €", group: "Monster Špeciály" },
  { value: "margherita", label: "Margherita - 6,90 €", group: "Vegetariánske" },
  { value: "sampinon", label: "Šampiňónová - 7,50 €", group: "Vegetariánske" },
  { value: "vegetarian", label: "Vegetarián - 7,90 €", group: "Vegetariánske" },
]

export function OrderForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      orderType: "pickup",
      size: "medium",
      extraCheese: false,
      chiliFlakes: false,
      garlicDip: false,
    },
  })

  const orderType = watch("orderType")
  const size = watch("size")
  const extraCheese = watch("extraCheese")
  const chiliFlakes = watch("chiliFlakes")
  const garlicDip = watch("garlicDip")

  const onSubmit = async (data: OrderFormData) => {
    console.log("Order submitted:", data)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.success("Vaša objednávka sa valí do kuchyne 🐾🍕")
    reset()
  }

  return (
    <section id="order" className="section-padding bg-gradient-to-b from-background to-secondary/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            title="Objednajte Si"
            subtitle="Nakŕmte beštiu vo vás"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="shadow-xl">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Order Type Toggle */}
                <div className="space-y-3">
                  <Label>Typ objednávky</Label>
                  <div className="flex rounded-full bg-muted p-1">
                    <button
                      type="button"
                      onClick={() => setValue("orderType", "pickup")}
                      className={`flex-1 py-3 px-6 rounded-full font-display font-semibold transition-all ${
                        orderType === "pickup"
                          ? "bg-charcoal text-cream dark:bg-cream dark:text-charcoal"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Osobný odber
                    </button>
                    <button
                      type="button"
                      onClick={() => setValue("orderType", "delivery")}
                      className={`flex-1 py-3 px-6 rounded-full font-display font-semibold transition-all ${
                        orderType === "delivery"
                          ? "bg-charcoal text-cream dark:bg-cream dark:text-charcoal"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Donáška
                    </button>
                  </div>
                </div>

                {/* Name & Phone */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Meno</Label>
                    <Input
                      id="name"
                      placeholder="Vaše meno"
                      {...register("name")}
                      className={errors.name ? "border-tomato" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-tomato">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefón</Label>
                    <Input
                      id="phone"
                      placeholder="0918 123 456"
                      {...register("phone")}
                      className={errors.phone ? "border-tomato" : ""}
                    />
                    {errors.phone && (
                      <p className="text-sm text-tomato">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                {/* Pizza Selection */}
                <div className="space-y-2">
                  <Label>Vyberte si pizzu</Label>
                  <Select onValueChange={(value) => setValue("pizza", value)}>
                    <SelectTrigger className={errors.pizza ? "border-tomato" : ""}>
                      <SelectValue placeholder="Vyberte pizzu" />
                    </SelectTrigger>
                    <SelectContent>
                      {pizzaOptions.map((pizza) => (
                        <SelectItem key={pizza.value} value={pizza.value}>
                          {pizza.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.pizza && (
                    <p className="text-sm text-tomato">{errors.pizza.message}</p>
                  )}
                </div>

                {/* Size Selection */}
                <div className="space-y-3">
                  <Label>Veľkosť</Label>
                  <RadioGroup
                    value={size}
                    onValueChange={(value) => setValue("size", value as "small" | "medium" | "large")}
                    className="flex gap-3"
                  >
                    {[
                      { value: "small", label: "S" },
                      { value: "medium", label: "M" },
                      { value: "large", label: "L" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center justify-center w-14 h-14 rounded-xl cursor-pointer font-display font-bold text-lg transition-all ${
                          size === option.value
                            ? "bg-monster-green text-charcoal"
                            : "bg-muted hover:bg-muted/80"
                        }`}
                      >
                        <RadioGroupItem value={option.value} className="sr-only" />
                        {option.label}
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                {/* Extras */}
                <div className="space-y-3">
                  <Label>Prísady navyše</Label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { id: "extraCheese", label: "Extra syr (+1 €)", field: "extraCheese" as const, checked: extraCheese },
                      { id: "chiliFlakes", label: "Chilli vločky", field: "chiliFlakes" as const, checked: chiliFlakes },
                      { id: "garlicDip", label: "Cesnakový dip (+0,50 €)", field: "garlicDip" as const, checked: garlicDip },
                    ].map((extra) => (
                      <label
                        key={extra.id}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-muted hover:bg-muted/80 cursor-pointer transition-colors"
                      >
                        <Checkbox
                          id={extra.id}
                          checked={extra.checked}
                          onCheckedChange={(checked) => setValue(extra.field, !!checked)}
                        />
                        <span className="font-medium text-sm">{extra.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes">Špeciálne požiadavky</Label>
                  <Textarea
                    id="notes"
                    placeholder="Máte nejaké špeciálne požiadavky?"
                    {...register("notes")}
                  />
                </div>

                {/* Submit */}
                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Odosielam objednávku..." : "Objednať 🍕"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
