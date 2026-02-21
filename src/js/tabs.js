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

class OtTabs extends OtBase {
  #tabs = [];
  #panels = [];

  init() {
    const tablist = this.$(':scope > [role="tablist"]');
    this.#tabs = tablist ? [...tablist.querySelectorAll('[role="tab"]')] : [];
    this.#panels = this.$$(':scope > [role="tabpanel"]');

    if (this.#tabs.length === 0 || this.#panels.length === 0) {
      console.warn('ot-tabs: Missing tab or tabpanel elements');
      return;
    }

    // Generate IDs and set up ARIA.
    this.#tabs.forEach((tab, i) => {
      const panel = this.#panels[i];
      if (!panel) return;

      const tabId = tab.id || `ot-tab-${this.uid()}`;
      const panelId = panel.id || `ot-panel-${this.uid()}`;

      tab.id = tabId;
      panel.id = panelId;
      tab.setAttribute('aria-controls', panelId);
      panel.setAttribute('aria-labelledby', tabId);
    });

    tablist.addEventListener('click', this);
    tablist.addEventListener('keydown', this);

    // Find initially active tab or default to first.
    const activeTab = this.#tabs.findIndex(t => t.ariaSelected === 'true');
    this.#activate(activeTab >= 0 ? activeTab : 0);
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

  #activate(idx) {
    this.#tabs.forEach((tab, i) => {
      const isActive = i === idx;
      tab.ariaSelected = String(isActive);
      tab.tabIndex = isActive ? 0 : -1;
    });

    this.#panels.forEach((panel, i) => {
      panel.hidden = i !== idx;
    });

    this.emit('ot-tab-change', { index: idx, tab: this.#tabs[idx] });
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
