/**
 * oat - Tooltip Enhancement
 * Converts title attributes to data-tooltip for custom styling.
 * Progressive enhancement: native title works without JS.
 */

document.addEventListener('DOMContentLoaded', () => {
  const _attrib = 'title', _sel = '[title]';
  // https://developer.mozilla.org/en-US/docs/Glossary/Replaced_elements
  const _replacedElements = [
    'img', 'video', 'embed', 'iframe', 'fencedframe',
    // The following three elements are only sometimes considered replaced, but
    // we'll skip them nonetheless to at least get the native browser tooltip
    // if they can have it.
    'audio', 'canvas', 'object',
  ];
  const isReplacedElement = el => _replacedElements.includes(el.localName);
  const isInputImage = el => el.localName == 'input' && el.type == 'image';

  const apply = el => {
    if (isReplacedElement(el) || isInputImage(el)) return;
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
