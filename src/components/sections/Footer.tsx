import { Facebook, Instagram } from "lucide-react"

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/monster.pizza.584294", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/monster_pizza_shoppingpalace", label: "Instagram" },
]

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream py-12">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="font-display font-bold text-2xl mb-2">
              🍕 Monster Pizza
            </div>
            <p className="text-cream/60">
              S láskou a extra syrom. 🧀
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-monster-green hover:text-charcoal transition-all hover:-translate-y-0.5"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 text-center text-cream/50 text-sm">
          <p>© {new Date().getFullYear()} GPCS. Všetky práva vyhradené.</p>
        </div>
      </div>
    </footer>
  )
}
