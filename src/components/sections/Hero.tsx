import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react"

const picImages = import.meta.glob("/src/assets/pic/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", {
  eager: true,
}) as Record<string, { default: string }>

const heroBackgroundImage = Object.entries(picImages)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, mod]) => mod.default)[0]

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal dark:bg-charcoal pt-20"
    >
      {/* Dynamic Background with warm pizza colors */}
      <div className="absolute inset-0 overflow-hidden">
        {heroBackgroundImage && (
          <img
            src={heroBackgroundImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-25 blur-sm scale-[1.03]"
            aria-hidden="true"
          />
        )}

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/70" />

        {/* Warm gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal to-amber-950/40" />
        
        {/* Animated warm orbs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-orange-500/20 to-amber-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-red-600/15 to-orange-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: "0.5s" }} />
        
        {/* Subtle accent */}
        <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-yellow-500/5 rounded-full blur-[60px]" />
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Bite corner effect */}
      <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48">
        <div className="absolute inset-0 bg-cream dark:bg-charcoal-light opacity-10" style={{
          clipPath: "polygon(100% 0, 0 0, 100% 100%)"
        }} />
        <div className="absolute top-4 right-4 w-4 h-4 bg-charcoal rounded-full opacity-20" />
        <div className="absolute top-10 right-10 w-3 h-3 bg-charcoal rounded-full opacity-20" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold leading-[1.1] mb-6"
            >
              <span className="text-gradient">Monster Pizza</span>
              <br />
              <span className="text-cream">Shopping Palace</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl text-cream/70 mb-4 max-w-md mx-auto lg:mx-0"
            >
              Prémiová chuť, poctivé suroviny a rýchla obsluha. Zastav sa u nás v Bratislave.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl font-bold text-monster-green mb-8 max-w-md mx-auto lg:mx-0"
            >
              🌾 Naše cesto neobsahuje lepok!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button size="lg" className="group" asChild>
                <a href="#order">
                  Objednať
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-cream text-cream hover:bg-cream hover:text-charcoal" asChild>
                <a href="#menu">Pozrieť menu</a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Pizza Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 1, type: "spring", stiffness: 100 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px]">
              {/* Pizza placeholder */}
              <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 3, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-[10%] rounded-full shadow-2xl overflow-hidden"
                style={{
                  background: "linear-gradient(145deg, #e8a75c 0%, #d4843b 50%, #c66b20 100%)",
                  boxShadow: "inset 0 -10px 30px rgba(0, 0, 0, 0.3), 0 20px 60px rgba(0, 0, 0, 0.4)"
                }}
              >
                {/* Cheese layer */}
                <div 
                  className="absolute inset-[8%] rounded-full opacity-90"
                  style={{
                    background: "linear-gradient(145deg, #fcd34d 0%, #f59e0b 100%)"
                  }}
                />
                {/* Toppings */}
                <div className="absolute w-[15%] h-[15%] rounded-full bg-tomato top-[20%] left-[25%] shadow-inner" />
                <div className="absolute w-[12%] h-[12%] rounded-full bg-tomato top-[35%] left-[60%] shadow-inner" />
                <div className="absolute w-[14%] h-[14%] rounded-full bg-tomato top-[55%] left-[30%] shadow-inner" />
                <div className="absolute w-[11%] h-[11%] rounded-full bg-tomato top-[65%] left-[55%] shadow-inner" />
                <div className="absolute w-[13%] h-[13%] rounded-full bg-monster-green top-[25%] left-[50%] shadow-inner" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -left-6 md:-left-10 top-10 glass-dark rounded-2xl px-4 py-3 text-cream shadow-xl"
              >
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-monster-green" />
                  <span className="font-semibold">Po–Pi 10:00–20:00</span>
                </div>
                <div className="mt-1 text-xs text-cream/70">So–Ne 11:00–20:00</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="absolute -right-6 md:-right-10 top-20 glass-dark rounded-2xl px-4 py-3 text-cream shadow-xl"
              >
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-monster-green" />
                  <span className="font-semibold">Shopping Palace</span>
                </div>
                <div className="mt-1 text-xs text-cream/70">Bratislava</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute left-1/2 -translate-x-1/2 -bottom-8 glass-dark rounded-2xl px-5 py-3 text-cream shadow-xl"
              >
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-monster-green" />
                  <span className="font-semibold">0918 127 810</span>
                </div>
              </motion.div>

              {/* Shadow */}
              <div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-5 rounded-full blur-xl"
                style={{
                  background: "radial-gradient(ellipse, rgba(0, 0, 0, 0.3) 0%, transparent 70%)"
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-cream/30 flex justify-center pt-2"
        >
          <div className="w-1 h-2 rounded-full bg-cream/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}
