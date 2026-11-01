/**
 * oat - TagInput Component
 * Uses a native <input> to manage a list of tags and a native <datalist> for optional autocomplete.
 * Type a word and press Enter or comma to turn it into a tag.
 *
 * Usage:
 * <ot-taginput value="apple, mango"><input placeholder="Add tags ..." maxlength="20" /></ot-taginput>
 *
 * Attributes:
 *   value              - comma-separated initial tags
 *   disabled           - disables input like a native <input>
 *
 * Properties:
 *   .value             - read/write array of tags. Each tag is a string, or an
 *                        object whose toString() returns its display text, or a DOM node.
 *   .disabled          - read/write boolean for the `disabled` attrib.
 *   .add(value)        - add a string or object tag, emitting `input`.
 *
 * Events:
 *   input              - dispatched (bubbles) when a tag is added or removed.
 *                        detail = the current array of tags (strings and/or objects)
 */

import { OtBase } from './base.js';

const h = t => document.createElement(t);

// Return the label to display based on object type. String types are trimmed.
const label = v => (v instanceof Node ? v.textContent ?? '' : String(v)).trim();

class OtTaginput extends OtBase {
  static observedAttributes = ['disabled'];

  // Maps owned badge elements to their string or object values.
  #data = new WeakMap();

  init() {
    this.input = this.querySelector('input');
    if (!this.input) return;

    if (!this.input.readOnly) {
      this.addEventListener('keydown', this);
      this.input.addEventListener('input', e => {
        e.stopPropagation();

        const val = this.input.value;
        const list = this.input.list;
        const picked = list && (e.inputType === 'insertReplacementText' || val.length - (this.prev || '').length > 1);
        this.prev = val;

        if (picked) {
          // A picked <option> may carry an object via `option.data`.
          const opt = [...list.options].find(o => o.value === val);
          if (opt) return requestAnimationFrame(() => this.add(opt.data ?? val));
        }
      });

      this.input.addEventListener('change', e => e.stopPropagation());
      this.input.addEventListener('focus', this);
      this.addEventListener('click', this);
    }

    const val = this.getAttribute('value');
    if (val) this.value = [val];

    this.attributeChangedCallback();
  }

  attributeChangedCallback() {
    if (this.input) this.input.disabled = this.disabled;
    this.setAttribute('aria-disabled', this.disabled);
  }


  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(v) {
    this.toggleAttribute('disabled', !!v);
  }

  // Enter / comma triggers tag addition, backspace removes the last tag.
  onkeydown(e) {
    if (e.target !== this.input || e.defaultPrevented || e.isComposing) return;

    if (e.key === 'Backspace' && !this.input.value) {
      return this.remove(this.input.previousElementSibling);
    }

    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      this.add(this.input.value);
    }
  }

  // On focus, re-run the autocomplete handler.
  onfocus() {
    if (!this.input.list) return;

    this.input.dispatchEvent(new Event('input', { bubbles: true }));

    // Skip the click that originated and show the datalist in the next frame.
    // Without this, for whatever reason, browsers don't seem to render the datalist!
    requestAnimationFrame(() => {
      try {
        this.input.showPicker();
      } catch { }
    });
  }

  // Click a tag's 'x' to remove it.
  onclick(e) {
    if (this.disabled) return;

    const x = e.target.closest('button');
    if (x && this.#data.has(x.parentElement)) this.remove(x.parentElement);
    else if (e.target === this || this.#data.has(e.target)) this.input.focus();
  }

  // Render DOM nodes directly while strings and other objects are converted to text.
  add(v, silent) {
    const text = label(v);
    const value = v && typeof v === 'object' ? v : text;
    if (!text || this.value.some(x => x === value)) {
      return;
    }

    // Render the tag as an oat 'badge'.
    const t = h('span');
    t.className = 'badge';
    t.dataset.variant = 'secondary';
    if (v instanceof Node) {
      t.appendChild(v);
    } else {
      t.textContent = text;
    }
    this.#data.set(t, value);

    if (!this.input.readOnly) {
      // Append the 'x' button.
      const x = h('button');
      x.type = 'button';
      x.ariaLabel = `Remove ${text}`;
      x.textContent = '×';
      t.appendChild(x);

      this.insertBefore(t, this.input);
      this.input.value = this.prev = '';
      this.input.list?.replaceChildren();
    } else {
      this.insertBefore(t, this.input);
    }

    if (!silent) this.emit('input', this.value);
  }

  // `el` is a tag element.
  remove(el) {
    if (!this.#data.has(el) || el.parentElement !== this) return;

    el.remove();
    this.emit('input', this.value);
  }

  get value() {
    return [...this.children].filter(t => this.#data.has(t)).map(t => this.#data.get(t));
  }

  // Set tag values. Each may be a string (comma-splittable) or a rich object.
  set value(tags) {
    this.input ??= this.querySelector('input');

    [...this.children].filter(t => this.#data.has(t)).forEach(t => t.remove());

    (Array.isArray(tags) ? tags : []).forEach(t => {
      if (typeof t === 'string') {
        t.split(',').forEach(v => this.add(v, true));
      } else {
        this.add(t, true);
      }
    });
  }
}

customElements.define('ot-taginput', OtTaginput);
