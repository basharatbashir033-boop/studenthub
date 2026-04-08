# Design Brief: StudentHub

**Product**: Multi-tool platform for students | **Tone**: Apple-inspired minimalism with Notion refinement | **Differentiation**: Card-based dashboard with smooth micro-interactions

## Palette (OKLCH)

| Role | Light | Dark |
|------|-------|------|
| Background | 0.98 0.01 252 | 0.12 0.01 252 |
| Foreground | 0.16 0.04 252 | 0.96 0.01 252 |
| Primary (Soft Blue) | 0.55 0.13 252 | 0.65 0.16 252 |
| Secondary | 0.94 0.03 252 | 0.22 0.02 252 |
| Muted | 0.93 0.02 252 | 0.25 0.02 252 |
| Card | 1.0 0 0 | 0.16 0.02 252 |
| Border | 0.92 0.02 252 | 0.24 0.02 252 |
| Accent (Blue) | 0.55 0.13 252 | 0.65 0.16 252 |

## Typography

| Tier | Font | Scale | Weight | Usage |
|------|------|-------|--------|-------|
| Display | Fraunces | 32px / 28px / 24px | 600 / 500 | Hero titles, page headers, branding |
| Body | General Sans | 16px / 14px / 12px | 400 / 500 | Content, labels, descriptions |
| Mono | System | 14px / 12px | 400 | Code, data, technical content |

## Elevation & Depth

- **Surfaces**: Card (0.16 L dark / 1.0 L light), subtle border dividers, no full-page backgrounds.
- **Shadows**: `shadow-subtle` (2px 4px offset, 4% opacity) for cards; `shadow-elevated` (8px 24px offset, 8% opacity) for modals/popovers.
- **Depth**: 3 tiers — flat (no shadow), card (subtle), elevated (focused overlays).

## Structural Zones

| Zone | Background | Border | Treatment |
|------|-----------|--------|-----------|
| Header | 0.98/0.12 (primary) | 0.92/0.24 (light/dark) | Thin bottom divider, nav items with hover states |
| Main Content | 0.98/0.12 (background) | None | Grid layout, card-based tool display |
| Tool Cards | 1.0/0.16 (card) | 0.92/0.24 (border) | 12px rounded, subtle shadow, blue hover overlay |
| Sidebar (Ad Area) | 0.98/0.12 | 0.92/0.24 | Optional sticky right sidebar for ads |
| Footer | 0.93/0.25 (muted) | 0.92/0.24 (border) | Top border divider, centered text |

## Spacing & Rhythm

- **Grid**: 8px base unit (8, 16, 24, 32, 40px margins/padding).
- **Cards**: 16px internal padding, 24px gap between cards.
- **Density**: Relaxed on mobile (tight whitespace), generous on desktop (breathing room).
- **Type scale**: 12 / 14 / 16 / 20 / 24 / 28 / 32px (ascending hierarchy).

## Component Patterns

- **Buttons**: Solid primary (soft blue), text secondary, ghost muted. Rounded 8px, 12px padding. Hover: opacity 0.9, shadow-subtle.
- **Cards**: White/dark backgrounds, rounded 12px, border thin, shadow-subtle. Hover: blue accent glow (0.1 opacity), cursor pointer.
- **Inputs**: Rounded 8px, border-input color, focus: ring primary. Light bg in light mode, dark bg in dark mode.
- **Modals**: Card appearance with shadow-elevated, backdrop blur overlay (dark 0.4 opacity), fade-in animation.
- **Navigation**: Minimal top bar, horizontal layout, active item: underline or bg highlight in primary.

## Motion

- **Transitions**: All interactive elements use `transition-smooth` (0.3s cubic-bezier(0.4, 0, 0.2, 1)).
- **Fade-in**: Page load and content reveal — 0.3s ease-out.
- **Slide-up**: Modal/drawer entrance — 0.4s ease-out (8px offset).
- **Pulse-soft**: Loading states — 2s infinite (opacity 1 → 0.7).
- **Hover**: 0.2s state changes (opacity, shadow, color), no bounce.

## Constraints

- No gradients on text (legibility).
- No neon or glow effects (maintain refinement).
- No animated backgrounds (distraction).
- Consistent 12px rounded corners on cards, 8px on buttons/inputs.
- Dark mode intentional (not inverted) — higher L values for readability, blue accent warmed on dark.

## Signature Detail

**Soft blue accent on hover**: Tool cards and interactive elements reveal a subtle blue overlay (0.05–0.1 opacity) on hover. This micro-interaction signals interactivity without loudness and reinforces StudentHub's trusted, approachable brand.
