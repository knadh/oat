/**
 * oat - Popover Component
 * Provides positioning and ARIA state management for floating content panels.
 *
 * Usage:
 * <ot-popover>
 *   <button popovertarget="pop-id">Open</button>
 *   <div popover id="pop-id" class="popover">
 *     <header><h4>Title</h4></header>
 *     <div>Content</div>
 *   </div>
 * </ot-popover>
 */

class OtPopover extends OtBase {
  #panel;
  #trigger;
  #position;

  init() {
    this.#panel = this.$('[popover]');
    this.#trigger = this.$('[popovertarget]');

    if (!this.#panel || !this.#trigger) return;

    this.#panel.addEventListener('toggle', this);

    this.#position = () => {
      // Position relative to trigger, accounting for fixed popover positioning.
      const rect = this.#trigger.getBoundingClientRect();
      this.#panel.style.top = `${rect.bottom}px`;
      this.#panel.style.left = `${rect.left}px`;
    };
  }

  ontoggle(e) {
    if (e.newState === 'open') {
      this.#position();
      window.addEventListener('scroll', this.#position, true);
      this.#trigger.ariaExpanded = 'true';
    } else {
      window.removeEventListener('scroll', this.#position, true);
      this.#trigger.ariaExpanded = 'false';
      this.#trigger.focus();
    }
  }

  cleanup() {
    window.removeEventListener('scroll', this.#position, true);
  }
}

customElements.define('ot-popover', OtPopover);
