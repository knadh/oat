/**
 * oat - Dropdown Component
 * Provides positioning, keyboard navigation, and ARIA state management.
 *
 * Usage:
 * <ot-dropdown>
 *   <button popovertarget="menu-id">Options</button>
 *   <menu popover id="menu-id">
 *     <button role="menuitem">Item 1</button>
 *     <button role="menuitem">Item 2</button>
 *   </menu>
 * </ot-dropdown>
 */

class OtDropdown extends OtBase {
  #menu;
  #trigger;
  #position;

  init() {
    this.#menu = this.$('[popover]');
    this.#trigger = this.$('[popovertarget]');

    if (!this.#menu || !this.#trigger) return;

    this.#menu.addEventListener('toggle', this);
    this.#menu.addEventListener('keydown', this);

    this.#position = () => {
      // Position has to be calculated and applied manually because
      // popover positioning is like fixed, relative to the window.
      const rect = this.#trigger.getBoundingClientRect();
      this.#menu.style.top = `${rect.bottom}px`;
      this.#menu.style.left = `${rect.left}px`;
    };
  }

  ontoggle(e) {
    if (e.newState === 'open') {
      this.#position();
      window.addEventListener('scroll', this.#position, true);
      this.$('[role="menuitem"]')?.focus();
      this.#trigger.ariaExpanded = 'true';
    } else {
      window.removeEventListener('scroll', this.#position, true);
      this.#trigger.ariaExpanded = 'false';
      this.#trigger.focus();
    }
  }

  onkeydown(e) {
    if (!e.target.matches('[role="menuitem"]')) return;

    const items = this.$$('[role="menuitem"]');
    const idx = items.indexOf(e.target);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        items[(idx + 1) % items.length]?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        items[idx - 1 < 0 ? items.length - 1 : idx - 1]?.focus();
        break;
    }
  }

  cleanup() {
    window.removeEventListener('scroll', this.#position, true);
  }
}

customElements.define('ot-dropdown', OtDropdown);
