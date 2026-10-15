/**
 * Product Detail Page Dynamic Loader
 * Amazon Storefront Clone
 * Handles URL query param parsing, dynamic rendering, gallery switcher, specs, and purchase flows.
 */

(function() {
  function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  function initProductPage() {
    if (!window.ProductCatalog) {
      console.warn("ProductCatalog not loaded");
      return;
    }

    const rawId = getQueryParam("id");
    const productId = rawId || "macbook-pro-16-m1-max";
    let product = window.ProductCatalog.getProductById(productId);

    if (!product) {
      console.warn(`Product with ID "${productId}" not found. Defaulting to featured item.`);
      product = window.ProductCatalog.getProductById("macbook-pro-16-m1-max");
      if (rawId && window.Toast) {
        setTimeout(() => {
          window.Toast.info("Requested item not found. Showing featured product.");
        }, 400);
      }
    }

    if (!product) {
      const container = document.querySelector(".product-detail .product-container");
      if (container) {
        container.innerHTML = `
          <div style="text-align: center; width: 100%; padding: 60px 20px;">
            <h2>Product Not Found</h2>
            <p style="margin: 16px 0; color: #565959;">The requested product could not be located in the catalog.</p>
            <a href="index.html" class="cart-primary-btn" style="text-decoration: none; display: inline-block;">Return to Home</a>
          </div>
        `;
      }
      return;
    }

    // Update document title
    document.title = `${product.title} | Amazon`;

    // Render Breadcrumbs
    renderBreadcrumbs(product);

    // Render Product Main Info
    renderProductDetails(product);

    // Render Related Products Carousel
    renderRelatedProducts(product);
  }

  function renderBreadcrumbs(product) {
    let breadcrumbEl = document.getElementById("product-breadcrumbs");
    if (!breadcrumbEl) {
      const headingSection = document.querySelector(".product-heading");
      if (headingSection) {
        breadcrumbEl = document.createElement("nav");
        breadcrumbEl.id = "product-breadcrumbs";
        breadcrumbEl.className = "product-breadcrumbs";
        breadcrumbEl.setAttribute("aria-label", "Breadcrumb");
        headingSection.parentNode.insertBefore(breadcrumbEl, headingSection);
      }
    }

    if (breadcrumbEl) {
      breadcrumbEl.innerHTML = `
        <a href="index.html">Home</a>
        <span class="bc-sep">&rsaquo;</span>
        <a href="index.html?category=${encodeURIComponent(product.category)}">${product.category}</a>
        <span class="bc-sep">&rsaquo;</span>
        <span>${product.brand}</span>
        <span class="bc-sep">&rsaquo;</span>
        <span class="bc-current">${product.title.length > 50 ? product.title.substring(0, 50) + '...' : product.title}</span>
      `;
    }
  }

  function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;
    let starsHtml = "";

    for (let i = 0; i < fullStars; i++) {
      starsHtml += "&#9733;";
    }
    if (hasHalf) {
      starsHtml += "&#9734;";
    }
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      starsHtml += "&#9734;";
    }
    return starsHtml;
  }

  function renderProductDetails(product) {
    const container = document.querySelector(".product-detail .product-container");
    if (!container) return;

    const discountPercent = product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

    const formattedPrice = window.ProductCatalog.formatPriceINR(product.price);
    const formattedMRP = product.originalPrice ? window.ProductCatalog.formatPriceINR(product.originalPrice) : null;

    container.innerHTML = `
      <!-- Gallery Column -->
      <div class="product-picture">
        <div class="main-img-wrap">
          <img id="main-product-image" src="${product.image}" alt="${product.title}" onerror="this.src='favicon.svg'"/>
        </div>
        ${product.gallery && product.gallery.length > 1 ? `
          <div class="gallery-thumbnails">
            ${product.gallery.map((img, i) => `
              <button type="button" class="thumb-btn ${i === 0 ? 'active' : ''}" data-img-url="${img}" aria-label="View product image ${i+1}">
                <img src="${img}" alt="" onerror="this.src='favicon.svg'"/>
              </button>
            `).join("")}
          </div>
        ` : ''}
      </div>

      <!-- Detail Body Column -->
      <div class="product-detail-body">
        <span class="product-brand-tag">Visit the ${product.brand} Store</span>
        <h1 class="product-title">${product.title}</h1>

        <div class="product-rating-row">
          <span class="star-rating" title="${product.rating} out of 5 stars">${renderStars(product.rating)}</span>
          <span class="rating-value">${product.rating}</span>
          <span class="rating-count">(${Number(product.reviewCount || 0).toLocaleString()} ratings)</span>
          ${product.badge ? `<span class="product-badge-pill">${product.badge}</span>` : ''}
        </div>

        <div class="product-price-section">
          ${discountPercent > 0 ? `<span class="discount-badge">-${discountPercent}%</span>` : ''}
          <h2 class="product-price">${formattedPrice}</h2>
          ${formattedMRP ? `<div class="mrp-row">M.R.P.: <span class="mrp-strike">${formattedMRP}</span></div>` : ''}
          <p class="inclusive-taxes">Inclusive of all taxes</p>
        </div>

        <div class="product-offers-box">
          <div class="offer-item">
            <strong>Bank Offer</strong>
            <span>Up to ₹5,000 discount on select credit cards</span>
          </div>
          <div class="offer-item">
            <strong>No Cost EMI</strong>
            <span>EMI interest savings on select credit cards</span>
          </div>
          <div class="offer-item">
            <strong>Partner Offers</strong>
            <span>Get GST invoice and save up to 28% on business purchases</span>
          </div>
        </div>

        <div class="product-about">
          <h3>About this item</h3>
          <ul>
            ${product.features.map(f => `<li>${f}</li>`).join("")}
          </ul>
        </div>

        ${product.specs ? `
          <div class="product-specs-table-wrap">
            <h3>Technical Details</h3>
            <table class="product-specs-table">
              <tbody>
                ${Object.entries(product.specs).map(([key, val]) => `
                  <tr>
                    <th>${key}</th>
                    <td>${val}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        ` : ''}

        <!-- Buy & Cart Action Box -->
        <div class="product-purchase-card">
          <div class="stock-status in-stock">
            <svg class="check-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span>In Stock</span>
          </div>
          <p class="delivery-estimate">FREE delivery <strong>Tomorrow</strong>. Order within <strong>4 hrs 15 mins</strong>.</p>

          <div class="qty-select-row">
            <label for="detail-qty-select">Quantity:</label>
            <select id="detail-qty-select" class="detail-qty-select">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div class="buttons">
            <button class="add-to-cart" id="btn-detail-add-cart" type="button">Add to Cart</button>
            <button class="buy-now" id="btn-detail-buy-now" type="button">Buy Now</button>
          </div>

          <div class="secure-transaction-note">
            <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/></svg>
            <span>Secure transaction</span>
          </div>
        </div>
      </div>
    `;

    // Bind Gallery Thumbnails
    const mainImg = document.getElementById("main-product-image");
    const thumbBtns = container.querySelectorAll(".thumb-btn");
    thumbBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        thumbBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const url = btn.getAttribute("data-img-url");
        if (mainImg && url) {
          mainImg.src = url;
        }
      });
    });

    // Bind Add to Cart
    const addCartBtn = document.getElementById("btn-detail-add-cart");
    const qtySelect = document.getElementById("detail-qty-select");
    if (addCartBtn) {
      addCartBtn.addEventListener("click", () => {
        const qty = parseInt(qtySelect.value, 10) || 1;
        if (window.amazonCart) {
          window.amazonCart.addItem(product, qty);
          if (window.Toast) {
            window.Toast.success(`Added ${qty} item${qty > 1 ? 's' : ''} to Cart!`);
          }
          if (window.CartDrawer) {
            window.CartDrawer.open();
          }
        }
      });
    }

    // Bind Buy Now
    const buyNowBtn = document.getElementById("btn-detail-buy-now");
    if (buyNowBtn) {
      buyNowBtn.addEventListener("click", () => {
        const qty = parseInt(qtySelect.value, 10) || 1;
        if (window.amazonCart) {
          window.amazonCart.addItem(product, qty);
          if (window.CartDrawer) {
            window.CartDrawer.openCheckoutModal();
          }
        }
      });
    }
  }

  function renderRelatedProducts(currentProduct) {
    let relatedSection = document.getElementById("related-products-section");
    if (!relatedSection) {
      relatedSection = document.createElement("section");
      relatedSection.id = "related-products-section";
      relatedSection.className = "related-products-section";
      const productDetailSec = document.querySelector(".product-detail");
      if (productDetailSec && productDetailSec.parentNode) {
        productDetailSec.parentNode.insertBefore(relatedSection, productDetailSec.nextSibling);
      }
    }

    const allProducts = window.ProductCatalog.getAllProducts();
    const related = allProducts.filter(p => p.id !== currentProduct.id).slice(0, 6);

    relatedSection.innerHTML = `
      <div class="related-container">
        <h3>Customers who viewed this item also viewed</h3>
        <div class="related-cards-scroll">
          ${related.map(item => `
            <div class="related-card">
              <a href="product.html?id=${encodeURIComponent(item.id)}" class="related-card-img-link">
                <img src="${item.image}" alt="${item.title}" onerror="this.src='favicon.svg'"/>
              </a>
              <a href="product.html?id=${encodeURIComponent(item.id)}" class="related-card-title">${item.title}</a>
              <div class="related-card-rating">
                <span class="star-rating">${renderStars(item.rating)}</span>
                <span class="count">${item.reviewCount}</span>
              </div>
              <p class="related-card-price">${window.ProductCatalog.formatPriceINR(item.price)}</p>
              <button type="button" class="related-add-cart-btn" data-add-related="${item.id}">Add to Cart</button>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    relatedSection.querySelectorAll("[data-add-related]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-add-related");
        const prod = window.ProductCatalog.getProductById(id);
        if (prod && window.amazonCart) {
          window.amazonCart.addItem(prod, 1);
          if (window.Toast) {
            window.Toast.success(`Added ${prod.title.substring(0, 30)}... to Cart!`);
          }
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProductPage);
  } else {
    initProductPage();
  }
})();
