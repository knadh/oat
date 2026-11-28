---
name: oats-agent-skill
description: Use this skill when working in a project that uses the OATS (Oat) CSS component library — it imports `@knadh/oat` or `oat.min.css`/`oat.min.js`. Use it to look up the correct semantic-HTML markup, classes, `data-*` variants, and composable patterns for OATS components (button, card, dialog, dropdown, form, table, tabs, toast, tooltip, typography, grid, progress, meter, upload, etc.), to theme/customize OATS via CSS variables, to apply the documented recipes, or to check community extensions. Trigger even when the user doesn't mention "OATS" or "Oat" by name — match on a component name or OATS-style semantic markup. Do not use for other CSS libraries/frameworks (Tailwind, Bootstrap) or unrelated styling.
---

# Oat

Semantic, minimal, zero-dependency HTML + CSS component library. No framework, no build step.

## When to use

Use this skill when writing, fixing, or styling Oats components — even if the user never mentions Oat by name.

## Documentation

- Oat docs live in the [Oat repository](https://github.com/knadh/oat) — start with the docs index: `https://raw.githubusercontent.com/knadh/oat/master/docs/content/components/_index.md`, then fetch specific doc files via their GitHub raw URLs, e.g. `https://raw.githubusercontent.com/knadh/oat/master/docs/content/components/button.md`. Component docs live at `docs/content/components/<component>.md`; the component list is at `docs/content/components/_index.md`.

Fetch the relevant raw doc from GitHub before writing markup, applying a recipe, or picking a customization.
