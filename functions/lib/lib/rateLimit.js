"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashIp = hashIp;
exports.getClientIp = getClientIp;
exports.enforceRateLimit = enforceRateLimit;
const crypto_1 = __importDefault(require("crypto"));
const firestore_1 = require("firebase-admin/firestore");
function hashIp(ip) {
    return crypto_1.default.createHash("sha256").update(ip).digest("hex");
}
function getClientIp(req) {
    const forwarded = req.headers["x-forwarded-for"] || "";
    const ip = forwarded.split(",")[0]?.trim() || req.ip || "";
    return ip;
}
async function enforceRateLimit(params) {
    const { db, ipHash, windowSeconds, maxInWindow } = params;
    const bucket = Math.floor(Date.now() / 1000 / windowSeconds);
    const ref = db.doc(`rateLimits/createOrder_${ipHash}_${bucket}`);
    const result = await db.runTransaction(async (tx) => {
        const snap = await tx.get(ref);
        const count = snap.exists ? snap.data()?.count || 0 : 0;
        const next = count + 1;
        tx.set(ref, {
            count: next,
            createdAt: snap.exists ? snap.data()?.createdAt : firestore_1.FieldValue.serverTimestamp(),
            updatedAt: firestore_1.FieldValue.serverTimestamp(),
            ipHash,
        }, { merge: true });
        return next;
    });
    if (result > maxInWindow) {
        const err = new Error("RATE_LIMITED");
        err.code = "resource-exhausted";
        throw err;
    }
}
