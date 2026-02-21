/**
 * oat - Tooltip Enhancement
 * Converts title attributes to data-tooltip for custom styling.
 * Progressive enhancement: native title works without JS.
 */

// Initialise tooltips on any number of elements. If none are provided,
// initialise all the elements in the document with a 'title' attribute.
ot.tooltip = function(...elements) {
  if (elements.length == 0) {
    elements = document.querySelectorAll('[title]');
  }
  elements.forEach(el => {
    const text = el.getAttribute('title');
    if (text) {
      el.setAttribute('data-tooltip', text);
      if (!el.hasAttribute('aria-label')) {
        el.setAttribute('aria-label', text);
      }
      el.removeAttribute('title');
    }
  });
}

document.addEventListener('DOMContentLoaded', ot.tooltip);
