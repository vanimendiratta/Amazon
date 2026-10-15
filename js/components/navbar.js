/**
 * Shared Navbar Component Logic
 * Amazon Storefront Clone
 * Handles live search suggestions, keyboard navigation, cart badge sync, and category bar.
 */

(function() {
  function initNavbar() {
    const searchInput = document.querySelector(".search-input");
    const searchButton = document.querySelector(".search-button");
    const cartButton = document.querySelector(".header-cart");
    const logoImg = document.querySelector(".amazon-logo");

    // Make logo clickable to index.html if not already wrapped in anchor
    if (logoImg && !logoImg.closest("a")) {
      const parent = logoImg.parentNode;
      const anchor = document.createElement("a");
      anchor.href = "index.html";
      anchor.className = "header-logo-link";
      anchor.setAttribute("aria-label", "Amazon Home");
      parent.replaceChild(anchor, logoImg);
      anchor.appendChild(logoImg);
    }

    // Bind Cart Drawer Open
    if (cartButton) {
      cartButton.setAttribute("role", "button");
      cartButton.setAttribute("tabindex", "0");
      cartButton.setAttribute("aria-label", "View Shopping Cart");
      cartButton.style.cursor = "pointer";

      const openCart = (e) => {
        e.preventDefault();
        if (window.CartDrawer) {
          window.CartDrawer.open();
        }
      };

      cartButton.addEventListener("click", openCart);
      cartButton.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          openCart(e);
        }
      });
    }

    // Dynamic Cart Badge Management
    function updateCartBadge() {
      const cart = window.amazonCart;
      if (!cart || !cartButton) return;

      const count = cart.getItemCount();
      let badge = cartButton.querySelector(".cart-badge-count");
      if (!badge) {
        badge = document.createElement("span");
        badge.className = "cart-badge-count";
        badge.setAttribute("aria-label", `${count} items in cart`);
        const cartIconWrap = cartButton.querySelector("div") || cartButton;
        cartIconWrap.style.position = "relative";
        cartIconWrap.appendChild(badge);
      }

      badge.textContent = count;
      badge.setAttribute("aria-label", `${count} items in cart`);
      if (count > 0) {
        badge.classList.add("has-items");
      } else {
        badge.classList.remove("has-items");
      }
    }

    // Listen for cart changes
    if (typeof window !== "undefined") {
      window.addEventListener("cart:updated", updateCartBadge);
      // Run once at startup
      updateCartBadge();
    }

    // Search Autocomplete Engine
    if (searchInput) {
      const searchContainer = searchInput.closest(".header-search");
      if (searchContainer) {
        searchContainer.style.position = "relative";

        let dropdown = document.getElementById("search-autocomplete-dropdown");
        if (!dropdown) {
          dropdown = document.createElement("div");
          dropdown.id = "search-autocomplete-dropdown";
          dropdown.className = "search-autocomplete-dropdown";
          dropdown.setAttribute("role", "listbox");
          dropdown.setAttribute("aria-label", "Search suggestions");
          searchContainer.appendChild(dropdown);
        }

        let selectedIndex = -1;

        function closeDropdown() {
          dropdown.classList.remove("is-open");
          dropdown.innerHTML = "";
          selectedIndex = -1;
        }

        function escapeHTML(str) {
          if (!str) return "";
          return String(str).replace(/[&<>"']/g, m => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
          }[m]));
        }

        function highlightMatch(text, query) {
          const safeText = escapeHTML(text);
          const safeQuery = escapeHTML(query);
          const index = safeText.toLowerCase().indexOf(safeQuery.toLowerCase());
          if (index === -1) return safeText;
          const before = safeText.substring(0, index);
          const match = safeText.substring(index, index + safeQuery.length);
          const after = safeText.substring(index + safeQuery.length);
          return `${before}<strong>${match}</strong>${after}`;
        }

        function renderResults(results, query) {
          if (!results || results.length === 0) {
            dropdown.innerHTML = `
              <div class="search-suggest-empty">
                <span>No products found for "<strong>${escapeHTML(query)}</strong>"</span>
              </div>
            `;
            dropdown.classList.add("is-open");
            return;
          }

          dropdown.innerHTML = results.slice(0, 6).map((item, idx) => `
            <a href="product.html?id=${encodeURIComponent(item.id)}"
               class="search-suggest-item ${idx === selectedIndex ? 'is-selected' : ''}"
               role="option"
               data-index="${idx}">
              <img src="${escapeHTML(item.image)}" alt="" class="suggest-img" onerror="this.src='favicon.svg'"/>
              <div class="suggest-info">
                <span class="suggest-title">${highlightMatch(item.title, query)}</span>
                <span class="suggest-category">${escapeHTML(item.category)} &bull; ${escapeHTML(item.brand)}</span>
              </div>
              <span class="suggest-price">${window.ProductCatalog ? window.ProductCatalog.formatPriceINR(item.price) : '₹ ' + item.price}</span>
            </a>
          `).join("");

          dropdown.classList.add("is-open");
        }

        searchInput.addEventListener("input", () => {
          const query = searchInput.value.trim();
          selectedIndex = -1;
          if (query.length < 2) {
            closeDropdown();
            return;
          }

          if (window.ProductCatalog) {
            const results = window.ProductCatalog.searchProducts(query);
            renderResults(results, query);
          }
        });

        // Keyboard controls
        searchInput.addEventListener("keydown", (e) => {
          const items = dropdown.querySelectorAll(".search-suggest-item");
          if (!dropdown.classList.contains("is-open") || items.length === 0) {
            if (e.key === "Enter") {
              e.preventDefault();
              executeSearch();
            }
            return;
          }

          if (e.key === "ArrowDown") {
            e.preventDefault();
            selectedIndex = (selectedIndex + 1) % items.length;
            updateSelection(items);
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            selectedIndex = (selectedIndex - 1 + items.length) % items.length;
            updateSelection(items);
          } else if (e.key === "Enter") {
            e.preventDefault();
            if (selectedIndex >= 0 && items[selectedIndex]) {
              items[selectedIndex].click();
            } else {
              executeSearch();
            }
          } else if (e.key === "Escape") {
            closeDropdown();
          }
        });

        function updateSelection(items) {
          items.forEach((item, idx) => {
            if (idx === selectedIndex) {
              item.classList.add("is-selected");
              item.scrollIntoView({ block: "nearest" });
            } else {
              item.classList.remove("is-selected");
            }
          });
        }

        function executeSearch() {
          const query = searchInput.value.trim();
          if (!query) return;
          closeDropdown();

          if (window.ProductCatalog) {
            const results = window.ProductCatalog.searchProducts(query);
            if (results.length > 0) {
              // Direct navigation to first match
              window.location.href = `product.html?id=${encodeURIComponent(results[0].id)}`;
            } else {
              if (window.Toast) {
                window.Toast.info(`No products found matching "${query}"`);
              }
            }
          }
        }

        if (searchButton) {
          searchButton.addEventListener("click", (e) => {
            e.preventDefault();
            executeSearch();
          });
        }

        // Close dropdown when clicking outside
        document.addEventListener("click", (e) => {
          if (!searchContainer.contains(e.target)) {
            closeDropdown();
          }
        });
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNavbar);
  } else {
    initNavbar();
  }
})();
