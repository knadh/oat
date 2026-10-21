# Contributing to Oat

## Documentation and the agent skill

Documentation lives in `docs/content/` — that is the **source of truth**. The
agent skill under `skills/oats-agent-skill/` ships those docs as reference files,
but the whole skill directory is generated and must not be edited by hand.

- `references/` is generated from `docs/content/` (excluding `_index.md`,
  `demo.md`, and `other-libs.md`).
- `SKILL.md` is generated from `templates/SKILL.md.tmpl`.

### Updating docs or the skill

1. Edit the relevant file(s) under `docs/content/` for docs, or
   `templates/SKILL.md.tmpl` for skill instructions and layout.
2. Run `make skill` to regenerate `skills/oats-agent-skill/` (references and
   `SKILL.md`).
3. Run `make skill-check` to confirm the generated skill matches `docs/content/`
   and the template.
4. Commit the regenerated `skills/oats-agent-skill/`.

### Rules

- Never edit `skills/oats-agent-skill/` directly. Changes there are overwritten
  by `make skill`.
- The `## References` list in `SKILL.md` is generated from the reference files;
  `make skill-check` fails when it drifts.

### Building

- `make dist` — build the CSS/JS bundles into `dist/`.
- `make publish` — clean, build, and publish to npm.
