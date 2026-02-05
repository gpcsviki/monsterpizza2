import { FieldValue, Firestore } from "firebase-admin/firestore"

export async function nextOrderNumber(db: Firestore) {
  const counterRef = db.doc("counters/orders")

  const next = await db.runTransaction(async (tx) => {
    const snap = await tx.get(counterRef)
    const current = snap.exists ? (snap.data()?.value as number) || 0 : 0
    const value = current + 1
    tx.set(counterRef, { value, updatedAt: FieldValue.serverTimestamp() }, { merge: true })
    return value
  })

  const padded = String(next).padStart(4, "0")
  return `A${padded}`
}
