const test = require("node:test");
const assert = require("node:assert");
const {
  PRODUCTS,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  searchProducts,
  formatPriceINR
} = require("../js/data/products.js");

test("Catalog - has valid products with required schema", () => {
  assert(Array.isArray(PRODUCTS));
  assert(PRODUCTS.length >= 15, `Expected at least 15 products, got ${PRODUCTS.length}`);

  const ids = new Set();
  for (const prod of PRODUCTS) {
    assert(typeof prod.id === "string" && prod.id.length > 0, "Missing product id");
    assert(!ids.has(prod.id), `Duplicate product ID found: ${prod.id}`);
    ids.add(prod.id);

    assert(typeof prod.title === "string" && prod.title.length > 0, `Missing title on ${prod.id}`);
    assert(typeof prod.price === "number" && prod.price > 0, `Invalid price on ${prod.id}`);
    assert(typeof prod.category === "string" && prod.category.length > 0, `Missing category on ${prod.id}`);
    assert(typeof prod.image === "string" && prod.image.startsWith("http"), `Invalid image url on ${prod.id}`);
    assert(typeof prod.rating === "number" && prod.rating >= 0 && prod.rating <= 5, `Invalid rating on ${prod.id}`);
    assert(Array.isArray(prod.features), `Features should be an array on ${prod.id}`);
  }
});

test("Catalog - getProductById works for valid and invalid IDs", () => {
  const macbook = getProductById("macbook-pro-16-m1-max");
  assert(macbook !== null);
  assert.strictEqual(macbook.id, "macbook-pro-16-m1-max");
  assert.strictEqual(macbook.brand, "Apple");

  const invalid = getProductById("non-existent-product-id-12345");
  assert.strictEqual(invalid, null);

  const empty = getProductById("");
  assert.strictEqual(empty, null);
});

test("Catalog - getProductsByCategory filters accurately", () => {
  const laptops = getProductsByCategory("Laptops");
  assert(laptops.length >= 3);
  laptops.forEach(p => assert.strictEqual(p.category.toLowerCase(), "laptops"));

  const groceries = getProductsByCategory("groceries");
  assert(groceries.length >= 6);
  groceries.forEach(p => assert.strictEqual(p.category.toLowerCase(), "groceries"));

  const nonExistent = getProductsByCategory("Airplanes");
  assert.deepStrictEqual(nonExistent, []);
});

test("Catalog - searchProducts performs case-insensitive and multi-field search", () => {
  // Title search
  const appleResults = searchProducts("macbook");
  assert(appleResults.length >= 2);
  appleResults.forEach(p => {
    const text = (p.title + " " + p.category + " " + p.brand).toLowerCase();
    assert(text.includes("macbook") || p.features.some(f => f.toLowerCase().includes("macbook")));
  });

  // Category / brand search
  const groceryResults = searchProducts("oats");
  assert(groceryResults.some(p => p.id === "quaker-rolled-oats-1kg"));

  // Empty or invalid search
  assert.deepStrictEqual(searchProducts(""), []);
  assert.deepStrictEqual(searchProducts("    "), []);
  assert.deepStrictEqual(searchProducts(null), []);
  assert.deepStrictEqual(searchProducts(undefined), []);
  assert.deepStrictEqual(searchProducts(12345), []);
  assert.deepStrictEqual(searchProducts("xyznomatchxyz987"), []);
  assert.deepStrictEqual(searchProducts("!@#$%^&*()"), []);
});

test("Catalog - getProductById handles edge case arguments safely", () => {
  assert.strictEqual(getProductById(null), null);
  assert.strictEqual(getProductById(undefined), null);
  assert.strictEqual(getProductById(123), null);
  assert.strictEqual(getProductById(""), null);
  assert.strictEqual(getProductById("   "), null);
});

test("Catalog - formatPriceINR formats Indian Rupees properly", () => {
  assert.strictEqual(formatPriceINR(100), "₹ 100.00");
  assert.strictEqual(formatPriceINR(399999), "₹ 3,99,999.00");
  assert.strictEqual(formatPriceINR(0), "₹ 0.00");
  assert.strictEqual(formatPriceINR(null), "₹ 0.00");
  assert.strictEqual(formatPriceINR(undefined), "₹ 0.00");
});
