import { motion } from "framer-motion"
import { MapPin, Clock, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/ui/section-heading"

export function Location() {
  return (
    <section id="location" className="section-padding bg-secondary/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            title="Kde Nás Nájdete"
            subtitle="Stavte sa – radi vás uvidia 👋"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Google Maps Embed */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps?q=Monster%20Pizza%20Shopping%20Palace%20Bratislava&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Monster Pizza - Shopping Palace Bratislava"
              className="w-full h-full"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Address */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-monster-green" />
                <h3 className="font-display font-semibold text-lg">Adresa</h3>
              </div>
              <p className="text-muted-foreground ml-7">
                Shopping Palace<br />
                Bratislava
              </p>
            </div>

            {/* Hours */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-monster-green" />
                <h3 className="font-display font-semibold text-lg">Otváracie hodiny</h3>
              </div>
              <div className="text-muted-foreground ml-7 space-y-1">
                <p><strong>Po – Pia:</strong> 10:00 - 20:00</p>
                <p><strong>So – Ne:</strong> 11:00 - 20:00</p>
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-5 h-5 text-monster-green" />
                <h3 className="font-display font-semibold text-lg">Kontakt</h3>
              </div>
              <div className="text-muted-foreground ml-7 space-y-1">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> 0918 127 810
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" /> d.monsterpizzafood@gmail.com
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild>
                <a href="https://www.google.com/maps/search/?api=1&query=Monster%20Pizza%20Shopping%20Palace%20Bratislava" target="_blank" rel="noopener noreferrer">
                  Zobraziť na mape
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="tel:0918127810">
                  Zavolať
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
