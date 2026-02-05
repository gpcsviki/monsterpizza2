/**
 * Lokálny mock server pre testovanie objednávok
 * Spustenie: node server.cjs
 */

const http = require("http")
const crypto = require("crypto")

const orders = new Map()
let orderCounter = 1

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
    res.writeHead(200)
    res.end()
    return
  }

  const url = new URL(req.url, `http://${req.headers.host}`)

  // createOrder
  if (url.pathname === "/api/createOrder" && req.method === "POST") {
    let body = ""
    req.on("data", (chunk) => (body += chunk))
    req.on("end", () => {
      try {
        const data = JSON.parse(body)
        const orderId = crypto.randomUUID()
        const publicToken = crypto.randomBytes(18).toString("base64url")
        const orderNumber = `A${String(orderCounter++).padStart(4, "0")}`

        const order = {
          orderId,
          orderNumber,
          publicToken,
          status: "NEW",
          fulfillment: data.fulfillment,
          customer: data.customer,
          note: data.note,
          items: data.items.map((item) => ({
            productId: item.productId,
            nameSnapshot: item.productId,
            sizeLabel: item.sizeLabel || "Štandardná",
            extras: [],
            quantity: item.quantity,
            unitPrice: 6.9,
            lineTotal: 6.9 * item.quantity,
          })),
          pricing: {
            subtotal: data.items.reduce((sum, i) => sum + 6.9 * i.quantity, 0),
            deliveryFee: 0,
            packagingFee: 0,
            total: data.items.reduce((sum, i) => sum + 6.9 * i.quantity, 0),
            currency: "EUR",
          },
          createdAt: new Date().toISOString(),
        }

        orders.set(orderId, order)

        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ orderId, orderNumber, publicToken }))
      } catch (e) {
        res.writeHead(400, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ error: e.message }))
      }
    })
    return
  }

  // getOrderByToken
  if (url.pathname === "/api/getOrderByToken" && req.method === "GET") {
    const orderId = url.searchParams.get("orderId")
    const token = url.searchParams.get("t")

    const order = orders.get(orderId)
    if (!order) {
      res.writeHead(404, { "Content-Type": "application/json" })
      res.end(JSON.stringify({ error: "NOT_FOUND" }))
      return
    }

    if (order.publicToken !== token) {
      res.writeHead(403, { "Content-Type": "application/json" })
      res.end(JSON.stringify({ error: "FORBIDDEN" }))
      return
    }

    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(JSON.stringify(order))
    return
  }

  // 404
  res.writeHead(404, { "Content-Type": "application/json" })
  res.end(JSON.stringify({ error: "NOT_FOUND" }))
})

const PORT = 5002
server.listen(PORT, () => {
  console.log(`Mock API server running at http://127.0.0.1:${PORT}`)
  console.log("Endpoints:")
  console.log("  POST /api/createOrder")
  console.log("  GET  /api/getOrderByToken?orderId=...&t=...")
})
