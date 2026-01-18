# CubeCart - 3D E-Commerce Platform

A revolutionary e-commerce platform featuring an innovative 3D product showcase with cube rotation animations.

## Features

- 🎨 **3D Product Display** - Interactive cube rotation with CSS 3D transforms
- 🛒 **Full E-Commerce** - Complete shopping cart and checkout system
- 💳 **Stripe Integration** - Secure payment processing
- 📦 **Order Management** - Admin and user order tracking
- 👤 **User Authentication** - JWT-based auth with role management
- 📱 **Responsive Design** - Beautiful UI with glassmorphism effects

## Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS 4, Framer Motion
- **Backend:** Next.js API Routes, MongoDB
- **Payment:** Stripe
- **Authentication:** JWT, bcrypt

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Stripe account

### Installation

```bash
# Clone the repository
git clone https://github.com/Chathu715/cube-cart.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

### Environment Variables

Create a `.env.local` file with:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

## Project Structure

```
app/
├── api/           # API routes
├── components/    # React components
├── contexts/      # React contexts
├── lib/           # Utilities and models
├── admin/         # Admin dashboard
├── account/       # User account pages
└── checkout/      # Checkout flow
```

## Admin Access

For admin credentials, please refer to the `credentials.txt` file (not included in repository for security).

## License

All Rights Reserved © 2026 Chathura Dinuwan

## Author

**Chathura Dinuwan**
- Portfolio: [chathura-dinuwan.vercel.app](https://chathura-dinuwan.vercel.app/)
- GitHub: [@Chathu715](https://github.com/Chathu715)
- LinkedIn: [chathura-dinuwan](https://www.linkedin.com/in/chathura-dinuwan-1b5652256/)
