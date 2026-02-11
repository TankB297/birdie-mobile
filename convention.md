# Birdie Frontend Conventions

This document summarizes the mandatory conventions that were requested.
From now on, every frontend task must follow both `convention.md` and `context.md`.

## 1. Product Focus for Home
- The home screen must focus on the main question: "Is there any nearby game I can join now?"
- Layout and content must follow the provided homepage wireframe structure.
- Design style should match the provided reference style, but the main color must be Burnt Orange.

## 2. UI/Design System
- Build reusable shared UI elements with component APIs similar to shadcn-ui.
- Shared UI elements should support props like `variant`, `size`, `state`, etc. when appropriate.
- Keep visuals consistent through design tokens (colors, spacing, radius, typography).
- Preferred base primitives: button, switch, checkbox, loading (can be extended with chip, input, card, etc.).

## 3. Architecture & Code Organization
- Keep code clean, scalable, and maintainable.
- Each function must do one thing only (single responsibility).
- Separate layers clearly:
  - API layer
  - Service/use-case layer
  - Component/presentation layer
- Frontend structure should be SDK-like and compatible with Expo Managed Workflow.

## 4. Text & Internationalization
- Do not use inline UI text inside screens/components.
- All displayed text must come from i18n keys.
- Maintain these translation files:
  - `en.ts`
  - `vn.ts`

## 5. Working Rules for Future Tasks
- Prefer reusing existing components and utilities before creating new ones.
- When adding new screens, keep architecture aligned with these conventions.
- If implementation conflicts with conventions, update implementation to comply with conventions.
- Always align technical decisions with product/business context in `context.md` before coding.
