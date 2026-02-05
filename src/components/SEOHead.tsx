import { useEffect } from "react"

interface SEOHeadProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  ogType?: "website" | "article" | "restaurant"
  keywords?: string[]
  structuredData?: object
}

export function SEOHead({
  title,
  description,
  canonical,
  ogImage = "/og-image.svg",
  ogType = "website",
  keywords = [],
  structuredData,
}: SEOHeadProps) {
  const siteName = "Monster Pizza Bratislava"
  const baseUrl = "https://monsterpizza.sk"
  const fullTitle = `${title} | ${siteName}`
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : undefined

  useEffect(() => {
    // Title
    document.title = fullTitle

    // Helper to set/update meta tags
    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name"
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement
      if (!meta) {
        meta = document.createElement("meta")
        meta.setAttribute(attr, name)
        document.head.appendChild(meta)
      }
      meta.content = content
    }

    // Primary Meta Tags
    setMeta("title", fullTitle)
    setMeta("description", description)
    if (keywords.length > 0) {
      setMeta("keywords", keywords.join(", "))
    }
    setMeta("robots", "index, follow")
    setMeta("googlebot", "index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1")
    setMeta("language", "Slovak")
    setMeta("geo.region", "SK-BL")
    setMeta("geo.placename", "Bratislava")

    // Open Graph
    setMeta("og:type", ogType, true)
    setMeta("og:url", canonicalUrl || baseUrl, true)
    setMeta("og:title", fullTitle, true)
    setMeta("og:description", description, true)
    setMeta("og:image", `${baseUrl}${ogImage}`, true)
    setMeta("og:site_name", siteName, true)
    setMeta("og:locale", "sk_SK", true)

    // Twitter
    setMeta("twitter:card", "summary_large_image", true)
    setMeta("twitter:url", canonicalUrl || baseUrl, true)
    setMeta("twitter:title", fullTitle, true)
    setMeta("twitter:description", description, true)
    setMeta("twitter:image", `${baseUrl}${ogImage}`, true)

    // Canonical URL
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (canonicalUrl) {
      if (!link) {
        link = document.createElement("link")
        link.rel = "canonical"
        document.head.appendChild(link)
      }
      link.href = canonicalUrl
    } else if (link) {
      link.remove()
    }

    // Structured Data
    const existingScript = document.querySelector('script[data-seo="structured-data"]')
    if (existingScript) existingScript.remove()
    
    if (structuredData) {
      const script = document.createElement("script")
      script.type = "application/ld+json"
      script.setAttribute("data-seo", "structured-data")
      script.textContent = JSON.stringify(structuredData)
      document.head.appendChild(script)
    }

    return () => {
      // Cleanup structured data on unmount
      const script = document.querySelector('script[data-seo="structured-data"]')
      if (script) script.remove()
    }
  }, [fullTitle, description, canonical, ogImage, ogType, keywords, structuredData, canonicalUrl, baseUrl, siteName])

  return null
}

// Predefined structured data for the restaurant
export const restaurantStructuredData = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Monster Pizza",
  "image": "https://monsterpizza.sk/og-image.svg",
  "url": "https://monsterpizza.sk",
  "telephone": "+421918127810",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Shopping Palace",
    "addressLocality": "Bratislava",
    "addressRegion": "Bratislavský kraj",
    "postalCode": "851 01",
    "addressCountry": "SK"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.1486,
    "longitude": 17.1077
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "10:00",
      "closes": "20:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday", "Sunday"],
      "opens": "11:00",
      "closes": "20:00"
    }
  ],
  "servesCuisine": ["Pizza", "Italian", "Gluten-Free"],
  "priceRange": "€€",
  "acceptsReservations": "false",
  "menu": "https://monsterpizza.sk/#menu",
  "hasMenu": {
    "@type": "Menu",
    "hasMenuSection": [
      {
        "@type": "MenuSection",
        "name": "Klasiky",
        "hasMenuItem": [
          {
            "@type": "MenuItem",
            "name": "Šunková pizza",
            "description": "Paradajkový základ, mozzarella, šunka",
            "offers": {
              "@type": "Offer",
              "price": "6.90",
              "priceCurrency": "EUR"
            }
          },
          {
            "@type": "MenuItem",
            "name": "Syrová pizza",
            "description": "Paradajkový základ, mozzarella, eidam, niva",
            "offers": {
              "@type": "Offer",
              "price": "6.90",
              "priceCurrency": "EUR"
            }
          }
        ]
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  }
}

// Local business structured data for SEO pages
export function getLocalBusinessData(location: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Monster Pizza - ${location}`,
    "image": "https://monsterpizza.sk/og-image.svg",
    "url": "https://monsterpizza.sk",
    "telephone": "+421918127810",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bratislava",
      "addressRegion": "Bratislavský kraj",
      "addressCountry": "SK"
    },
    "areaServed": {
      "@type": "City",
      "name": location
    },
    "priceRange": "€€",
    "servesCuisine": ["Pizza", "Italian", "Gluten-Free"]
  }
}

// Breadcrumb structured data
export function getBreadcrumbData(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://monsterpizza.sk${item.url}`
    }))
  }
}
