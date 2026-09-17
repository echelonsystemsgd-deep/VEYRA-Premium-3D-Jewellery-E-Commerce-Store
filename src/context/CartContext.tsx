import React, { createContext, useContext, useState, useEffect } from 'react'
import { Product, MaterialType } from '../data/products'

export interface CartItem {
  id: string
  product: Product
  material: MaterialType
  size: number
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product, material: MaterialType, size: number) => void
  removeFromCart: (index: number) => void
  updateQuantity: (index: number, quantity: number) => void
  clearCart: () => void
  cartCount: number
  cartSubtotal: number
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  activeModalProduct: Product | null
  activeModalInitialMaterial?: MaterialType
  setActiveModalProduct: (product: Product | null, initialMaterial?: MaterialType) => void
  isPrivateViewingOpen: boolean
  setIsPrivateViewingOpen: (open: boolean) => void
  selectedPrivateViewingProduct: Product | null
  openPrivateViewing: (product?: Product | null) => void
  isSizingOpen: boolean
  setIsSizingOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const local = localStorage.getItem('veyra_cart')
      return local ? JSON.parse(local) : []
    } catch {
      return []
    }
  })

  const [isCartOpen, setIsCartOpen] = useState(false)
  const [activeModalProduct, setActiveModalProductState] = useState<Product | null>(null)
  const [activeModalInitialMaterial, setActiveModalInitialMaterial] = useState<MaterialType | undefined>(undefined)
  const [isPrivateViewingOpen, setIsPrivateViewingOpen] = useState(false)
  const [selectedPrivateViewingProduct, setSelectedPrivateViewingProduct] = useState<Product | null>(null)
  const [isSizingOpen, setIsSizingOpen] = useState(false)

  const setActiveModalProduct = (product: Product | null, initialMaterial?: MaterialType) => {
    setActiveModalProductState(product)
    setActiveModalInitialMaterial(initialMaterial)
  }

  useEffect(() => {
    try {
      localStorage.setItem('veyra_cart', JSON.stringify(cart))
    } catch (e) {
      console.warn('Failed to persist cart:', e)
    }
  }, [cart])

  // Freeze background scrolling and pause Lenis whenever any modal/drawer is open
  const isAnyModalOpen = Boolean(activeModalProduct || isCartOpen || isPrivateViewingOpen || isSizingOpen)

  useEffect(() => {
    const lenis = (window as any).__lenisInstance
    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      lenis?.stop()
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      lenis?.start()
    }
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      lenis?.start()
    }
  }, [isAnyModalOpen])

  const addToCart = (product: Product, material: MaterialType, size: number) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.material === material && item.size === size
      )
      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex].quantity += 1
        return updated
      } else {
        return [...prev, {
          id: `${product.id}-${material}-${size}-${Date.now()}`,
          product,
          material,
          size,
          quantity: 1
        }]
      }
    })
    setIsCartOpen(true)
  }

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index))
  }

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index)
      return
    }
    setCart(prev => {
      const updated = [...prev]
      updated[index].quantity = quantity
      return updated
    })
  }

  const clearCart = () => setCart([])

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  const openPrivateViewing = (product?: Product | null) => {
    setSelectedPrivateViewingProduct(product || null)
    setIsPrivateViewingOpen(true)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        activeModalProduct,
        activeModalInitialMaterial,
        setActiveModalProduct,
        isPrivateViewingOpen,
        setIsPrivateViewingOpen,
        selectedPrivateViewingProduct,
        openPrivateViewing,
        isSizingOpen,
        setIsSizingOpen
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
