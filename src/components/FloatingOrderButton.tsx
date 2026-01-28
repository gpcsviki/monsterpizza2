import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

export function FloatingOrderButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const orderSection = document.getElementById("order")
      if (orderSection) {
        const rect = orderSection.getBoundingClientRect()
        setIsVisible(rect.top > window.innerHeight)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-6 right-6 z-50 md:hidden"
        >
          <Button size="lg" className="shadow-xl glow-green" asChild>
            <a href="#order">🍕 Objednať</a>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
