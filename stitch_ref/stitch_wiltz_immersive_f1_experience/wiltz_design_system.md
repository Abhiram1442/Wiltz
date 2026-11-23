---
name: "WILTZ Motorsport Telemetry & Editorial System"
description: "Cinematic dark-mode Formula 1 broadcast and editorial design system pairing deep carbon charcoal surfaces with racing red accents and precision telemetry typography."
---

## Overview

WILTZ is an immersive Formula 1 digital experience combining the authority of a live pit-wall broadcast interface with the depth of a motorsport editorial publication. The aesthetic is grounded in carbon-fiber charcoal surfaces, dramatic studio lighting, and surgical racing-red accents (`#E10600`) reserved for live telemetry, championship leaders, and primary actions.

## Colors

The palette is dark-mode-first, built on deep carbon neutrals rather than pure `#000000` to prevent text halation while preserving cinematic depth. Racing Red (`#E10600`) serves as the high-energy focal accent, supported by semantic telemetry tones for sector timing and race status.

```yaml
colors:
  accent: "#E10600"
  success: "#10B981"
  warning: "#F59E0B"
  error: "#EF4444"
  dark:
    primary: "#FF5540"
    on-primary: "#2A0200"
    primary-container: "#E10600"
    on-primary-container: "#FFFFFF"
    secondary: "#A1A8B3"
    on-secondary: "#14171F"
    secondary-container: "#242936"
    on-secondary-container: "#F4F6F8"
    tertiary: "#38BDF8"
    on-tertiary: "#082F49"
    background: "#0D0F14"
    on-background: "#F4F6F8"
    surface: "#0D0F14"
    on-surface: "#F4F6F8"
    surface-container-lowest: "#08090C"
    surface-container-low: "#14171F"
    surface-container: "#1B1F29"
    surface-container-high: "#242936"
    surface-container-highest: "#2D3342"
    on-surface-variant: "#A1A8B3"
    outline: "#4B5263"
    outline-variant: "#262B38"
```

## Typography

WILTZ pairs **Archivo** for high-impact, aerodynamic display headlines with **Commissioner** for clean editorial body copy and **Source Code Pro** (`tabular-nums`) for lap times, telemetry deltas, and championship points.

```yaml
typography:
  display-xl:
    fontFamily: "Archivo"
    fontSize: 72px
    fontWeight: 900
    lineHeight: 76px
    letterSpacing: -1.5px
  display-xl-mobile:
    fontFamily: "Archivo"
    fontSize: 32px
    fontWeight: 900
    lineHeight: 36px
    letterSpacing: -0.75px
  display-lg:
    fontFamily: "Archivo"
    fontSize: 52px
    fontWeight: 800
    lineHeight: 56px
    letterSpacing: -1px
  display-lg-mobile:
    fontFamily: "Archivo"
    fontSize: 28px
    fontWeight: 800
    lineHeight: 32px
    letterSpacing: -0.5px
  headline-lg:
    fontFamily: "Archivo"
    fontSize: 36px
    fontWeight: 800
    lineHeight: 42px
    letterSpacing: -0.5px
  headline-lg-mobile:
    fontFamily: "Archivo"
    fontSize: 24px
    fontWeight: 800
    lineHeight: 30px
    letterSpacing: -0.25px
  headline-md:
    fontFamily: "Archivo"
    fontSize: 24px
    fontWeight: 700
    lineHeight: 30px
    letterSpacing: -0.25px
  title-lg:
    fontFamily: "Archivo"
    fontSize: 20px
    fontWeight: 700
    lineHeight: 26px
    letterSpacing: 0px
  title-md:
    fontFamily: "Commissioner"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 24px
    letterSpacing: 0px
  body-lg:
    fontFamily: "Commissioner"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 28px
    letterSpacing: 0px
  body-md:
    fontFamily: "Commissioner"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: 0px
  label-lg:
    fontFamily: "Archivo"
    fontSize: 14px
    fontWeight: 700
    lineHeight: 20px
    letterSpacing: 0.75px
  label-sm:
    fontFamily: "Commissioner"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 16px
    letterSpacing: 0.75px
  mono-lg:
    fontFamily: "Source Code Pro"
    fontSize: 20px
    fontWeight: 700
    lineHeight: 24px
    letterSpacing: 0px
  mono-md:
    fontFamily: "Source Code Pro"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 20px
    letterSpacing: 0px
```

## Layout & Spacing

A 12-column fluid desktop grid (max-width `1360px`) with generous section breathing room (`64px`–`96px` vertical rhythm) frames full-bleed 3D and photographic moments alongside structured telemetry grids. Spacing follows a strict `4px` / `8px` base unit.

```yaml
spacing:
  gutter-xs: 4px
  gutter-sm: 8px
  gutter-md: 16px
  gutter-lg: 24px
  gutter-xl: 32px
  section: 64px
  page-margin: 32px
```

## Elevation & Depth

Depth is achieved through tonal carbon layering (`surface` → `surface-container-low` → `surface-container` → `surface-container-high`) and subtle `1px` `outline-variant` hairlines, paired with translucent frosted glass (`backdrop-blur-md`) on floating HUD navigation and hero telemetry overlays.

## Shapes

Sharp, aerodynamic geometry defines the hardware aesthetic: crisp `4px`–`8px` corners on telemetry panels and buttons, `12px`–`16px` on editorial feature cards, and `9999px` pills for live status indicators and driver number tags.

```yaml
rounded:
  sm: 4px
  DEFAULT: 8px
  md: 12px
  lg: 16px
  xl: 24px
  full: 9999px
```

## Motion & Micro-interaction

Motion is crisp, mechanical, and purposeful—never floaty or decorative. Interactive states respond within `120ms`, card reveals decelerate smoothly over `320ms`, and 3D hero camera/car motion respects `prefers-reduced-motion` with a clean static fallback.

```yaml
motion:
  state-change:
    duration: 120ms
    delay: 0ms
    timingFunction: cubic-bezier(0.2, 0, 0, 1)
  surface-enter:
    duration: 320ms
    delay: 0ms
    timingFunction: cubic-bezier(0.16, 1, 0.3, 1)
  surface-exit:
    duration: 180ms
    delay: 0ms
    timingFunction: cubic-bezier(0.4, 0, 1, 1)
```

## Voice & Content Strategy

Editorial, authoritative, and concise. Headlines use punchy sentence or uppercase broadcast styling where appropriate; telemetry metrics always use `tabular-nums` and official FIA abbreviations (`VER`, `NOR`, `LEC`, `HAM`). Never invent statistics, lap times, or race results—clearly label 2025 championship context and historical records.

## Components

Component implementations live as individual HTML sticker sheet files in
`components/`. Each file contains the canonical, styled HTML components with
`<!-- COMPONENT: name -->` comment markers. Read each file before use.

- **Badge** → `@components/badge.html`: `badge-numeric`, `badge-dot`
- **Button** → `@components/button.html`: `button-primary`, `button-icon`, `button-with-icon`
- **Card** → `@components/card.html`: `card-elevated`, `card-action`, `card-interactive`, `card-interactive-2`
- **Typography** → `@components/typography.html`: `typography-display`, `typography-body`, `typography-label`
