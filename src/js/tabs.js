/**
 * oat - Tabs Component
 * Provides keyboard navigation and ARIA state management.
 *
 * Usage:
 * <ot-tabs>
 *   <div role="tablist">
 *     <button role="tab">Tab 1</button>
 *     <button role="tab">Tab 2</button>
 *   </div>
 *   <div role="tabpanel">Content 1</div>
 *   <div role="tabpanel">Content 2</div>
 * </ot-tabs>
 */

import { OtBase } from './base.js';

class OtTabs extends OtBase {
  #tabs = [];
  #panels = [];
  #anchor;
  #ids = [];

  init() {
    const tablist = this.querySelector(':scope > [role="tablist"]');
    this.#tabs = tablist ? [...tablist.querySelectorAll('[role="tab"]')] : [];
    this.#panels = [...this.querySelectorAll(':scope > [role="tabpanel"]')];

    if (this.#tabs.length === 0 || this.#panels.length === 0) {
      console.warn('ot-tabs: Missing tab or tabpanel elements');
      return;
    }

    // Generate IDs and set up ARIA.
    this.#tabs.forEach((tab, i) => {
      const panel = this.#panels[i];
      if (!panel) return;

      // If there's no ID, skip it from deep-linking.
      this.#ids[i] = tab.id || '';

      const tabId = tab.id || `ot-tab-${this.uid()}`;
      const panelId = panel.id || `ot-panel-${this.uid()}`;

      tab.id = tabId;
      panel.id = panelId;
      tab.setAttribute('aria-controls', panelId);
      panel.setAttribute('aria-labelledby', tabId);
    });

    // The hash key to use in the # fragment for deep-linking.
    // Eg: data-anchor="tab" becomes #tab=$id in the URL.
    this.#anchor = this.dataset.anchor;

    tablist.addEventListener('click', this);
    tablist.addEventListener('keydown', this);

    // Figure out the selection from the URL fragment.
    const fromHash = this.#hashIndex();
    const activeTab = fromHash >= 0 ? fromHash : this.#tabs.findIndex(t => t.ariaSelected === 'true');
    this.#activate(activeTab >= 0 ? activeTab : 0, false);

    if (this.#anchor) window.addEventListener('hashchange', this);
  }

  cleanup() {
    window.removeEventListener('hashchange', this);
  }

  onclick(e) {
    const index = this.#tabs.indexOf(e.target.closest('[role="tab"]'));
    if (index >= 0) this.#activate(index);
  }

  onkeydown(e) {
    if (!e.target.closest('[role="tab"]')) return;

    const next = this.keyNav(e, this.activeIndex, this.#tabs.length, 'ArrowLeft', 'ArrowRight');
    if (next >= 0) {
      this.#activate(next);
      this.#tabs[next].focus();
    }
  }

  onhashchange() {
    const idx = this.#hashIndex();
    if (idx >= 0 && idx !== this.activeIndex) this.#activate(idx, false);
  }

  #activate(idx, syncHash = true) {
    this.#tabs.forEach((tab, i) => {
      const isActive = i === idx;
      tab.ariaSelected = String(isActive);
      tab.tabIndex = isActive ? 0 : -1;
    });

    this.#panels.forEach((panel, i) => {
      panel.hidden = i !== idx;
    });

    if (syncHash) this.#syncHash(idx);

    this.emit('ot-tab-change', { index: idx, tab: this.#tabs[idx] });
  }

  // Return the index of the tab whose id matches the hash, or -1.
  #hashIndex() {
    if (!this.#anchor) return -1;
    const id = new URLSearchParams(location.hash.slice(1)).get(this.#anchor);
    return id ? this.#ids.findIndex(x => x === id) : -1;
  }

  // Reflect the active tab's id in the hash, preserving other params.
  // A tab without an id clears our key from the fragment.
  #syncHash(idx) {
    if (!this.#anchor) return;

    const id = this.#ids[idx];
    const params = new URLSearchParams(location.hash.slice(1));
    id ? params.set(this.#anchor, id) : params.delete(this.#anchor);

    // Keep only key=value pairs.
    for (const [k, v] of [...params]) {
      if (!v) params.delete(k);
    }

    const hash = params.toString();
    history.replaceState(null, '', hash ? `#${hash}` : location.pathname + location.search);
  }

  get activeIndex() {
    return this.#tabs.findIndex(t => t.ariaSelected === 'true');
  }

  set activeIndex(value) {
    if (value >= 0 && value < this.#tabs.length) {
      this.#activate(value);
    }
  }
}

customElements.define('ot-tabs', OtTabs);
