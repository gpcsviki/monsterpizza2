"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roundMoney = roundMoney;
exports.computeOrderPricing = computeOrderPricing;
function roundMoney(value) {
    return Math.round(value * 100) / 100;
}
function computeOrderPricing(params) {
    const { input, productsById, deliveryFee, packagingFee } = params;
    const items = input.items.map((raw) => {
        const product = productsById[raw.productId];
        if (!product) {
            throw new Error(`PRODUCT_NOT_FOUND:${raw.productId}`);
        }
        if (!product.isActive) {
            throw new Error(`PRODUCT_INACTIVE:${raw.productId}`);
        }
        const size = product.sizes.find((s) => s.label === raw.sizeLabel);
        if (!size) {
            throw new Error(`SIZE_NOT_FOUND:${raw.productId}:${raw.sizeLabel}`);
        }
        const extras = raw.extras
            .map((id) => product.extras.find((e) => e.id === id))
            .filter(Boolean)
            .map((e) => ({ id: e.id, label: e.label, price: e.price }));
        if (extras.length !== raw.extras.length) {
            throw new Error(`EXTRA_NOT_FOUND:${raw.productId}`);
        }
        const unitPrice = roundMoney(product.basePrice + size.priceDelta + extras.reduce((sum, e) => sum + e.price, 0));
        const lineTotal = roundMoney(unitPrice * raw.quantity);
        return {
            productId: raw.productId,
            nameSnapshot: product.name,
            sizeLabel: size.label,
            sizeDelta: size.priceDelta,
            extras,
            quantity: raw.quantity,
            unitPrice,
            lineTotal,
        };
    });
    const subtotal = roundMoney(items.reduce((sum, i) => sum + i.lineTotal, 0));
    const appliedDeliveryFee = input.fulfillment === "DELIVERY" ? deliveryFee : 0;
    const total = roundMoney(subtotal + appliedDeliveryFee + packagingFee);
    return {
        items,
        pricing: {
            subtotal,
            deliveryFee: appliedDeliveryFee,
            packagingFee,
            total,
            currency: "EUR",
        },
    };
}
