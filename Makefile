PKG_MGR := $(shell for c in bun pnpm npm; do command -v $$c >/dev/null 2>&1 && echo $$c && break; done)

SKILL_DIR = skills/oats-agent-skill
SKILL_TEMPLATE = templates/SKILL.md.tmpl

.PHONY: dist css js skill skill-check clean size publish

CSS_FILES = src/css/00-base.css \
            src/css/01-theme.css \
            src/css/animations.css \
			src/css/avatar.css \
            src/css/button.css \
            src/css/form.css \
            src/css/table.css \
            src/css/progress.css \
            src/css/spinner.css \
            src/css/grid.css \
            src/css/card.css \
            src/css/alert.css \
            src/css/badge.css \
            src/css/accordion.css \
            src/css/tabs.css \
            src/css/dialog.css \
            src/css/dropdown.css \
            src/css/toast.css \
            src/css/sidebar.css \
            src/css/taginput.css \
            src/css/skeleton.css \
            src/css/tooltip.css \
            src/css/upload.css \
            src/css/utilities.css

dist: css js size

css:
	@mkdir -p dist
	@cat $(CSS_FILES) > dist/oat.css
	@esbuild dist/oat.css --minify --outfile=dist/oat.min.css
	@gzip -9 -k -f dist/oat.min.css
	@cp dist/oat.min.css docs/static/oat.min.css
	@echo "CSS: $$(wc -c < dist/oat.min.css | tr -d ' ') bytes (minified)"

js:
	@mkdir -p dist
	@esbuild src/js/index.js --bundle --format=iife --outfile=dist/oat.js
	@esbuild src/js/index.js --bundle --format=iife --minify --outfile=dist/oat.min.js
	@gzip -9 -k -f dist/oat.min.js
	@cp dist/oat.min.js docs/static/oat.min.js
	@echo "JS: $$(wc -c < dist/oat.min.js | tr -d ' ') bytes (minified)"

# Copy docs/content/**/*.md into the skill's references/ and regenerate SKILL.md from the template.
skill:
	@rm -rf $(SKILL_DIR)/references; mkdir -p $(SKILL_DIR)/references
	@find docs/content -type f -name '*.md' \
		! -name '_index.md' ! -name 'demo.md' ! -name 'other-libs.md' | while read f; do \
			rel="$${f#docs/content/}"; \
			mkdir -p "$(SKILL_DIR)/references/$$(dirname "$$rel")"; \
			cp "$$f" "$(SKILL_DIR)/references/$$rel"; \
		done
	@list=$$(mktemp); \
		(cd $(SKILL_DIR)/references && find . -name '*.md' | sed 's|^\./||' | sort) | \
			awk '{ printf "* [%s](./references/%s)\n", $$0, $$0 }' > "$$list"; \
		awk -v list="$$list" '$$0 == "<!-- REFERENCES -->" { while ((getline l < list) > 0) print l; next } { print }' \
			$(SKILL_TEMPLATE) > $(SKILL_DIR)/SKILL.md; \
		rm -f "$$list"
	@echo "Generated $(SKILL_DIR)/SKILL.md and references/"

# Verify the committed skill matches docs/content and the template.
skill-check:
	@tmp=$$(mktemp -d); \
	$(MAKE) -s skill SKILL_DIR="$$tmp/skill" >/dev/null; \
	if diff -r "$$tmp/skill" $(SKILL_DIR) >/dev/null 2>&1; then \
		echo "OK: $(SKILL_DIR) matches docs/content and $(SKILL_TEMPLATE) content"; \
	else \
		echo "ERROR: $(SKILL_DIR) is stale. Run 'make skill' and commit the result."; \
		diff -r "$$tmp/skill" $(SKILL_DIR); rm -rf "$$tmp"; exit 1; \
	fi; \
	rm -rf "$$tmp"

clean:
	@rm -rf dist

size:
	@echo ""
	@echo "Bundle:"
	@echo "CSS (src):   $$(wc -c < dist/oat.css | tr -d ' ') bytes"
	@echo "CSS (min):   $$(wc -c < dist/oat.min.css | tr -d ' ') bytes"
	@echo "CSS (gzip):  $$(wc -c < dist/oat.min.css.gz | tr -d ' ') bytes"
	@echo ""
	@echo "JS (src):    $$(wc -c < dist/oat.js | tr -d ' ') bytes"
	@echo "JS (min):    $$(wc -c < dist/oat.min.js | tr -d ' ') bytes"
	@echo "JS (gzip):   $$(wc -c < dist/oat.min.js.gz | tr -d ' ') bytes"

publish: clean dist
	@cp -r src/css dist/css
	@cp -r src/js dist/js
	@cp README.md dist/README.md
	@cp LICENSE dist/LICENSE
	@VERSION=$$(git describe --tags --abbrev=0 | sed 's/^v//') && \
		sed 's/"version-0.0.0"/"'"$$VERSION"'"/' package.json > dist/package.json
	@test -n "$(PKG_MGR)" || { echo "error: (bun, pnpm, npm) not found"; exit 1; }
	@echo "Publishing with $(PKG_MGR)"
	@cd dist && $(PKG_MGR) publish --access public
