const test = require("node:test");
const assert = require("node:assert");
const { CartStore } = require("../js/state/cart.js");
const { getProductById, searchProducts } = require("../js/data/products.js");

class MockStorage {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

test("E2E Simulation - Search product -> Add to cart -> Calculate totals -> Checkout simulation", () => {
  const storage = new MockStorage();
  const cart = new CartStore(storage);

  // 1. User searches for 'macbook'
  const searchMatches = searchProducts("macbook");
  assert(searchMatches.length > 0);
  const selectedProduct = searchMatches[0];

  // 2. User adds 1 unit to cart
  cart.addItem(selectedProduct, 1);
  assert.strictEqual(cart.getItemCount(), 1);
  assert.strictEqual(cart.getSubtotal(), selectedProduct.price);

  // 3. User searches and adds groceries item (Salt: ₹28)
  const salt = getProductById("aashirvaad-iodised-salt-1kg");
  assert(salt !== null);
  cart.addItem(salt, 2);

  assert.strictEqual(cart.getItemCount(), 3);
  const expectedSubtotal = selectedProduct.price + (salt.price * 2);
  assert.strictEqual(cart.getSubtotal(), expectedSubtotal);

  // Since subtotal > 499, shipping must be free
  assert.strictEqual(cart.getShippingFee(), 0);
  assert.strictEqual(cart.getTotal(), expectedSubtotal);

  // 4. Order confirmation & simulated checkout
  const finalState = cart.getState();
  assert(finalState.items.length === 2);

  // Simulate checkout completion: cart cleared
  cart.clearCart();
  assert.strictEqual(cart.getItemCount(), 0);
  assert.strictEqual(cart.getSubtotal(), 0);
});

test("E2E Simulation - Low-value order incurs standard delivery charge", () => {
  const storage = new MockStorage();
  const cart = new CartStore(storage);

  const salt = getProductById("aashirvaad-iodised-salt-1kg"); // ₹28
  cart.addItem(salt, 1);

  assert.strictEqual(cart.getSubtotal(), 28);
  assert.strictEqual(cart.getShippingFee(), 40);
  assert.strictEqual(cart.getTotal(), 68);
  assert.strictEqual(cart.getAmountNeededForFreeShipping(), 499 - 28);
});

test("E2E Simulation - Prevents checkout operations when cart is empty", () => {
  const storage = new MockStorage();
  const cart = new CartStore(storage);

  assert.strictEqual(cart.getItemCount(), 0);
  // An empty cart must have 0 subtotal, 0 shipping fee, and 0 total
  assert.strictEqual(cart.getSubtotal(), 0);
  assert.strictEqual(cart.getShippingFee(), 0);
  assert.strictEqual(cart.getTotal(), 0);

  // Clearing an already empty cart is a safe no-op
  cart.clearCart();
  assert.strictEqual(cart.getItemCount(), 0);
});

test("E2E Simulation - Multi-tab storage sync simulation", () => {
  const sharedStorage = new MockStorage();
  const tabACart = new CartStore(sharedStorage);
  const tabBCart = new CartStore(sharedStorage);

  const macbook = getProductById("macbook-pro-16-m1-max");
  tabACart.addItem(macbook, 1);

  // Tab B reads from same shared storage
  const restoredB = new CartStore(sharedStorage);
  assert.strictEqual(restoredB.getItemCount(), 1);
  assert.strictEqual(restoredB.getSubtotal(), macbook.price);
});
