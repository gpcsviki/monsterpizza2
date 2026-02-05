"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedProducts = exports.getOrderByTokenCallable = exports.createOrderCallable = exports.registerAdminToken = exports.setAdminClaim = exports.setupFirstAdmin = exports.setOrderStatus = exports.getOrderByToken = exports.createOrder = void 0;
const crypto_1 = __importDefault(require("crypto"));
const https_1 = require("firebase-functions/v2/https");
// import { onDocumentCreated } from "firebase-functions/v2/firestore"
const v2_1 = require("firebase-functions/v2");
const firestore_1 = require("firebase-admin/firestore");
const admin_1 = require("./lib/admin");
const schemas_1 = require("./lib/schemas");
const pricing_1 = require("./lib/pricing");
const orderNumber_1 = require("./lib/orderNumber");
const rateLimit_1 = require("./lib/rateLimit");
(0, v2_1.setGlobalOptions)({ region: "europe-west1" });
function randomPublicToken() {
    return crypto_1.default.randomBytes(18).toString("base64url");
}
exports.createOrder = (0, https_1.onRequest)(async (req, res) => {
    try {
        if (req.method !== "POST") {
            res.status(405).json({ error: "METHOD_NOT_ALLOWED" });
            return;
        }
        const input = schemas_1.CreateOrderSchema.parse(req.body);
        if (input.fulfillment === "DELIVERY" && !input.customer.address) {
            res.status(400).json({ error: "ADDRESS_REQUIRED" });
            return;
        }
        if (input.fulfillment === "PICKUP") {
            input.customer.address = null;
        }
        const db = (0, admin_1.getFirestore)();
        const ip = (0, rateLimit_1.getClientIp)(req);
        const ipHash = (0, rateLimit_1.hashIp)(ip);
        await (0, rateLimit_1.enforceRateLimit)({ db, ipHash, windowSeconds: 60, maxInWindow: 6 });
        const settingsSnap = await db.doc("settings/global").get();
        const packagingFee = settingsSnap.data()?.packagingFee ?? 0;
        const deliveryFee = 0;
        const uniqueProductIds = Array.from(new Set(input.items.map((i) => i.productId)));
        const productSnaps = await Promise.all(uniqueProductIds.map((id) => db.doc(`products/${id}`).get()));
        const productsById = {};
        for (const snap of productSnaps) {
            if (!snap.exists)
                continue;
            productsById[snap.id] = snap.data();
        }
        const { items, pricing } = (0, pricing_1.computeOrderPricing)({
            input,
            productsById,
            deliveryFee,
            packagingFee,
        });
        const orderNumber = await (0, orderNumber_1.nextOrderNumber)(db);
        const publicToken = randomPublicToken();
        const now = firestore_1.FieldValue.serverTimestamp();
        const orderRef = db.collection("orders").doc();
        await orderRef.set({
            orderNumber,
            status: "NEW",
            fulfillment: input.fulfillment,
            customer: {
                name: input.customer.name,
                phone: input.customer.phone,
                address: input.customer.address,
            },
            note: input.note ?? null,
            items,
            pricing,
            createdAt: now,
            updatedAt: now,
            statusHistory: [{ status: "NEW", at: now, byUid: null }],
            publicToken,
            clientMeta: {
                ipHash,
                userAgent: req.headers["user-agent"] || null,
            },
        });
        res.status(200).json({ orderId: orderRef.id, orderNumber, publicToken });
    }
    catch (e) {
        const message = e?.message || "UNKNOWN";
        res.status(400).json({ error: message });
    }
});
exports.getOrderByToken = (0, https_1.onRequest)(async (req, res) => {
    try {
        if (req.method !== "GET") {
            res.status(405).json({ error: "METHOD_NOT_ALLOWED" });
            return;
        }
        const orderId = String(req.query.orderId || "");
        const token = String(req.query.t || "");
        if (!orderId || !token) {
            res.status(400).json({ error: "MISSING_PARAMS" });
            return;
        }
        const db = (0, admin_1.getFirestore)();
        const snap = await db.doc(`orders/${orderId}`).get();
        if (!snap.exists) {
            res.status(404).json({ error: "NOT_FOUND" });
            return;
        }
        const data = snap.data();
        if (data.publicToken !== token) {
            res.status(403).json({ error: "FORBIDDEN" });
            return;
        }
        res.status(200).json({
            orderId: snap.id,
            orderNumber: data.orderNumber,
            status: data.status,
            fulfillment: data.fulfillment,
            customer: data.customer,
            note: data.note,
            items: data.items,
            pricing: data.pricing,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        });
    }
    catch (e) {
        res.status(400).json({ error: e?.message || "UNKNOWN" });
    }
});
exports.setOrderStatus = (0, https_1.onCall)(async (request) => {
    const uid = request.auth?.uid;
    const isAdmin = request.auth?.token?.admin === true;
    if (!uid || !isAdmin) {
        throw new https_1.HttpsError("permission-denied", "ADMIN_REQUIRED");
    }
    const payload = request.data;
    const orderId = String(payload.orderId || "");
    const status = schemas_1.OrderStatusSchema.parse(payload.status);
    const db = (0, admin_1.getFirestore)();
    const ref = db.doc(`orders/${orderId}`);
    await db.runTransaction(async (tx) => {
        const snap = await tx.get(ref);
        if (!snap.exists) {
            throw new https_1.HttpsError("not-found", "ORDER_NOT_FOUND");
        }
        tx.update(ref, {
            status,
            updatedAt: firestore_1.FieldValue.serverTimestamp(),
            statusHistory: firestore_1.FieldValue.arrayUnion({
                status,
                at: new Date(),
                byUid: uid,
            }),
        });
    });
    return { ok: true };
});
// First-time setup: set admin claim for a user by email (no auth required for first admin)
exports.setupFirstAdmin = (0, https_1.onCall)(async (request) => {
    const db = (0, admin_1.getFirestore)();
    const auth = (0, admin_1.getAuth)();
    // Check if any admin already exists
    const usersWithAdmin = await auth.listUsers(10);
    const hasAdmin = usersWithAdmin.users.some((u) => u.customClaims?.admin === true);
    if (hasAdmin) {
        throw new https_1.HttpsError("already-exists", "Admin already exists. Use setAdminClaim instead.");
    }
    const payload = request.data;
    const email = String(payload.email || "");
    if (!email) {
        throw new https_1.HttpsError("invalid-argument", "MISSING_EMAIL");
    }
    const user = await auth.getUserByEmail(email);
    await auth.setCustomUserClaims(user.uid, { admin: true });
    return { ok: true, uid: user.uid, email };
});
exports.setAdminClaim = (0, https_1.onCall)(async (request) => {
    const callerIsAdmin = request.auth?.token?.admin === true;
    if (!callerIsAdmin) {
        throw new https_1.HttpsError("permission-denied", "ADMIN_REQUIRED");
    }
    const payload = request.data;
    const auth = (0, admin_1.getAuth)();
    const targetUid = payload.uid
        ? String(payload.uid)
        : payload.email
            ? (await auth.getUserByEmail(String(payload.email))).uid
            : "";
    if (!targetUid) {
        throw new https_1.HttpsError("invalid-argument", "MISSING_UID_OR_EMAIL");
    }
    await auth.setCustomUserClaims(targetUid, { admin: true });
    return { ok: true, uid: targetUid };
});
exports.registerAdminToken = (0, https_1.onCall)(async (request) => {
    const uid = request.auth?.uid;
    const isAdmin = request.auth?.token?.admin === true;
    if (!uid || !isAdmin) {
        throw new https_1.HttpsError("permission-denied", "ADMIN_REQUIRED");
    }
    const payload = request.data;
    const fcmToken = String(payload.fcmToken || "");
    if (!fcmToken) {
        throw new https_1.HttpsError("invalid-argument", "MISSING_FCM_TOKEN");
    }
    const db = (0, admin_1.getFirestore)();
    const tokenId = crypto_1.default.createHash("sha256").update(`${uid}:${fcmToken}`).digest("hex");
    await db.doc(`adminTokens/${tokenId}`).set({
        uid,
        fcmToken,
        userAgent: payload.userAgent || null,
        createdAt: firestore_1.FieldValue.serverTimestamp(),
        lastSeenAt: firestore_1.FieldValue.serverTimestamp(),
    }, { merge: true });
    return { ok: true };
});
exports.createOrderCallable = (0, https_1.onCall)(async (request) => {
    const input = schemas_1.CreateOrderSchema.parse(request.data);
    if (input.fulfillment === "DELIVERY" && !input.customer.address) {
        throw new https_1.HttpsError("invalid-argument", "ADDRESS_REQUIRED");
    }
    if (input.fulfillment === "PICKUP") {
        input.customer.address = null;
    }
    const db = (0, admin_1.getFirestore)();
    const deliveryFee = 0;
    const packagingFee = 0; // Balné odstránené
    const uniqueProductIds = Array.from(new Set(input.items.map((i) => i.productId)));
    const productSnaps = await Promise.all(uniqueProductIds.map((id) => db.doc(`products/${id}`).get()));
    const productsById = {};
    for (const snap of productSnaps) {
        if (!snap.exists)
            continue;
        productsById[snap.id] = snap.data();
    }
    const { items, pricing } = (0, pricing_1.computeOrderPricing)({
        input,
        productsById,
        deliveryFee,
        packagingFee,
    });
    const orderNumber = await (0, orderNumber_1.nextOrderNumber)(db);
    const publicToken = randomPublicToken();
    const now = new Date();
    const orderRef = db.collection("orders").doc();
    // Slovak tax compliance: DPH 23% (cena už obsahuje DPH)
    const vatRate = 0.23;
    const netAmount = pricing.total / (1 + vatRate);
    const vatAmount = pricing.total - netAmount;
    await orderRef.set({
        orderNumber,
        status: "NEW",
        fulfillment: input.fulfillment,
        customer: {
            name: input.customer.name,
            phone: input.customer.phone,
            address: input.customer.address,
        },
        note: input.note ?? null,
        items,
        pricing: {
            ...pricing,
            vatRate,
            netAmount: Math.round(netAmount * 100) / 100,
            vatAmount: Math.round(vatAmount * 100) / 100,
        },
        // Slovak business info
        businessInfo: {
            companyName: "Monster Pizza s.r.o.",
            ico: "12345678",
            dic: "2012345678",
            icDph: "SK2012345678",
            address: "Hlavná 1, 811 01 Bratislava",
        },
        createdAt: now,
        updatedAt: now,
        statusHistory: [{ status: "NEW", at: now, byUid: null }],
        publicToken,
        clientMeta: {
            userAgent: request.rawRequest?.headers?.["user-agent"] || null,
        },
    });
    // Send push notification to admins
    try {
        const tokensSnap = await db.collection("adminTokens").get();
        const tokens = tokensSnap.docs.map((d) => d.data()?.fcmToken).filter(Boolean);
        if (tokens.length > 0) {
            const messaging = (0, admin_1.getMessaging)();
            await messaging.sendEachForMulticast({
                tokens,
                notification: {
                    title: "🍕 Nová objednávka!",
                    body: `Objednávka ${orderNumber} • ${pricing.total.toFixed(2)} €`,
                },
                data: {
                    orderId: orderRef.id,
                    orderNumber,
                },
            });
        }
    }
    catch (fcmError) {
        // Don't fail order creation if FCM fails
        console.error("FCM error:", fcmError);
    }
    return { orderId: orderRef.id, orderNumber, publicToken };
});
exports.getOrderByTokenCallable = (0, https_1.onCall)(async (request) => {
    const payload = request.data;
    const orderId = String(payload.orderId || "");
    const token = String(payload.token || "");
    if (!orderId || !token) {
        throw new https_1.HttpsError("invalid-argument", "MISSING_PARAMS");
    }
    const db = (0, admin_1.getFirestore)();
    const snap = await db.doc(`orders/${orderId}`).get();
    if (!snap.exists) {
        throw new https_1.HttpsError("not-found", "NOT_FOUND");
    }
    const data = snap.data();
    if (data.publicToken !== token) {
        throw new https_1.HttpsError("permission-denied", "FORBIDDEN");
    }
    return {
        orderId: snap.id,
        orderNumber: data.orderNumber,
        status: data.status,
        fulfillment: data.fulfillment,
        customer: data.customer,
        note: data.note,
        items: data.items,
        pricing: data.pricing,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
    };
});
// Seed products - one-time use, delete after seeding
exports.seedProducts = (0, https_1.onCall)(async () => {
    const db = (0, admin_1.getFirestore)();
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
            id: "hawai",
            name: "Hawai",
            description: "Paradajkový základ, mozzarella, šunka, ananás",
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
            id: "salami",
            name: "Salámová",
            description: "Paradajkový základ, mozzarella, saláma",
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
    ];
    const batch = db.batch();
    for (const product of products) {
        const { id, ...data } = product;
        batch.set(db.doc(`products/${id}`), data);
    }
    batch.set(db.doc("settings/global"), {
        packagingFee: 0.5,
        deliveryFee: 0,
        orderNumberPrefix: "A",
        lastOrderNumber: 0,
    });
    await batch.commit();
    return { ok: true, productsCount: products.length };
});
// Firestore trigger temporarily disabled due to eventarc IAM issues
// export const onOrderCreated = onDocumentCreated("orders/{orderId}", async (event) => {
//   const data = event.data?.data() as any
//   if (!data || data.status !== "NEW") return
//
//   const db = getFirestore()
//   const tokensSnap = await db.collection("adminTokens").get()
//   const tokens = tokensSnap.docs.map((d) => d.data()?.fcmToken).filter(Boolean)
//
//   if (tokens.length === 0) return
//
//   const messaging = getMessaging()
//   await messaging.sendEachForMulticast({
//     tokens,
//     notification: {
//       title: "Nová objednávka",
//       body: `Objednávka ${data.orderNumber} • ${data.pricing?.total ?? ""} €`,
//     },
//     data: {
//       orderId: event.params.orderId,
//     },
//   })
// })
