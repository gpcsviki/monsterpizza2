import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeading } from "@/components/ui/section-heading"

const reviews = [
  {
    name: "Martin K.",
    initial: "M",
    rating: 5,
    text: "Obrovské porcie za super cenu. Konečne poctivá pizza v Shopping Palace!",
  },
  {
    name: "Simona H.",
    initial: "S",
    rating: 5,
    text: "Šunková so šampiňónmi je fantastická. A personál veľmi milý, cítiť rodinný prístup.",
  },
  {
    name: "Jakub N.",
    initial: "J",
    rating: 5,
    text: "Obedové menu za 6,90€ s Kofolou zadarmo? To je bomba. Chodím sem pravidelne.",
  },
]

export function Reviews() {
  return (
    <section id="reviews" className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            title="Čo Hovoria Zákazníci"
            subtitle="Skutočné recenzie od spokojných hladošov"
          />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-lg italic mb-6 leading-relaxed">
                    "{review.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-monster-green text-charcoal flex items-center justify-center font-display font-bold">
                      {review.initial}
                    </div>
                    <span className="font-semibold">{review.name}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
