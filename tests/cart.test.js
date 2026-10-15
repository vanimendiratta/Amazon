process.env.NODE_ENV = "test";
const test = require("node:test");
const assert = require("node:assert");
const { CartStore, FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE } = require("../js/state/cart.js");

// Mock Storage implementation for testing
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

const mockProductA = {
  id: "prod-1",
  title: "Test Product A",
  price: 200,
  originalPrice: 250,
  image: "test-a.jpg",
  category: "Test"
};

const mockProductB = {
  id: "prod-2",
  title: "Test Product B",
  price: 350,
  originalPrice: 400,
  image: "test-b.jpg",
  category: "Test"
};

test("CartStore - starts empty", () => {
  const storage = new MockStorage();
  const cart = new CartStore(storage);

  assert.strictEqual(cart.getItemCount(), 0);
  assert.strictEqual(cart.getSubtotal(), 0);
  assert.deepStrictEqual(cart.getItems(), []);
});

test("CartStore - adds items and computes subtotal correctly", () => {
  const storage = new MockStorage();
  const cart = new CartStore(storage);

  cart.addItem(mockProductA, 1);
  assert.strictEqual(cart.getItemCount(), 1);
  assert.strictEqual(cart.getSubtotal(), 200);

  // Adding same item increments quantity
  cart.addItem(mockProductA, 2);
  assert.strictEqual(cart.getItemCount(), 3);
  assert.strictEqual(cart.getSubtotal(), 600);

  // Adding distinct item
  cart.addItem(mockProductB, 1);
  assert.strictEqual(cart.getItemCount(), 4);
  assert.strictEqual(cart.getSubtotal(), 950);
});

test("CartStore - updates quantity and auto-removes on quantity <= 0", () => {
  const storage = new MockStorage();
  const cart = new CartStore(storage);

  cart.addItem(mockProductA, 3);
  cart.updateQuantity("prod-1", 5);
  assert.strictEqual(cart.getItemCount(), 5);
  assert.strictEqual(cart.getSubtotal(), 1000);

  // Updating to 0 removes item
  cart.updateQuantity("prod-1", 0);
  assert.strictEqual(cart.getItemCount(), 0);
  assert.strictEqual(cart.getSubtotal(), 0);
});

test("CartStore - removes item explicitly", () => {
  const storage = new MockStorage();
  const cart = new CartStore(storage);

  cart.addItem(mockProductA, 2);
  cart.addItem(mockProductB, 1);
  assert.strictEqual(cart.getItemCount(), 3);

  cart.removeItem("prod-1");
  assert.strictEqual(cart.getItemCount(), 1);
  assert.strictEqual(cart.getItems()[0].product.id, "prod-2");
});

test("CartStore - computes free shipping threshold correctly", () => {
  const storage = new MockStorage();
  const cart = new CartStore(storage);

  // Empty cart has 0 shipping fee
  assert.strictEqual(cart.getShippingFee(), 0);

  // Subtotal = 200 (less than 499) -> Standard Shipping 40
  cart.addItem(mockProductA, 1);
  assert.strictEqual(cart.getSubtotal(), 200);
  assert.strictEqual(cart.getShippingFee(), STANDARD_SHIPPING_FEE);
  assert.strictEqual(cart.getAmountNeededForFreeShipping(), FREE_SHIPPING_THRESHOLD - 200);
  assert.strictEqual(cart.getTotal(), 200 + STANDARD_SHIPPING_FEE);

  // Add another Product A (Subtotal = 600 >= 499) -> Free Shipping
  cart.addItem(mockProductA, 2);
  assert.strictEqual(cart.getSubtotal(), 600);
  assert.strictEqual(cart.getShippingFee(), 0);
  assert.strictEqual(cart.getAmountNeededForFreeShipping(), 0);
  assert.strictEqual(cart.getTotal(), 600);
});

test("CartStore - calculates savings compared to original price", () => {
  const storage = new MockStorage();
  const cart = new CartStore(storage);

  // Product A: price 200, orig 250 -> saves 50 each
  cart.addItem(mockProductA, 2);
  assert.strictEqual(cart.getOriginalSubtotal(), 500);
  assert.strictEqual(cart.getSubtotal(), 400);
  assert.strictEqual(cart.getSavings(), 100);
});

test("CartStore - persists and restores from storage", () => {
  const storage = new MockStorage();
  const cart1 = new CartStore(storage);

  cart1.addItem(mockProductA, 2);
  cart1.addItem(mockProductB, 1);

  // Instantiate second cart from same storage
  const cart2 = new CartStore(storage);
  assert.strictEqual(cart2.getItemCount(), 3);
  assert.strictEqual(cart2.getSubtotal(), 750);
});

test("CartStore - clears cart", () => {
  const storage = new MockStorage();
  const cart = new CartStore(storage);

  cart.addItem(mockProductA, 5);
  cart.clearCart();
  assert.strictEqual(cart.getItemCount(), 0);
  assert.strictEqual(cart.getSubtotal(), 0);
  assert.deepStrictEqual(cart.getItems(), []);
});

test("CartStore - handles corrupted JSON in storage gracefully", () => {
  const storage = new MockStorage();
  storage.setItem("amazon_clone_cart_v1", "{invalid-json-content###");
  const cart = new CartStore(storage);

  assert.strictEqual(cart.getItemCount(), 0);
  assert.strictEqual(cart.getSubtotal(), 0);
  assert.deepStrictEqual(cart.getItems(), []);
});

test("CartStore - filters out malformed or null items in storage", () => {
  const storage = new MockStorage();
  const malformed = [
    null,
    undefined,
    { invalid: "data" },
    { product: null, quantity: 2 },
    { product: { id: "p1", price: "not-a-number" }, quantity: 1 },
    { product: { id: "valid-1", price: 100 }, quantity: 0 },
    { product: { id: "valid-2", price: 150 }, quantity: 2 }
  ];
  storage.setItem("amazon_clone_cart_v1", JSON.stringify(malformed));
  const cart = new CartStore(storage);

  assert.strictEqual(cart.getItemCount(), 2);
  assert.strictEqual(cart.getSubtotal(), 300);
});

test("CartStore - caps maximum quantity per item at 99", () => {
  const storage = new MockStorage();
  const cart = new CartStore(storage);

  cart.addItem(mockProductA, 150);
  assert.strictEqual(cart.getItemCount(), 99);

  // Updating beyond 99 is capped
  cart.updateQuantity("prod-1", 500);
  assert.strictEqual(cart.getItemCount(), 99);
});

test("CartStore - handles invalid or non-numeric quantity inputs safely", () => {
  const storage = new MockStorage();
  const cart = new CartStore(storage);

  cart.addItem(mockProductA, -10); // clamped to 1
  assert.strictEqual(cart.getItemCount(), 1);

  cart.addItem(mockProductA, "invalid-qty"); // clamped to 1
  assert.strictEqual(cart.getItemCount(), 2);
});

test("CartStore - threshold boundary condition at exactly 498 and 499", () => {
  const storage = new MockStorage();
  const cart = new CartStore(storage);

  const edgeProd = { id: "edge-1", title: "Edge", price: 498, originalPrice: 500 };
  cart.addItem(edgeProd, 1);

  // 498 < 499: standard shipping fee applies
  assert.strictEqual(cart.getSubtotal(), 498);
  assert.strictEqual(cart.getShippingFee(), 40);
  assert.strictEqual(cart.getAmountNeededForFreeShipping(), 1);

  // Update price to 499: free shipping qualifies
  cart.clearCart();
  const edgeProd499 = { id: "edge-2", title: "Edge 499", price: 499, originalPrice: 500 };
  cart.addItem(edgeProd499, 1);
  assert.strictEqual(cart.getSubtotal(), 499);
  assert.strictEqual(cart.getShippingFee(), 0);
  assert.strictEqual(cart.getAmountNeededForFreeShipping(), 0);
});
