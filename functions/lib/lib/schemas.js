"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderSchema = exports.CreateOrderItemSchema = exports.FulfillmentSchema = exports.OrderStatusSchema = void 0;
const zod_1 = require("zod");
exports.OrderStatusSchema = zod_1.z.enum([
    "NEW",
    "ACCEPTED",
    "PREPARING",
    "READY",
    "OUT_FOR_DELIVERY",
    "COMPLETED",
    "CANCELED",
]);
exports.FulfillmentSchema = zod_1.z.enum(["DELIVERY", "PICKUP"]);
exports.CreateOrderItemSchema = zod_1.z.object({
    productId: zod_1.z.string().min(1),
    quantity: zod_1.z.number().int().min(1).max(20),
    sizeLabel: zod_1.z.string().min(1),
    extras: zod_1.z.array(zod_1.z.string().min(1)).default([]),
});
exports.CreateOrderSchema = zod_1.z.object({
    fulfillment: exports.FulfillmentSchema,
    customer: zod_1.z.object({
        name: zod_1.z.string().min(2),
        phone: zod_1.z.string().min(6),
        address: zod_1.z
            .object({
            street: zod_1.z.string().min(2),
            city: zod_1.z.string().min(2),
            zip: zod_1.z.string().min(3),
        })
            .nullable(),
    }),
    note: zod_1.z.string().max(500).nullable().optional(),
    items: zod_1.z.array(exports.CreateOrderItemSchema).min(1).max(30),
});
