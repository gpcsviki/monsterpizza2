import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeading } from "@/components/ui/section-heading"
import { LogoMark } from "@/components/LogoMark"

const picImages = import.meta.glob("/src/assets/pic/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", {
  eager: true,
}) as Record<string, { default: string }>

const teamImage = Object.entries(picImages)
  .sort(([a], [b]) => a.localeCompare(b))
  .find(([path]) => /team/i.test(path))?.[1].default

export function About() {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              title="O Nás"
              align="left"
              className="mb-6"
            />
            <p className="text-muted-foreground text-lg mb-4 leading-relaxed">
              V Shopping Palace máme novú hviezdu – <strong>Monster Pizza</strong>. Malý rodinný podnik, ktorý 
              nerobí žiadnu vedu, len poctivú pizzu za <strong>férové ceny</strong>, úsmev a ochotu. Presne tak, ako to má byť.
            </p>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Či prídete po rýchly obed, pizzu pre celú rodinu alebo len tak na jeden „kúsok pokoja 
              po ceste domov", Monster Pizza je miesto, kde sa vždy cítite vítaní. 
              Úprimní ľudia, jednoduché menu, žiadne pózy – len kvalitné suroviny a chuť, ktorá nezradí.
            </p>

            {/* Claw marks decoration */}
            <div className="flex gap-1 mt-8">
              <span className="w-1 h-8 bg-monster-green rounded-full -rotate-12" />
              <span className="w-1 h-10 bg-monster-green rounded-full -rotate-12" />
              <span className="w-1 h-8 bg-monster-green rounded-full -rotate-12" />
            </div>
          </motion.div>

          {/* Visual + Chef's Note */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Image placeholder */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-black/50 border border-white/10 flex items-center justify-center">
              {teamImage ? (
                <img
                  src={teamImage}
                  alt="Tím Monster Pizza"
                  className="h-full w-full object-contain"
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600" />
              )}
            </div>

            {/* Chef's Note Card */}
            <Card className="absolute -bottom-6 -right-4 md:-right-8 max-w-xs shadow-xl">
              <CardContent className="p-5">
                <LogoMark className="h-7 w-7 object-contain mb-2 drop-shadow-sm" alt="Monster Pizza" />
                <h4 className="font-display font-semibold text-lg mb-2">
                  Z kuchyne
                </h4>
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  "V kuchyni to vedú ľudia, ktorí to berú srdcom — rodina, čo si na nič nehrá. A presne to cítiť v každom súste."
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
