# Contributing Guidelines

Thank you for your interest in contributing to the **Amazon Storefront Clone** project! We welcome contributions from developers of all skill levels.

---

## Code of Conduct

By participating in this project, you agree to uphold a welcoming, respectful, and harassment-free environment for everyone. Please treat all contributors with kindness and respect.

---

## Getting Started

1. **Fork the Repository**: Create your own copy of the repository on GitHub.
2. **Clone Locally**:
   ```bash
   git clone https://github.com/vanimendiratta/Amazon.git
   cd Amazon
   ```
3. **Run Locally**:
   You do not need to install complex dependencies to run the app. Use any local HTTP server:
   ```bash
   # Using Python:
   python3 -m http.server 3000

   # Or using Node:
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

---

## Development Workflow

1. Create a descriptive feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your improvements following the established patterns:
   - Use semantic HTML5 elements.
   - Use modular CSS adhering to custom CSS variables in `style.css`.
   - Write clean, documented JavaScript in `js/`.
   - Ensure all new features are accessible (ARIA labels, keyboard navigation, focus outlines).
3. Run the automated test suite and linter:
   ```bash
   npm test
   npm run lint
   ```
4. Commit your changes with meaningful commit messages:
   ```bash
   git commit -m "feat: add user reviews rating filter"
   ```
5. Push to your fork and submit a Pull Request.

---

## Coding Standards

- **No Framework Lock-in**: The core application is built with vanilla HTML5, CSS3, and ECMAScript. Avoid introducing heavy UI frameworks unless specifically discussed in an issue.
- **Accessibility**: All interactive elements must be focusable via keyboard, contain accessible descriptions (`aria-label`), and meet WCAG AA contrast standards.
- **Test Coverage**: Any modifications to state management (`js/state/cart.js`) or catalog search (`js/data/products.js`) must be accompanied by automated tests in `tests/`.
