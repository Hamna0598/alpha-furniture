# Alpha Furniture — Next.js Website

## 🚀 Quick Start

```powershell
cd alpha-furniture-next
npm install
npm run dev
```

Open: http://localhost:3000

## 📁 Project Structure

```
alpha-furniture-next/
├── app/
│   ├── layout.jsx          ← Root layout (header, footer)
│   ├── page.jsx            ← Home page
│   ├── shop/               ← Shop / category browse
│   ├── product/[slug]/     ← Product detail page
│   ├── cart/               ← Cart page (view items)
│   ├── checkout/           ← Step 1: Delivery details + choose payment
│   ├── checkout/[method]/  ← Step 2: Payment details (COD / Bank / Card / JazzCash / EasyPaisa)
│   ├── order-confirmed/    ← Order receipt + WhatsApp notification
│   ├── about/              ← About page
│   ├── contact/            ← Contact + map
│   └── api/                ← Next.js API routes (products, orders, contact)
├── components/             ← Header, Footer, ProductCard, Toast
├── context/                ← CartContext, WishlistContext
├── lib/products.js         ← Product catalogue (35 products)
└── public/images/          ← All 35 product images
```

## 🏪 Business Info
- **Phone:** +92 321 4877048
- **Address:** Street #83 Rasool Pura Colony, Ichra Furniture Market, Lahore 54600
- **Hours:** Mon–Sat 10am–8pm

## 💳 Payment Flow
Cart → Checkout (fill delivery details) → Choose Payment Method → Payment Page → Order Confirmed

## 📱 WhatsApp Notification
After a customer places an order, a WhatsApp message opens automatically to notify Alpha Furniture at +92 321 4877048.
