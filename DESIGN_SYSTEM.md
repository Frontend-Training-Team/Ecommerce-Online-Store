# LAMSA — Dark Mode Design System
### "Noir & Copper" · v1.0 · for `Ecommerce-Online-Store-v1`

> This file is the complete reference for building Dark Mode across the whole project. Every color has a name (token), a hex value, a defined use, and a computed contrast ratio.
> Approach: **Light mode stays exactly as it is.** Dark mode is added with `dark:` classes only. Nothing about the light look changes.

---

## Contents

1. [Concept — and why these colors won't look AI-generated](#1-concept--and-why-these-colors-wont-look-ai-generated)
2. [Tokens (colors)](#2-tokens-colors)
3. [Setup — 5 steps before you start](#3-setup--5-steps-before-you-start)
4. [Conversion dictionary: light color → dark token](#4-conversion-dictionary-light-color--dark-token)
5. [Replacing the old dark colors](#5-replacing-the-old-dark-colors)
6. [Component recipes](#6-component-recipes)
7. [Images, video and logo](#7-images-video-and-logo)
8. [Do / Don't](#8-do--dont)
9. [QA checklist before shipping](#9-qa-checklist-before-shipping)
10. [Appendix: file-by-file, line-by-line changes](#10-appendix-file-by-file-line-by-line-changes)

---

## 1. Concept — and why these colors won't look AI-generated

The identity is built on **the logo itself**. The logo is metallic copper; sampling its pixels gives these tones:

| Position in the logo | Hex |
|---|---|
| Dark shade | `#A26742` |
| Mid-tone | `#BF815B` |
| Highlight | `#E1A477` |

So Dark Mode here = **deep warm black + the logo's copper**, like a luxury furniture showroom under low light: the background recedes, and the product and the copper details come forward.

### The rules that make it look designed, not generated

1. **No `#000000`, and no `#FFFFFF` for text.** Our black carries a very faint warmth (hue ≈ 30°) and text is ivory `#F1EBE2`. Pure black against pure white "vibrates" and looks cheap.
2. **One accent only (copper)**, covering less than 10% of the screen: prices, the primary button, active states, focus. No purple, no neon blue, no colorful gradients, no glow.
3. **Depth through lightness, not shadow.** Each higher layer is one small, fixed step lighter than the one beneath it (the elevation ladder). Shadows barely show on dark, so we rely on the step plus a hairline border.
4. **Borders are thin and quiet** (`line`). Only form controls get the stronger `line-control` border, so they meet the 3:1 WCAG requirement for component boundaries.
5. **Status colors are desaturated**: sage green, amber, terracotta, dusty blue, teal. They sit well with copper and don't read as "Tailwind defaults".
6. **The copper button has dark text** (`#140D08`), not white. It reads like engraved brass, and gives 6.2:1 contrast instead of 3.9:1 with white.
7. **Large headings (Instrument Serif) are ivory, not copper** in dark mode. Copper is reserved for details — that restraint is what reads as luxury.

---

## 2. Tokens (colors)

> Every contrast ratio here is computed with the WCAG 2.1 formula (not estimated). Required: body text ≥ 4.5, large text / icons / component borders ≥ 3.

### 2.1 Surfaces — `noir` (the elevation ladder)

| Token | Hex | Tailwind | Use |
|---|---|---|---|
| `noir-950` | `#070605` | `dark:bg-noir-950` | Deepest point: video overlay, label on the green badge |
| `noir-900` | `#0B0A09` | `dark:bg-noir-900` | **Page background** (body / StoreLayout / full-width sections) |
| `noir-850` | `#100E0D` | `dark:bg-noir-850` | A section set apart as a band (Quote, Footer), sidebar |
| `noir-800` | `#151312` | `dark:bg-noir-800` | **Cards** (product card, order card, summary, profile) |
| `noir-750` | `#1B1917` | `dark:bg-noir-750` | Raised element inside a card: inputs, table rows, hover on a card, chips |
| `noir-700` | `#23201D` | `dark:bg-noir-700` | Modals, dropdowns, popovers, grey buttons (`bg-gray-200` in light), skeletons |
| `noir-650` | `#2B2825` | `dark:bg-noir-650` | Hover on `noir-700`, selected / pressed element |
| `noir-600` | `#36322E` | `dark:bg-noir-600` | Hover on `noir-650`, empty rating stars, scrollbar thumb |

**Ladder rule:** the closer an element "rises" toward the user, the lighter its step. Never put `noir-800` inside `noir-750`.

```
noir-900 (page)
  └── noir-800 (card)
        └── noir-750 (input / row / hover)
              └── noir-700 (popover / modal)
                    └── noir-650 (selected)
```

### 2.2 Text — `fg`

| Token | Hex | Tailwind | on noir-900 | on noir-800 | on noir-750 | Use |
|---|---|---|---:|---:|---:|---|
| `fg` | `#F1EBE2` | `dark:text-fg` | 16.7 | 15.6 | 14.8 | Headings, primary text, key numbers |
| `fg-secondary` | `#BFB5A8` | `dark:text-fg-secondary` | 9.8 | 9.2 | 8.7 | Paragraphs, labels, inactive nav links |
| `fg-tertiary` | `#9A9083` | `dark:text-fg-tertiary` | 6.3 | 5.9 | 5.6 | Secondary text, dates, struck-through price, quiet icons |
| `fg-placeholder` | `#7C7369` | `dark:placeholder:text-fg-placeholder` | 4.3 | 4.0 | 3.8 | Placeholders only (never real text) |
| `fg-disabled` | `#5E5750` | `dark:text-fg-disabled` | 2.8 | 2.6 | 2.5 | Disabled items and decorative dots only |
| `fg-on-accent` | `#140D08` | `dark:text-fg-on-accent` | — | — | — | Text on the copper button (6.2 on copper-500) |

> **Note:** `fg-tertiary` on `noir-650` = 4.4 (below the threshold). For text on `noir-650`, use `fg-secondary`.

### 2.3 Borders — `line`

| Token | Hex | Tailwind | Use |
|---|---|---|---|
| `line-subtle` | `#1E1B19` | `dark:border-line-subtle` | Dividers inside a card, `divide-*`, navbar bottom edge |
| `line` | `#2A2623` | `dark:border-line` | **Default border** for cards and sections |
| `line-strong` | `#3B3632` | `dark:border-line-strong` | Outline buttons, cards that need more presence, round icon buttons |
| `line-hover` | `#4D4640` | `dark:hover:border-line-hover` | Hover on any border |
| `line-control` | `#6B6359` | `dark:border-line-control` | Borders of inputs / selects / checkboxes / OTP (3.1:1 on noir-800 ✓) |

### 2.4 Copper — `copper` (from the logo)

> This scale uses **the exact values already in your `tailwind.config.js`** (only `800` is added), so none of the existing classes break.

| Token | Hex | on noir-900 | on noir-800 | Use in dark |
|---|---|---:|---:|---|
| `copper-200` | `#F0CDAF` | 13.2 | 12.4 | Heading on a `copper-900` background (Newsletter) |
| `copper-300` | `#E8B58F` | 10.8 | 10.1 | **Hover** for copper links and text, active nav link, Confirmed status |
| `copper-400` | `#D99B70` | 8.4 | 7.8 | **Primary copper text**: prices, links, highlighted icons, **focus ring** |
| `copper-500` | `#C98156` | 6.4 | 6.0 | **Primary button background** (label in `fg-on-accent`) |
| `copper-600` | `#A8653F` | 4.3 | 4.1 | Copper borders (selected card, active tab edge) — not for text |
| `copper-700` | `#7E4A2D` | — | — | (The main light-mode brand color — not used in dark) |
| `copper-800` | `#4A2E1D` | — | — | Border on a `copper-900` background |
| `copper-900` | `#2A1B12` | — | — | "Copper plate" background (Newsletter, copper chip, avatar) — `copper-400` on it = 7.0 |

**Primary button:**

| State | Background | Label | Contrast |
|---|---|---|---:|
| Default | `copper-500` `#C98156` | `fg-on-accent` `#140D08` | 6.2 |
| Hover | `copper-400` `#D99B70` | `fg-on-accent` | 8.1 |
| Active | `copper-500` + `active:scale-95` (already in your code) | — | — |
| Disabled | `opacity-50` (same as light) | — | — |

> Note: in dark mode, hover **lightens** instead of darkening (the opposite of light mode) — that's the natural behavior on a black background.

### 2.5 Status — `state`

| Token | Hex | Tint (background) | Border | Use |
|---|---|---|---|---|
| `state-success` | `#82BD98` | `/10` | `/25` | Success, Delivered, In stock |
| `state-success-solid` | `#5E9F78` | — | — | Solid badge (the `-20%` discount) — label `noir-950` (6.5:1) |
| `state-warning` | `#DDB064` | `/10` | `/25` | Warning, Pending, Low stock |
| `state-danger` | `#E5857A` | `/10` | `/25` | Errors, Cancelled, validation messages, delete |
| `state-danger-solid` | `#B44E42` | — | — | Solid delete button — white label (5.1:1) |
| `state-info` | `#8DB0D2` | `/10` | `/25` | Information, Processing |
| `state-shipped` | `#7DBDB5` | `/10` | `/25` | Shipped (muted teal — replaces the old violet) |
| `state-confirmed` | `#E8B58F` | `/10` | `/25` | Confirmed (same as `copper-300` — the "brand" status) |
| `state-neutral` | `#A39B91` | `/10` | `/25` | Returned, Unknown |

**Unified badge pattern:**

```html
dark:bg-state-{x}/10 dark:text-state-{x} dark:border-state-{x}/25
<!-- and the dot -->
dark:bg-state-{x}
```

### 2.6 Special colors

| Token | Hex | Tailwind | Use |
|---|---|---|---|
| `star` | `#E3B869` | `dark:fill-star dark:text-star` | Filled rating stars (an empty star = `noir-600`) |
| `champagne` | `#D9C29A` | `dark:text-champagne` | Optional: a small eyebrow above a heading, a "Premium" tag. Use very sparingly |

### 2.7 Shadows

| Token | Value | Use |
|---|---|---|
| `shadow-noir-sm` | `0 1px 2px 0 rgb(0 0 0 / .5)` | Buttons, chips |
| `shadow-noir-md` | `0 8px 24px -8px rgb(0 0 0 / .6)` | Dropdowns, toasts |
| `shadow-noir-lg` | `0 24px 48px -16px rgb(0 0 0 / .75), 0 0 0 1px rgb(255 255 255 / .04)` | Modals |

Rule: regular cards in dark mode get **`dark:shadow-none`** — the `line` border is enough. Shadows are reserved for floating elements (modal / dropdown / toast).

### 2.8 Overlays

| Use | Class |
|---|---|
| Modal backdrop | `bg-black/50 dark:bg-black/70 backdrop-blur-sm` |
| Overlay on the Hero video | `bg-black/60 dark:bg-noir-950/70` |
| Glass pill on top of an image | `dark:bg-noir-900/85 dark:backdrop-blur-sm dark:ring-1 dark:ring-white/10` |
| Text selection | `rgba(217,155,112,.28)` — in `index.css` |

---

## 3. Setup — 5 steps before you start

### Step 1 — `tailwind.config.js`

Replace the whole `colors` block with the one below. The old `ink`, `content`, `surface` and `brand` groups **aren't used in any file**, so you can remove them. `copper` keeps your values plus `800`, and `state` keeps the same key names with new, muted values so the existing classes in `OrderItem.jsx` keep working.

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Instrument: ['"Instrument"', 'Instrument Serif'],
        Serif: ['"Playfair Display"', 'serif'],
        numeric: ['"JetBrains Mono"', 'monospace'],
        Inter: ['"Inter"', 'sans-serif'],
      },
      colors: {
        noir: {
          950: '#070605', 900: '#0B0A09', 850: '#100E0D', 800: '#151312',
          750: '#1B1917', 700: '#23201D', 650: '#2B2825', 600: '#36322E',
        },
        fg: {
          DEFAULT: '#F1EBE2', secondary: '#BFB5A8', tertiary: '#9A9083',
          placeholder: '#7C7369', disabled: '#5E5750', 'on-accent': '#140D08',
        },
        line: {
          subtle: '#1E1B19', DEFAULT: '#2A2623', strong: '#3B3632',
          hover: '#4D4640', control: '#6B6359',
        },
        copper: {
          200: '#F0CDAF', 300: '#E8B58F', 400: '#D99B70', 500: '#C98156',
          600: '#A8653F', 700: '#7E4A2D', 800: '#4A2E1D', 900: '#2A1B12',
        },
        state: {
          success: '#82BD98', 'success-solid': '#5E9F78',
          warning: '#DDB064',
          danger: '#E5857A', 'danger-solid': '#B44E42',
          info: '#8DB0D2', shipped: '#7DBDB5', confirmed: '#E8B58F', neutral: '#A39B91',
        },
        star: '#E3B869',
        champagne: '#D9C29A',
      },
      boxShadow: {
        'noir-sm': '0 1px 2px 0 rgb(0 0 0 / 0.5)',
        'noir-md': '0 8px 24px -8px rgb(0 0 0 / 0.6)',
        'noir-lg': '0 24px 48px -16px rgb(0 0 0 / 0.75), 0 0 0 1px rgb(255 255 255 / 0.04)',
      },
    },
  },
  plugins: [],
}
```

> **Tested:** built on Tailwind 4.3 + `@config`. All of these classes compile correctly, including `dark:text-fg` and `dark:border-line` (the `DEFAULT` key), `dark:bg-state-danger/10`, and `dark:bg-noir-900/85` (opacity works on hex-defined colors).

### Step 2 — `src/index.css`

Add this **after** the `@font-face` rules and before `@layer utilities`:

```css
/* ==== Dark Mode — Lamsa Noir ==== */

/* (optional) makes dark: also apply to html.dark itself, not only its descendants */
@custom-variant dark (&:where(.dark, .dark *));

:root { color-scheme: light; }
.dark  { color-scheme: dark; }          /* native scrollbars, date picker and select turn dark */

.dark body {
  background-color: #0B0A09;            /* noir-900 — prevents any white flash */
  color: #F1EBE2;                       /* fg */
}

.dark ::selection { background: rgba(217, 155, 112, .28); color: #F1EBE2; }

/* Scrollbar */
.dark ::-webkit-scrollbar-track { background: #0B0A09; }
.dark ::-webkit-scrollbar-thumb { background: #2B2825; border: 2px solid #0B0A09; border-radius: 10px; }
.dark ::-webkit-scrollbar-thumb:hover { background: #3B3632; }

/* Autofill — Chrome paints a light background on the input */
.dark input:-webkit-autofill,
.dark input:-webkit-autofill:hover,
.dark input:-webkit-autofill:focus {
  -webkit-text-fill-color: #F1EBE2;
  caret-color: #F1EBE2;
  box-shadow: 0 0 0 1000px #1B1917 inset;   /* noir-750 */
}

/* Unified focus ring (for elements with no focus style of their own) */
.dark :focus-visible { outline-color: #D99B70; }

/* Stop staggered transitions while switching themes */
.theme-switching *, .theme-switching *::before, .theme-switching *::after {
  transition: none !important;
}

/* Calm down the spinning border on the OTP page in dark mode */
.dark .form-spinning-border::before {
  background: conic-gradient(transparent 0 70%, rgba(217, 155, 112, .45));
  animation-duration: 14s;
}
```

### Step 3 — `index.html`

```html
<head>
  <meta charset="UTF-8" />
  <meta name="theme-color" content="#FFFFFF" />
  <meta name="color-scheme" content="light dark" />
  ...
  <script>
    (function () {
      var saved = null;
      try { saved = localStorage.getItem('theme'); } catch (e) {}
      var dark = saved ? saved === 'dark'
                       : window.matchMedia('(prefers-color-scheme: dark)').matches;
      var root = document.documentElement;
      root.classList.toggle('dark', dark);
      root.setAttribute('data-theme', dark ? 'dark' : 'light');
      document.querySelector('meta[name="theme-color"]')
        .setAttribute('content', dark ? '#0B0A09' : '#FFFFFF');
    })();
  </script>
</head>
```

### Step 4 — Fix `src/hooks/useDarkMode.js` (important)

**The current hook has a bug:** its `useEffect` writes `localStorage.setItem('theme', ...)` as soon as the page loads, even if the user never touched the switch. Result: after the first visit the site **stops following the system setting** — the opposite of the intended default (follow the device).

The fix: save only when the user clicks, and listen for system changes as long as the user hasn't made a choice:

```js
import { useState, useEffect, useCallback } from 'react';

const KEY = 'theme';
const mq = () => window.matchMedia('(prefers-color-scheme: dark)');
const readSaved = () => { try { return localStorage.getItem(KEY); } catch { return null; } };

export const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = readSaved();
    return saved ? saved === 'dark' : mq().matches;
  });

  // Apply the theme to <html>
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('theme-switching');
    root.classList.toggle('dark', isDark);
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', isDark ? '#0B0A09' : '#FFFFFF');
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => root.classList.remove('theme-switching')));
    return () => cancelAnimationFrame(id);
  }, [isDark]);

  // Follow the system setting until the user picks a theme
  useEffect(() => {
    const m = mq();
    const onChange = (e) => { if (!readSaved()) setIsDark(e.matches); };
    m.addEventListener('change', onChange);
    return () => m.removeEventListener('change', onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      try { localStorage.setItem(KEY, next ? 'dark' : 'light'); } catch {}
      return next;
    });
  }, []);

  return { isDark, toggleTheme };
};

export default useDarkMode;
```

> Note: this hook holds local state. Today only `Navbar` uses it, so that's fine. If you need `isDark` elsewhere (e.g. the Toaster), move it into a `ThemeContext` instead of calling the hook twice (the two copies would drift out of sync).

### Step 5 — The Toaster in `src/App.jsx`

The inline `style` wins over any class, so remove it and use `className` with `!`:

```jsx
<Toaster
  position="top-center"
  toastOptions={{
    duration: 2000,
    className:
      '!bg-white !text-black ' +
      'dark:!bg-noir-700 dark:!text-fg dark:!border dark:!border-line dark:!shadow-noir-md',
    success: { iconTheme: { primary: '#5E9F78', secondary: '#FFFFFF' } },
    error:   { iconTheme: { primary: '#B44E42', secondary: '#FFFFFF' } },
  }}
/>
```

> These icon colors work in both themes and replace the library's default neon green and red.

---

## 4. Conversion dictionary: light color → dark token

This is the rule to follow for **any** color in the project. The project has **261 distinct colors** in light mode (most of them near-identical beige shades), and they all collapse into these roles:

### 4.1 Backgrounds `bg-*`

| If the light color is… | Examples from the project | Use in dark |
|---|---|---|
| Page background / full-width section (white) | `bg-white` on `<section>` and `min-h-screen`, `bg-[#ffffff]`, `bg-[#FAFAF8]`, `bg-gray-50` | `dark:bg-noir-900` |
| Grey section / distinct band | `bg-[#E4E4E4]` (Quote), `bg-gray-100` on `<section>` | `dark:bg-noir-850` |
| White or off-white card | `bg-white`, `bg-[#FAF7F3]`, `bg-[#FAF8F6]`, `bg-[#FAFAFA]`, `bg-[#FAF6F2]`, `bg-[#FAF8F5]` | `dark:bg-noir-800` |
| Input / element inside a card / light beige | `bg-[#F2EFEA]`, `bg-gray-100`, `bg-[#FAF5F0]`, `bg-[#F2EBE5]`, `bg-[#F1ECE6]`, `bg-[#F7F5F2]`, `bg-slate-100`, `focus:bg-white` | `dark:bg-noir-750` |
| Modal / dropdown | `bg-white` / `bg-[#FAF7F3]` inside `fixed inset-0` or `absolute … shadow z-*` | `dark:bg-noir-700` |
| Grey button / element, skeleton | `bg-gray-200`, `bg-[#E8E2DC]`, `bg-[#EBE7E1]`, `bg-[#EDE8E3]`, `bg-[#EFE6DC]`, `bg-[#F3E8DF]` | `dark:bg-noir-700` |
| Hover on grey | `hover:bg-gray-300`, `hover:bg-[#E4DDD4]`, `hover:bg-[#F2E8DF]`, `bg-[#DFD9D2]`, `bg-[#D6D0CA]` | `dark:hover:bg-noir-650` (or `noir-600` if the base is `noir-650`) |
| Hover on a card | `hover:bg-[#FAF8F6]`, `hover:bg-[#FAF8F5]`, `hover:bg-white` | `dark:hover:bg-noir-750` |
| Solid copper button | `bg-[#8A4526]`, `bg-[#8E4726]`, `bg-[#7E4A2D]`, `bg-[#9A4D2C]`, `bg-[#9c4f2c]`, `bg-[#8A4C1E]`, `bg-[#8B5E3C]`, `bg-[#c07a50]`, `bg-[#D88D68]`, `bg-[#70381F]` | `dark:bg-copper-500` + `dark:text-fg-on-accent` |
| Copper button hover | `hover:bg-[#72361D]`, `hover:bg-[#683C23]`, `hover:bg-[#75391E]`, `hover:bg-[#7D3E21]`, `hover:bg-[#70482F]`, `hover:bg-[#B67352]`, `hover:bg-[#ad6a42]` | `dark:hover:bg-copper-400` |
| Transparent copper tint | `bg-[#D88D68]/15`, `hover:bg-[#c07a50]/5` | `dark:bg-copper-400/15` / `dark:hover:bg-copper-400/5` |
| Light copper chip / avatar | `bg-[#F2EBE5] text-[#8A4526]` (Profile), `bg-[#d4a373]` | `dark:bg-copper-900 dark:text-copper-300` |
| Red tint | `bg-red-50`, `bg-red-100`, `bg-[#FEE2E2]`, `bg-rose-50`, `hover:bg-[#FFF1F2]` | `dark:bg-state-danger/10` |
| Green tint | `bg-emerald-50/100`, `bg-[#E8F0EA]`, `bg-[#E1EFE5]`, `bg-[#e6f4ea]`, `bg-[#D1FADF]` | `dark:bg-state-success/10` |
| Amber tint | `bg-amber-50`, `bg-[#FAF1E4]`, `bg-[#FFF7ED]` | `dark:bg-state-warning/10` |
| Blue / purple / indigo tint | `bg-blue-50/100`, `bg-indigo-100`, `bg-purple-50`, `bg-[#EEF2FF]` | `dark:bg-state-info/10` |
| Cyan tint | `bg-cyan-50` | `dark:bg-state-shipped/10` |
| Solid green | `bg-[#00B207]`, `bg-[#2F6B4F]`, `bg-emerald-500` | `dark:bg-state-success-solid` + `dark:text-noir-950` |
| Solid red | `bg-red-500` | `dark:bg-state-danger-solid` (white label stays) |
| Dark solid (black button in light) | `bg-[#211C18] text-white`, `bg-gray-900 text-white` | `dark:bg-fg dark:text-noir-900` (becomes ivory) |
| Dark brown pill on an image | `bg-amber-950` (ProductCard category) | `dark:bg-noir-900/85` |
| Transparent overlay | `bg-black/40`, `bg-black/50`, `bg-white/10` over video / image | **Leave as is** (theme-neutral) |

### 4.2 Text and icons `text-*` / `fill-*`

| If the light color is… | Examples from the project | Use in dark |
|---|---|---|
| Very dark text (headings, primary) | `text-[#211C18]`, `text-[#2D241E]`, `text-[#2d2421]`, `text-[#1E1915]`, `text-[#1E1E1E]`, `text-[#1F2937]`, `text-[#3A332D]`, `text-[#222222]`, `text-black`, `text-gray-800/900`, `text-slate-800/900` | `dark:text-fg` |
| Mid grey / brown text | `text-[#4A423C]`, `text-[#6F655D]`, `text-[#706861]`, `text-[#5C4A3E]`, `text-[#574940]`, `text-[#635B53]`, `text-[#5B5B5B]`, `text-gray-600/700`, `text-slate-700` | `dark:text-fg-secondary` |
| Quiet text / dates / icons | `text-[#8C7A6E]`, `text-[#8c7b70]`, `text-[#8C837B]`, `text-[#828282]`, `text-[#7B7B7B]`, `text-[#A3968F]`, `text-[#A69B91]`, `text-[#9CA3AF]`, `text-gray-400/500`, `text-slate-400/500` | `dark:text-fg-tertiary` |
| Placeholder | `placeholder-[#a39489]`, `placeholder-[#828282]`, `placeholder-[#888888]`, `placeholder:text-gray-400`, `placeholder-slate-400` | `dark:placeholder:text-fg-placeholder` (or `dark:placeholder-fg-placeholder`, matching the syntax on that line) |
| Copper text / link / price | `text-[#8A4526]`, `text-[#8E4726]`, `text-[#7E4A2D]`, `text-[#9A4D2C]`, `text-[#c07a50]`, `text-[#D88D68]`, `text-[#6F4723]`, `text-[#7B542B]`, `text-[#6B4935]`, `text-[#A4775B]` | `dark:text-copper-400` |
| Copper hover | `hover:text-[#8A4526]`, `hover:text-[#8E4726]`, `hover:text-[#7E4A2D]`, `hover:text-[#9A4D2C]`, `group-hover:text-[#7E4A2D]` | `dark:hover:text-copper-300` |
| **Large copper heading** (`font-Instrument` / `font-Serif` + `text-3xl` or larger) | `text-[#9c4f2c]`, `text-[#8E4726]` in "Featured Products" / "How it Works" / "Shop by Category" | `dark:text-fg` (**not** copper) |
| White text on a copper button | `text-white` with `bg-[#8A4526]`… | `dark:text-fg-on-accent` |
| White text on image / video / solid red | `text-white` in Hero, 404 and on `bg-red-500` | **Leave as is** |
| Form error messages | `text-[#8E4726]` under inputs (Login/Register/ForgetPassword), `text-red-500/600/700`, `text-[#DC2626]`, `text-[#A83A2C]` | `dark:text-state-danger` |
| Green | `text-emerald-600/700`, `text-[#2F6B4F]`, `text-[#15803D]`, `text-[#1e8e3e]` | `dark:text-state-success` |
| Amber / orange | `text-[#7A4E14]` (inside a badge), `text-[#C2410C]` | `dark:text-state-warning` |
| Blue / indigo | `text-blue-700`, `text-indigo-600/700`, `text-[#4338CA]`, `text-[#4F46E5]` | `dark:text-state-info` |
| Filled star | `fill-[#F5A623] text-[#F5A623]`, `fill-[#F59E0B] text-[#F59E0B]` | `dark:fill-star dark:text-star` |
| Empty star | `fill-gray-200 text-gray-200` | `dark:fill-noir-600 dark:text-noir-600` |
| Focus on an icon | `group-focus-within:text-indigo-500` | `dark:group-focus-within:text-copper-400` |

### 4.3 Borders `border-*` / `ring-*` / `divide-*`

| If the light color is… | Examples from the project | Use in dark |
|---|---|---|
| Very light border inside a card | `border-gray-100`, `border-gray-100/80` | `dark:border-line-subtle` |
| Regular card border | `border-[#EDE8E3]`, `border-[#E3DEDA]`, `border-[#E8DDD4]`, `border-[#EAE1DB]`, `border-[#DFDFDF]`, `border-[#EBE1D7]`, `border-[#E3DDD5]`, `border-gray-200`, `border-slate-200`, `divide-[#EAE1DB]` | `dark:border-line` / `dark:divide-line` |
| Stronger border / outline button | `border-[#DDD7D1]`, `border-[#D6D0CA]`, `border-[#D6CFC7]`, `border-[#D0D2D7]`, `border-[#D0D0D0]`, `border-[#E0D3C6]`, `border-[#D8C2B6]`, `border-[#DFC9BA]`, `border-[#C5A893]`, `border-[#5B5B5B]`, `border-slate-300` | `dark:border-line-strong` |
| Input / select / checkbox border | `border-[#DDD7D1]` / `border-gray-200` / `border-[#e8dfd5]` / `border-[#9F9F9F]` on `<input>` | `dark:border-line-control` |
| Hover on a border | `hover:border-gray-300`, `hover:border-[#D6D0CA]`, `hover:border-[#D8C2B6]` | `dark:hover:border-line-hover` |
| Copper border | `border-[#8A4526]`, `border-[#8E4726]`, `border-[#7E4A2D]`, `border-[#c07a50]`, `border-[#D88D68]`, `border-[#C9B09D]` | `dark:border-copper-600` |
| Copper border hover | `hover:border-[#8A4526]`, `hover:border-[#9A4D2C]`, `hover:border-[#7E4A2D]/40` | `dark:hover:border-copper-500` (or `/40`) |
| Input focus | `focus:border-[#8A4526]`, `focus:border-[#c07a50]`, `focus:ring-[#8E4726]`, `focus:border-indigo-500`, `focus:ring-indigo-500/20`, `focus:border-slate-400`, `focus:border-amber-900/50` | `dark:focus:border-copper-400 dark:focus:ring-copper-400/25` |
| Status border | `border-red-200`, `border-emerald-200`, `border-blue-200`, `border-amber-200/60`, `border-[#FCA5A5]`, `border-[#CBDFD1]`, `border-[#FFEDD5]`, `border-[#E0E7FF]` | `dark:border-state-{x}/25` |
| Ring matching the card color (cuts the stepper line) | `ring-[#FAF7F3]` | `dark:ring-noir-800` |
| White border over video | `border-white/20`, `hover:border-white` in the Hero / home Navbar | **Leave as is** |

---

## 5. Replacing the old dark colors

The project already has **~690 `dark:` classes**, but they use 120 different colors in a mix of warm brown (`#2b2522`, `#1c1816`) + cool grey (`slate-800`, `#16181D`, `#2F333B`) + gold (`#cca474`, `#fcba69`) + neon (`#4ADE9B`, `#A78BFA`). That mix is exactly what makes it feel inconsistent. Replace them like this (Find & Replace in VS Code with Match Case on):

| Old | New | Note |
|---|---|---|
| `dark:bg-[#121417]` | `dark:bg-noir-900` | StoreLayout |
| `dark:bg-[#141110]`, `dark:bg-[#12141A]`, `dark:bg-slate-950` | `dark:bg-noir-900` | Page backgrounds |
| `dark:bg-[#12100E]`, `dark:bg-[#171411]` | `dark:bg-noir-850` / `dark:bg-noir-800` | Quote / Featured |
| `dark:bg-[#1c1816]`, `dark:bg-[#181412]`, `dark:bg-[#1A1817]` | `dark:bg-noir-800` | Cards |
| `dark:bg-[#221d1a]` | `dark:bg-noir-800` (card) / `dark:bg-noir-750` (outline button) | Depends on context — the appendix specifies |
| `dark:bg-[#261e1b]`, `dark:bg-[#2a2420]`, `dark:bg-[#1F232B]`, `dark:bg-slate-800` (inputs / pagination) | `dark:bg-noir-750` | |
| `dark:bg-[#2b2522]` (60 times — skeletons) | `dark:bg-noir-700` | |
| `dark:bg-[#16181D]` (navbar) | `dark:bg-noir-900/85` | See the Navbar recipe |
| `dark:bg-[#2a221a]`, `dark:bg-[#29211c]`, `dark:bg-[#25201c]` | `dark:bg-noir-700`, or `dark:bg-copper-900` for a copper chip | |
| `dark:bg-[#3a322d]`, `dark:bg-[#342823]`, `dark:bg-slate-700` | `dark:bg-noir-650` | Hover |
| `dark:bg-[#A3522C]`, `dark:bg-amber-700`, `dark:bg-[#cca474]` (buttons) | `dark:bg-copper-500` + `dark:text-fg-on-accent` | |
| `dark:hover:bg-[#8E4726]`, `dark:hover:bg-amber-800` | `dark:hover:bg-copper-400` | In dark, hover lightens |
| `dark:border-[#2e2724]` (39 times), `dark:border-[#282D37]`, `dark:border-[#2E2A27]`, `dark:border-[#332b26]` | `dark:border-line` | |
| `dark:border-[#3a322d]`, `dark:border-[#48342d]`, `dark:border-[#4a3a2a]`, `dark:border-[#2F333B]` | `dark:border-line-strong` | |
| `dark:border-slate-800`, `dark:border-slate-700`, `dark:border-gray-700` (on inputs) | `dark:border-line-control` | |
| `dark:border-[#B25B32]` | `dark:border-copper-600` | |
| `dark:focus:ring-[#B25B32]`, `dark:focus:border-amber-600` | `dark:focus:ring-copper-400` / `dark:focus:border-copper-400` | |
| `dark:text-[#f3ede6]`, `dark:text-[#F5F1EA]`, `dark:text-[#E5E7EB]`, `dark:text-slate-100`, `dark:text-white` (regular text) | `dark:text-fg` | |
| `dark:text-[#c5b6a3]`, `dark:text-[#A0A5AE]`, `dark:text-slate-200/300`, `dark:text-gray-300` | `dark:text-fg-secondary` | |
| `dark:text-[#a38f7d]` (22 times), `dark:text-[#8f7e71]`, `dark:text-[#9CA3AF]`, `dark:text-gray-400`, `dark:text-slate-400/500`, `dark:text-[#8C8F96]`, `dark:text-[#A99A8F]` | `dark:text-fg-tertiary` | |
| `dark:placeholder-[#6B7280]`, `dark:placeholder-[#7E8590]`, `dark:placeholder-[#786c64]`, `dark:placeholder-slate-500` | `dark:placeholder-fg-placeholder` | |
| `dark:text-[#fcba69]`, `dark:text-[#e2a890]`, `dark:text-[#C86D43]`, `dark:text-[#C99A78]` | `dark:text-copper-400` | |
| `dark:text-[#cca474]` (card-header icons) | `dark:text-fg-tertiary`, or `dark:text-copper-400` for a touch of copper | Taste call — default is tertiary |
| `dark:text-[#E57373]`, `dark:text-red-400` | `dark:text-state-danger` | |
| `dark:text-emerald-400` | `dark:text-state-success` | |
| `dark:text-blue-400`, `dark:text-indigo-400` | `dark:text-state-info` | |
| `dark:text-amber-400` | `dark:text-state-warning` | |
| `dark:bg-red-500/10`, `dark:border-red-500/20` | `dark:bg-state-danger/10`, `dark:border-state-danger/25` | Same idea for emerald / blue / indigo |
| `dark:bg-[rgba(…,0.10)]` in `OrderItem.jsx` | `dark:bg-state-{x}/10` | See 6.10 |
| `dark:bg-[#4ADE9B]` | `dark:bg-state-success` | |
| `dark:from-[#cca474] dark:to-[#cca474]` | `dark:from-copper-500 dark:to-copper-500` | Progress bar |
| `dark:shadow-lg dark:shadow-black/20` on cards | `dark:shadow-none` | Cards don't need a shadow |

> **Note:** don't "Replace All" on `dark:bg-[#221d1a]` — it's used in two different roles. The appendix (section 10) tells you exactly what each line becomes.

---

## 6. Component recipes

> These recipes are ready to copy. Priority: **the recipe here > the auto-generated appendix** wherever they differ. Files with a complete recipe here (`Navbar`, `HeroSection`, `Footer`, `ProductCard`, `PageNotFound`) are intentionally left out of the appendix.

### 6.1 Layout — `StoreLayout.jsx`

```jsx
<div className="min-h-screen flex flex-col bg-[#ffffff] dark:bg-noir-900
  text-[#222222] dark:text-fg font-sans transition-colors duration-200">
```

- Every `<section>` with `bg-white` → `dark:bg-noir-900` (same as the page, not a card).
- A section that should read as a distinct band → `dark:bg-noir-850` (the difference is deliberately subtle).
- **Don't** alternate `noir-900` / `noir-800` / `noir-900` sections back to back — that's what templates look like.

### 6.2 Navbar — `Navbar.jsx` (complete recipe)

| Element | Dark classes |
|---|---|
| `<header>` on inner pages (line 90) | `dark:bg-noir-900/85 dark:backdrop-blur-md dark:border-line-subtle` instead of `dark:bg-[#16181D] dark:border-[#2F333B]` |
| `<header>` on home | Stays `bg-transparent` (over the video) |
| Inactive nav link | `dark:text-fg-secondary dark:hover:text-fg` instead of `dark:text-[#A0A4AB] dark:hover:text-white` |
| Active nav link | `dark:text-copper-300` instead of `dark:text-white` |
| Active mobile link | `dark:bg-noir-750 dark:text-copper-300` |
| Mobile link hover | `dark:hover:bg-noir-750 dark:hover:text-fg` |
| Round buttons (Wishlist / Cart / Menu / Search) | `dark:bg-noir-800 dark:border-line-strong dark:text-fg-secondary dark:hover:border-line-hover dark:hover:text-fg` instead of `dark:bg-[#202327] dark:border-[#2F333B] dark:text-[#A0A5AE]` |
| User button | Same as above + `dark:text-fg` for the name + `dark:hover:border-copper-600 dark:hover:text-copper-300` |
| Search (open) | `dark:bg-noir-750 dark:border-line-control` — input: `dark:text-fg dark:placeholder-fg-placeholder` |
| X button inside search | `dark:text-fg-tertiary dark:hover:text-fg dark:hover:bg-noir-650` |
| **Count badge** (wishlist / cart) | `dark:bg-copper-400 dark:text-fg-on-accent dark:border-transparent` instead of white |
| Vertical divider | `dark:bg-line-strong` |
| **Theme switch** — track | `dark:bg-noir-800 dark:border-line-strong` |
| Switch — dot | `dark:bg-fg-disabled` instead of `dark:bg-[#8A96A8]` (the cool one) |
| Switch — knob | `bg-white dark:bg-fg`, icon `text-[#1A1C20] dark:text-noir-900` |
| Mobile menu (inner pages) | `dark:bg-noir-850 dark:border-line-subtle` |
| Mobile menu (home) | `bg-[#161413]/95` stays (neutral) |
| Badge in the mobile menu | `bg-[#9A4D2C] dark:bg-copper-500 text-white dark:text-fg-on-accent` |
| Mobile search | `dark:bg-noir-750 dark:border-line-control dark:text-fg dark:placeholder-fg-placeholder dark:focus:border-copper-400` + icon `dark:text-fg-tertiary` |
| `<hr>` | `dark:border-line-subtle` |
| Scroll-to-top button | `bg-[#9A4D2C] dark:bg-copper-500 text-white dark:text-fg-on-accent dark:hover:bg-copper-400 dark:shadow-noir-md` |

> The logo (`4.png`) is metallic copper and looks excellent on black. Remove `dark:brightness-110` — it isn't needed and it burns out the highlights.

### 6.3 Hero — `HeroSection.jsx` (complete recipe)

The new video (`hero.mp4`) goes in `src/assets/video/hero.mp4` (the existing import path). In dark mode we deepen the overlay slightly and add a **fade at the bottom** so the Hero melts into the page instead of ending on a hard edge:

```jsx
<div className="absolute inset-0 bg-black/60 dark:bg-noir-950/70" />

{/* dark mode only */}
<div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-40
  bg-linear-to-b from-transparent to-noir-900 dark:block" />
```

| Element | Classes |
|---|---|
| "Shop Now" button | Add: `dark:bg-fg dark:text-noir-900 dark:hover:bg-copper-400 dark:hover:text-fg-on-accent` |
| "View Categories" button | Leave it (transparent over video) |
| "Premium Shopping Experience" pill | Leave it |
| Headline and paragraph | Leave them (`text-white` over video) |

> The video is 23.9 MB (1920×1080, 17 s). Consider shipping a compressed version (H.264 around CRF 28, or WebM) plus a `poster` image for first load. Not dark-mode related, but important for performance.

### 6.4 Section headings

```jsx
<h2 className="text-4xl font-Instrument text-[#9c4f2c] dark:text-fg">Shop by Category</h2>
<p className="mt-2 text-gray-500 dark:text-fg-tertiary">Browse our wide range of categories</p>
```

- Want a touch of copper? Use a thin rule under the heading (`dark:after:bg-copper-600`) or a small eyebrow above it (`text-xs tracking-[0.2em] uppercase dark:text-copper-400`) — **not** the whole heading.
- `QuoteSection`: background `dark:bg-noir-850`, text `dark:text-copper-300` (allowed here because it's a quote — one decorative element per page).
- `HowItWorks`: circles `bg-[#9c4f2c] dark:bg-transparent dark:border dark:border-copper-600 dark:text-copper-300` (a copper outline circle instead of a solid one — much more refined on black), title `dark:text-fg`, description `dark:text-fg-tertiary`.

### 6.5 Buttons

| Kind | Light (existing) | Dark — add |
|---|---|---|
| **Primary** (Add to cart, Checkout, Save) | `bg-[#8A4526] text-white hover:bg-[#72361D]` | `dark:bg-copper-500 dark:text-fg-on-accent dark:hover:bg-copper-400` |
| **Secondary / outline** | `border border-[#D8C2B6] bg-white text-[#5C4A3E] hover:bg-[#F5EFEA]` | `dark:border-line-strong dark:bg-noir-800 dark:text-fg-secondary dark:hover:bg-noir-750 dark:hover:text-fg dark:hover:border-line-hover` |
| **Soft copper** (second action in a modal) | `border-[#C5A893] bg-[#FAF5F0] text-[#6F4723]` | `dark:border-copper-800 dark:bg-copper-900 dark:text-copper-300 dark:hover:bg-copper-800` |
| **Ghost / text link** | `text-[#8A4526] hover:underline` | `dark:text-copper-400 dark:hover:text-copper-300` |
| **Grey icon button** (card, pagination) | `bg-gray-200 text-black hover:bg-gray-300` | `dark:bg-noir-700 dark:text-fg dark:hover:bg-noir-650` |
| **Danger** | `bg-red-500 text-white` | `dark:bg-state-danger-solid dark:hover:bg-[#A4463B]` (white label — here hover darkens, to keep contrast with white) |
| **Danger outline** (Remove) | `hover:border-red-200 hover:bg-red-50 hover:text-red-600` | `dark:hover:border-state-danger/25 dark:hover:bg-state-danger/10 dark:hover:text-state-danger` |
| **Inverse** (black button in light) | `bg-[#211C18] text-white` | `dark:bg-fg dark:text-noir-900 dark:hover:bg-copper-300` |
| Disabled (all) | `disabled:opacity-50` | Same — don't add colors |

### 6.6 Inputs

```jsx
// Text / Email / Password / Textarea / Select
className="bg-white border border-[#DDD7D1] text-[#211C18] placeholder-[#a39489]
  focus:border-[#8A4526] focus:ring-[#8A4526]
  dark:bg-noir-750 dark:border-line-control dark:text-fg dark:placeholder-fg-placeholder
  dark:hover:border-line-hover dark:focus:border-copper-400 dark:focus:ring-copper-400/25"

// Error state
"dark:border-state-danger dark:focus:border-state-danger dark:focus:ring-state-danger/25"

// Error message under the input
"text-[#8E4726] dark:text-state-danger"

// Label
"text-gray-700 dark:text-fg-secondary"

// Icon inside the input
"text-gray-400 dark:text-fg-tertiary group-focus-within:text-indigo-500 dark:group-focus-within:text-copper-400"
```

- **`Input.jsx`**: the current focus is `indigo-500` — that's exactly the "AI color". In dark: `dark:focus:border-copper-400 dark:focus:ring-copper-400/25`. (Consider changing it in light too, to `#8A4526`, to match the other forms — your call.)
- **Checkbox / radio**: `accent-[#8A4526] dark:accent-copper-400`.
- **Select**: thanks to `color-scheme: dark` (step 2), the native dropdown turns dark automatically.
- **Range slider** (price filter): `accent-[#8A4526] dark:accent-copper-400`; custom track: `dark:bg-noir-650`.
- **OTP boxes** (`OtpInput.jsx`, `ResetPasswordCard.jsx`): empty `dark:bg-noir-750 dark:border-line-control dark:hover:border-copper-600`, filled `dark:border-copper-400 dark:bg-noir-750`, digit `dark:text-fg`, lock icon `dark:bg-copper-400/15 dark:text-copper-400 dark:border-copper-500/20`.
- **Shop search** (`SearchInput.jsx`): same as the input + `dark:bg-noir-800` if it sits directly on the page.

### 6.7 Cards

```jsx
// Regular card (order summary, order info, address, profile sections)
"bg-[#FAF7F3] border border-[#E8DDD4] shadow-sm
 dark:bg-noir-800 dark:border-line dark:shadow-none"

// Card header (small uppercase title + icon)
"text-[#2D241E] dark:text-fg-secondary"   // text
"text-[#8C7A6E] dark:text-fg-tertiary"    // icon

// Row inside the card / hover
"hover:bg-[#FAF8F6] dark:hover:bg-noir-750"

// Divider
"border-t border-[#EBE1D7] dark:border-line-subtle"

// Clickable card (OrderItem)
"dark:bg-noir-800 dark:border-line dark:hover:border-copper-600/60"

// Selected card (default address, chosen payment method)
"dark:border-copper-600 dark:bg-copper-900/40"
```

### 6.8 Product card — `ProductCard.jsx` (complete recipe)

| Element | Light (existing) | Dark — add |
|---|---|---|
| Card | `bg-white border-2 border-gray-200` | `dark:bg-noir-800 dark:border-line` |
| Image (the clip-path div) | — | `dark:brightness-[.92]` |
| Category pill | `bg-amber-950 text-white` | `dark:bg-noir-900/85 dark:backdrop-blur-sm dark:ring-1 dark:ring-white/10 dark:text-fg` |
| Discount pill | `bg-[#00B207] text-white` | `dark:bg-state-success-solid dark:text-noir-950` |
| Brand pill | `bg-white text-[#1E1E1E]` | `dark:bg-noir-900/85 dark:backdrop-blur-sm dark:text-fg dark:ring-1 dark:ring-white/10` |
| Rating box | `bg-white border-gray-100/80` | `dark:bg-noir-750 dark:border-line` |
| Star | `fill-[#F59E0B] text-[#F59E0B]` | `dark:fill-star dark:text-star` |
| Rating number | `text-[#1E1E1E]` | `dark:text-fg` |
| Wishlist button (default) | `bg-gray-200 text-black hover:bg-gray-300 hover:text-[#DC2626]` | `dark:bg-noir-700 dark:text-fg dark:hover:bg-noir-650 dark:hover:text-state-danger` |
| Wishlist button (added) | `bg-[#FEE2E2] text-[#DC2626]` | `dark:bg-state-danger/15 dark:text-state-danger` |
| Add to cart button | `bg-gray-200 text-black hover:bg-gray-300 hover:text-[#8E4726]` | `dark:bg-noir-700 dark:text-fg dark:hover:bg-noir-650 dark:hover:text-copper-300` |
| Product name | `text-[#1E1E1E] hover:text-[#8E4726]` | `dark:text-fg dark:hover:text-copper-300` |
| Price | `text-[#8E4726]` | `dark:text-copper-400` |
| Old price | `text-[#7B7B7B]` | `dark:text-fg-tertiary` |

> Design note: the corner buttons (Wishlist / Cart) create a "notch" in the clip-path. In dark mode that notch shows the card's own `noir-800` — which is correct and consistent, so leave it.

**WishlistCard.jsx / SimilarProducts.jsx**: exactly the same recipe.

### 6.9 Product page

| Element | Dark |
|---|---|
| Large image background (`bg-[#F7F5F2]`) | `dark:bg-noir-800` + image `dark:brightness-[.92]` |
| "No image" | `dark:text-fg-tertiary` |
| Gallery arrows | `dark:bg-noir-800 dark:border-line-strong dark:text-fg-secondary dark:hover:bg-noir-750` |
| Thumbnail default / active | `dark:ring-line` / `dark:ring-2 dark:ring-copper-400` |
| Rating pill (`bg-[#FFF7ED] text-[#C2410C]`) | `dark:bg-state-warning/10 dark:text-state-warning dark:border-state-warning/25`; star `dark:text-star dark:fill-star/20` |
| Stock pill (`bg-[#EEF2FF] text-[#4338CA]`) | `dark:bg-state-info/10 dark:text-state-info dark:border-state-info/25` |
| Tabs — active (`bg-[#F5EDE6] text-[#7E4A2D]`) | `dark:bg-copper-900 dark:text-copper-300` |
| Tabs — inactive (`text-[#635B53]`) | `dark:text-fg-secondary dark:hover:bg-noir-800 dark:hover:text-fg` |
| Review count in the tab | `dark:bg-noir-650 dark:text-fg-secondary` |
| Description text (`text-[#5C544E]`) | `dark:text-fg-secondary` |
| Large average-rating number | `dark:text-fg` |
| Empty stars | `dark:fill-noir-600 dark:text-noir-600` |
| Review dividers | `dark:divide-line dark:border-line` |
| Quantity stepper | Frame `dark:border-line-control dark:bg-noir-800`, buttons `dark:text-fg-secondary dark:hover:bg-noir-750`, number `dark:text-fg` |

### 6.10 Order statuses — one unified map (important)

Right now the same status has different colors across 4 files (`processing` is purple in `OrderItem` and blue in `OrderDetail`; `confirmed` is teal in one file and copper in another…). In dark mode, use this map **everywhere**:

| Status | Color | Badge | Dot |
|---|---|---|---|
| `pending` | Amber | `dark:bg-state-warning/10 dark:text-state-warning dark:border-state-warning/25` | `dark:bg-state-warning` |
| `confirmed` | Light copper | `dark:bg-state-confirmed/10 dark:text-state-confirmed dark:border-state-confirmed/25` | `dark:bg-state-confirmed` |
| `processing` | Dusty blue | `dark:bg-state-info/10 dark:text-state-info dark:border-state-info/25` | `dark:bg-state-info` |
| `shipped` | Teal | `dark:bg-state-shipped/10 dark:text-state-shipped dark:border-state-shipped/25` | `dark:bg-state-shipped` |
| `delivered` | Sage | `dark:bg-state-success/10 dark:text-state-success dark:border-state-success/25` | `dark:bg-state-success` |
| `cancelled` | Terracotta | `dark:bg-state-danger/10 dark:text-state-danger dark:border-state-danger/25` | `dark:bg-state-danger` |
| `returned` / unknown | Neutral | `dark:bg-state-neutral/10 dark:text-state-neutral dark:border-state-neutral/25` | `dark:bg-state-neutral` |

**`OrderItem.jsx`** — replace the dark part of `statusConfig` like this (light stays as is):

```js
pending:    { badgeClass: "bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-state-warning/10 dark:text-state-warning dark:border-state-warning/25",       dotClass: "bg-amber-500 dark:bg-state-warning" },
confirmed:  { badgeClass: "bg-blue-50 text-blue-700 border-blue-200/60 dark:bg-state-confirmed/10 dark:text-state-confirmed dark:border-state-confirmed/25",   dotClass: "bg-blue-500 dark:bg-state-confirmed" },
processing: { badgeClass: "bg-purple-50 text-purple-700 border-purple-200/60 dark:bg-state-info/10 dark:text-state-info dark:border-state-info/25",           dotClass: "bg-purple-500 dark:bg-state-info" },
shipped:    { badgeClass: "bg-cyan-50 text-cyan-700 border-cyan-200/60 dark:bg-state-shipped/10 dark:text-state-shipped dark:border-state-shipped/25",         dotClass: "bg-cyan-500 dark:bg-state-shipped" },
delivered:  { badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-state-success/10 dark:text-state-success dark:border-state-success/25", dotClass: "bg-emerald-500 dark:bg-state-success" },
cancelled:  { badgeClass: "bg-rose-50 text-rose-700 border-rose-200/60 dark:bg-state-danger/10 dark:text-state-danger dark:border-state-danger/25",           dotClass: "bg-rose-500 dark:bg-state-danger" },
returned:   { badgeClass: "bg-gray-100 text-gray-700 border-gray-200 dark:bg-state-neutral/10 dark:text-state-neutral dark:border-state-neutral/25",           dotClass: "bg-gray-400 dark:bg-state-neutral" },
```

And the order card itself:

```
bg-[#FAFAFA] dark:bg-noir-800  border-[#DFDFDF] dark:border-line
hover:border-[#7E4A2D]/40 dark:hover:border-copper-600/60
Order number:  dark:text-fg  dark:group-hover:text-copper-300
Date:          dark:text-fg-tertiary
Total:         dark:text-copper-400
Item count:    dark:text-fg-tertiary
```

**`OrderDetail.jsx`** (`STATUS_BADGE_STYLES`) and **`ProfileOverview.jsx`** (status badge): use the same map.

### 6.11 Stepper — `OrderProgress.jsx`

| Element | Dark |
|---|---|
| Card | `dark:bg-noir-800 dark:border-line dark:shadow-none` |
| "3 of 5 Complete" badge | `dark:bg-copper-900 dark:text-copper-300 dark:border-copper-800` |
| Completed line | `dark:bg-copper-500` |
| Pending line | `dark:bg-noir-650` |
| Completed circle | `dark:border-copper-500 dark:bg-copper-500 dark:text-fg-on-accent dark:ring-noir-800` |
| Upcoming circle | `dark:border-line-strong dark:bg-noir-800 dark:text-fg-disabled dark:ring-noir-800` |
| Cancelled circle | `dark:border-state-danger-solid dark:bg-state-danger-solid dark:ring-noir-800` (white icon) |
| Label: completed / upcoming / cancelled | `dark:text-fg` / `dark:text-fg-tertiary` / `dark:text-state-danger` |
| Estimated arrival | `dark:border-line-subtle` + `dark:text-fg-tertiary`, value `dark:text-fg` |

> `ring-noir-800` must match the card color exactly so it "cuts" the line around each circle.

### 6.12 Pagination — `Pagination.jsx`

```
Current page:  bg-[#F1ECE6] dark:bg-noir-750  text-[#1E1E1E] dark:text-fg  border-gray-200/40 dark:border-line
Arrows:        dark:bg-noir-750 dark:text-fg dark:hover:bg-noir-650 dark:disabled:hover:bg-noir-750
"Page 1 of 5": dark:text-fg-tertiary
```

(Instead of the cool `slate-800` / `slate-700`.)

### 6.13 Filters — `FilterSidebar.jsx` + `Shop.jsx`

| Element | Dark |
|---|---|
| Drawer | `dark:bg-noir-850 dark:border-r dark:border-line-subtle` (instead of `slate-900`) |
| Backdrop | `bg-black/40 dark:bg-black/70` |
| "Filter" title | `dark:text-fg`, icon `dark:fill-fg` |
| Group headings | `dark:text-fg` |
| `<hr>` | `dark:border-line-subtle` |
| Applied filter chip | `dark:bg-noir-700 dark:text-fg-secondary` + X button `dark:hover:text-state-danger` |
| "Clear all" | `dark:text-fg-tertiary dark:hover:text-fg` |
| Option label | `dark:text-fg-secondary` + checkbox `dark:accent-copper-400` |
| "No filters applied" | `dark:text-fg-tertiary` |
| Sort button / dropdown | Button `dark:bg-noir-800 dark:border-line-strong dark:text-fg`, menu `dark:bg-noir-700 dark:border-line dark:shadow-noir-md`, item `dark:hover:bg-noir-650`, selected `dark:text-copper-300` |
| Skeleton inside the filter | `dark:bg-noir-700` |

### 6.14 Cart and checkout

| Element | Dark |
|---|---|
| Product row (`CartItemRow`) | `dark:bg-noir-800 dark:border-line` |
| Product image placeholder | `dark:bg-noir-750` + icon `dark:text-fg-tertiary` |
| Qty stepper | Frame `dark:bg-noir-750 dark:border-line-strong`, buttons `dark:text-fg-secondary dark:hover:bg-noir-650`, number `dark:text-fg` |
| Remove button | `dark:text-fg-tertiary dark:hover:text-state-danger` |
| `OrderSummaryCard` | Card `dark:bg-noir-800 dark:border-line`, rows `dark:text-fg-secondary` with values `dark:text-fg`, Total label `dark:text-fg` and amount `dark:text-copper-400`, divider `dark:border-line-subtle` |
| "Free shipping" progress | Track `dark:bg-noir-650`, fill `dark:bg-copper-500` |
| "You got free shipping" message | `dark:text-state-success` |
| `CheckoutForm` | Inputs as in 6.6; selected payment method card `dark:border-copper-600 dark:bg-copper-900/40`; unselected `dark:border-line dark:bg-noir-800` |
| `OrderSuccess` | Circle `dark:bg-state-success/10 dark:text-state-success`, title `dark:text-fg`, paragraph `dark:text-fg-tertiary` |
| `EmptyCart` | Circle `dark:bg-noir-750`, icon `dark:text-fg-tertiary`, title `dark:text-fg` |

### 6.15 Modals — `ConfirmationModal.jsx` (cart + order)

```
Backdrop:   bg-black/50 dark:bg-black/70 backdrop-blur-sm
Panel:      dark:bg-noir-700 dark:border-line dark:shadow-noir-lg      ← noir-700, not 800 (the modal is the top layer)
Icon:       dark:bg-state-danger/10  + dark:text-state-danger
Title:      dark:text-fg
Body:       dark:text-fg-tertiary
Cancel:     dark:border-line-strong dark:bg-noir-750 dark:text-fg-secondary dark:hover:bg-noir-650 dark:hover:text-fg
Confirm:    dark:border-copper-800 dark:bg-copper-900 dark:text-copper-300 dark:hover:bg-copper-800
            (or, for a delete / cancel action: dark:bg-state-danger-solid dark:text-white dark:border-transparent)
```

### 6.16 Skeletons (every file in `skeleton/`)

```
Card:          dark:bg-noir-800 dark:border-line
Blocks:        bg-gray-200 dark:bg-noir-700 animate-pulse
Second layer (if there are two): dark:bg-noir-650
```

(Instead of `#2b2522`, `gray-700` and `gray-800` — 60+ places.) The pulse on `noir-700` is calm and doesn't "flicker".

### 6.17 Profile — `ProfileSidebar`, `ProfileOverview`, `EditProfile`, `AddressBook`, `SecurityTab`

| Element | Dark |
|---|---|
| Cards | `dark:bg-noir-800 dark:border-line dark:shadow-none` |
| Avatar placeholder | `dark:bg-copper-900 dark:border-copper-800 dark:text-copper-300` |
| Name / email | `dark:text-fg` / `dark:text-fg-tertiary` |
| Role chip and counters | `dark:bg-copper-900 dark:text-copper-300` |
| Active nav item (`bg-[#8A4526] text-white`) | `dark:bg-copper-500 dark:text-fg-on-accent`, icon `dark:text-fg-on-accent` |
| Regular nav item | `dark:text-fg-secondary dark:hover:bg-noir-750 dark:hover:text-copper-300`, icon `dark:text-fg-tertiary` |
| Divider | `dark:bg-line-subtle` |
| Logout | `dark:text-state-danger dark:hover:bg-state-danger/10` |
| "Verified" badge (`bg-[#E8F0EA] text-[#2F6B4F]`) | `dark:bg-state-success/10 dark:text-state-success` |
| Default address card | `dark:border-copper-600 dark:bg-copper-900/40` + "Default" badge `dark:bg-copper-500 dark:text-fg-on-accent` |
| "Password changed" card (`border-[#CBDFD1]`) | `dark:border-state-success/25`, circle `dark:bg-state-success/10 dark:text-state-success` |

### 6.18 Auth pages — Login / Register / Forgot / OTP / Reset

| Element | Dark |
|---|---|
| Page background | `dark:bg-noir-900` |
| Card | `dark:bg-noir-800 dark:border-line` (not the cool `gray-900`) |
| Title / description | `dark:text-fg` / `dark:text-fg-tertiary` |
| Highlighted email in text | `dark:text-fg` |
| Inputs | As in 6.6 |
| Button | Primary (6.5) |
| Links (Forgot? / Sign up / Resend) | `dark:text-copper-400 dark:hover:text-copper-300` |
| Timer | `dark:text-copper-400` |
| Divider | `dark:border-line-subtle` |

### 6.19 Footer — `Footer.jsx` (complete recipe)

The SVG uses hard-coded `fill` attributes; they must become classes for `dark:` to work:

```jsx
<svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1024 288" preserveAspectRatio="none">
  <rect width="1024" height="288" className="fill-white dark:fill-noir-900" />
  <path d="M 0,90 Q 512,152 1024,90 L 1024,288 L 0,288 Z" className="fill-[#E4E4E4] dark:fill-noir-850" />
</svg>
```

| Element | Dark |
|---|---|
| Newsletter card (`bg-[#7E4A2D]`) | `dark:bg-copper-900 dark:ring-1 dark:ring-copper-800 dark:shadow-none` — a "dark copper plate" |
| Heading | `dark:text-copper-200` |
| Form (`bg-white`) | `dark:bg-noir-800 dark:ring-1 dark:ring-line-strong` |
| Input | `dark:text-fg dark:placeholder-fg-placeholder` |
| Subscribe button | `dark:bg-copper-500 dark:text-fg-on-accent dark:hover:bg-copper-400` |
| Divider line (`border-[#D0D0D0]`) | `dark:border-line` |
| Links (`text-[#4A4744]`) | `dark:text-fg-secondary dark:hover:text-copper-300` |
| Copyright | `dark:text-fg-tertiary` |

### 6.20 404 page — `PageNotFound.jsx`

The whole page sits over a video, so most of it stays as is. Change only:

```
Overlay:          bg-black/55 dark:bg-noir-950/70
Browse Products:  dark:bg-copper-500 dark:border-copper-500 dark:text-fg-on-accent dark:hover:bg-copper-400
Return to Home:   dark:bg-fg dark:text-noir-900   icon dark:text-noir-600
Focus ring:       focus-visible:ring-[#DE9E48] dark:focus-visible:ring-copper-400 dark:focus-visible:ring-offset-noir-950
```

> **Note:** `src/assets/videos/404BG.mp4` is missing from the zip (the project won't build without it). If you'll send it separately like the Hero video, put it at that path.

### 6.21 Focus & motion

- Every interactive element in dark: `dark:focus-visible:ring-2 dark:focus-visible:ring-copper-400 dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-noir-900` (change the offset to match the surface underneath).
- Transitions: keep `transition-colors duration-200` as they are. Step 4 disables them for the moment of switching so the page doesn't repaint "piece by piece".

---

## 7. Images, video and logo

| Element | Rule |
|---|---|
| Product photos (white / light-grey background) | `dark:brightness-[.92]` only. **Don't** invert, grayscale or mix-blend. The photo must stay true. |
| Category images | Same: `dark:brightness-[.92]` |
| Image placeholder | `dark:bg-noir-750` + icon `dark:text-fg-tertiary` |
| User avatar | As is + `dark:ring-1 dark:ring-line` |
| Logo `4.png` | As is — the metallic copper is made for dark backgrounds |
| Hero video | Deeper overlay + bottom fade (6.3) |
| `Guest.jpg` / `imgPlaceholder.jpg` | `dark:brightness-[.85]` if they're bright |

---

## 8. Do / Don't

| Do | Don't |
|---|---|
| Page background `noir-900` | `bg-black` or `#000` |
| Primary text `fg` (ivory) | `text-white` for regular text on a dark background |
| Copper for prices, links, the primary button, active and focus states | Copper on large headings and large backgrounds |
| Card = `noir-800` + `border-line` | Cards with a heavy `shadow-lg` in dark |
| Modal = `noir-700` + `shadow-noir-lg` | A modal the same color as the card |
| Status colors from `state-*` only | `emerald-400`, `purple-400`, `#4ADE9B`, `#A78BFA` (neon = the AI look) |
| Copper focus `copper-400` | `indigo-500` / `blue-500` focus |
| Hover lightens one step in dark | Hover darkens (it won't show) |
| Transparent `/10` tint for badges | Badges with a bright solid background |
| Inputs with a `line-control` border | Inputs with no border, or a `line-subtle` border (they won't read as inputs) |
| One color per status on every page | The same status in two colors on two pages |
| Product images at `brightness-[.92]` | Filters that change the product's colors |
| A transparent gradient for the fade only (Hero) | Colorful gradients (copper → purple, blue → purple) |
| A calm spinning border on OTP (step 2) | Glow or neon borders |

---

## 9. QA checklist before shipping

- [ ] `tailwind.config.js` is updated (step 1) and `npm run build` passes.
- [ ] `index.css` has `color-scheme` + scrollbar + autofill + selection (step 2).
- [ ] No white flash on refresh with the Dark theme (step 3).
- [ ] The site follows the system setting until the user clicks the switch — change the OS setting with the site open (step 4).
- [ ] Toasts are dark in dark mode (step 5).
- [ ] No leftover hex values: `grep -rnE "dark:[a-z:-]*(bg|text|border)-\[#" src` → should return **zero** (everything is a token).
- [ ] No cool Tailwind colors in dark: `grep -rnE "dark:[a-z:-]*-(slate|gray|zinc|indigo|purple|blue|emerald|red|amber)-" src` → zero.
- [ ] Every `bg-white` / `bg-[#FA…]` / `bg-gray-…` has a `dark:bg-…` next to it: `grep -rnE "bg-(white|gray-[0-9]+|\[#[fF])" src | grep -v "dark:bg-"` and review the output.
- [ ] Walk through these pages in both modes: Home, Shop (+ the filter open on mobile), Product, Cart (+ delete modal), Checkout, Order Success, My Orders, Order Detail (+ cancel modal), Wishlist, Profile (every tab), Login, Register, Forgot, OTP, 404.
- [ ] All seven order statuses have the same color in My Orders, Order Detail and Profile.
- [ ] Autofill on Login (Chrome) doesn't show a light box.
- [ ] Keyboard Tab: the copper focus ring is visible everywhere.
- [ ] Mobile: the mobile menu, the filter drawer, the modals.
- [ ] Lighthouse → Accessibility → no "Background and foreground colors do not have a sufficient contrast ratio" in dark.

---

## 10. Appendix: file-by-file, line-by-line changes

These tables were generated by a script that went through **every** `src/**/*.jsx` file in the version you sent (`Ecommerce-Online-Store-v1.zip`), extracted every color class, and applied the rules from section 4 (by property, lightness and context: input / modal / section / heading / error / status / stars).

- **Add** = a light class with no `dark:` counterpart at all (791 classes).
- **Replace** = an existing `dark:` class using a color that isn't a token (558 classes).
- Line numbers refer to the original version. As soon as you edit a file the lines shift — work **bottom to top** in each file, or search for the class itself.
- `hover:` / `focus:` / `placeholder:` classes get their dark counterpart with the same prefix (`dark:hover:…`).
- `text-white` over video / images, and transparent `bg-white/xx` and `bg-black/xx` (theme-neutral), were left out on purpose.
- `Navbar.jsx`, `HeroSection.jsx`, `Footer.jsx`, `ProductCard.jsx` and `PageNotFound.jsx` aren't here — they have complete recipes in section 6.
- If a suggestion here conflicts with a recipe in section 6 or a design rule, **section 6 wins**. The script is thorough, but it isn't a designer — double-check places where `bg-white` sits inside `absolute` (it may be a `noir-700` popover or a badge over an image).

**File order:** Layout → Pages → Components.

#### `src/components/Layout/StoreLayout.jsx`

| Line | Add | Replace |
|---:|---|---|
| 8 | — | `dark:bg-[#121417]` → `dark:bg-noir-900` |
| 9 | — | `dark:text-[#F5F1EA]` → `dark:text-fg` |

#### `src/pages/Cart.jsx`

| Line | Add | Replace |
|---:|---|---|
| 51 | — | `dark:bg-[#141110]` → `dark:bg-noir-900` |
| 53 | — | `dark:border-[#2e2724]` → `dark:border-line` |
| 59 | `dark:hover:bg-noir-700` | `dark:border-[#3a322d]` → `dark:border-line-strong`<br>`dark:bg-[#221d1a]` → `dark:bg-noir-800`<br>`dark:text-[#c5b6a3]` → `dark:text-fg-secondary`<br>`dark:hover:text-[#f3ede6]` → `dark:hover:text-fg` |
| 64 | — | `dark:text-[#f3ede6]` → `dark:text-fg` |
| 67 | — | `dark:border-[#4a3a2a]` → `dark:border-line-strong`<br>`dark:bg-[#29211c]` → `dark:bg-noir-700`<br>`dark:text-[#fcba69]` → `dark:text-copper-400` |
| 83 | — | `dark:text-[#a38f7d]` → `dark:text-fg-tertiary` |
| 84 | — | `dark:text-[#f3ede6]` → `dark:text-fg` |
| 89 | — | `dark:border-[#3a322d]` → `dark:border-line-strong`<br>`dark:bg-[#221d1a]` → `dark:bg-noir-800`<br>`dark:text-[#c5b6a3]` → `dark:text-fg-secondary`<br>`dark:hover:border-red-500/30` → `dark:hover:border-state-danger/25`<br>`dark:hover:bg-red-500/10` → `dark:hover:bg-state-danger/10`<br>`dark:hover:text-red-400` → `dark:hover:text-state-danger` |
| 96 | — | `dark:border-[#2e2724]` → `dark:border-line`<br>`dark:bg-[#1c1816]` → `dark:bg-noir-800` |
| 97 | — | `dark:divide-[#2e2724]` → `dark:divide-line` |

#### `src/pages/Checkout.jsx`

| Line | Add | Replace |
|---:|---|---|
| 75 | `dark:bg-noir-900` | — |
| 76 | `dark:text-fg-tertiary` | — |
| 82 | `dark:bg-noir-900` | — |
| 86 | `dark:text-copper-400` | — |
| 87 | `dark:text-fg` | — |
| 89 | `dark:text-fg` | — |
| 90 | `dark:text-fg-tertiary` | — |

#### `src/pages/ForgetPassword.jsx`

| Line | Add | Replace |
|---:|---|---|
| 43 | — | `dark:bg-[#12141A]` → `dark:bg-noir-900` |
| 49 | — | `dark:text-[#9CA3AF]` → `dark:text-fg-tertiary` |
| 60 | — | `dark:text-[#E5E7EB]` → `dark:text-fg` |
| 64 | — | `dark:text-[#9CA3AF]` → `dark:text-fg-tertiary` |
| 75 | — | `dark:border-[#B25B32]` → `dark:border-copper-600`<br>`dark:placeholder-[#6B7280]` → `dark:placeholder-fg-placeholder`<br>`dark:focus:ring-[#B25B32]` → `dark:focus:ring-copper-400` |
| 79 | — | `dark:text-[#E57373]` → `dark:text-state-danger` |
| 89 | `dark:text-fg-on-accent` | `dark:bg-[#A3522C]` → `dark:bg-copper-500`<br>`dark:hover:bg-[#8E4726]` → `dark:hover:bg-copper-400` |
| 96 | — | `dark:border-[#282D37]` → `dark:border-line` |
| 97 | — | `dark:text-[#9CA3AF]` → `dark:text-fg-secondary` |
| 102 | — | `dark:text-[#C86D43]` → `dark:text-copper-400` |

#### `src/pages/Login.jsx`

| Line | Add | Replace |
|---:|---|---|
| 47 | — | `dark:bg-[#12141A]` → `dark:bg-noir-800` |
| 53 | — | `dark:text-[#9CA3AF]` → `dark:text-fg-tertiary` |
| 64 | — | `dark:text-[#E5E7EB]` → `dark:text-fg` |
| 68 | — | `dark:text-[#9CA3AF]` → `dark:text-fg-tertiary` |
| 79 | — | `dark:border-[#B25B32]` → `dark:border-copper-600`<br>`dark:placeholder-[#6B7280]` → `dark:placeholder-fg-placeholder`<br>`dark:focus:ring-[#B25B32]` → `dark:focus:ring-copper-400` |
| 83 | — | `dark:text-[#E57373]` → `dark:text-state-danger` |
| 91 | — | `dark:text-[#E5E7EB]` → `dark:text-fg` |
| 95 | — | `dark:text-[#9CA3AF]` → `dark:text-fg-tertiary` |
| 106 | — | `dark:border-[#B25B32]` → `dark:border-copper-600`<br>`dark:placeholder-[#6B7280]` → `dark:placeholder-fg-placeholder`<br>`dark:focus:ring-[#B25B32]` → `dark:focus:ring-copper-400` |
| 110 | — | `dark:text-[#E57373]` → `dark:text-state-danger` |
| 118 | — | `dark:text-[#C86D43]` → `dark:text-copper-400` |
| 128 | `dark:text-fg-on-accent` | `dark:bg-[#A3522C]` → `dark:bg-copper-500`<br>`dark:hover:bg-[#8E4726]` → `dark:hover:bg-copper-400` |
| 135 | — | `dark:border-[#282D37]` → `dark:border-line` |
| 136 | — | `dark:text-[#9CA3AF]` → `dark:text-fg-secondary` |
| 141 | — | `dark:text-[#C86D43]` → `dark:text-copper-400` |

#### `src/pages/MyOrders.jsx`

| Line | Add | Replace |
|---:|---|---|
| 49 | — | `dark:border-[#2e2724]` → `dark:border-line` |
| 51 | — | `dark:text-[#f3ede6]` → `dark:text-fg` |
| 54 | — | `dark:text-[#a38f7d]` → `dark:text-fg-tertiary` |
| 60 | — | `dark:border-[#4a3a2a]` → `dark:border-line-strong`<br>`dark:bg-[#2a221a]` → `dark:bg-noir-700`<br>`dark:text-[#fcba69]` → `dark:text-copper-400` |
| 69 | — | `dark:bg-slate-900` → `dark:bg-noir-800`<br>`dark:border-slate-800` → `dark:border-line-subtle` |
| 70 | `dark:text-copper-400` | `dark:bg-slate-800` → `dark:bg-noir-750` |
| 76 | — | `dark:text-slate-400` → `dark:text-fg-secondary` |
| 81 | `dark:bg-copper-500` `dark:hover:bg-copper-400` `dark:text-fg-on-accent` | — |

#### `src/pages/OrderDetail.jsx`

| Line | Add | Replace |
|---:|---|---|
| 15 | — | `dark:text-neutral-300` → `dark:text-copper-400` |
| 16 | — | `dark:bg-[#2a221a]` → `dark:bg-noir-700`<br>`dark:text-[#fcba69]` → `dark:text-copper-400`<br>`dark:border-[#4a3a2a]` → `dark:border-line-strong` |
| 17 | — | `dark:bg-blue-500/10` → `dark:bg-state-info/10`<br>`dark:text-blue-400` → `dark:text-state-info`<br>`dark:border-blue-500/20` → `dark:border-state-info/25` |
| 18 | — | `dark:bg-indigo-500/10` → `dark:bg-state-info/10`<br>`dark:text-indigo-400` → `dark:text-state-info`<br>`dark:border-indigo-500/20` → `dark:border-state-info/25` |
| 19 | — | `dark:bg-emerald-500/10` → `dark:bg-state-success/10`<br>`dark:text-emerald-400` → `dark:text-state-success`<br>`dark:border-emerald-500/20` → `dark:border-state-success/25` |
| 20 | — | `dark:bg-red-500/10` → `dark:bg-state-danger/10`<br>`dark:text-red-400` → `dark:text-state-danger`<br>`dark:border-red-500/20` → `dark:border-state-danger/25` |
| 66 | — | `dark:bg-[#141110]` → `dark:bg-noir-800` |
| 76 | — | `dark:bg-[#141110]` → `dark:bg-noir-900` |
| 78 | — | `dark:border-[#2e2724]` → `dark:border-line` |
| 84 | `dark:hover:bg-noir-700` | `dark:border-[#3a322d]` → `dark:border-line-strong`<br>`dark:bg-[#221d1a]` → `dark:bg-noir-800`<br>`dark:text-[#c5b6a3]` → `dark:text-fg-secondary`<br>`dark:hover:text-[#f3ede6]` → `dark:hover:text-fg` |
| 89 | — | `dark:text-[#f3ede6]` → `dark:text-fg` |
| 90 | — | `dark:text-[#a38f7d]` → `dark:text-fg-tertiary` |
| 108 | — | `dark:border-[#48342d]` → `dark:border-line-strong`<br>`dark:bg-[#261e1b]` → `dark:bg-noir-750`<br>`dark:text-[#e2a890]` → `dark:text-copper-400`<br>`dark:hover:bg-[#342823]` → `dark:hover:bg-noir-650` |

#### `src/pages/OrderSuccess.jsx`

| Line | Add | Replace |
|---:|---|---|
| 10 | `dark:bg-noir-900` | — |
| 13 | `dark:bg-state-success/10` `dark:text-state-success` | — |
| 18 | `dark:text-fg` | — |
| 22 | `dark:text-fg-tertiary` | — |
| 27 | `dark:text-fg-tertiary` | — |
| 28 | `dark:text-copper-400` | — |
| 37 | `dark:border-copper-600` `dark:text-copper-400` `dark:hover:bg-copper-400/5` | — |
| 46 | `dark:bg-copper-500` `dark:hover:bg-copper-400` `dark:text-fg-on-accent` | — |

#### `src/pages/ProductDetails.jsx`

| Line | Add | Replace |
|---:|---|---|
| 128 | `dark:bg-noir-800` | — |
| 129 | `dark:bg-noir-750` `dark:text-state-danger` | — |
| 132 | `dark:text-fg` | — |
| 135 | `dark:text-fg-secondary` | — |
| 140 | `dark:bg-copper-500` `dark:hover:bg-copper-400` `dark:text-fg-on-accent` | — |
| 151 | — | `dark:bg-[#141110]` → `dark:bg-noir-900` |

#### `src/pages/Profile.jsx`

| Line | Add | Replace |
|---:|---|---|
| 57 | `dark:bg-noir-900` | — |
| 61 | `dark:text-fg-secondary` | — |
| 62 | `dark:hover:text-copper-300` | — |
| 66 | `dark:text-copper-400` | — |
| 69 | `dark:text-fg` | — |
| 75 | `dark:text-fg-secondary` | — |

#### `src/pages/Register.jsx`

| Line | Add | Replace |
|---:|---|---|
| 46 | — | `dark:bg-[#12141A]` → `dark:bg-noir-900` |
| 53 | — | `dark:text-[#9CA3AF]` → `dark:text-fg-tertiary` |
| 68 | — | `dark:text-[#E5E7EB]` → `dark:text-fg` |
| 73 | — | `dark:text-[#9CA3AF]` → `dark:text-fg-tertiary` |
| 85 | — | `dark:border-[#B25B32]` → `dark:border-copper-600`<br>`dark:placeholder-[#6B7280]` → `dark:placeholder-fg-placeholder`<br>`dark:focus:ring-[#B25B32]` → `dark:focus:ring-copper-400` |
| 90 | — | `dark:text-[#E57373]` → `dark:text-state-danger` |
| 98 | — | `dark:text-[#E5E7EB]` → `dark:text-fg` |
| 103 | — | `dark:text-[#9CA3AF]` → `dark:text-fg-tertiary` |
| 115 | — | `dark:border-[#B25B32]` → `dark:border-copper-600`<br>`dark:placeholder-[#6B7280]` → `dark:placeholder-fg-placeholder`<br>`dark:focus:ring-[#B25B32]` → `dark:focus:ring-copper-400` |
| 120 | — | `dark:text-[#E57373]` → `dark:text-state-danger` |
| 128 | — | `dark:text-[#E5E7EB]` → `dark:text-fg` |
| 133 | — | `dark:text-[#9CA3AF]` → `dark:text-fg-tertiary` |
| 145 | — | `dark:border-[#B25B32]` → `dark:border-copper-600`<br>`dark:placeholder-[#6B7280]` → `dark:placeholder-fg-placeholder`<br>`dark:focus:ring-[#B25B32]` → `dark:focus:ring-copper-400` |
| 150 | — | `dark:text-[#E57373]` → `dark:text-state-danger` |
| 160 | `dark:text-fg-on-accent` | `dark:bg-[#A3522C]` → `dark:bg-copper-500`<br>`dark:hover:bg-[#8E4726]` → `dark:hover:bg-copper-400` |
| 168 | — | `dark:border-[#282D37]` → `dark:border-line` |
| 169 | — | `dark:text-[#9CA3AF]` → `dark:text-fg-secondary` |
| 175 | — | `dark:text-[#C86D43]` → `dark:text-copper-400` |

#### `src/pages/Shop.jsx`

| Line | Add | Replace |
|---:|---|---|
| 225 | — | `dark:bg-slate-950` → `dark:bg-noir-900` |
| 227 | — | `dark:border-[#2e2724]` → `dark:border-line` |
| 229 | — | `dark:text-[#f3ede6]` → `dark:text-fg` |
| 232 | — | `dark:text-[#a38f7d]` → `dark:text-fg-tertiary` |
| 238 | — | `dark:border-[#4a3a2a]` → `dark:border-line-strong`<br>`dark:bg-[#2a221a]` → `dark:bg-noir-700`<br>`dark:text-[#fcba69]` → `dark:text-copper-400` |
| 244 | — | `dark:lg:border-slate-800` → `dark:lg:border-line-strong` |
| 281 | — | `dark:text-slate-500` → `dark:text-fg-tertiary` |
| 290 | `dark:placeholder:text-fg-placeholder` | `dark:bg-slate-900` → `dark:bg-noir-750`<br>`dark:border-slate-800` → `dark:border-line-control`<br>`dark:focus:border-amber-600` → `dark:focus:border-copper-400/25`<br>`dark:text-slate-100` → `dark:text-fg` |
| 298 | `dark:text-fg-tertiary` | `dark:hover:text-slate-200` → `dark:hover:text-fg-secondary`<br>`dark:hover:bg-slate-800` → `dark:hover:bg-noir-650` |
| 308 | — | `dark:bg-slate-900` → `dark:bg-noir-800`<br>`dark:border-slate-800` → `dark:border-line`<br>`dark:text-slate-200` → `dark:text-fg-secondary` |
| 318 | — | `dark:border-slate-800` → `dark:border-line-subtle` |
| 320 | — | `dark:text-[#f3ede6]` → `dark:text-fg` |
| 323 | — | `dark:bg-slate-700` → `dark:bg-noir-650` |
| 324 | — | `dark:text-slate-400` → `dark:text-fg-secondary` |
| 329 | — | `dark:text-slate-400` → `dark:text-fg-tertiary` |
| 330 | — | `dark:hover:text-amber-400` → `dark:hover:text-state-warning` |
| 333 | — | `dark:text-slate-600` → `dark:text-fg-placeholder` |
| 337 | — | `dark:hover:text-amber-400` → `dark:hover:text-state-warning` |
| 341 | — | `dark:text-slate-600` → `dark:text-fg-placeholder` |
| 342 | — | `dark:text-slate-200` → `dark:text-fg` |

#### `src/pages/Wishlist.jsx`

| Line | Add | Replace |
|---:|---|---|
| 50 | — | `dark:border-[#2e2724]` → `dark:border-line` |
| 52 | — | `dark:text-[#f3ede6]` → `dark:text-fg` |
| 55 | — | `dark:text-[#a38f7d]` → `dark:text-fg-tertiary` |
| 61 | — | `dark:border-[#4a3a2a]` → `dark:border-line-strong`<br>`dark:bg-[#2a221a]` → `dark:bg-noir-700`<br>`dark:text-[#fcba69]` → `dark:text-copper-400` |
| 70 | — | `dark:bg-slate-900` → `dark:bg-noir-800`<br>`dark:border-slate-800` → `dark:border-line-subtle` |
| 71 | `dark:text-copper-400` | `dark:bg-slate-800` → `dark:bg-noir-750` |
| 77 | — | `dark:text-slate-400` → `dark:text-fg-secondary` |
| 82 | `dark:bg-copper-500` `dark:hover:bg-copper-400` `dark:text-fg-on-accent` | — |

#### `src/components/ui/Animation/AddToCartButton.jsx`

| Line | Add | Replace |
|---:|---|---|
| 31 | `dark:text-fg-on-accent` | `dark:bg-amber-700` → `dark:bg-copper-500`<br>`dark:hover:bg-amber-800` → `dark:hover:bg-copper-400` |
| 39 | — | `dark:bg-amber-200` → `dark:bg-copper-800`<br>`dark:border-amber-900` → `dark:border-copper-600` |
| 40 | — | `dark:bg-amber-900/40` → `dark:bg-copper-400/40` |

#### `src/components/ui/Animation/SweepingCleaner.jsx`

| Line | Add | Replace |
|---:|---|---|
| 8 | `dark:text-state-danger` | — |

#### `src/components/ui/Home/FeaturedProducts.jsx`

| Line | Add | Replace |
|---:|---|---|
| 8 | — | `dark:bg-[#171411]` → `dark:bg-noir-900` |
| 12 | — | `dark:text-[#F5F1EA]` → `dark:text-fg` |
| 16 | — | `dark:text-[#A99A8F]` → `dark:text-fg-tertiary` |
| 23 | `dark:border-line-strong` `dark:text-copper-400` `dark:hover:bg-noir-650` | — |
| 42 | `dark:bg-copper-500` `dark:text-fg-on-accent` `dark:hover:bg-copper-400` | — |

#### `src/components/ui/Home/HowItWorks.jsx`

| Line | Add | Replace |
|---:|---|---|
| 24 | `dark:bg-noir-900` | — |
| 27 | `dark:text-fg` | — |
| 30 | `dark:text-fg-tertiary` | — |
| 38 | `dark:bg-copper-500` `dark:text-fg-on-accent` | — |
| 41 | `dark:text-fg-secondary` | — |
| 44 | `dark:text-fg-tertiary` | — |

#### `src/components/ui/Home/QuoteSection.jsx`

| Line | Add | Replace |
|---:|---|---|
| 3 | — | `dark:bg-[#12100E]` → `dark:bg-noir-850` |
| 6 | — | `dark:text-[#C99A78]` → `dark:text-copper-400` |

#### `src/components/ui/Home/ShopByCategory.jsx`

| Line | Add | Replace |
|---:|---|---|
| 14 | `dark:bg-noir-900` | — |
| 17 | `dark:text-fg` | — |
| 21 | `dark:text-fg-tertiary` | — |
| 40 | `dark:text-fg-secondary` | — |

#### `src/components/ui/Input.jsx`

| Line | Add | Replace |
|---:|---|---|
| 6 | — | `dark:text-gray-300` → `dark:text-fg-secondary` |
| 16 | — | `dark:bg-[#1F232B]` → `dark:bg-noir-750`<br>`dark:text-[#F5F1EA]` → `dark:text-fg`<br>`dark:placeholder:text-gray-500` → `dark:placeholder:text-fg-placeholder` |
| 18 | `dark:border-state-danger` `dark:focus:border-state-danger` `dark:focus:ring-state-danger/25` | — |
| 19 | `dark:focus:border-copper-400` `dark:focus:ring-copper-400/25` | `dark:border-gray-700` → `dark:border-line-control`<br>`dark:hover:border-gray-600` → `dark:hover:border-line-hover` |
| 25 | `dark:group-focus-within:text-copper-400` | `dark:text-gray-500` → `dark:text-fg-tertiary` |
| 33 | — | `dark:text-red-400` → `dark:text-state-danger` |

#### `src/components/ui/auth/OtpInput.jsx`

| Line | Add | Replace |
|---:|---|---|
| 51 | — | `dark:bg-gray-950` → `dark:bg-noir-750` |
| 85 | — | `dark:bg-gray-900` → `dark:bg-noir-750` |
| 87 | `dark:bg-copper-400/15` `dark:text-copper-400` `dark:border-copper-500/20` | — |
| 94 | — | `dark:text-gray-400` → `dark:text-fg-tertiary` |
| 95 | — | `dark:text-gray-200` → `dark:text-fg` |
| 108 | `dark:border-copper-600` `dark:bg-noir-700` | — |
| 109 | `dark:border-line-control` `dark:hover:border-copper-500/50` `dark:focus-within:border-copper-400` | — |
| 130 | `dark:bg-copper-500` `dark:hover:bg-copper-400` `dark:text-fg-on-accent` | — |
| 146 | — | `dark:border-gray-800` → `dark:border-line-control` |
| 148 | — | `dark:text-gray-400` → `dark:text-fg-tertiary` |
| 149 | `dark:text-copper-400` | — |
| 156 | `dark:text-copper-400` | — |

#### `src/components/ui/auth/ResetPasswordCard.jsx`

| Line | Add | Replace |
|---:|---|---|
| 53 | — | `dark:bg-gray-950` → `dark:bg-noir-900` |
| 109 | — | `dark:bg-gray-900` → `dark:bg-noir-800` |
| 111 | `dark:bg-copper-400/15` `dark:text-copper-400` `dark:border-copper-500/20` | — |
| 118 | — | `dark:text-gray-400` → `dark:text-fg-tertiary` |
| 119 | — | `dark:text-gray-200` → `dark:text-fg` |
| 125 | — | `dark:text-gray-400` → `dark:text-fg-secondary` |
| 133 | `dark:border-copper-600` `dark:border-copper-500/60` | — |
| 144 | — | `dark:bg-gray-900` → `dark:bg-noir-800`<br>`dark:text-gray-100` → `dark:text-fg` |
| 151 | — | `dark:text-gray-400` → `dark:text-fg-secondary` |
| 159 | `dark:focus:border-copper-400` | `dark:border-gray-700` → `dark:border-line-control`<br>`dark:bg-gray-800` → `dark:bg-noir-750`<br>`dark:text-gray-100` → `dark:text-fg` |
| 166 | `dark:bg-copper-500` `dark:hover:bg-copper-400` `dark:text-fg-on-accent` | — |
| 172 | — | `dark:text-gray-400` → `dark:text-fg-tertiary` |
| 175 | — | `dark:text-gray-300` → `dark:text-fg-secondary` |
| 182 | `dark:text-copper-400` | — |

#### `src/components/ui/cart/CartItemRow.jsx`

| Line | Add | Replace |
|---:|---|---|
| 49 | — | `dark:border-[#3e352f]` → `dark:border-line`<br>`dark:bg-[#2a2420]` → `dark:bg-noir-750` |
| 53 | — | `dark:text-[#cca474]` → `dark:text-fg-tertiary` |
| 57 | — | `dark:text-[#f3ede6]` → `dark:text-fg` |
| 58 | — | `dark:text-[#a38f7d]` → `dark:text-fg-tertiary` |
| 65 | — | `dark:border-[#3a322d]` → `dark:border-line-strong`<br>`dark:bg-[#26201d]` → `dark:bg-noir-750` |
| 71 | — | `dark:text-[#c5b6a3]` → `dark:text-fg-secondary`<br>`dark:hover:bg-[#342823]` → `dark:hover:bg-noir-750` |
| 75 | — | `dark:text-[#f3ede6]` → `dark:text-fg` |
| 83 | — | `dark:text-[#c5b6a3]` → `dark:text-fg-secondary`<br>`dark:hover:bg-[#342823]` → `dark:hover:bg-noir-750` |
| 90 | — | `dark:text-[#f3ede6]` → `dark:text-fg` |
| 98 | — | `dark:text-[#8f7e71]` → `dark:text-fg-tertiary`<br>`dark:hover:text-red-400` → `dark:hover:text-state-danger` |

#### `src/components/ui/cart/ConfirmationModal.jsx`

| Line | Add | Replace |
|---:|---|---|
| 25 | — | `dark:border-[#2e2724]` → `dark:border-line`<br>`dark:bg-[#1c1816]` → `dark:bg-noir-800` |
| 30 | — | `dark:bg-red-500/10` → `dark:bg-state-danger/10` |
| 31 | — | `dark:text-red-400` → `dark:text-state-danger` |
| 33 | — | `dark:text-[#f3ede6]` → `dark:text-fg` |
| 41 | — | `dark:text-[#a38f7d]` → `dark:text-fg-tertiary` |
| 52 | — | `dark:border-[#3a322d]` → `dark:border-line-strong`<br>`dark:bg-[#221d1a]` → `dark:bg-noir-800`<br>`dark:text-[#c5b6a3]` → `dark:text-fg-secondary`<br>`dark:hover:bg-[#342823]` → `dark:hover:bg-noir-700` |
| 60 | — | `dark:border-[#48342d]` → `dark:border-line-strong`<br>`dark:bg-[#261e1b]` → `dark:bg-noir-750`<br>`dark:text-[#e2a890]` → `dark:text-copper-400`<br>`dark:hover:bg-[#342823]` → `dark:hover:bg-noir-650` |

#### `src/components/ui/cart/EmptyCart.jsx`

| Line | Add | Replace |
|---:|---|---|
| 7 | — | `dark:border-[#2e2724]` → `dark:border-line`<br>`dark:bg-[#1c1816]` → `dark:bg-noir-800` |
| 8 | — | `dark:bg-[#29211c]` → `dark:bg-noir-700` |
| 9 | — | `dark:text-[#cca474]` → `dark:text-fg-tertiary` |
| 12 | — | `dark:text-[#f3ede6]` → `dark:text-fg` |
| 13 | — | `dark:text-[#a38f7d]` → `dark:text-fg-tertiary` |
| 20 | — | `dark:from-[#cca474]` → `dark:from-copper-500`<br>`dark:to-[#cca474]` → `dark:to-copper-500` |

#### `src/components/ui/cart/OrderSummaryCard.jsx`

| Line | Add | Replace |
|---:|---|---|
| 49 | — | `dark:border-[#2e2724]` → `dark:border-line`<br>`dark:bg-[#1c1816]` → `dark:bg-noir-800` |
| 50 | — | `dark:border-[#2e2724]` → `dark:border-line`<br>`dark:text-[#f3ede6]` → `dark:text-fg` |
| 55 | — | `dark:text-[#a38f7d]` → `dark:text-fg-tertiary` |
| 57 | — | `dark:text-[#f3ede6]` → `dark:text-fg` |
| 62 | — | `dark:text-[#a38f7d]` → `dark:text-fg-tertiary` |
| 64 | — | `dark:bg-emerald-500/10` → `dark:bg-state-success/10`<br>`dark:text-emerald-400` → `dark:text-state-success` |
| 70 | — | `dark:text-emerald-400` → `dark:text-state-success` |
| 74 | — | `dark:border-emerald-500/20` → `dark:border-state-success/25` |
| 83 | — | `dark:text-[#a38f7d]` → `dark:text-fg-tertiary` |
| 85 | — | `dark:text-[#f3ede6]` → `dark:text-fg` |
| 89 | — | `dark:border-[#2e2724]` → `dark:border-line` |
| 92 | — | `dark:text-[#c5b6a3]` → `dark:text-fg-secondary` |
| 93 | `dark:from-copper-500` `dark:to-copper-500` | — |
| 101 | — | `dark:from-[#cca474]` → `dark:from-copper-500`<br>`dark:to-[#cca474]` → `dark:to-copper-500` |
| 108 | — | `dark:border-[#2e2724]` → `dark:border-line`<br>`dark:bg-[#1c1816]` → `dark:bg-noir-800` |
| 109 | — | `dark:text-[#a38f7d]` → `dark:text-fg-tertiary` |
| 110 | — | `dark:text-[#cca474]` → `dark:text-fg-tertiary` |
| 115 | — | `dark:border-[#48342d]` → `dark:border-line-strong`<br>`dark:bg-[#261e1b]` → `dark:bg-noir-750` |
| 116 | — | `dark:text-[#e2a890]` → `dark:text-copper-400` |
| 124 | — | `dark:text-[#a38f7d]` → `dark:text-fg-tertiary`<br>`dark:hover:text-red-400` → `dark:hover:text-state-danger` |
| 137 | — | `dark:border-[#3a322d]` → `dark:border-line-strong`<br>`dark:bg-[#181413]` → `dark:bg-noir-750`<br>`dark:text-[#f3ede6]` → `dark:text-fg`<br>`dark:placeholder-[#786c64]` → `dark:placeholder-fg-placeholder`<br>`dark:focus:border-[#cca474]` → `dark:focus:border-copper-400`<br>`dark:focus:ring-[#cca474]` → `dark:focus:ring-copper-400` |
| 142 | — | `dark:border-[#48342d]` → `dark:border-line-strong`<br>`dark:bg-[#221d1a]` → `dark:bg-noir-800`<br>`dark:text-[#e2a890]` → `dark:text-copper-400`<br>`dark:hover:bg-[#342823]` → `dark:hover:bg-noir-650` |
| 152 | — | `dark:border-[#3a322d]` → `dark:border-line-strong`<br>`dark:bg-[#221d1a]` → `dark:bg-noir-800`<br>`dark:text-[#c5b6a3]` → `dark:text-fg-secondary`<br>`dark:hover:bg-[#342823]` → `dark:hover:bg-noir-700`<br>`dark:hover:text-[#f3ede6]` → `dark:hover:text-fg` |

#### `src/components/ui/checkout/CheckoutForm.jsx`

| Line | Add | Replace |
|---:|---|---|
| 7 | `dark:bg-noir-800` `dark:border-line` | — |
| 8 | `dark:text-copper-400` `dark:border-line` | — |
| 16 | `dark:text-fg-secondary` | — |
| 23 | `dark:bg-noir-750` `dark:border-line-control` `dark:text-fg` `dark:placeholder-fg-placeholder` | — |
| 24 | `dark:focus:border-copper-400` `dark:focus:ring-copper-400` | — |
| 27 | `dark:text-state-danger` | — |
| 33 | `dark:text-fg-secondary` | — |
| 40 | `dark:bg-noir-750` `dark:border-line-control` `dark:text-fg` `dark:placeholder-fg-placeholder` | — |
| 41 | `dark:focus:border-copper-400` `dark:focus:ring-copper-400` | — |
| 44 | `dark:text-state-danger` | — |
| 52 | `dark:text-fg-secondary` | — |
| 59 | `dark:bg-noir-800` `dark:border-line` `dark:text-fg` `dark:focus:border-copper-400` | — |
| 60 | `dark:focus:ring-copper-400` | — |
| 66 | `dark:text-fg-secondary` | — |
| 73 | `dark:bg-noir-750` `dark:border-line-control` `dark:text-fg` `dark:placeholder-fg-placeholder` | — |
| 74 | `dark:focus:border-copper-400` `dark:focus:ring-copper-400` | — |
| 77 | `dark:text-state-danger` | — |
| 84 | `dark:text-fg-secondary` | — |
| 91 | `dark:bg-noir-750` `dark:border-line-control` `dark:text-fg` `dark:placeholder-fg-placeholder` | — |
| 92 | `dark:focus:border-copper-400` `dark:focus:ring-copper-400` | — |
| 95 | `dark:text-state-danger` | — |
| 101 | `dark:text-fg-secondary` | — |
| 108 | `dark:bg-noir-750` `dark:border-line-control` `dark:text-fg` `dark:placeholder-fg-placeholder` | — |
| 109 | `dark:focus:border-copper-400` `dark:focus:ring-copper-400` | — |
| 115 | `dark:bg-noir-800` `dark:border-line` | — |
| 116 | `dark:text-copper-400` `dark:border-line` | — |
| 121 | `dark:bg-noir-800` `dark:border-copper-600` | — |
| 122 | `dark:bg-noir-800` `dark:border-line` `dark:text-copper-400` | — |
| 126 | `dark:text-fg` | — |
| 127 | `dark:text-fg-tertiary` | — |
| 133 | `dark:bg-noir-800` `dark:border-line` | — |
| 134 | `dark:text-copper-400` `dark:border-line` | — |
| 143 | `dark:bg-noir-750` `dark:border-line-control` `dark:text-fg` `dark:placeholder-fg-placeholder` | — |
| 144 | `dark:focus:border-copper-400` `dark:focus:ring-copper-400` | — |

#### `src/components/ui/checkout/OrderSummary.jsx`

| Line | Add | Replace |
|---:|---|---|
| 3 | `dark:bg-noir-800` `dark:border-line` | — |
| 4 | `dark:text-fg` `dark:border-line` | — |
| 11 | `dark:text-fg-tertiary` | — |
| 18 | `dark:bg-noir-800` `dark:border-line` | — |
| 23 | `dark:text-fg-tertiary` | — |
| 27 | `dark:text-fg` | — |
| 28 | `dark:text-fg-tertiary` | — |
| 31 | `dark:text-fg` | — |
| 39 | `dark:border-line` `dark:text-fg-secondary` | — |
| 42 | `dark:text-fg` | — |
| 46 | `dark:text-fg` | — |
| 50 | `dark:text-fg` | — |
| 52 | `dark:border-line` `dark:text-fg` | — |
| 54 | `dark:text-copper-400` | — |
| 63 | `dark:bg-copper-500` `dark:hover:bg-copper-400` `dark:text-fg-on-accent` | — |

#### `src/components/ui/myOrders/OrderItem.jsx`

| Line | Add | Replace |
|---:|---|---|
| 7 | — | `dark:bg-[rgba(245,181,68,0.10)]` → `dark:bg-state-warning/10`<br>`dark:border-[rgba(245,181,68,0.24)]` → `dark:border-state-warning/25` |
| 12 | — | `dark:bg-[rgba(63,211,176,0.10)]` → `dark:bg-state-info/10`<br>`dark:border-[rgba(63,211,176,0.24)]` → `dark:border-state-info/25` |
| 17 | — | `dark:bg-[rgba(95,168,245,0.10)]` → `dark:bg-state-info/10`<br>`dark:border-[rgba(95,168,245,0.24)]` → `dark:border-state-info/25` |
| 22 | — | `dark:bg-[rgba(167,139,250,0.10)]` → `dark:bg-state-shipped/10`<br>`dark:border-[rgba(167,139,250,0.24)]` → `dark:border-state-shipped/25` |
| 27 | — | `dark:bg-[rgba(74,222,155,0.10)]` → `dark:bg-state-success/10`<br>`dark:border-[rgba(74,222,155,0.24)]` → `dark:border-state-success/25` |
| 28 | — | `dark:bg-[#4ADE9B]` → `dark:bg-state-success-solid` |
| 32 | — | `dark:bg-[rgba(248,113,113,0.10)]` → `dark:bg-state-danger/10`<br>`dark:border-[rgba(248,113,113,0.24)]` → `dark:border-state-danger/25` |
| 37 | — | `dark:bg-[rgba(156,163,175,0.10)]` → `dark:bg-noir-750`<br>`dark:text-[#9CA3AF]` → `dark:text-fg-secondary`<br>`dark:border-[rgba(156,163,175,0.22)]` → `dark:border-line` |
| 38 | — | `dark:bg-[#9CA3AF]` → `dark:bg-noir-600` |
| 54 | — | `dark:bg-[rgba(156,163,175,0.10)]` → `dark:bg-noir-750`<br>`dark:text-[#9CA3AF]` → `dark:text-fg-secondary`<br>`dark:border-[rgba(156,163,175,0.22)]` → `dark:border-line` |
| 55 | — | `dark:bg-[#9CA3AF]` → `dark:bg-noir-600` |
| 72 | — | `dark:bg-[#1A1817]` → `dark:bg-noir-800`<br>`dark:border-[#2E2A27]` → `dark:border-line` |
| 73 | — | `dark:hover:border-[#fcba69]/30` → `dark:hover:border-copper-500/40` |
| 82 | — | `dark:group-hover:text-[#fcba69]` → `dark:group-hover:text-copper-300` |
| 85 | — | `dark:text-[#A0A4AB]` → `dark:text-fg-secondary` |
| 92 | — | `dark:text-[#fcba69]` → `dark:text-copper-400` |
| 95 | — | `dark:text-[#8C8F96]` → `dark:text-fg-tertiary` |

#### `src/components/ui/order/ConfirmationModal.jsx`

| Line | Add | Replace |
|---:|---|---|
| 25 | — | `dark:border-[#2e2724]` → `dark:border-line`<br>`dark:bg-[#1c1816]` → `dark:bg-noir-800` |
| 30 | — | `dark:bg-red-500/10` → `dark:bg-state-danger/10` |
| 31 | — | `dark:text-red-400` → `dark:text-state-danger` |
| 33 | — | `dark:text-[#f3ede6]` → `dark:text-fg` |
| 41 | — | `dark:text-[#a38f7d]` → `dark:text-fg-tertiary` |
| 52 | — | `dark:border-[#3a322d]` → `dark:border-line-strong`<br>`dark:bg-[#221d1a]` → `dark:bg-noir-800`<br>`dark:text-[#c5b6a3]` → `dark:text-fg-secondary`<br>`dark:hover:bg-[#342823]` → `dark:hover:bg-noir-700` |
| 60 | — | `dark:border-[#48342d]` → `dark:border-line-strong`<br>`dark:bg-[#261e1b]` → `dark:bg-noir-750`<br>`dark:text-[#e2a890]` → `dark:text-copper-400`<br>`dark:hover:bg-[#342823]` → `dark:hover:bg-noir-650` |

#### `src/components/ui/order/OrderInfo.jsx`

| Line | Add | Replace |
|---:|---|---|
| 7 | — | `dark:border-[#2e2724]` → `dark:border-line`<br>`dark:bg-[#1c1816]` → `dark:bg-noir-800` |
| 8 | — | `dark:border-[#2e2724]` → `dark:border-line`<br>`dark:text-[#c5b6a3]` → `dark:text-fg` |
| 9 | — | `dark:text-[#cca474]` → `dark:text-fg-tertiary` |
| 15 | — | `dark:text-[#f3ede6]` → `dark:text-fg` |
| 16 | — | `dark:text-[#c5b6a3]` → `dark:text-fg-secondary` |
| 21 | — | `dark:bg-[#25201c]` → `dark:bg-noir-700`<br>`dark:text-[#a38f7d]` → `dark:text-fg-tertiary` |
| 37 | — | `dark:border-[#2e2724]` → `dark:border-line`<br>`dark:bg-[#1c1816]` → `dark:bg-noir-800` |
| 39 | — | `dark:text-[#c5b6a3]` → `dark:text-fg` |
| 40 | — | `dark:text-[#cca474]` → `dark:text-fg-tertiary` |
| 43 | — | `dark:text-[#a38f7d]` → `dark:text-fg-tertiary` |
| 45 | — | `dark:border-[#43362c]` → `dark:border-line-strong`<br>`dark:bg-[#29221d]` → `dark:bg-noir-700`<br>`dark:text-[#f3ede6]` → `dark:text-copper-400` |
| 52 | — | `dark:text-[#a38f7d]` → `dark:text-fg-tertiary` |
| 57 | — | `dark:text-[#a38f7d]` → `dark:text-fg-tertiary` |
| 63 | — | `dark:text-[#a38f7d]` → `dark:text-fg-tertiary` |
| 69 | — | `dark:text-emerald-400` → `dark:text-state-success` |
| 76 | — | `dark:border-[#2e2724]` → `dark:border-line` |
| 78 | — | `dark:text-[#a38f7d]` → `dark:text-fg-tertiary` |
| 81 | — | `dark:text-[#8f7e71]` → `dark:text-fg-tertiary` |
| 85 | `dark:from-copper-500` `dark:to-copper-500` | — |

#### `src/components/ui/order/OrderItems.jsx`

| Line | Add | Replace |
|---:|---|---|
| 5 | — | `dark:border-[#2e2724]` → `dark:border-line`<br>`dark:bg-[#1c1816]` → `dark:bg-noir-800` |
| 7 | — | `dark:text-[#c5b6a3]` → `dark:text-fg` |
| 8 | — | `dark:text-[#cca474]` → `dark:text-fg-tertiary` |
| 11 | — | `dark:bg-[#25201c]` → `dark:bg-noir-700`<br>`dark:text-[#c5b6a3]` → `dark:text-copper-400` |
| 17 | — | `dark:divide-[#2e2724]` → `dark:divide-line` |
| 21 | — | `dark:border-[#332b26]` → `dark:border-line`<br>`dark:bg-[#221d1a]` → `dark:bg-noir-800`<br>`dark:hover:border-[#4d4038]` → `dark:hover:border-line-hover` |
| 23 | — | `dark:border-[#3e352f]` → `dark:border-line`<br>`dark:bg-[#2a2420]` → `dark:bg-noir-750` |
| 27 | — | `dark:text-[#cca474]` → `dark:text-fg-tertiary` |
| 32 | — | `dark:text-[#f3ede6]` → `dark:text-fg` |
| 35 | — | `dark:text-[#a38f7d]` → `dark:text-fg-tertiary` |
| 40 | — | `dark:text-[#f3ede6]` → `dark:text-fg` |

#### `src/components/ui/order/OrderProgress.jsx`

| Line | Add | Replace |
|---:|---|---|
| 24 | — | `dark:border-[#2e2724]` → `dark:border-line`<br>`dark:bg-[#1c1816]` → `dark:bg-noir-800` |
| 26 | — | `dark:text-[#c5b6a3]` → `dark:text-fg` |
| 27 | — | `dark:text-[#cca474]` → `dark:text-fg-tertiary` |
| 32 | — | `dark:border-red-500/20` → `dark:border-state-danger/25`<br>`dark:bg-red-500/10` → `dark:bg-state-danger/10`<br>`dark:text-red-400` → `dark:text-state-danger` |
| 33 | — | `dark:bg-[#29211c]` → `dark:bg-noir-700`<br>`dark:text-[#fcba69]` → `dark:text-fg-tertiary` |
| 54 | — | `dark:bg-[#cca474]` → `dark:bg-copper-500`<br>`dark:bg-[#cca474]` → `dark:bg-noir-650` |
| 62 | `dark:border-state-danger` `dark:bg-state-danger-solid` | `dark:ring-[#1c1816]` → `dark:ring-noir-800` |
| 64 | — | `dark:border-[#cca474]` → `dark:border-copper-600`<br>`dark:bg-[#cca474]` → `dark:bg-copper-500`<br>`dark:text-[#141110]` → `dark:text-fg-on-accent`<br>`dark:ring-[#1c1816]` → `dark:ring-noir-800` |
| 65 | — | `dark:border-[#3e342e]` → `dark:border-line-strong`<br>`dark:bg-[#1c1816]` → `dark:bg-noir-800`<br>`dark:text-[#52443d]` → `dark:text-fg-tertiary`<br>`dark:ring-[#1c1816]` → `dark:ring-noir-800` |
| 80 | — | `dark:text-red-400` → `dark:text-state-danger` |
| 82 | — | `dark:text-[#f3ede6]` → `dark:text-fg` |
| 83 | — | `dark:text-[#8f7e71]` → `dark:text-fg-tertiary` |
| 96 | — | `dark:border-[#2e2724]` → `dark:border-line` |
| 97 | — | `dark:text-[#a38f7d]` → `dark:text-fg-tertiary` |
| 98 | — | `dark:text-[#f3ede6]` → `dark:text-fg` |

#### `src/components/ui/productDetails/Pagination.jsx`

| Line | Add | Replace |
|---:|---|---|
| 33 | — | `dark:bg-slate-800` → `dark:bg-noir-750`<br>`dark:border-slate-700` → `dark:border-line` |
| 40 | — | `dark:text-slate-400` → `dark:text-fg-secondary` |
| 50 | — | `dark:bg-slate-800` → `dark:bg-noir-750`<br>`dark:hover:bg-slate-700` → `dark:hover:bg-noir-650`<br>`dark:disabled:hover:bg-slate-800` → `dark:disabled:hover:bg-noir-700`<br>`dark:border-slate-700` → `dark:border-line` |
| 61 | — | `dark:bg-slate-800` → `dark:bg-noir-750`<br>`dark:hover:bg-slate-700` → `dark:hover:bg-noir-650`<br>`dark:disabled:hover:bg-slate-800` → `dark:disabled:hover:bg-noir-700`<br>`dark:border-slate-700` → `dark:border-line` |

#### `src/components/ui/productDetails/ProductGallery.jsx`

| Line | Add | Replace |
|---:|---|---|
| 25 | `dark:bg-noir-750` | — |
| 26 | `dark:border-line` | — |
| 37 | `dark:text-fg-tertiary` | — |
| 51 | `dark:bg-noir-800` `dark:border-line-strong` `dark:text-fg-secondary` `dark:hover:bg-noir-750` | — |
| 52 | `dark:hover:text-copper-300` | — |
| 66 | `dark:bg-noir-750` | — |
| 67 | `dark:border-copper-600` `dark:ring-copper-500/20` | — |
| 68 | `dark:hover:border-line-hover` | — |
| 85 | `dark:bg-noir-800` `dark:border-line-strong` `dark:text-fg-secondary` `dark:hover:bg-noir-750` | — |
| 86 | `dark:hover:text-copper-300` | — |

#### `src/components/ui/productDetails/ProductGrid.jsx`

| Line | Add | Replace |
|---:|---|---|
| 27 | — | `dark:border-slate-700` → `dark:border-line` |
| 29 | — | `dark:text-gray-300` → `dark:text-fg-secondary` |
| 30 | — | `dark:text-gray-400` → `dark:text-fg-tertiary` |
| 67 | — | `dark:bg-slate-800` → `dark:bg-noir-750` |
| 69 | — | `dark:border-slate-700` → `dark:border-line` |

#### `src/components/ui/productDetails/ProductInfo.jsx`

| Line | Add | Replace |
|---:|---|---|
| 57 | `dark:bg-noir-650` `dark:text-fg` | — |
| 60 | `dark:bg-copper-500` `dark:text-fg-on-accent` | — |
| 65 | `dark:text-fg` | — |
| 69 | `dark:text-fg-tertiary` | — |
| 74 | `dark:bg-state-warning/10` `dark:text-state-warning` `dark:border-state-warning/25` | — |
| 76 | `dark:text-star` `dark:fill-star/20` | — |
| 83 | `dark:bg-state-info/10` `dark:text-state-info` `dark:border-state-info/25` | — |
| 84 | `dark:hover:bg-state-info/10` | — |
| 86 | `dark:text-state-info` | — |
| 90 | `dark:bg-noir-650` `dark:text-fg` | — |
| 98 | `dark:text-copper-400` | — |
| 104 | `dark:text-fg-tertiary` | — |
| 107 | `dark:bg-state-success/10` `dark:text-state-success` | — |
| 114 | `dark:border-line` | — |
| 118 | `dark:bg-noir-750` | — |
| 123 | `dark:text-fg-tertiary` `dark:hover:text-fg` | — |
| 128 | `dark:text-fg` | — |
| 135 | `dark:text-fg-tertiary` `dark:hover:text-fg` | — |
| 146 | `dark:bg-copper-500` `dark:hover:bg-copper-400` `dark:text-fg-on-accent` | — |
| 172 | `dark:bg-state-danger/10` `dark:border-state-danger/25` `dark:text-state-danger` | — |
| 173 | `dark:bg-noir-800` `dark:border-line` `dark:text-fg-secondary` `dark:hover:text-state-danger` `dark:hover:border-state-danger/25` `dark:hover:bg-noir-700` | — |
| 177 | `dark:text-state-danger` | — |
| 181 | `dark:text-state-danger` | — |
| 188 | `dark:border-line` `dark:bg-noir-800` | — |
| 190 | `dark:bg-noir-800` `dark:border-line-strong` `dark:text-copper-400` | — |
| 195 | `dark:text-fg` | — |
| 196 | `dark:text-fg-secondary` `dark:hover:text-copper-300` | — |
| 202 | `dark:bg-noir-700` | — |
| 205 | `dark:bg-noir-800` `dark:border-line-strong` `dark:text-copper-400` | — |
| 210 | `dark:text-fg` | — |
| 211 | `dark:text-fg-secondary` | — |

#### `src/components/ui/productDetails/ProductTabs.jsx`

| Line | Add | Replace |
|---:|---|---|
| 50 | `dark:border-line` | — |
| 58 | `dark:bg-noir-750` `dark:text-copper-400` | — |
| 59 | `dark:text-fg-secondary` `dark:hover:bg-noir-750` `dark:hover:text-fg` | — |
| 70 | `dark:bg-noir-750` `dark:text-copper-400` | — |
| 71 | `dark:text-fg-secondary` `dark:hover:bg-noir-750` `dark:hover:text-fg` | — |
| 78 | `dark:bg-copper-500` `dark:text-fg-on-accent` | — |
| 79 | `dark:bg-noir-750` `dark:text-fg-secondary` | — |
| 92 | `dark:text-fg` | — |
| 95 | `dark:text-fg-secondary` | — |
| 104 | `dark:text-fg` | — |
| 109 | `dark:text-fg` | — |
| 118 | `dark:fill-star` `dark:text-star` | — |
| 119 | `dark:fill-noir-600` `dark:text-noir-600` | — |
| 125 | `dark:text-fg-secondary` | — |
| 131 | `dark:divide-line` `dark:border-line` | — |
| 133 | `dark:text-fg-secondary` | — |
| 134 | `dark:text-fg-placeholder` | — |
| 147 | `dark:bg-copper-500` `dark:text-fg-on-accent` | — |
| 152 | `dark:text-fg` | — |
| 153 | `dark:text-fg-tertiary` | — |
| 164 | `dark:fill-star` `dark:text-star` | — |
| 165 | `dark:fill-noir-600` `dark:text-noir-600` | — |
| 172 | `dark:text-fg-secondary` | — |
| 181 | `dark:border-line` | — |
| 183 | `dark:text-fg` | — |
| 186 | `dark:text-fg-secondary` | — |
| 204 | `dark:text-state-warning` | — |
| 208 | `dark:fill-star` `dark:text-star` | — |
| 209 | `dark:text-fg-placeholder` | — |
| 215 | `dark:text-fg-secondary` | — |
| 226 | `dark:border-line-control` `dark:bg-noir-750` `dark:focus:bg-noir-750` | — |
| 227 | `dark:focus:border-copper-400` `dark:text-fg` | — |
| 233 | `dark:bg-copper-500` `dark:hover:bg-copper-400` `dark:text-fg-on-accent` | — |
| 247 | `dark:bg-noir-800` `dark:border-line` | — |
| 249 | `dark:text-fg-secondary` | — |
| 254 | `dark:bg-copper-500` `dark:hover:bg-copper-400` `dark:text-fg-on-accent` | — |

#### `src/components/ui/productDetails/SimilarProducts.jsx`

| Line | Add | Replace |
|---:|---|---|
| 25 | `dark:border-line` | — |
| 27 | `dark:text-fg` | — |
| 36 | `dark:border-line` `dark:bg-noir-800` `dark:hover:bg-noir-700` `dark:text-fg` | — |
| 45 | `dark:border-line` `dark:bg-noir-800` `dark:hover:bg-noir-700` `dark:text-fg` | — |

#### `src/components/ui/productDetails/WishlistCard.jsx`

| Line | Add | Replace |
|---:|---|---|
| 71 | `dark:bg-noir-800` `dark:border-line` | — |
| 89 | `dark:bg-noir-900/85` `dark:text-fg-on-accent` | — |
| 95 | `dark:bg-state-success-solid` | — |
| 100 | `dark:bg-noir-800` `dark:text-fg` | — |
| 105 | `dark:bg-noir-700` `dark:border-line-subtle` | — |
| 106 | `dark:fill-star` `dark:text-star` | — |
| 107 | `dark:text-fg` | — |
| 118 | `dark:bg-noir-700` `dark:text-state-danger` `dark:hover:bg-state-danger/10` `dark:hover:text-state-danger` | — |
| 132 | `dark:bg-noir-700` `dark:text-fg` `dark:hover:bg-noir-600` `dark:hover:text-copper-300` | — |
| 149 | `dark:text-fg` `dark:hover:text-copper-300` | — |
| 154 | `dark:text-copper-400` | — |
| 159 | `dark:text-fg-tertiary` | — |

#### `src/components/ui/profile/AddressBook.jsx`

| Line | Add | Replace |
|---:|---|---|
| 142 | `dark:bg-noir-800` `dark:border-line` | — |
| 144 | `dark:border-line` | — |
| 145 | `dark:text-fg` | — |
| 148 | `dark:text-fg-secondary` | — |
| 154 | `dark:text-fg-secondary` | — |
| 163 | `dark:bg-noir-750` `dark:border-copper-600` `dark:text-copper-400` | — |
| 164 | `dark:bg-noir-800` `dark:border-line-strong` `dark:text-fg` `dark:hover:bg-noir-750` | — |
| 175 | `dark:text-fg-secondary` | — |
| 182 | `dark:border-line-control` `dark:bg-noir-750` `dark:focus:bg-noir-750` | — |
| 183 | `dark:focus:border-copper-400` `dark:text-fg` | — |
| 188 | `dark:text-fg-secondary` | — |
| 195 | `dark:border-line-control` `dark:bg-noir-750` `dark:focus:bg-noir-750` | — |
| 196 | `dark:focus:border-copper-400` `dark:text-fg` | — |
| 201 | `dark:text-fg-secondary` | — |
| 208 | `dark:border-line-control` `dark:bg-noir-750` `dark:focus:bg-noir-750` | — |
| 209 | `dark:focus:border-copper-400` `dark:text-fg` | — |
| 214 | `dark:text-fg-secondary` | — |
| 220 | `dark:border-line-control` `dark:bg-noir-750` `dark:focus:bg-noir-750` | — |
| 221 | `dark:focus:border-copper-400` `dark:text-fg` | — |
| 226 | `dark:text-fg-secondary` | — |
| 232 | `dark:border-line-control` `dark:bg-noir-750` `dark:focus:bg-noir-750` | — |
| 233 | `dark:focus:border-copper-400` `dark:text-fg` | — |
| 238 | `dark:text-fg-secondary` | — |
| 243 | `dark:accent-copper-400` | — |
| 248 | `dark:border-line` | — |
| 252 | `dark:bg-copper-500` `dark:hover:bg-copper-400` `dark:text-fg-on-accent` | — |
| 263 | `dark:border-line-strong` `dark:bg-noir-800` | — |
| 264 | `dark:text-fg` `dark:hover:bg-noir-750` | — |
| 272 | `dark:bg-noir-900` `dark:border-line` | — |
| 273 | `dark:border-line` | — |
| 275 | `dark:text-fg` | — |
| 276 | `dark:text-fg-secondary` | — |
| 280 | `dark:bg-noir-800` `dark:border-line` `dark:text-fg-secondary` | — |
| 286 | `dark:border-line-strong` | — |
| 287 | `dark:text-fg-secondary` `dark:bg-noir-800` | — |
| 297 | `dark:bg-noir-800` `dark:border-line-strong` | — |
| 298 | `dark:bg-noir-800` `dark:border-line` `dark:hover:border-line-hover` | — |
| 302 | `dark:text-fg` | — |
| 304 | `dark:text-copper-400` | — |
| 306 | `dark:text-copper-400` | — |
| 312 | `dark:bg-copper-500` `dark:text-fg-on-accent` | — |
| 321 | `dark:text-copper-400` | — |
| 336 | `dark:text-fg-secondary` | — |
| 341 | `dark:border-line` | — |
| 345 | `dark:text-copper-400` | — |
| 354 | `dark:text-state-danger` | — |

#### `src/components/ui/profile/EditProfile.jsx`

| Line | Add | Replace |
|---:|---|---|
| 53 | `dark:bg-noir-800` `dark:border-line` | — |
| 56 | `dark:border-line` | — |
| 58 | `dark:text-fg` | — |
| 59 | `dark:text-fg-secondary` | — |
| 65 | `dark:text-fg-tertiary` | — |
| 71 | `dark:border-line-strong` `dark:bg-noir-800` `dark:hover:bg-noir-700` | — |
| 72 | `dark:text-fg` | — |
| 75 | `dark:text-copper-400` | — |
| 80 | `dark:border-line-strong` `dark:bg-noir-800` `dark:hover:bg-noir-700` | — |
| 81 | `dark:text-fg` | — |
| 84 | `dark:text-copper-400` | — |
| 89 | `dark:border-line` | — |
| 90 | `dark:bg-noir-750` `dark:border-line-strong` `dark:text-copper-400` | — |
| 105 | `dark:text-fg` | — |
| 106 | `dark:text-fg-secondary` | — |
| 115 | `dark:text-fg-secondary` | — |
| 121 | `dark:border-line-strong` `dark:bg-noir-800` `dark:focus:bg-noir-750` | — |
| 122 | `dark:focus:border-copper-400` `dark:text-fg` | — |
| 127 | `dark:text-fg-secondary` | — |
| 133 | `dark:border-line-control` `dark:bg-noir-750` `dark:focus:bg-noir-750` | — |
| 134 | `dark:focus:border-copper-400` `dark:text-fg` | — |
| 139 | `dark:text-fg-secondary` | — |
| 145 | `dark:border-line` `dark:bg-noir-750` `dark:text-fg-secondary` | — |
| 148 | `dark:bg-state-success/10` `dark:text-state-success` | — |
| 153 | `dark:text-fg-tertiary` | — |
| 157 | `dark:text-fg-secondary` | — |
| 163 | `dark:border-line-control` `dark:bg-noir-750` `dark:focus:bg-noir-750` | — |
| 164 | `dark:focus:border-copper-400` `dark:text-fg` | — |
| 169 | `dark:border-line` | — |
| 173 | `dark:bg-copper-500` `dark:hover:bg-copper-400` `dark:text-fg-on-accent` | — |
| 183 | `dark:border-line-strong` `dark:bg-noir-800` `dark:text-fg` | — |
| 184 | `dark:hover:bg-noir-750` | — |

#### `src/components/ui/profile/ProfileOverview.jsx`

| Line | Add | Replace |
|---:|---|---|
| 13 | `dark:border-line` `dark:bg-noir-800` | — |
| 14 | `dark:text-fg-secondary` | — |
| 15 | `dark:text-fg` | — |
| 16 | `dark:text-fg-secondary` | — |
| 21 | `dark:border-line` `dark:bg-noir-800` | — |
| 22 | `dark:text-fg-secondary` | — |
| 23 | `dark:text-fg` | — |
| 24 | `dark:text-fg-secondary` | — |
| 27 | `dark:border-line` `dark:bg-noir-800` | — |
| 28 | `dark:text-fg-secondary` | — |
| 29 | `dark:text-fg` | — |
| 30 | `dark:text-fg-secondary` | — |
| 36 | `dark:bg-noir-900` `dark:border-line` | — |
| 38 | `dark:text-fg` | — |
| 41 | `dark:border-line-strong` `dark:bg-noir-800` `dark:text-fg` | — |
| 42 | `dark:hover:border-copper-500` `dark:hover:text-copper-300` | — |
| 49 | `dark:border-line` | — |
| 51 | `dark:text-fg-secondary` | — |
| 52 | `dark:text-fg` | — |
| 56 | `dark:text-fg-secondary` | — |
| 58 | `dark:text-fg` | — |
| 59 | `dark:bg-state-success/10` `dark:text-state-success` | — |
| 67 | `dark:text-fg-secondary` | — |
| 68 | `dark:text-fg` | — |
| 72 | `dark:text-fg-secondary` | — |
| 73 | `dark:text-fg` | — |
| 78 | `dark:bg-noir-900` `dark:border-line` | — |
| 80 | `dark:text-fg` | — |
| 83 | `dark:border-line-strong` `dark:bg-noir-800` `dark:text-fg` | — |
| 84 | `dark:hover:border-copper-500` `dark:hover:text-copper-300` | — |
| 92 | `dark:border-line-strong` `dark:text-fg-secondary` | — |
| 96 | `dark:border-line` | — |
| 101 | `dark:bg-noir-800` `dark:border-line-strong` `dark:border-line` | — |
| 105 | `dark:text-fg` | — |
| 106 | `dark:text-copper-400` | — |
| 110 | `dark:bg-copper-500` `dark:text-fg-on-accent` | — |
| 115 | `dark:text-fg-secondary` | — |
| 127 | `dark:bg-noir-900` `dark:border-line` | — |
| 129 | `dark:text-fg` | — |
| 130 | `dark:text-fg-secondary` | — |
| 136 | `dark:border-copper-600` `dark:text-copper-400` `dark:hover:bg-noir-750` | — |
| 144 | `dark:bg-noir-900` `dark:border-line` | — |
| 147 | `dark:text-fg` | — |
| 148 | `dark:text-copper-400` | — |
| 152 | `dark:text-fg-secondary` | — |
| 156 | `dark:border-line` | — |
| 158 | `dark:bg-noir-750` `dark:text-copper-400` | — |
| 162 | `dark:text-fg` | — |
| 163 | `dark:text-fg-secondary` | — |
| 167 | `dark:bg-state-warning/10` `dark:text-state-warning` | — |
| 170 | `dark:text-fg` | — |

#### `src/components/ui/profile/ProfileSidebar.jsx`

| Line | Add | Replace |
|---:|---|---|
| 33 | `dark:bg-noir-800` `dark:border-line` | — |
| 35 | `dark:bg-noir-750` `dark:border-line-strong` `dark:text-copper-400` | — |
| 50 | `dark:text-fg` | — |
| 53 | `dark:text-fg-secondary` | — |
| 57 | `dark:bg-noir-750` `dark:text-copper-400` | — |
| 62 | `dark:text-fg-tertiary` | — |
| 67 | `dark:bg-noir-800` `dark:border-line` | — |
| 77 | `dark:bg-copper-500` `dark:text-fg-on-accent` | — |
| 78 | `dark:text-fg` `dark:hover:bg-noir-750` `dark:hover:text-copper-300` | — |
| 81 | `dark:text-fg-secondary` | — |
| 89 | `dark:text-fg` | — |
| 90 | `dark:hover:bg-noir-750` `dark:hover:text-copper-300` | — |
| 93 | `dark:text-fg-secondary` | — |
| 97 | `dark:bg-noir-750` `dark:text-copper-400` | — |
| 105 | `dark:text-fg` | — |
| 106 | `dark:hover:bg-noir-750` `dark:hover:text-copper-300` | — |
| 109 | `dark:text-fg-secondary` | — |
| 113 | `dark:bg-noir-750` `dark:text-copper-400` | — |
| 119 | `dark:bg-noir-700` | — |
| 124 | `dark:text-state-danger` `dark:hover:bg-state-danger/10` | — |
| 125 | `dark:hover:border-state-danger/25` | — |
| 127 | `dark:text-state-danger` | — |

#### `src/components/ui/profile/SecurityTab.jsx`

| Line | Add | Replace |
|---:|---|---|
| 56 | `dark:bg-copper-500` `dark:text-fg-on-accent` `dark:bg-noir-700` `dark:text-fg-secondary` | — |
| 58 | `dark:text-fg` | — |
| 61 | `dark:bg-noir-650` | — |
| 65 | `dark:bg-copper-500` `dark:text-fg-on-accent` `dark:bg-noir-700` `dark:text-fg-secondary` | — |
| 67 | `dark:text-fg` | — |
| 70 | `dark:bg-noir-650` | — |
| 74 | `dark:bg-state-success-solid` `dark:bg-noir-700` `dark:text-fg-secondary` | — |
| 76 | `dark:text-fg` | — |
| 81 | `dark:bg-noir-900` `dark:border-line` | — |
| 82 | `dark:border-line` | — |
| 83 | `dark:bg-noir-750` `dark:text-copper-400` | — |
| 87 | `dark:text-fg` | — |
| 88 | `dark:text-fg-secondary` | — |
| 95 | `dark:text-fg-secondary` | — |
| 100 | `dark:border-line` `dark:bg-noir-750` `dark:text-fg-secondary` | — |
| 103 | `dark:text-fg-tertiary` | — |
| 106 | `dark:border-line` | — |
| 110 | `dark:bg-copper-500` `dark:hover:bg-copper-400` `dark:text-fg-on-accent` | — |
| 118 | `dark:border-line-strong` `dark:bg-noir-800` | — |
| 119 | `dark:text-fg` `dark:hover:bg-noir-750` | — |
| 130 | `dark:bg-noir-800` `dark:border-line` | — |
| 132 | `dark:border-line` | — |
| 133 | `dark:text-fg` | — |
| 136 | `dark:text-fg-secondary` | — |
| 137 | `dark:text-fg` | — |
| 143 | `dark:text-fg-secondary` | — |
| 151 | `dark:border-line-control` `dark:bg-noir-750` `dark:focus:bg-noir-750` | — |
| 152 | `dark:focus:border-copper-400` `dark:text-fg` | — |
| 158 | `dark:text-fg-secondary` | — |
| 165 | `dark:border-line-control` `dark:bg-noir-750` `dark:focus:bg-noir-750` | — |
| 166 | `dark:focus:border-copper-400` `dark:text-fg` | — |
| 171 | `dark:text-fg-secondary` | — |
| 178 | `dark:border-line-control` `dark:bg-noir-750` `dark:focus:bg-noir-750` | — |
| 179 | `dark:focus:border-copper-400` `dark:text-fg` | — |
| 185 | `dark:border-line` | — |
| 189 | `dark:bg-copper-500` `dark:hover:bg-copper-400` `dark:text-fg-on-accent` | — |
| 198 | `dark:border-line-strong` `dark:bg-noir-800` | — |
| 199 | `dark:text-fg` `dark:hover:bg-noir-750` | — |
| 208 | `dark:border-state-success/25` | — |
| 209 | `dark:bg-state-success/10` `dark:text-state-success` | — |
| 212 | `dark:text-state-success` | — |
| 213 | `dark:text-fg-secondary` | — |
| 218 | `dark:bg-copper-500` `dark:hover:bg-copper-400` `dark:text-fg-on-accent` | — |

#### `src/components/ui/searchinput/FilterSidebar.jsx`

| Line | Add | Replace |
|---:|---|---|
| 78 | — | `dark:bg-slate-900` → `dark:bg-noir-700` |
| 83 | — | `dark:text-slate-100` → `dark:text-fg` |
| 94 | `dark:text-fg-tertiary` | `dark:hover:text-slate-200` → `dark:hover:text-fg-secondary` |
| 102 | — | `dark:border-slate-800` → `dark:border-line` |
| 111 | — | `dark:hover:text-slate-200` → `dark:hover:text-fg` |
| 120 | — | `dark:bg-slate-800` → `dark:bg-noir-750`<br>`dark:text-slate-200` → `dark:text-fg-secondary` |
| 124 | `dark:hover:text-state-danger` | — |
| 132 | — | `dark:bg-slate-800` → `dark:bg-noir-750`<br>`dark:text-slate-200` → `dark:text-fg-secondary` |
| 137 | `dark:hover:text-state-danger` | — |
| 150 | — | `dark:border-slate-800` → `dark:border-line` |
| 158 | — | `dark:bg-slate-800` → `dark:bg-noir-750` |
| 159 | — | `dark:bg-slate-800` → `dark:bg-noir-750` |
| 160 | — | `dark:bg-slate-800` → `dark:bg-noir-750` |
| 163 | — | `dark:text-slate-300` → `dark:text-fg-secondary` |
| 169 | — | `dark:text-slate-200` → `dark:text-fg-secondary` |
| 177 | `dark:text-fg` `dark:focus:ring-copper-400` | `dark:border-slate-700` → `dark:border-line-strong` |
| 187 | — | `dark:border-slate-800` → `dark:border-line` |
| 198 | `dark:focus:border-copper-400` | `dark:border-slate-700` → `dark:border-line-control`<br>`dark:text-slate-100` → `dark:text-fg`<br>`dark:placeholder-slate-500` → `dark:placeholder-fg-placeholder` |
| 205 | `dark:focus:border-copper-400` | `dark:border-slate-700` → `dark:border-line-control`<br>`dark:text-slate-100` → `dark:text-fg`<br>`dark:placeholder-slate-500` → `dark:placeholder-fg-placeholder` |
| 210 | — | `dark:border-slate-800` → `dark:border-line` |
| 219 | — | `dark:border-slate-700` → `dark:border-line-strong` |
| 220 | `dark:focus:border-copper-400` | `dark:text-slate-300` → `dark:text-fg-tertiary` |
| 228 | `dark:text-fg-tertiary` | — |

#### `src/components/ui/searchinput/SearchInput.jsx`

| Line | Add | Replace |
|---:|---|---|
| 99 | `dark:bg-noir-750` | — |
| 103 | `dark:text-fg-tertiary` | — |
| 111 | `dark:bg-noir-750` `dark:border-line-control` `dark:focus:ring-copper-400` | — |
| 145 | `dark:bg-noir-750` `dark:border-line-control` | — |
| 153 | `dark:text-fg` | — |
| 156 | `dark:text-state-info` | — |
| 160 | `dark:bg-state-info` `dark:hover:bg-state-info` | — |
| 168 | `dark:bg-noir-750` `dark:border-line-control` | — |
| 169 | `dark:text-fg-tertiary` | — |

#### `src/components/ui/skeleton/CartSkeleton.jsx`

| Line | Add | Replace |
|---:|---|---|
| 3 | — | `dark:bg-[#141110]` → `dark:bg-noir-900` |
| 7 | — | `dark:border-[#2e2724]` → `dark:border-line` |
| 10 | — | `dark:bg-[#221d1a]` → `dark:bg-noir-700` |
| 13 | — | `dark:bg-[#221d1a]` → `dark:bg-noir-700` |
| 15 | — | `dark:bg-[#221d1a]` → `dark:bg-noir-700` |
| 27 | — | `dark:bg-[#221d1a]` → `dark:bg-noir-700` |
| 28 | — | `dark:bg-[#221d1a]` → `dark:bg-noir-700` |
| 32 | — | `dark:border-[#2e2724]` → `dark:border-line`<br>`dark:bg-[#1c1816]` → `dark:bg-noir-800` |
| 33 | — | `dark:divide-[#2e2724]` → `dark:divide-line` |
| 38 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 40 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 41 | — | `dark:bg-[#221d1a]` → `dark:bg-noir-750` |
| 48 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 51 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 52 | — | `dark:bg-[#221d1a]` → `dark:bg-noir-750` |
| 65 | — | `dark:border-[#2e2724]` → `dark:border-line`<br>`dark:bg-[#1c1816]` → `dark:bg-noir-800` |
| 66 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 71 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 72 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 75 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 76 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 79 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 80 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 85 | — | `dark:border-[#2e2724]` → `dark:border-line` |
| 86 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 87 | — | `dark:bg-[#3a322d]` → `dark:bg-noir-650` |
| 91 | — | `dark:bg-[#3a322d]` → `dark:bg-noir-650` |
| 95 | — | `dark:border-[#2e2724]` → `dark:border-line`<br>`dark:bg-[#1c1816]` → `dark:bg-noir-800` |
| 96 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 98 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 99 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 104 | — | `dark:border-[#2e2724]` → `dark:border-line` |

#### `src/components/ui/skeleton/OrderItemSkeleton.jsx`

| Line | Add | Replace |
|---:|---|---|
| 3 | — | `dark:bg-[#181412]` → `dark:bg-noir-800`<br>`dark:border-[#2e2724]` → `dark:border-line` |
| 6 | — | `dark:bg-[#3a322d]` → `dark:bg-noir-650` |
| 7 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 9 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 10 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 13 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 14 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 17 | — | `dark:bg-[#181412]` → `dark:bg-noir-800`<br>`dark:border-[#2e2724]` → `dark:border-line` |
| 20 | — | `dark:bg-[#3a322d]` → `dark:bg-noir-650` |
| 21 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 23 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 24 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 27 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 28 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 31 | — | `dark:bg-[#181412]` → `dark:bg-noir-800`<br>`dark:border-[#2e2724]` → `dark:border-line` |
| 34 | — | `dark:bg-[#3a322d]` → `dark:bg-noir-650` |
| 35 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 37 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 38 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 41 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 42 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 45 | — | `dark:bg-[#181412]` → `dark:bg-noir-800`<br>`dark:border-[#2e2724]` → `dark:border-line` |
| 48 | — | `dark:bg-[#3a322d]` → `dark:bg-noir-650` |
| 49 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 51 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 52 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 55 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 56 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 59 | — | `dark:bg-[#181412]` → `dark:bg-noir-800`<br>`dark:border-[#2e2724]` → `dark:border-line` |
| 62 | — | `dark:bg-[#3a322d]` → `dark:bg-noir-650` |
| 63 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 65 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 66 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 69 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 70 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |

#### `src/components/ui/skeleton/OrderSkeleton.jsx`

| Line | Add | Replace |
|---:|---|---|
| 3 | — | `dark:bg-[#141110]` → `dark:bg-noir-900` |
| 7 | — | `dark:border-[#2e2724]` → `dark:border-line` |
| 10 | — | `dark:bg-[#221d1a]` → `dark:bg-noir-700` |
| 12 | — | `dark:bg-[#221d1a]` → `dark:bg-noir-700` |
| 17 | — | `dark:bg-[#221d1a]` → `dark:bg-noir-700` |
| 19 | — | `dark:bg-[#221d1a]` → `dark:bg-noir-700` |
| 28 | — | `dark:border-[#2e2724]` → `dark:border-line`<br>`dark:bg-[#181412]` → `dark:bg-noir-800` |
| 30 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 31 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 37 | — | `dark:bg-[#3a322d]` → `dark:bg-noir-650` |
| 38 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 49 | — | `dark:border-[#2e2724]` → `dark:border-line`<br>`dark:bg-[#181412]` → `dark:bg-noir-800` |
| 51 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 52 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 56 | — | `dark:border-[#221d1a]` → `dark:border-line-subtle` |
| 58 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 60 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 61 | — | `dark:bg-[#221d1a]` → `dark:bg-noir-750` |
| 64 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 71 | — | `dark:border-[#2e2724]` → `dark:border-line`<br>`dark:bg-[#181412]` → `dark:bg-noir-800` |
| 72 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 75 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 76 | — | `dark:bg-[#221d1a]` → `dark:bg-noir-750` |
| 78 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 83 | — | `dark:border-[#2e2724]` → `dark:border-line`<br>`dark:bg-[#181412]` → `dark:bg-noir-800` |
| 85 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 86 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 90 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 91 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 94 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 95 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 98 | — | `dark:border-[#2e2724]` → `dark:border-line` |
| 100 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 101 | — | `dark:bg-[#221d1a]` → `dark:bg-noir-750` |
| 103 | — | `dark:bg-[#3a322d]` → `dark:bg-noir-650` |

#### `src/components/ui/skeleton/ProductCardSkeleton.jsx`

| Line | Add | Replace |
|---:|---|---|
| 3 | — | `dark:border-gray-700` → `dark:border-line`<br>`dark:bg-gray-800` → `dark:bg-noir-800` |
| 6 | — | `dark:bg-gray-700` → `dark:bg-noir-700` |
| 12 | — | `dark:bg-gray-700` → `dark:bg-noir-700` |
| 15 | — | `dark:bg-gray-700` → `dark:bg-noir-700` |
| 18 | — | `dark:bg-gray-700` → `dark:bg-noir-700` |

#### `src/components/ui/skeleton/ProductDetailsSkeleton.jsx`

| Line | Add | Replace |
|---:|---|---|
| 3 | — | `dark:bg-[#141110]` → `dark:bg-noir-900` |
| 9 | `dark:bg-noir-750` | — |
| 10 | `dark:border-line` | — |
| 14 | `dark:bg-noir-750` `dark:border-line` | — |
| 16 | `dark:bg-noir-750` `dark:border-line` | — |
| 18 | `dark:bg-noir-750` `dark:border-line` | — |
| 23 | `dark:bg-noir-700` | — |
| 24 | `dark:bg-noir-650` | — |
| 27 | `dark:bg-noir-700` | — |
| 30 | `dark:bg-noir-750` | — |
| 31 | `dark:bg-noir-750` | — |
| 35 | `dark:bg-noir-750` | — |
| 36 | `dark:bg-noir-750` | — |
| 40 | `dark:bg-noir-700` | — |
| 41 | `dark:bg-noir-750` | — |
| 45 | `dark:bg-noir-750` `dark:border-line` | — |
| 46 | `dark:bg-noir-700` | — |
| 47 | `dark:bg-noir-750` `dark:border-line` | — |
| 50 | `dark:border-line` `dark:bg-noir-800` | — |
| 52 | `dark:bg-noir-750` | — |
| 54 | `dark:bg-noir-700` | — |
| 55 | `dark:bg-noir-750` | — |
| 58 | `dark:bg-noir-700` | — |
| 60 | `dark:bg-noir-750` | — |
| 62 | `dark:bg-noir-700` | — |
| 63 | `dark:bg-noir-750` | — |
| 71 | `dark:border-line` | — |
| 73 | `dark:bg-noir-750` | — |
| 74 | `dark:bg-noir-800` | — |
| 77 | `dark:bg-noir-700` | — |
| 78 | `dark:bg-noir-750` | — |
| 79 | `dark:bg-noir-750` | — |
| 80 | `dark:bg-noir-750` | — |
| 84 | `dark:border-line` | — |
| 85 | `dark:bg-noir-700` | — |
| 88 | `dark:border-line` `dark:bg-noir-800` | — |
| 89 | `dark:bg-noir-750` | — |
| 90 | `dark:bg-noir-700` | — |
| 91 | `dark:bg-noir-750` | — |

#### `src/components/ui/skeleton/ProductSkeleton.jsx`

| Line | Add | Replace |
|---:|---|---|
| 5 | — | `dark:bg-[#181412]` → `dark:bg-noir-800`<br>`dark:border-[#2e2724]` → `dark:border-line` |
| 6 | — | `dark:bg-[#221d1a]` → `dark:bg-noir-700` |
| 7 | — | `dark:bg-[#3a322d]` → `dark:bg-noir-650` |
| 9 | — | `dark:bg-[#3a322d]` → `dark:bg-noir-650` |
| 10 | — | `dark:bg-[#3a322d]` → `dark:bg-noir-650` |
| 13 | — | `dark:bg-[#3a322d]` → `dark:bg-noir-650`<br>`dark:border-[#2e2724]` → `dark:border-line-subtle` |
| 16 | — | `dark:bg-[#3a322d]` → `dark:bg-noir-650` |
| 17 | — | `dark:bg-[#3a322d]` → `dark:bg-noir-650` |
| 22 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 24 | — | `dark:bg-[#2b2522]` → `dark:bg-noir-700` |
| 25 | — | `dark:bg-[#221d1a]` → `dark:bg-noir-750` |

#### `src/components/ui/skeleton/ProfileSkeleton.jsx`

| Line | Add | Replace |
|---:|---|---|
| 3 | `dark:bg-noir-900` | — |
| 7 | `dark:bg-noir-700` | — |
| 8 | `dark:bg-noir-650` | — |
| 9 | `dark:bg-noir-700` | — |
| 16 | `dark:bg-noir-800` `dark:border-line-strong` | — |
| 18 | `dark:bg-noir-700` | — |
| 19 | `dark:bg-noir-650` | — |
| 20 | `dark:bg-noir-700` | — |
| 21 | `dark:bg-noir-700` | — |
| 22 | `dark:bg-noir-750` | — |
| 25 | `dark:bg-noir-800` `dark:border-line-strong` | — |
| 27 | `dark:bg-noir-750` | — |
| 36 | `dark:border-line-strong` `dark:bg-noir-800` | — |
| 38 | `dark:bg-noir-700` | — |
| 39 | `dark:bg-noir-650` | — |
| 40 | `dark:bg-noir-700` | — |
| 45 | `dark:bg-noir-800` `dark:border-line-strong` | — |
| 46 | `dark:border-line` | — |
| 47 | `dark:bg-noir-650` | — |
| 48 | `dark:bg-noir-700` | — |
| 53 | `dark:bg-noir-700` | — |
| 54 | `dark:bg-noir-650` | — |
| 60 | `dark:bg-noir-800` `dark:border-line-strong` | — |
| 61 | `dark:border-line` | — |
| 62 | `dark:bg-noir-650` | — |
| 63 | `dark:bg-noir-700` | — |
| 67 | `dark:border-line` `dark:bg-noir-800` | — |
| 68 | `dark:bg-noir-650` | — |
| 69 | `dark:bg-noir-700` | — |
| 77 | `dark:bg-noir-800` `dark:border-line-strong` | — |
| 80 | `dark:bg-noir-650` | — |
| 81 | `dark:bg-noir-700` | — |
| 82 | `dark:bg-noir-700` | — |
| 84 | `dark:bg-noir-700` | — |

#### `src/components/ui/store/CartBadge.jsx`

| Line | Add | Replace |
|---:|---|---|
| 7 | `dark:hover:bg-noir-700` | — |

---

## Changelog

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-09-23 | First release: Noir & Copper — 8 surfaces, 6 text colors, 5 borders, 8 copper steps, 9 statuses, 3 shadows. 55 files analyzed and 1,349 suggested changes in the appendix. |
