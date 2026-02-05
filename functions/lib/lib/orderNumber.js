"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextOrderNumber = nextOrderNumber;
const firestore_1 = require("firebase-admin/firestore");
async function nextOrderNumber(db) {
    const counterRef = db.doc("counters/orders");
    const next = await db.runTransaction(async (tx) => {
        const snap = await tx.get(counterRef);
        const current = snap.exists ? snap.data()?.value || 0 : 0;
        const value = current + 1;
        tx.set(counterRef, { value, updatedAt: firestore_1.FieldValue.serverTimestamp() }, { merge: true });
        return value;
    });
    const padded = String(next).padStart(4, "0");
    return `A${padded}`;
}
