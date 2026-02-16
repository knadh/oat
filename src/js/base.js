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

  // Override in WebComponent subclasses for init logic.
  init() {}

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

  // Emit a custom event.
  emit(name, detail = null) {
    return this.dispatchEvent(new CustomEvent(name, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail
    }));
  }

  // Get boolean attribute value.
  getBool(name) {
    return this.hasAttribute(name);
  }

  // Set or remove boolean attribute.
  setBool(name, value) {
    if (value) {
      this.setAttribute(name, '');
    } else {
      this.removeAttribute(name);
    }
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
