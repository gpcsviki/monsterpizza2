import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { SectionHeading } from "@/components/ui/section-heading"
import { ChevronLeft, ChevronRight } from "lucide-react"

const picImages = import.meta.glob("/src/assets/pic/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", {
  eager: true,
}) as Record<string, { default: string }>

const excludedGalleryFilenames = new Set([
  "pizza2.jpg.jpg",
  "pizza3.jpg.jpg",
  "pizza4.jpg.jpg",
  "pizza5.jpg.jpg",
  "pizza6.jpg.jpg",
  "pizza7.jpg.jpg",
])

const galleryItems = Object.entries(picImages)
  .sort(([a], [b]) => a.localeCompare(b))
  .filter(([path]) => {
    if (/team/i.test(path)) return false
    const filename = path.split("/").pop() ?? ""
    return !excludedGalleryFilenames.has(filename)
  })
  .map(([path, mod]) => {
    const filename = path.split("/").pop() ?? ""
    const name = filename.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " ").trim()

    return {
      src: mod.default,
      alt: name ? `Fotka: ${name}` : "Fotka",
    }
  })

export function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => setSelectedIndex(index)
  const closeLightbox = () => setSelectedIndex(null)

  const showPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + galleryItems.length) % galleryItems.length)
    }
  }

  const showNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % galleryItems.length)
    }
  }

  return (
    <section id="gallery" className="section-padding bg-secondary/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            title="Galéria"
            subtitle="Nasýťte si oči"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {galleryItems.length === 0 ? (
            <div className="col-span-2 md:col-span-3 rounded-2xl border border-white/10 bg-black/20 p-8 text-center">
              <p className="text-cream/80 font-medium">
                Fotky nie sú načítané.
              </p>
              <p className="mt-2 text-sm text-cream/60">
                Pridaj obrázky do priečinka <span className="font-semibold">src/assets/pic</span>.
              </p>
            </div>
          ) : (
            galleryItems.map((item, index) => (
              <motion.button
                key={item.src}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openLightbox(index)}
                className="group relative aspect-square overflow-hidden rounded-2xl bg-black/30 shadow-lg hover:shadow-xl transition-shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-monster-green focus:ring-offset-2"
                aria-label={`Zobraziť fotku ${index + 1}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              </motion.button>
            ))
          )}
        </motion.div>

        {/* Lightbox */}
        <Dialog open={selectedIndex !== null} onOpenChange={(open) => { if (!open) closeLightbox() }}>
          <DialogContent className="max-w-5xl p-0 bg-transparent border-none">
            <AnimatePresence mode="wait">
              {selectedIndex !== null && (
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative"
                >
                  <div className="rounded-2xl overflow-hidden bg-black/70 border border-white/10 shadow-2xl">
                    <img
                      src={galleryItems[selectedIndex].src}
                      alt={galleryItems[selectedIndex].alt}
                      className="w-full max-h-[80vh] object-contain"
                    />
                  </div>

                  {/* Navigation buttons */}
                  <button
                    onClick={showPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={showNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
