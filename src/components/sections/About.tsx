import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeading } from "@/components/ui/section-heading"
import { LogoMark } from "@/components/LogoMark"
import { ChevronLeft, ChevronRight } from "lucide-react"

const aboutImages = import.meta.glob("/src/assets/about/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", {
  eager: true,
}) as Record<string, { default: string }>

const aboutImageList = Object.entries(aboutImages)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, mod]) => mod.default)

export function About() {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % aboutImageList.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + aboutImageList.length) % aboutImageList.length)
  }

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
            {/* Image Gallery */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-black/50 border border-white/10">
              {aboutImageList.length > 0 ? (
                <>
                  <img
                    src={aboutImageList[currentImage]}
                    alt={`O nás ${currentImage + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  {aboutImageList.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                        aria-label="Predchádzajúci obrázok"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                        aria-label="Ďalší obrázok"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                        {aboutImageList.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImage(idx)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              idx === currentImage ? "bg-monster-green" : "bg-white/50"
                            }`}
                            aria-label={`Obrázok ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
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
