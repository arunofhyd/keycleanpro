# KeyClean Pro ⌨️✨

> The ultimate online keyboard & screen cleaning studio. Lock keystrokes safely, detect multi-key rollover, inspect screen dust, and wipe your laptop or mechanical keyboard without typing garbage.

Recreated and substantially elevated from [keyboardcleaner.netlify.app](https://keyboardcleaner.netlify.app).

---

## 🚀 What Makes KeyClean Pro Better

| Feature | Original Site | **KeyClean Pro** |
| :--- | :--- | :--- |
| **Lock / Unlock Options** | Single basic button | **1-Click Fast Toggle (Default)** with optional **Hold-to-Unlock (2s radial gauge)** for aggressive wiping |
| **Visual Aesthetics** | Plain 2D buttons with basic dark background | **Cyber-Clean Glassmorphism**, 3D chamfered mechanical keycaps, ambient floating dust motes |
| **Keyboard Layouts** | Basic 60% Mac / Windows | **MacBook / Apple Magic Keyboard**, **Windows Laptop / PC**, and **100% Full-Size Desktop (with Numpad)** |
| **Rollover & Anti-Ghosting** | Single total counter | **Real-time simultaneous keypress meter** & peak rollover benchmark |
| **Screen Dust Mode** | None | **Screen Dust & Smudge Finder**: Pure OLED Black, Pure White, Matrix Green, and High-Contrast Grid |
| **Cleaning Heatmap** | None | **Visual wipe intensity overlay** (highlights frequently scrubbed keys vs missed keys) |
| **Fullscreen Protection** | None (wiping near top risks closing tabs) | **One-click Fullscreen API lock** |
| **Celebration** | Basic script | **High-FPS canvas confetti cannon** on 100% board wipe completion |
| **Offline Performance** | External ad scripts & remote CDN assets | **100% self-contained client-side**, zero latency, works completely offline |

---

## 🛠️ Project Structure

```
keyboard-cleaner-pro/
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

## 🏃 Running Locally

Since KeyClean Pro is built with vanilla HTML, CSS, and modern JavaScript, no build step or package installation is required.

### Quick Start with Python:
```bash
cd /Users/arunthomas/.gemini/antigravity-ide/scratch/keyboard-cleaner-pro
python3 -m http.server 8080
```
Open `http://localhost:8080` in your web browser.

---

## 🧼 Safe Cleaning Tips
1. **Never spray liquids directly** onto laptop keyboards or monitors.
2. Mist **70% Isopropyl Alcohol** lightly onto a lint-free microfiber cloth.
3. Hold compressed air cans upright at a **45-degree angle** in short controlled bursts.
4. Use KeyClean Pro's **Screen Dust Mode** in pure black to spot fingerprints and oils on displays.
