# Implementation Plan: Amazon Storefront Upgrade

**Target Project**: [vanimendiratta/Amazon](https://github.com/vanimendiratta/Amazon.git)
**Status**: Completed (Quality Gate Verified)
**Execution Order**: Sequential & Verified

---

## Stage 1: Data Model & Core State Management
- [x] **Task 1.1: Product Catalog Database (`js/data/products.js`)**
  - Implement comprehensive catalog representing existing items (Groceries, Electronics, MacBooks, Accessories) with id, title, category, price, originalPrice, rating, reviewCount, image, inStock, specs, and features.
  - Acceptance Criteria: Catalog has 15+ items covering all home sections and allows quick lookup by ID and category filtering.
- [x] **Task 1.2: Reactive Cart State Store (`js/state/cart.js`)**
  - Implement `CartStore` with `getCart()`, `addItem(product, qty)`, `removeItem(id)`, `updateQuantity(id, qty)`, `clearCart()`, `getSubtotal()`, `getItemCount()`, and `localStorage` persistence.
  - Implement custom event dispatching (`cart:updated`) to trigger reactive UI updates.
  - Acceptance Criteria: State persists across page refreshes and multi-tab synchronization.

---

## Stage 2: Shared UI Components & Interactivity
- [x] **Task 2.1: Toast Notification Engine (`js/components/toast.js`)**
  - Lightweight, accessible toast system displaying feedback on cart updates, item removals, and search interactions.
  - Acceptance Criteria: Dynamic dismissable toasts appear with micro-animations and auto-fade.
- [x] **Task 2.2: Slide-Out Cart Drawer Modal (`js/components/cart-drawer.js`)**
  - Slide-out cart overlay accessible from the navbar on all pages.
  - Supports live item listing, quantity stepping (+ / -), item removal, free shipping progress bar, subtotal calculation, and checkout trigger.
  - Acceptance Criteria: Drawer smoothly opens/closes, syncs with CartStore, and allows full checkout simulation.
- [x] **Task 2.3: Interactive Navbar & Real-Time Search (`js/components/navbar.js`)**
  - Navbar enhancements: Cart badge count showing live item quantity, working logo link back to homepage, search input with instant drop-down suggestions and quick-nav to product page, delivery address indicator.
  - Acceptance Criteria: Typing in search input displays matching items instantly; clicking cart opens cart drawer.

---

## Stage 3: Page Enhancements & Fixes
- [x] **Task 3.1: Homepage Polish & Dynamic Rendering (`index.html`, `style.css`)**
  - Fix Section 3 copy-paste bug: accurately render distinct products with real titles, prices, ratings, and links to `product.html?id=...`.
  - Add Add-to-Cart quick action buttons on card items.
  - Fix Section 2 horizontal carousels with smooth scroll indicators, product titles, prices, and interactive clicks.
  - Replace Dreamstime watermarked favicon with crisp SVG Amazon-style favicon.
  - Enrich footer with comprehensive Amazon-style multi-column links, back-to-top button, and accessibility semantics.
  - Acceptance Criteria: Visual fidelity matches modern Amazon, all cards are distinct and interactive.
- [x] **Task 3.2: Product Detail Dynamic Loading (`product.html`, `product.css`, `js/pages/product-detail.js`)**
  - Parse `?id=` query parameter from URL to render the selected product dynamically (title, price, discounts, ratings, breadcrumbs, specifications list, stock status, delivery date).
  - Add thumbnail selector / image preview.
  - Implement functional "Add to Cart" and "Buy Now" flows with quantity selector.
  - Add related products recommendation carousel at bottom of product page.
  - Acceptance Criteria: Any product clicked from home loads its specific detail view and can be purchased/added to cart.

---

## Stage 4: Responsive Design & Accessibility (a11y)
- [x] **Task 4.1: Responsive Layout System (`responsive.css`)**
  - Introduce fluid media queries for Mobile (320px - 480px), Tablet (481px - 1024px), and Desktop (1025px+).
  - Replace rigid `1200px` fixed containers with `max-width: 1200px; width: 100%`.
  - Transform 4-column gateway section into responsive grid (1 col mobile, 2 col tablet, 4 col desktop).
  - Acceptance Criteria: Zero horizontal overflow or cut-off content on viewports from 360px to 1920px.
- [x] **Task 4.2: Accessibility & Semantic HTML Improvements**
  - Meaningful `alt` descriptions for all images.
  - Explicit `aria-label` for icon buttons (search, cart, quantity controls, close buttons).
  - Proper heading hierarchy (`<h1>` to `<h4>`).
  - High-contrast focus states for keyboard navigation.
  - Acceptance Criteria: Meets WCAG AA guidelines for interactive elements.

---

## Stage 5: Testing, Tooling & CI/CD
- [x] **Task 5.1: Test Suite Setup & Implementation (`package.json`, `tests/`)**
  - Setup Node native test runner (`node --test`) with zero external runtime bloat.
  - Implement `tests/cart.test.js`: unit tests for cart operations, tax/subtotal calculation, edge cases.
  - Implement `tests/catalog.test.js`: catalog schema validation, search index integrity.
  - Implement `tests/integration.test.js`: E2E simulated checkout flows, multi-tab sync, low-value orders, empty cart guards.
  - Acceptance Criteria: `npm test` runs all tests and achieves 100% pass rate.
- [x] **Task 5.2: Automated CI/CD Workflow (`.github/workflows/ci.yml`)**
  - GitHub Actions workflow running automated linting, test suites, and formatting verification.
  - Acceptance Criteria: Workflow passes locally and is ready for GitHub Actions.

---

## Stage 6: Documentation & Portfolio Polish
- [x] **Task 6.1: Comprehensive Root README.md**
  - Hero section, live demo / preview instructions, visual feature walkthrough, architecture diagram, tech stack, installation guide, testing commands, roadmap, and author attribution.
- [x] **Task 6.2: Open Source Governance & Docs**
  - `CONTRIBUTING.md`, `CHANGELOG.md`, `SECURITY.md`, `LICENSE` (MIT).
  - Recommended GitHub repository topics and description.
