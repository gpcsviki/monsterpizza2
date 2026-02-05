import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type CartItemExtra = {
  id: string
  label: string
  price: number
}

export type CartItem = {
  id: string
  productId: string
  name: string
  description: string
  basePrice: number
  sizeLabel: string
  sizeDelta: number
  extras: CartItemExtra[]
  quantity: number
  imageUrl?: string
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "id">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
}

const CartContext = createContext<CartContextType | null>(null)

const CART_STORAGE_KEY = "monster-pizza-cart"

function generateId() {
  return Math.random().toString(36).substring(2, 15)
}

function loadCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch {
    // ignore
  }
  return []
}

function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  } catch {
    // ignore
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadCart())

  useEffect(() => {
    saveCart(items)
  }, [items])

  const addItem = (item: Omit<CartItem, "id">) => {
    const existingIndex = items.findIndex(
      (i) =>
        i.productId === item.productId &&
        i.sizeLabel === item.sizeLabel &&
        JSON.stringify(i.extras.map((e) => e.id).sort()) ===
          JSON.stringify(item.extras.map((e) => e.id).sort())
    )

    if (existingIndex >= 0) {
      setItems((prev) =>
        prev.map((i, idx) =>
          idx === existingIndex ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      )
    } else {
      setItems((prev) => [...prev, { ...item, id: generateId() }])
    }
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)))
  }

  const clearCart = () => {
    setItems([])
  }

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  const subtotal = items.reduce((sum, i) => {
    const unitPrice = i.basePrice + i.sizeDelta + i.extras.reduce((s, e) => s + e.price, 0)
    return sum + unitPrice * i.quantity
  }, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider")
  }
  return ctx
}
