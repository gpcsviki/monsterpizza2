import crypto from "crypto"
import type { Request } from "firebase-functions/v2/https"
import { FieldValue, Firestore } from "firebase-admin/firestore"

export function hashIp(ip: string) {
  return crypto.createHash("sha256").update(ip).digest("hex")
}

export function getClientIp(req: Request) {
  const forwarded = (req.headers["x-forwarded-for"] as string | undefined) || ""
  const ip = forwarded.split(",")[0]?.trim() || req.ip || ""
  return ip
}

export async function enforceRateLimit(params: {
  db: Firestore
  ipHash: string
  windowSeconds: number
  maxInWindow: number
}) {
  const { db, ipHash, windowSeconds, maxInWindow } = params
  const bucket = Math.floor(Date.now() / 1000 / windowSeconds)
  const ref = db.doc(`rateLimits/createOrder_${ipHash}_${bucket}`)

  const result = await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref)
    const count = snap.exists ? (snap.data()?.count as number) || 0 : 0
    const next = count + 1
    tx.set(
      ref,
      {
        count: next,
        createdAt: snap.exists ? snap.data()?.createdAt : FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
        ipHash,
      },
      { merge: true }
    )
    return next
  })

  if (result > maxInWindow) {
    const err = new Error("RATE_LIMITED")
    ;(err as any).code = "resource-exhausted"
    throw err
  }
}
