# Estimate Guardian - Dental Fee Transparency PWA

A Progressive Web App that helps North Carolina patients verify if they're being overcharged for dental procedures. Compares quotes against NC Industrial Commission fee schedule guidelines.

## Features

- 🔍 Real-time dental fee verification
- 📊 Color-coded results (Fair, High, Red Flag, Excellent Value)
- 🌍 Geographic adjustment for urban areas
- 🤖 AI-powered negotiation tips for overpriced procedures
- 📱 Progressive Web App - installable on mobile
- 🎨 Modern, responsive UI with Tailwind CSS

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **PWA:** next-pwa
- **Backend:** n8n workflow (serverless)
- **Database:** Supabase

## Getting Started

### Prerequisites

- Node.js 18+ installed
- n8n backend workflow running
- Supabase database populated with NC dental fees

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
open http://localhost:3000
```

### Build for Production

```bash
# Create optimized build
npm run build

# Start production server
npm start
```

## Project Structure

```
estimate-guardian-ui/
├── app/
│   ├── layout.tsx       # Root layout with PWA config
│   ├── page.tsx         # Main application page
│   └── globals.css      # Global styles with Tailwind
├── public/
│   ├── manifest.json    # PWA manifest
│   ├── icon-192.png     # App icon (192x192)
│   └── icon-512.png     # App icon (512x512)
├── next.config.js       # Next.js + PWA configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── package.json         # Dependencies
```

## API Integration

The app connects to your n8n backend at:
```
https://workflowly.online/webhook/audit-estimate
```

### Request Format
```json
{
  "code": "D00120",
  "price": 85.00,
  "zip": "27601"
}
```

### Response Format
```json
{
  "status": "RED_FLAG",
  "severity": "critical",
  "cdt_code": "D00120",
  "procedure": "Periodic oral examination",
  "pricing": {
    "quoted_price": 85.00,
    "fair_ceiling": 56.64,
    "state_base": 48.00,
    "markup_percentage": 50.1
  },
  "location": {
    "zip_code": "27601",
    "area_type": "Raleigh-Cary Metro",
    "urban_adjustment_applied": true
  },
  "analysis": "AI-generated negotiation tip",
  "reference": "NC Industrial Commission 2025"
}
```

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Digital Ocean App Platform
- Railway

## PWA Installation

Users can install the app on their devices:

- **iOS:** Share button → Add to Home Screen
- **Android:** Menu → Install App
- **Desktop:** Install icon in address bar

## Customization

### Update Backend URL

Edit `app/page.tsx`, line ~40:
```typescript
const response = await fetch('YOUR_NEW_URL', {
```

### Change Colors

Edit `tailwind.config.ts` to customize the color scheme.

### Add More States

Currently supports NC only. To add more states:
1. Update backend workflow to support multiple states
2. Add state selector in the form
3. Update validation logic

## License

MIT License - feel free to use for any purpose.

## Support

For issues or questions, contact the development team.

---

Built with ❤️ to protect dental patients from overcharging.
