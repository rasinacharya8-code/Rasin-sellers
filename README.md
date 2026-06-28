# Rasin Sellers — Luxury E-Commerce Experience

A premium, bespoke digital showroom for high-end curated lifestyle goods, engineered using **React 19**, **Vite 8**, and modular **Vanilla CSS**.

This repository is optimized for deployment via **GitHub Actions** and showcases production-ready front-end engineering design patterns.

---

## 💎 Project Highlights & Interview Talking Points

### 1. **Modular Architecture & State Flow**
* **Dynamic Cart Management**: Managed via localized React states, passing callbacks up to compile and mutate bag values without relying on heavy third-party state managers.
* **Component Partitioning**: Clean Separation of Concerns between the presentation layers (`Header`, `ProductCard`) and stateful interaction panels (`CartDrawer` containing the checkout system).
* **View Routing**: A lightweight conditional routing mechanism to transition smoothly between the catalog showcase and the customer’s private orders dashboard.

### 2. **Bespoke Checkout & Payment Systems**
* **Localized Context**: Designed specifically for the Nepali market, utilizing NPR pricing schemes and currency formatting (`toLocaleString()`).
* **Multi-Step Checkout**: A streamlined drawer workflow transitioning from *Shopping Bag* review to *Delivery Location Coordinates* collection and *Payment Selection*.
* **Mock Gateway Options**: Integrates selectors for local Nepalese payment networks like **eSewa** and **Khalti**, alongside standard **Direct Bank Wire**.

### 3. **Production Deployment & CI/CD**
* **GitHub Actions Pipeline**: Configured with a custom runner pipeline (`deploy.yml`) that automates dependency installations (`npm ci`), creates production bundles (`npm run build`), and deploys optimized static artifacts (`dist`) to GitHub Pages.
* **Relative Asset Path Resolution**: Programmatically resolves nested assets across environments by utilizing Vite’s configuration base path paired with `import.meta.env.BASE_URL` in the source code.

---

## 🎨 Design & Aesthetic System

The user interface was built to evoke a feeling of high-end boutique luxury:
* **Typography**: Editorial contrast between **Playfair Display** (for luxury serif headings) and **Inter** (for crisp sans-serif interface details).
* **Color Scheme**: Obsidian midnight backdrop (`#0a0a0a`) punctuated by soft golds (`#d4af37`) and clean surface panels (`#141414`).
* **Micro-interactions**: Subtle hover actions including smooth product scaling, card hover state elevations, and gold border-outline transitions for primary buttons.

---

## 🛠️ Technologies & Tools

* **Core**: React 19, JavaScript (ES6+)
* **Bundler & Server**: Vite 8
* **Styling**: Vanilla CSS3 (Custom Variables, Flexbox, CSS Grid, Transitions)
* **CI/CD**: GitHub Actions
