/**
 * Seed script pre demo produkty do Firestore
 * Spustenie: npx ts-node scripts/seed-products.ts
 * Alebo: node --loader ts-node/esm scripts/seed-products.ts
 * 
 * Pred spustením:
 * 1. Nainštaluj: npm install -D ts-node
 * 2. Nastav GOOGLE_APPLICATION_CREDENTIALS na cestu k service account JSON
 *    alebo spusti v prostredí s Firebase Admin SDK prístupom
 */

import { initializeApp, cert, type ServiceAccount } from "firebase-admin/app"
import { getFirestore, FieldValue } from "firebase-admin/firestore"

// Ak máš service account JSON, nastav cestu tu alebo cez env
const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS

if (serviceAccountPath) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const serviceAccount = require(serviceAccountPath) as ServiceAccount
  initializeApp({ credential: cert(serviceAccount) })
} else {
  // Použije default credentials (napr. gcloud auth)
  initializeApp({ projectId: "monsterpizza" })
}

const db = getFirestore()

const products = [
  {
    id: "sunkova",
    name: "Šunková",
    description: "Paradajkový základ, mozzarella, šunka",
    basePrice: 6.9,
    imageUrl: "",
    allergens: ["lepok", "mlieko"],
    isActive: true,
    sizes: [
      { label: "Štandardná", priceDelta: 0 },
      { label: "Veľká", priceDelta: 2 },
    ],
    extras: [
      { id: "extra-cheese", label: "Extra syr", price: 1 },
      { id: "chili", label: "Chilli vločky", price: 0 },
      { id: "garlic-dip", label: "Cesnakový dip", price: 0.5 },
    ],
  },
  {
    id: "syrova",
    name: "Syrová",
    description: "Paradajkový základ, mozzarella, eidam, niva",
    basePrice: 6.9,
    imageUrl: "",
    allergens: ["lepok", "mlieko"],
    isActive: true,
    sizes: [
      { label: "Štandardná", priceDelta: 0 },
      { label: "Veľká", priceDelta: 2 },
    ],
    extras: [
      { id: "extra-cheese", label: "Extra syr", price: 1 },
      { id: "chili", label: "Chilli vločky", price: 0 },
      { id: "garlic-dip", label: "Cesnakový dip", price: 0.5 },
    ],
  },
  {
    id: "salamova",
    name: "Salámová",
    description: "Paradajkový základ, mozzarella, saláma",
    basePrice: 6.9,
    imageUrl: "",
    allergens: ["lepok", "mlieko"],
    isActive: true,
    sizes: [
      { label: "Štandardná", priceDelta: 0 },
      { label: "Veľká", priceDelta: 2 },
    ],
    extras: [
      { id: "extra-cheese", label: "Extra syr", price: 1 },
      { id: "chili", label: "Chilli vločky", price: 0 },
      { id: "garlic-dip", label: "Cesnakový dip", price: 0.5 },
    ],
  },
  {
    id: "sunka-sampinony",
    name: "Šunka + Šampiňóny",
    description: "Paradajkový základ, mozzarella, šunka, čerstvé šampiňóny",
    basePrice: 7.9,
    imageUrl: "",
    allergens: ["lepok", "mlieko"],
    isActive: true,
    sizes: [
      { label: "Štandardná", priceDelta: 0 },
      { label: "Veľká", priceDelta: 2 },
    ],
    extras: [
      { id: "extra-cheese", label: "Extra syr", price: 1 },
      { id: "chili", label: "Chilli vločky", price: 0 },
      { id: "garlic-dip", label: "Cesnakový dip", price: 0.5 },
    ],
  },
  {
    id: "sunka-kukurica",
    name: "Šunka + Kukurica",
    description: "Paradajkový základ, mozzarella, šunka, sladká kukurica",
    basePrice: 7.9,
    imageUrl: "",
    allergens: ["lepok", "mlieko"],
    isActive: true,
    sizes: [
      { label: "Štandardná", priceDelta: 0 },
      { label: "Veľká", priceDelta: 2 },
    ],
    extras: [
      { id: "extra-cheese", label: "Extra syr", price: 1 },
      { id: "chili", label: "Chilli vločky", price: 0 },
      { id: "garlic-dip", label: "Cesnakový dip", price: 0.5 },
    ],
  },
  {
    id: "monster-mix",
    name: "Monster Mix",
    description: "Paradajkový základ, mozzarella, šunka, saláma, syr, olivy",
    basePrice: 8.9,
    imageUrl: "",
    allergens: ["lepok", "mlieko"],
    isActive: true,
    sizes: [
      { label: "Štandardná", priceDelta: 0 },
      { label: "Veľká", priceDelta: 2 },
    ],
    extras: [
      { id: "extra-cheese", label: "Extra syr", price: 1 },
      { id: "chili", label: "Chilli vločky", price: 0 },
      { id: "garlic-dip", label: "Cesnakový dip", price: 0.5 },
    ],
  },
  {
    id: "margherita",
    name: "Margherita",
    description: "Paradajkový základ, čerstvá mozzarella, bazalka",
    basePrice: 6.9,
    imageUrl: "",
    allergens: ["lepok", "mlieko"],
    isActive: true,
    sizes: [
      { label: "Štandardná", priceDelta: 0 },
      { label: "Veľká", priceDelta: 2 },
    ],
    extras: [
      { id: "extra-cheese", label: "Extra syr", price: 1 },
      { id: "chili", label: "Chilli vločky", price: 0 },
      { id: "garlic-dip", label: "Cesnakový dip", price: 0.5 },
    ],
  },
  {
    id: "sampinonova",
    name: "Šampiňónová",
    description: "Smotanový základ, mozzarella, čerstvé šampiňóny",
    basePrice: 7.5,
    imageUrl: "",
    allergens: ["lepok", "mlieko"],
    isActive: true,
    sizes: [
      { label: "Štandardná", priceDelta: 0 },
      { label: "Veľká", priceDelta: 2 },
    ],
    extras: [
      { id: "extra-cheese", label: "Extra syr", price: 1 },
      { id: "chili", label: "Chilli vločky", price: 0 },
      { id: "garlic-dip", label: "Cesnakový dip", price: 0.5 },
    ],
  },
  {
    id: "vegetarian",
    name: "Vegetarián",
    description: "Paradajkový základ, mozzarella, paprika, kukurica, olivy",
    basePrice: 7.9,
    imageUrl: "",
    allergens: ["lepok", "mlieko"],
    isActive: true,
    sizes: [
      { label: "Štandardná", priceDelta: 0 },
      { label: "Veľká", priceDelta: 2 },
    ],
    extras: [
      { id: "extra-cheese", label: "Extra syr", price: 1 },
      { id: "chili", label: "Chilli vločky", price: 0 },
      { id: "garlic-dip", label: "Cesnakový dip", price: 0.5 },
    ],
  },
]

async function seed() {
  console.log("Seeding products...")

  const batch = db.batch()
  const now = FieldValue.serverTimestamp()

  for (const product of products) {
    const { id, ...data } = product
    const ref = db.collection("products").doc(id)
    batch.set(ref, { ...data, createdAt: now, updatedAt: now })
  }

  // Global settings
  batch.set(db.doc("settings/global"), {
    packagingFee: 0,
    deliveryZones: [
      { name: "Bratislava centrum", zipPrefixes: ["811", "812", "813"], fee: 0 },
      { name: "Bratislava širšie", zipPrefixes: ["821", "831", "841", "851"], fee: 2 },
    ],
  })

  await batch.commit()
  console.log(`Seeded ${products.length} products and global settings.`)
}

seed().catch(console.error)
