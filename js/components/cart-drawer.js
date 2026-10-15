/**
 * Slide-Out Cart Drawer & Checkout Simulation Component
 * Amazon Storefront Clone
 */

class CartDrawer {
  constructor(cart = (typeof window !== "undefined" ? window.amazonCart : null)) {
    this.cart = cart;
    this.isOpen = false;
    this.drawerEl = null;
    this.overlayEl = null;
    this.checkoutModalEl = null;
    this.init();
  }

  init() {
    if (typeof document === "undefined") return;
    this.buildDrawerDOM();
    this.buildCheckoutModalDOM();
    this.bindEvents();

    if (this.cart) {
      this.cart.subscribe(() => {
        if (this.isOpen) {
          this.render();
        }
      });
    }
  }

  buildDrawerDOM() {
    // Backdrop overlay
    let overlay = document.getElementById("cart-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "cart-overlay";
      overlay.className = "cart-drawer-overlay";
      overlay.setAttribute("aria-hidden", "true");
      document.body.appendChild(overlay);
    }
    this.overlayEl = overlay;

    // Drawer container
    let drawer = document.getElementById("cart-drawer");
    if (!drawer) {
      drawer = document.createElement("aside");
      drawer.id = "cart-drawer";
      drawer.className = "cart-drawer";
      drawer.setAttribute("role", "dialog");
      drawer.setAttribute("aria-modal", "true");
      drawer.setAttribute("aria-label", "Shopping Cart Drawer");
      document.body.appendChild(drawer);
    }
    this.drawerEl = drawer;
  }

  buildCheckoutModalDOM() {
    let modal = document.getElementById("checkout-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "checkout-modal";
      modal.className = "checkout-modal-backdrop";
      modal.setAttribute("aria-hidden", "true");
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.setAttribute("aria-label", "Checkout Dialog");
      document.body.appendChild(modal);
    }
    this.checkoutModalEl = modal;
  }

  bindEvents() {
    this.overlayEl.addEventListener("click", () => this.close());

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (this.checkoutModalEl && this.checkoutModalEl.classList.contains("is-open")) {
          this.closeCheckoutModal();
        } else if (this.isOpen) {
          this.close();
        }
      }
    });

    // Delegate actions within cart drawer
    this.drawerEl.addEventListener("click", (e) => {
      const target = e.target.closest("[data-cart-action]");
      if (!target) return;

      const action = target.getAttribute("data-cart-action");
      const id = target.getAttribute("data-product-id");

      if (action === "close") {
        this.close();
      } else if (action === "increment") {
        const item = this.cart.getItems().find(i => i.product.id === id);
        if (item) {
          this.cart.updateQuantity(id, item.quantity + 1);
        }
      } else if (action === "decrement") {
        const item = this.cart.getItems().find(i => i.product.id === id);
        if (item) {
          if (item.quantity > 1) {
            this.cart.updateQuantity(id, item.quantity - 1);
          } else {
            this.cart.removeItem(id);
            if (window.Toast) window.Toast.info("Item removed from cart");
          }
        }
      } else if (action === "remove") {
        this.cart.removeItem(id);
        if (window.Toast) window.Toast.info("Item removed from cart");
      } else if (action === "clear") {
        if (confirm("Are you sure you want to empty your cart?")) {
          this.cart.clearCart();
          if (window.Toast) window.Toast.info("Cart emptied");
        }
      } else if (action === "checkout") {
        this.openCheckoutModal();
      }
    });

    // Checkout modal actions
    this.checkoutModalEl.addEventListener("click", (e) => {
      if (e.target === this.checkoutModalEl) {
        this.closeCheckoutModal();
        return;
      }
      const closeBtn = e.target.closest("[data-modal-action='close']");
      if (closeBtn) {
        this.closeCheckoutModal();
        return;
      }
      const placeOrderBtn = e.target.closest("[data-modal-action='place-order']");
      if (placeOrderBtn) {
        this.completeOrder();
      }
    });
  }

  open() {
    this.isOpen = true;
    this.render();
    this.drawerEl.classList.add("is-open");
    this.overlayEl.classList.add("is-open");
    document.body.classList.add("cart-open-noscroll");
  }

  close() {
    this.isOpen = false;
    this.drawerEl.classList.remove("is-open");
    this.overlayEl.classList.remove("is-open");
    document.body.classList.remove("cart-open-noscroll");
  }

  formatMoney(num) {
    return "₹ " + Number(num || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  render() {
    if (!this.drawerEl || !this.cart) return;

    const state = this.cart.getState();
    const items = state.items;
    const threshold = state.freeShippingThreshold;
    const subtotal = state.subtotal;
    const needed = state.amountNeededForFreeShipping;
    const qualifiesFreeShipping = subtotal >= threshold && subtotal > 0;
    const progressPercent = Math.min(100, Math.round((subtotal / threshold) * 100));

    let freeShippingHTML = "";
    if (items.length > 0) {
      if (qualifiesFreeShipping) {
        freeShippingHTML = `
          <div class="cart-free-shipping-banner qualifies">
            <svg class="check-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span>Your order qualifies for <strong>FREE Delivery</strong></span>
          </div>
        `;
      } else {
        freeShippingHTML = `
          <div class="cart-free-shipping-banner">
            <p>Add <strong>${this.formatMoney(needed)}</strong> of eligible items to get <strong>FREE Delivery</strong></p>
            <div class="free-shipping-progress-track">
              <div class="free-shipping-progress-bar" style="width: ${progressPercent}%"></div>
            </div>
          </div>
        `;
      }
    }

    let itemsHTML = "";
    if (items.length === 0) {
      itemsHTML = `
        <div class="cart-empty-state">
          <div class="cart-empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </div>
          <h3>Your Amazon Cart is empty</h3>
          <p>Your shopping cart is waiting. Give it purpose — fill it with electronics, groceries, fashion, and more.</p>
          <button class="cart-primary-btn" type="button" data-cart-action="close">Continue Shopping</button>
        </div>
      `;
    } else {
      itemsHTML = `
        <div class="cart-items-list">
          ${items.map(item => `
            <div class="cart-item-row" data-id="${item.product.id}">
              <a href="product.html?id=${encodeURIComponent(item.product.id)}" class="cart-item-img-link" title="${item.product.title}">
                <img src="${item.product.image}" alt="${item.product.title}" class="cart-item-img" onerror="this.src='favicon.svg'"/>
              </a>
              <div class="cart-item-details">
                <a href="product.html?id=${encodeURIComponent(item.product.id)}" class="cart-item-title">${item.product.title}</a>
                <p class="cart-item-stock">In stock</p>
                <p class="cart-item-price">${this.formatMoney(item.product.price)}</p>
                <div class="cart-item-controls">
                  <div class="qty-stepper" role="group" aria-label="Quantity selector for ${item.product.title}">
                    <button type="button" class="qty-btn" data-cart-action="decrement" data-product-id="${item.product.id}" aria-label="Decrease quantity">&minus;</button>
                    <span class="qty-value">${item.quantity}</span>
                    <button type="button" class="qty-btn" data-cart-action="increment" data-product-id="${item.product.id}" aria-label="Increase quantity">&plus;</button>
                  </div>
                  <button type="button" class="cart-remove-link" data-cart-action="remove" data-product-id="${item.product.id}">Delete</button>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      `;
    }

    let footerHTML = "";
    if (items.length > 0) {
      footerHTML = `
        <div class="cart-drawer-footer">
          <div class="cart-subtotal-row">
            <span>Subtotal (${state.itemCount} item${state.itemCount === 1 ? '' : 's'}):</span>
            <span class="subtotal-amount">${this.formatMoney(state.subtotal)}</span>
          </div>
          ${state.shippingFee === 0 ? `
            <div class="cart-shipping-row free">
              <span>Delivery:</span>
              <span>FREE</span>
            </div>
          ` : `
            <div class="cart-shipping-row">
              <span>Standard Delivery:</span>
              <span>${this.formatMoney(state.shippingFee)}</span>
            </div>
          `}
          <button class="cart-checkout-btn" type="button" data-cart-action="checkout">
            Proceed to Buy (${state.itemCount} item${state.itemCount === 1 ? '' : 's'})
          </button>
          <div class="cart-footer-aux">
            <button class="cart-clear-link" type="button" data-cart-action="clear">Empty Cart</button>
          </div>
        </div>
      `;
    }

    this.drawerEl.innerHTML = `
      <div class="cart-drawer-header">
        <div class="cart-header-title-wrap">
          <svg class="cart-header-icon" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          <h2>Shopping Cart <span class="cart-header-count">(${state.itemCount})</span></h2>
        </div>
        <button type="button" class="cart-drawer-close" data-cart-action="close" aria-label="Close cart drawer">&times;</button>
      </div>
      ${freeShippingHTML}
      <div class="cart-drawer-body">
        ${itemsHTML}
      </div>
      ${footerHTML}
    `;
  }

  openCheckoutModal() {
    if (!this.cart || this.cart.getItemCount() === 0) return;
    this.isSubmitting = false;
    const state = this.cart.getState();

    this.checkoutModalEl.innerHTML = `
      <div class="checkout-modal-card">
        <div class="checkout-modal-header">
          <h3>Order Confirmation & Checkout <span style="font-size: 13px; font-weight: 500; color: #565959;">(Simulated Demo)</span></h3>
          <button type="button" class="modal-close-btn" data-modal-action="close" aria-label="Close checkout">&times;</button>
        </div>
        <div class="checkout-modal-body">
          <div class="checkout-demo-disclaimer" style="background: #fff8e7; border: 1px solid #ffe3a3; padding: 10px 14px; border-radius: 8px; font-size: 12px; color: #7a5800; line-height: 1.4;">
            <strong>Educational Demonstration:</strong> This is a client-side simulated checkout. No real financial payment, credit card charge, or real-world order fulfillment will occur.
          </div>

          <div class="checkout-address-box">
            <div class="checkout-box-title">
              <svg viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/></svg>
              <strong>Delivering to Jane Doe</strong> - New Delhi 110001
            </div>
            <p class="checkout-box-sub">Guaranteed Delivery: <strong>Tomorrow, 11:00 AM - 3:00 PM</strong> (FREE with Amazon Prime simulation)</p>
          </div>

          <div class="checkout-items-summary">
            <h4>Review Items (${state.itemCount})</h4>
            <div class="checkout-items-scroll">
              ${state.items.map(i => `
                <div class="checkout-summary-row">
                  <span class="checkout-item-name">${i.quantity}x ${i.product.title}</span>
                  <span class="checkout-item-price">${this.formatMoney(i.product.price * i.quantity)}</span>
                </div>
              `).join("")}
            </div>
          </div>

          <div class="checkout-payment-box">
            <div class="checkout-box-title">
              <svg viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/><path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd"/></svg>
              <strong>Payment Method:</strong> Amazon Pay Balance / Cash on Delivery
            </div>
            <p class="checkout-box-sub">Pay on delivery with Cash, UPI, or Credit/Debit Card</p>
          </div>

          <div class="checkout-totals">
            <div class="checkout-row"><span>Items:</span><span>${this.formatMoney(state.subtotal)}</span></div>
            <div class="checkout-row"><span>Delivery:</span><span>${state.shippingFee === 0 ? 'FREE' : this.formatMoney(state.shippingFee)}</span></div>
            ${state.savings > 0 ? `<div class="checkout-row savings"><span>Promotion / Savings:</span><span>-${this.formatMoney(state.savings)}</span></div>` : ''}
            <div class="checkout-row total"><span>Order Total:</span><span>${this.formatMoney(state.total)}</span></div>
          </div>
        </div>
        <div class="checkout-modal-footer">
          <button type="button" class="btn-cancel" data-modal-action="close">Cancel</button>
          <button type="button" class="btn-place-order" data-modal-action="place-order">Place Your Order</button>
        </div>
      </div>
    `;

    this.checkoutModalEl.classList.add("is-open");
  }

  closeCheckoutModal() {
    this.isSubmitting = false;
    this.checkoutModalEl.classList.remove("is-open");
  }

  completeOrder() {
    if (this.isSubmitting || !this.cart || this.cart.getItemCount() === 0) return;
    this.isSubmitting = true;

    const placeBtn = this.checkoutModalEl.querySelector(".btn-place-order");
    if (placeBtn) {
      placeBtn.disabled = true;
      placeBtn.textContent = "Processing...";
    }

    const orderId = "AMZ-" + Math.floor(100 + Math.random() * 900) + "-" + Math.floor(1000000 + Math.random() * 9000000) + "-IN";
    this.cart.clearCart();
    this.close();

    this.checkoutModalEl.innerHTML = `
      <div class="checkout-modal-card success-card">
        <div class="success-icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3>Simulated Order Placed!</h3>
        <p class="order-id">Mock Order ID: <strong>${orderId}</strong></p>
        <p class="success-desc">This educational simulation has cleared your cart. In a production store, an order confirmation email and SMS dispatch would occur.</p>
        <div class="success-actions">
          <button type="button" class="cart-primary-btn" data-modal-action="close">Continue Shopping</button>
        </div>
      </div>
    `;

    if (window.Toast) {
      window.Toast.success(`Simulated order ${orderId} confirmed!`);
    }
  }
}

const cartDrawerInstance = new CartDrawer();

if (typeof window !== "undefined") {
  window.CartDrawer = cartDrawerInstance;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { CartDrawer, cartDrawerInstance };
}
