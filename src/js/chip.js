/**
 * oat - Chip Input Component
 * Tag input with keyboard support.
 *
 * Usage:
 * <ot-chip-input>
 *   <div class="chip-input">
 *     <input type="text" placeholder="Add tag...">
 *   </div>
 * </ot-chip-input>
 */

class OtChipInput extends OtBase {
  #container;
  #input;
  #chips = [];

  init() {
    this.#container = this.$('.chip-input');
    this.#input = this.$('input');
    if (!this.#container || !this.#input) return;

    this.#input.addEventListener('keydown', this);
    this.#container.addEventListener('click', this);

    const initial = this.getAttribute('data-chips');
    if (initial) initial.split(',').forEach(t => this.#add(t.trim()));
  }

  onkeydown(e) {
    if (e.target !== this.#input) return;
    const val = this.#input.value.trim();

    if (e.key === 'Enter' && val) {
      e.preventDefault();
      this.#add(val);
      this.#input.value = '';
    } else if (e.key === 'Backspace' && !this.#input.value && this.#chips.length) {
      this.#remove(this.#chips.length - 1);
    }
  }

  onclick(e) {
    const btn = e.target.closest('.chip button');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    const idx = [...this.#container.querySelectorAll('.chip')].indexOf(btn.closest('.chip'));
    if (idx >= 0) this.#remove(idx);
  }

  #add(val) {
    if (!val || this.#chips.includes(val)) return;
    this.#chips.push(val);
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.innerHTML = `${val}<button type="button" aria-label="Remove">×</button>`;
    this.#container.insertBefore(chip, this.#input);
    this.emit('change', { chips: this.#chips });
  }

  #remove(idx) {
    this.#chips.splice(idx, 1);
    this.#container.querySelectorAll('.chip')[idx]?.remove();
    this.emit('change', { chips: this.#chips });
  }

  get value() { return this.#chips; }
  set value(chips) {
    this.#container.querySelectorAll('.chip').forEach(c => c.remove());
    this.#chips = [];
    chips.forEach(c => this.#add(c));
  }
}

customElements.define('ot-chip-input', OtChipInput);
