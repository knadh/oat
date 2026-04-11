/**
 * oat - Tooltip Enhancement
 * Converts title attributes to data-tooltip for custom styling.
 * Progressive enhancement: native title works without JS.
 */

document.addEventListener('DOMContentLoaded', () => {
  const _attrib = 'title', _sel = '[title]';
  const apply = el => {
    const t = el.getAttribute(_attrib);
    if (!t) return;
    el.setAttribute('data-tooltip', t);
    el.hasAttribute('aria-label') || el.setAttribute('aria-label', t);

    // Kill the original 'title'.
    el.removeAttribute(_attrib);
  };

  // Apply to all elements on load.
  document.querySelectorAll(_sel).forEach(apply);

  // Apply to new elements.
  new MutationObserver(muts => {
    for (const m of muts) {
      apply(m.target);

      for (const n of m.addedNodes)
        if (n.nodeType === 1) {
          apply(n);
          n.querySelectorAll(_sel).forEach(apply);
        }
    }
  }).observe(document.body, {
    childList: true, subtree: true, attributes: true, attributeFilter: [_attrib]
  });
});
