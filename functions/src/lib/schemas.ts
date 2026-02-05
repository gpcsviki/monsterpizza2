import { z } from "zod"

export const OrderStatusSchema = z.enum([
  "NEW",
  "ACCEPTED",
  "PREPARING",
  "READY",
  "OUT_FOR_DELIVERY",
  "COMPLETED",
  "CANCELED",
])

export const FulfillmentSchema = z.enum(["DELIVERY", "PICKUP"])

export const CreateOrderItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1).max(20),
  sizeLabel: z.string().min(1),
  extras: z.array(z.string().min(1)).default([]),
})

export const CreateOrderSchema = z.object({
  fulfillment: FulfillmentSchema,
  customer: z.object({
    name: z.string().min(2),
    phone: z.string().min(6),
    address: z
      .object({
        street: z.string().min(2),
        city: z.string().min(2),
        zip: z.string().min(3),
      })
      .nullable(),
  }),
  note: z.string().max(500).nullable().optional(),
  items: z.array(CreateOrderItemSchema).min(1).max(30),
})

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>
