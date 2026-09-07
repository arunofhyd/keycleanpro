# KeyClean Pro ⌨️✨

> The professional online keyboard & screen cleaning studio. Safely freeze keystrokes, benchmark multi-key rollover, inspect screen dust, and clean your laptop or mechanical keyboard without typing junk.

**Live App**: [https://keycleanpro.vercel.app](https://keycleanpro.vercel.app)

---

## 🚀 Key Features

- **Safe Input Lock & 1-Click Fast Toggle**: Instant 1-click lock and unlock by default, plus an optional 2-second hold protection mode for aggressive scrubbing.
- **Multi-Layout Support**: Native layouts for **MacBook / Apple Magic Keyboard**, **Windows Laptop / PC**, and **100% Full-Size Desktop** (with Numpad).
- **Screen Dust & Smudge Inspector**: Dedicated inspection overlays (OLED Pure Black, Clean White, Matrix Green, Alignment Grid) to spot display smudges and dust while wiping.
- **Simultaneous Pressure (Rollover) Gauge**: Real-time multi-key rollover benchmark measuring cloth contact pressure and anti-ghosting matrix.
- **Cleaning Heatmap**: Live visual intensity map showing frequently scrubbed keys versus missed spots.
- **Zero Install, 100% Private**: Runs entirely client-side with zero permissions and zero telemetry sent to servers. Works completely offline.

---

## 🛠️ Project Structure

```
keyboard-cleaner-pro/
├── assets/              # High-res SVG and PNG vector branding & icons
├── favicon.svg          # Modern browser favicon
├── index.html           # Semantic HTML5, Schema.org SEO structured data, accessibility
├── css/
│   ├── style.css        # Bespoke design system: 3D keycaps, glassmorphism, responsive HUD
│   └── themes.css       # Cyberpunk Neon, OLED Midnight, and Emerald Matrix themes
├── js/
│   ├── layouts.js       # Key matrices for MacBook, Windows Laptop, and 100% Desktop
│   ├── cleaner.js       # Capture-phase event suppression engine, rollover tracker, heatmaps
│   └── app.js           # UI state coordinator, particle canvas, confetti cannon
└── README.md            # Documentation and guide
```

---

## 🔒 100% Private & Zero Permissions

- **No installations or extensions required**: Runs entirely within modern web browsers (Chrome, Safari, Firefox, Edge, Opera).
- **Zero data transmission**: All keystrokes, wiping telemetry, and timer metrics stay strictly inside your local browser memory.
- **Works completely offline**: Can be added to your home screen or pinned as a standalone PWA / Web App.

---

## 🧼 Safe Cleaning Tips
1. **Never spray liquids directly** onto laptop keyboards or monitors.
2. Mist **70% Isopropyl Alcohol** lightly onto a lint-free microfiber cloth.
3. Hold compressed air cans upright at a **45-degree angle** in short controlled bursts.
4. Use KeyClean Pro's **Screen Dust Mode** in pure black to spot fingerprints and oils on displays.
