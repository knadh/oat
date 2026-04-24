/**
 * oat - File Drop Component
 * Drag files onto an area or click it to open the native file picker.
 *
 * Usage:
 * <ot-file-drop accept="image/*" multiple>
 *   <strong>Drop images here</strong>
 *   <small>or click to browse</small>
 * </ot-file-drop>
 *
 * Events:
 * - ot-file-drop: detail = { files, accepted, rejected }
 */

import { OtBase } from './base.js';

class OtFileDrop extends OtBase {
  #input;
  #dragDepth = 0;

  static get observedAttributes() {
    return ['accept', 'multiple', 'disabled', 'name'];
  }

  init() {
    this.#input = this.querySelector(':scope > input[type="file"]') || document.createElement('input');
    const hadContent = [...this.childNodes].some(node => {
      return node !== this.#input && (node.nodeType === Node.ELEMENT_NODE || node.textContent.trim());
    });

    if (!this.#input.parentElement) {
      this.#input.type = 'file';
      this.prepend(this.#input);
    }

    this.#input.tabIndex = -1;
    this.#input.setAttribute('aria-hidden', 'true');

    if (!this.hasAttribute('role')) this.setAttribute('role', 'button');
    if (!this.hasAttribute('tabindex')) this.tabIndex = 0;
    if (!this.hasAttribute('aria-label') && !this.textContent.trim()) {
      this.setAttribute('aria-label', 'Choose files');
    }

    if (!hadContent) {
      const content = document.createElement('span');
      content.className = 'content';
      content.innerHTML = '<strong>Drop files here</strong><small>or click to browse</small>';
      this.append(content);
    }

    this.#syncInput();

    this.addEventListener('click', this);
    this.addEventListener('keydown', this);
    this.addEventListener('dragenter', this);
    this.addEventListener('dragover', this);
    this.addEventListener('dragleave', this);
    this.addEventListener('drop', this);
    this.#input.addEventListener('change', this);
  }

  cleanup() {
    this.removeEventListener('click', this);
    this.removeEventListener('keydown', this);
    this.removeEventListener('dragenter', this);
    this.removeEventListener('dragover', this);
    this.removeEventListener('dragleave', this);
    this.removeEventListener('drop', this);
    this.#input?.removeEventListener('change', this);
  }

  attributeChangedCallback() {
    this.#syncInput();
  }

  onclick(e) {
    if (this.disabled || e.target === this.#input) return;
    this.#input.click();
  }

  onkeydown(e) {
    if (this.disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.#input.click();
    }
  }

  ondragenter(e) {
    if (!this.#hasFiles(e) || this.disabled) return;
    e.preventDefault();
    this.#dragDepth += 1;
    this.dataset.dragging = '';
  }

  ondragover(e) {
    if (!this.#hasFiles(e) || this.disabled) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }

  ondragleave(e) {
    if (!this.#hasFiles(e) || this.disabled) return;
    this.#dragDepth -= 1;
    if (this.#dragDepth <= 0) this.#clearDragState();
  }

  ondrop(e) {
    if (!this.#hasFiles(e) || this.disabled) return;
    e.preventDefault();
    this.#clearDragState();
    this.#setFiles(e.dataTransfer.files);
  }

  onchange() {
    this.#setFiles(this.#input.files);
  }

  #setFiles(fileList) {
    const files = [...fileList];
    const { accepted, rejected } = this.#partitionFiles(files);
    const selected = this.multiple ? accepted : accepted.slice(0, 1);
    const overflow = this.multiple ? [] : accepted.slice(1);
    const allRejected = [...rejected, ...overflow];

    try {
      const dt = new DataTransfer();
      selected.forEach(file => dt.items.add(file));
      this.#input.files = dt.files;
    } catch {
      // Some older browsers do not allow assigning input.files. The emitted
      // event still exposes the selected files.
    }

    this.#emitFiles(selected, allRejected);
  }

  #emitFiles(files, rejected = []) {
    this.toggleAttribute('data-invalid', rejected.length > 0);
    this.emit('ot-file-drop', { files, accepted: files, rejected });
  }

  #partitionFiles(files) {
    const tests = this.accept.split(',').map(t => t.trim().toLowerCase()).filter(Boolean);
    if (tests.length === 0) return { accepted: files, rejected: [] };

    return files.reduce((acc, file) => {
      (this.#matchesAccept(file, tests) ? acc.accepted : acc.rejected).push(file);
      return acc;
    }, { accepted: [], rejected: [] });
  }

  #matchesAccept(file, tests) {
    const name = file.name.toLowerCase();
    const type = file.type.toLowerCase();

    return tests.some(test => {
      if (test.startsWith('.')) return name.endsWith(test);
      if (test.endsWith('/*')) return type.startsWith(test.slice(0, -1));
      return type === test;
    });
  }

  #hasFiles(e) {
    return [...(e.dataTransfer?.types || [])].includes('Files');
  }

  #clearDragState() {
    this.#dragDepth = 0;
    delete this.dataset.dragging;
  }

  #syncInput() {
    if (!this.#input) return;

    this.#input.accept = this.accept;
    this.#input.multiple = this.multiple;
    this.#input.disabled = this.disabled;
    this.#input.name = this.getAttribute('name') || '';
    this.setAttribute('aria-disabled', String(this.disabled));
  }

  get files() {
    return this.#input ? [...this.#input.files] : [];
  }

  get accept() {
    return this.getAttribute('accept') || '';
  }

  set accept(value) {
    value ? this.setAttribute('accept', value) : this.removeAttribute('accept');
  }

  get multiple() {
    return this.hasAttribute('multiple');
  }

  set multiple(value) {
    this.toggleAttribute('multiple', Boolean(value));
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value) {
    this.toggleAttribute('disabled', Boolean(value));
  }
}

customElements.define('ot-file-drop', OtFileDrop);
