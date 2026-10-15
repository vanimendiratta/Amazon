/**
 * Toast Notification Component
 * Amazon Storefront Clone
 * Provides accessible, animated feedback for user actions.
 */

class ToastManager {
  constructor() {
    this.container = null;
    this.init();
  }

  init() {
    if (typeof document === "undefined") return;
    let el = document.getElementById("amazon-toast-container");
    if (!el) {
      el = document.createElement("div");
      el.id = "amazon-toast-container";
      el.className = "amazon-toast-container";
      el.setAttribute("role", "region");
      el.setAttribute("aria-live", "polite");
      el.setAttribute("aria-label", "Notifications");
      document.body.appendChild(el);
    }
    this.container = el;
  }

  show(message, type = "success", duration = 3200) {
    if (!this.container) this.init();
    if (!this.container) return;

    const toast = document.createElement("div");
    toast.className = `amazon-toast amazon-toast-${type}`;
    toast.setAttribute("role", "alert");

    const iconSvg = type === "success"
      ? `<svg class="toast-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>`
      : `<svg class="toast-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg>`;

    toast.innerHTML = `
      <div class="toast-content">
        ${iconSvg}
        <span class="toast-message">${message}</span>
      </div>
      <button class="toast-close" type="button" aria-label="Dismiss notification">&times;</button>
    `;

    const closeBtn = toast.querySelector(".toast-close");
    const dismiss = () => {
      toast.classList.add("toast-hiding");
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 250);
    };

    closeBtn.addEventListener("click", dismiss);

    this.container.appendChild(toast);

    // Auto-dismiss after duration
    if (duration > 0) {
      setTimeout(dismiss, duration);
    }
  }

  success(message, duration) {
    this.show(message, "success", duration);
  }

  info(message, duration) {
    this.show(message, "info", duration);
  }

  error(message, duration) {
    this.show(message, "error", duration);
  }
}

const toastInstance = new ToastManager();

if (typeof window !== "undefined") {
  window.Toast = toastInstance;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { ToastManager, toastInstance };
}
