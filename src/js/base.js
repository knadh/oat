// oat - Base Web Component Class
// Provides lifecycle management, event handling, and utilities.

class OtBase extends HTMLElement {
  #initialized = false;

  // Called when element is added to DOM.
  connectedCallback() {
    if (this.#initialized) return;

    // Wait for DOM to be ready.
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.#setup(), { once: true });
    } else {
      this.#setup();
    }
  }

  // Private setup to ensure that init() is only called once.
  #setup() {
    if (this.#initialized) return;
    this.#initialized = true;
    this.init();
  }

  // Called when element is removed from DOM.
  disconnectedCallback() {
    this.cleanup();
  }

  // Override in subclass for cleanup logic.
  cleanup() {}

  // Central event handler - enables automatic cleanup.
  // Usage: element.addEventListener('click', this)
  handleEvent(event) {
    const handler = this[`on${event.type}`];
    if (handler) handler.call(this, event);
  }

  // Given a keyboard event (left, right, home, end), the current selection idx
  // total items in a list, return 0-n index of the next/previous item
  // for doing a roving keyboard nav.
  keyNav(event, idx, len, prevKey, nextKey, homeEnd = false) {
    const { key } = event;
    let next = -1;

    if (key === nextKey) {
      next = (idx + 1) % len;
    } else if (key === prevKey) {
      next = (idx - 1 + len) % len;
    } else if (homeEnd) {
      if (key === 'Home') {
        next = 0;
      } else if (key === 'End') {
        next = len - 1;
      }
    }

    if (next >= 0) event.preventDefault();
    return next;
  }

  // Emit a custom event.
  emit(name, detail = null) {
    return this.dispatchEvent(new CustomEvent(name, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail
    }));
  }

  // Query selector within this element.
  $(selector) {
    return this.querySelector(selector);
  }

  // Query selector all within this element.
  $$(selector) {
    return Array.from(this.querySelectorAll(selector));
  }

  // Generate a unique ID string.
  uid() {
    return Math.random().toString(36).slice(2, 10);
  }
}

// Export for use in other files
if (typeof window !== 'undefined') {
  window.OtBase = OtBase;
}

// Polyfill for command/commandfor (Safari)
if (!('commandForElement' in HTMLButtonElement.prototype)) {
  document.addEventListener('click', e => {
    const btn = e.target.closest('button[commandfor]');
    if (!btn) return;

    const target = document.getElementById(btn.getAttribute('commandfor'));
    if (!target) return;

    const command = btn.getAttribute('command') || 'toggle';

    if (target instanceof HTMLDialogElement) {
      if (command === 'show-modal') target.showModal();
      else if (command === 'close') target.close();
      else target.open ? target.close() : target.showModal();
    }
  });
}
