# Changelog

All notable changes to the **Amazon Storefront Clone** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-10-15

### Added
- **Product Catalog Database (`js/data/products.js`)**:
  - Over 20 structured products across 6 departments (Laptops, Computers, Tablets, Smartphones, Groceries, Appliances, Fashion).
  - Search engine supporting title, category, brand, and feature keywords.
  - Price formatting utility for Indian Rupees (`formatPriceINR`).
- **Reactive Shopping Cart State Store (`js/state/cart.js`)**:
  - Full CRUD operations: add item, update quantity, remove item, clear cart.
  - Calculations for subtotal, MRP savings, delivery fees, and grand total.
  - Automatic `localStorage` persistence with cross-tab synchronization.
  - Custom event dispatching (`cart:updated`).
- **Slide-Out Cart Drawer (`js/components/cart-drawer.js`)**:
  - Slide-out side drawer with smooth transitions and backdrop blur.
  - Live item listing with quantity steppers (`+`/`-`) and delete controls.
  - Free delivery threshold progress bar (qualifies at ₹499).
  - Full simulated multi-step checkout dialog with simulated delivery address, payment methods, and instant order placement with mock tracking IDs.
- **Real-Time Search Autocomplete (`js/components/navbar.js`)**:
  - Dynamic suggestion dropdown as the user types with query term highlighting.
  - Keyboard navigation (Arrow Up, Arrow Down, Enter, Escape).
  - Instant navigation to matched product detail page.
- **Dynamic Product Detail Page Controller (`js/pages/product-detail.js`)**:
  - Dynamic URL query parameter parsing (`product.html?id=...`).
  - Interactive image gallery with thumbnail preview switcher.
  - Discount calculation badges, MRP strikes, bank offers, and customer review stars.
  - Full technical specifications table.
  - In-stock indicator, quantity selector, and simulated 1-click "Buy Now" flow.
  - "Customers who viewed this item also viewed" recommendation carousel.
- **Toast Notification Engine (`js/components/toast.js`)**:
  - Non-blocking, accessible animated toast alerts for cart updates and search events.
- **Responsive Design System (`responsive.css`)**:
  - Responsive breakpoints for Mobile (320px–480px), Tablet (481px–1024px), and Desktop (1025px+).
  - Fluid containers eliminating rigid 1200px fixed width layout breakages.
  - Adaptive grid for gateway cards (1 col mobile, 2 col tablet, 4 col desktop).
- **Automated Test Suite (`tests/`)**:
  - 23 comprehensive unit and integration tests using Node native test runner (`node --test`).
  - 100% pass rate covering cart operations, storage corruption resilience, boundary calculations, catalog queries, search matching, and checkout flows.
- **CI/CD Automation (`.github/workflows/ci.yml`)**:
  - GitHub Actions workflow running tests and syntax checks on every push and PR.
- **SVG Favicon (`favicon.svg`)**:
  - Clean, lightweight vector Amazon-style favicon replacing external watermarked stock image.
- **Comprehensive Documentation**:
  - Overhauled `README.md` with visual architecture diagram, screenshots, quickstart, and feature breakdowns.
  - `docs/PROJECT_AUDIT.md`, `docs/IMPLEMENTATION_PLAN.md`, `docs/ARCHITECTURE.md`, `CONTRIBUTING.md`, `SECURITY.md`, and `LICENSE`.

### Fixed
- **[BUG FIX] Section 3 Copy-Paste Data Duplication**: Replaced six identical MacBook entries with distinct, accurate products (iPhone 13, iMac, HP Pavilion, laptop sleeves) with their real prices and descriptions.
- **[BUG FIX] Trapped Subpage Navigation**: Added working home link to Amazon logo in header across all pages.
- **[BUG FIX] Accessibility Deficits**: Added missing `alt` descriptions to images, `aria-label` attributes to icon buttons, form labels, and high-contrast keyboard focus outlines.
- **[BUG FIX] Mobile Layout Overflow**: Fixed severe horizontal clipping on viewport widths under 1200px.
- **[QUALITY GATE HARDENING] Search Autocomplete XSS Prevention**: Added HTML entity escaping to search query tokens and catalog attributes before DOM injection.
- **[QUALITY GATE HARDENING] Storage Corruption Resilience**: Added graceful error handling and schema validation to `CartStore.load()` to prevent uncaught exceptions on corrupted localStorage data.
- **[QUALITY GATE HARDENING] Duplicate Checkout Submission Protection**: Added submission mutex and disabled button state during order generation.
- **[QUALITY GATE HARDENING] Invalid Product ID Fallback**: Added graceful empty state and error message when an invalid product ID is passed in the URL.

---

## [0.1.0] - 2026-10-14
- Initial prototype commit with static 2-page HTML/CSS mockup (`index.html`, `product.html`, `style.css`, `product.css`).
