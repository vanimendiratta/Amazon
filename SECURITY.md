# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

---

## Security Philosophy

The **Amazon Storefront Clone** is a client-side educational and portfolio project. While it operates without a backend database or sensitive cloud infrastructure, we enforce production-minded front-end security practices:

1. **Input Sanitization & Output Encoding**: All user inputs in the search and cart components are sanitized or rendered through safe DOM APIs (`textContent`, encoded URLs, attribute escaping) to prevent Cross-Site Scripting (XSS).
2. **Zero Third-Party Runtime Dependencies**: The core application runs on pure native ECMAScript and browser APIs, minimizing supply-chain and dependency vulnerabilities.
3. **No Secret Storage**: The project contains zero hardcoded API keys, tokens, or credentials.

---

## Reporting a Vulnerability

If you discover any security issue or vulnerability in this repository:

1. Please do **NOT** open a public GitHub issue.
2. Email the maintainer directly at `vanimendiratta@users.noreply.github.com` with:
   - Description of the vulnerability.
   - Steps to reproduce or proof-of-concept.
   - Potential impact.
3. You will receive an acknowledgement within 48 hours, followed by a patch and security release.
