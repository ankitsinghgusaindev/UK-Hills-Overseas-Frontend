# UK Hills Overseas Ecommerce Platform

<p align="center">
  <img src="https://img.shields.io/badge/React.js-Frontend-blue?logo=react" />
  <img src="https://img.shields.io/badge/Redux%20Toolkit-State%20Management-purple" />
  <img src="https://img.shields.io/badge/Vite-Build%20Tool-yellow" />
  <img src="https://img.shields.io/badge/Responsive-Mobile%20Friendly-green" />
</p>

## Overview

UK Hills Overseas Ecommerce Platform is a modern React-based ecommerce application designed to showcase and sell authentic Himalayan products from Uttarakhand.

The platform provides a complete online shopping experience including product browsing, advanced filtering, cart functionality, coupon system, checkout flow, WhatsApp ordering, and real-time order tracking.

---

## Features

### Home Page
- Modern Hero Section
- Product Categories
- Featured Products
- Testimonials
- Statistics Section
- Newsletter Subscription
- Responsive Design

### Product Management
- Product Search
- Category Filtering
- Dynamic Product Grid
- Product Cards
- Product Details
- Product Ratings

### Shopping Cart
- Add To Cart
- Remove From Cart
- Increase Quantity
- Decrease Quantity
- Auto Remove When Quantity Reaches Zero
- Cart Count Indicator
- Cart Persistence with LocalStorage

### Coupon System
Supported Coupon:

```text
WELCOME10
```

Features:
- Apply Coupon
- Remove Coupon
- Instant Discount Calculation
- Dynamic Price Updates

### Checkout System
- Customer Details Form
- Address Collection
- Order Summary
- GST Calculation
- Shipping Charges
- Total Calculation
- Cash On Delivery
- WhatsApp Ordering

### Order Management
- Order Placement
- Order History
- Order Tracking
- Status Updates

Order Lifecycle:

```text
Confirmed
↓
Packed
↓
Shipped
↓
Out For Delivery
↓
Delivered
```

### Track Order System
- Navbar Track Order CTA
- Active Orders Counter
- Delivery Progress Timeline
- Auto Hide After Delivery

### WhatsApp Ordering
Automatically generates:

```text
Customer Details
Product Details
Quantity
Total Amount
Delivery Address
```

and redirects customers to WhatsApp for order confirmation.

### Newsletter Subscription
- Email Validation
- Duplicate Email Prevention
- Subscriber Counter
- Auto Dismiss Messages
- LocalStorage Persistence

### UI/UX Features
- Sticky Navbar
- Responsive Layout
- Premium Footer
- Scroll To Top Button
- Hover Animations
- Smooth Transitions
- Mobile Friendly Design

---

## Product Categories

### Pickles
- Mango Pickle
- Mango Mixed Pickle
- Lemon Sweet Pickle
- Lemon Sour Pickle
- Amla Pickle
- Garlic Pickle
- Ginger Pickle
- Jackfruit Pickle
- Hari Mirch Pickle
- Bharwa Mirch Pickle

### Spices
- Rock Salt
- Haldi Powder
- Red Chilli Powder
- Ginger Powder
- Bhang Seeds
- Bhangjeera
- Jhakya

### Daals
- Naurangi Dal
- Toar Dal
- Kala Bhat
- Safed Bhat
- Rajma
- Gahat Dal

### Cereals
- Koda Atta
- Jhangora
- Lal Bhat

### Murabba
- Amla Murabba
- Gajar Murabba

### Laddoo
- Amla Laddoo
- Mango Laddoo

### Others
- Amla Jam
- Amla Candy

---

## Tech Stack

### Frontend
- React.js
- Redux Toolkit
- React Router DOM
- React Icons
- CSS3

### Build Tool
- Vite

### Storage
- LocalStorage

---

## Project Structure

```text
src
│
├── Components
│   ├── Navbar
│   ├── Hero
│   ├── Categories
│   ├── ProductCard
│   ├── ProductSection
│   ├── CartModal
│   ├── Footer
│   ├── Newsletter
│   ├── Testimonials
│   ├── Statistics
│   └── ScrollTop
│
├── Pages
│   ├── Checkout
│   ├── Orders
│   └── OrderSuccess
│
├── Redux
│   ├── ProductSlice
│   ├── CartSlice
│   ├── WishlistSlice
│   └── OrderSlice
│
└── Assets
```

---

## Installation

Clone Repository

```bash
git clone https://github.com/ankitsinghgusaindev/UK-Hills-Overseas-Ecommerce-Platform.git
```

Navigate to Project

```bash
cd UK-Hills-Overseas-Ecommerce-Platform
```

Install Dependencies

```bash
npm install
```

Run Development Server

```bash
npm run dev
```

---

## Build For Production

```bash
npm run build
```

Preview Build

```bash
npm run preview
```

---

## Future Enhancements

- Razorpay Payment Gateway
- Firebase Authentication
- User Accounts
- Product Reviews
- Admin Dashboard
- Inventory Management
- Email Notifications
- Backend API Integration
- Database Support

---

## Developer

### Ankit Singh Gusain

Frontend Developer | React Developer | Software Engineer

GitHub:
https://github.com/ankitsinghgusaindev

---

## Support

If you found this project useful, consider giving it a star ⭐ on GitHub.

---

## License

This project is developed for educational, portfolio, and business showcase purposes.
