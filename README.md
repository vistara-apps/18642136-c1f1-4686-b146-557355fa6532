# SlotSync - Instant Booking for Shared Spaces

A social-first booking app for apartment communities built on Base with Farcaster Frame integration.

## Features

- 🎯 **Instant Frame Booking**: Book from your social feed in <3 seconds
- 👻 **Ghost Buster Auto-Release**: 15-min pre-slot confirmations prevent no-shows
- ⚖️ **Fair Play Enforcer**: Smart allocation with weekly limits and karma points
- 🔄 **Swap Market**: Peer-to-peer slot trading with instant matching
- 📊 **Community Pulse**: Real-time transparency dashboard
- ⭐ **Priority Pass NFT**: Premium access for power users

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (Coinbase L2)
- **Wallet**: OnchainKit + MiniKit
- **Social**: Farcaster Frame integration
- **Styling**: Tailwind CSS with custom design system
- **Real-time**: WebSocket + Upstash Redis

## Getting Started

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Set up environment variables:
\`\`\`bash
cp .env.local.example .env.local
\`\`\`

3. Run development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000)

## Architecture

### Data Model
- **User**: Farcaster ID, reliability score, karma points, weekly booking count
- **Space**: Gym, laundry, grill, event spaces with capacity and time slots
- **Slot**: 15-60 minute bookable time slots with prime time detection
- **Booking**: User reservations with confirmation and check-in tracking
- **Waitlist**: Queue system with position tracking and auto-promotion
- **SwapOffer**: Peer-to-peer slot trading marketplace
- **PriorityPass**: NFT-based premium access

### Key Flows
1. **First-Time Booking**: Frame → Tap slot → Confetti → Auto-cast
2. **Swap Marketplace**: Offer slot → Match → 0.50¢ fee → Both notified
3. **Waitlist**: Join queue → Real-time position → 60s claim window
4. **No-Show Prevention**: 15-min reminder → Auto-release → Reliability score

## Design System

### Colors
- **Primary**: Blue (#4F46E5) - Actions and CTAs
- **Accent**: Pink (#FF6B9D) - User bookings and highlights
- **Success**: Green (#10B981) - Available slots
- **Warning**: Yellow (#F59E0B) - Prime time slots

### Components
- **SlotCard**: Available, booked, prime, and user booking variants
- **ActionButton**: Primary, success, ghost, and danger variants
- **UserStats**: Reliability score, karma points, weekly count
- **BookingModal**: Confirmation flow with space details

## Deployment

Deploy to Vercel:
\`\`\`bash
npm run build
vercel deploy
\`\`\`

## License

MIT
