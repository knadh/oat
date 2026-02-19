/**
 * oat - Tooltip Enhancement
 * Converts title attributes to data-tooltip for custom styling.
 * Progressive enhancement: native title works without JS.
 */

document.addEventListener('DOMContentLoaded', () => {
  // https://developer.mozilla.org/en-US/docs/Glossary/Replaced_elements
  const replacedElements = [
    'img', 'video', 'embed',
    'iframe', 'fencedframe',
    // The following three elements are only sometimes considered replaced, but
    // we'll skip them nonetheless to at least get the native browser tooltip
    // if they can have it.
    'audio', 'canvas', 'object',
  ];
  const isInputImage = el => el.localName == 'input' && el.type == 'image';

  document.querySelectorAll('[title]').forEach(el => {
    if (
      !replacedElements.includes(el.localName)
      &&
      !isInputImage(el)
    ) {
      const text = el.getAttribute('title');
      if (text) {
        el.setAttribute('data-tooltip', text);
        if (!el.hasAttribute('aria-label')) {
          el.setAttribute('aria-label', text);
        }
        el.removeAttribute('title');
      }
    }
  });
});
