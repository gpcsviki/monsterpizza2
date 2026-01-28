# 🍕👾 Monster Pizza - React + TypeScript

A modern, responsive single-page website for Monster Pizza built with React, TypeScript, and Tailwind CSS.

## Features

- **Modern UI**: Glassmorphism, aurora backgrounds, noise overlays, micro-animations
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Fully Responsive**: Mobile, tablet, and desktop optimized
- **Accessible**: Semantic HTML, ARIA labels, keyboard navigation
- **Form Validation**: react-hook-form + zod schema validation
- **Smooth Animations**: framer-motion scroll reveals and transitions

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icons
- **Sonner** - Toast notifications
- **React Hook Form** + **Zod** - Form handling & validation

## Getting Started

### Installation

```bash
cd monster-pizza-react
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── sections/       # Page sections (Navbar, Hero, Menu, etc.)
│   ├── ui/             # Reusable UI components (Button, Card, etc.)
│   └── FloatingOrderButton.tsx
├── hooks/
│   └── use-theme.tsx   # Theme provider & hook
├── lib/
│   └── utils.ts        # Utility functions (cn)
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles & Tailwind config
```

## Sections

1. **Navbar** - Sticky, glassmorphism, theme toggle
2. **Hero** - Aurora background, animated pizza visual
3. **Highlights** - Feature cards with monster stamp
4. **Menu** - Tabbed categories with badges
5. **Specials** - Today's deals with add-to-order
6. **About** - Story with chef's note
7. **Gallery** - Grid with lightbox modal
8. **Reviews** - Customer testimonials
9. **Location** - Map placeholder & contact info
10. **Order Form** - Validated form with toast confirmation
11. **Footer** - Social links & tagline
