/**
 * Reactive Shopping Cart State Store
 * Amazon Storefront Clone
 * Supports localStorage persistence, custom event dispatching, and multi-tab synchronization.
 */

const STORAGE_KEY = "amazon_clone_cart_v1";
const FREE_SHIPPING_THRESHOLD = 499;
const STANDARD_SHIPPING_FEE = 40;

class CartStore {
  constructor(storage = (typeof window !== "undefined" && window.localStorage ? window.localStorage : null)) {
    this.storage = storage;
    this.items = this.load();
    this.listeners = new Set();

    if (typeof window !== "undefined") {
      window.addEventListener("storage", (e) => {
        if (e.key === STORAGE_KEY) {
          this.items = this.load();
          this.notify();
        }
      });
    }
  }

  load() {
    if (!this.storage) return [];
    try {
      const data = this.storage.getItem(STORAGE_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(item =>
        item &&
        item.product &&
        typeof item.product.id === "string" &&
        item.product.id.length > 0 &&
        typeof item.product.price === "number" &&
        !isNaN(item.product.price) &&
        typeof item.quantity === "number" &&
        !isNaN(item.quantity) &&
        item.quantity > 0
      ).map(item => ({
        ...item,
        quantity: Math.min(99, Math.max(1, Math.floor(item.quantity)))
      }));
    } catch (err) {
      if (typeof process === "undefined" || !process.env || process.env.NODE_ENV !== "test") {
        console.warn("Failed to read cart from storage:", err);
      }
      return [];
    }
  }

  save() {
    if (!this.storage) return;
    try {
      this.storage.setItem(STORAGE_KEY, JSON.stringify(this.items));
    } catch (err) {
      console.warn("Failed to save cart to storage:", err);
    }
  }

  notify(action = "update", payload = null) {
    this.listeners.forEach((listener) => {
      try {
        listener(this.getState(), action, payload);
      } catch (err) {
        console.error("Cart listener error:", err);
      }
    });

    if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") {
      window.dispatchEvent(
        new CustomEvent("cart:updated", {
          detail: { state: this.getState(), action, payload }
        })
      );
    }
  }

  subscribe(listener) {
    if (typeof listener !== "function") return () => {};
    this.listeners.add(listener);
    // Immediately call listener with current state
    listener(this.getState(), "init", null);
    return () => this.listeners.delete(listener);
  }

  addItem(product, quantity = 1) {
    if (!product || !product.id) {
      throw new Error("Invalid product provided to addItem");
    }
    const qty = Math.min(99, Math.max(1, parseInt(quantity, 10) || 1));
    const existingIndex = this.items.findIndex(item => item.product.id === product.id);

    if (existingIndex > -1) {
      this.items[existingIndex].quantity = Math.min(99, this.items[existingIndex].quantity + qty);
    } else {
      this.items.push({
        product: {
          id: product.id,
          title: product.title,
          price: product.price,
          originalPrice: product.originalPrice || product.price,
          image: product.image,
          category: product.category,
          brand: product.brand
        },
        quantity: qty,
        addedAt: Date.now()
      });
    }

    this.save();
    this.notify("add", { product, quantity: qty });
    return this.getState();
  }

  updateQuantity(productId, quantity) {
    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) {
      return this.removeItem(productId);
    }

    const item = this.items.find(i => i.product.id === productId);
    if (item) {
      item.quantity = Math.min(99, Math.max(1, qty));
      this.save();
      this.notify("update_quantity", { productId, quantity: item.quantity });
    }
    return this.getState();
  }

  removeItem(productId) {
    const index = this.items.findIndex(i => i.product.id === productId);
    if (index > -1) {
      const removed = this.items.splice(index, 1)[0];
      this.save();
      this.notify("remove", { product: removed.product });
    }
    return this.getState();
  }

  clearCart() {
    this.items = [];
    this.save();
    this.notify("clear", null);
    return this.getState();
  }

  getItems() {
    return [...this.items];
  }

  getItemCount() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getSubtotal() {
    return this.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  getOriginalSubtotal() {
    return this.items.reduce((total, item) => total + ((item.product.originalPrice || item.product.price) * item.quantity), 0);
  }

  getSavings() {
    const savings = this.getOriginalSubtotal() - this.getSubtotal();
    return Math.max(0, savings);
  }

  getShippingFee() {
    const subtotal = this.getSubtotal();
    if (subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD) {
      return 0;
    }
    return STANDARD_SHIPPING_FEE;
  }

  getFreeShippingThreshold() {
    return FREE_SHIPPING_THRESHOLD;
  }

  getAmountNeededForFreeShipping() {
    const subtotal = this.getSubtotal();
    if (subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD) {
      return 0;
    }
    return FREE_SHIPPING_THRESHOLD - subtotal;
  }

  getTotal() {
    return this.getSubtotal() + this.getShippingFee();
  }

  getState() {
    return {
      items: this.getItems(),
      itemCount: this.getItemCount(),
      subtotal: this.getSubtotal(),
      originalSubtotal: this.getOriginalSubtotal(),
      savings: this.getSavings(),
      shippingFee: this.getShippingFee(),
      freeShippingThreshold: this.getFreeShippingThreshold(),
      amountNeededForFreeShipping: this.getAmountNeededForFreeShipping(),
      total: this.getTotal()
    };
  }
}

// Singleton cart instance for application
const cartInstance = new CartStore();

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    CartStore,
    cartInstance,
    FREE_SHIPPING_THRESHOLD,
    STANDARD_SHIPPING_FEE
  };
}

if (typeof window !== "undefined") {
  window.CartStore = CartStore;
  window.amazonCart = cartInstance;
}
