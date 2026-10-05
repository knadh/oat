/**
 * oat - Tooltip
 * Converts title attributes to a popover tooltip.
 */
if ('showPopover' in HTMLElement.prototype) {
  const tip = document.createElement('span');
  tip.className = 'ot-tooltip';
  tip.popover = 'manual';
  tip.ariaHidden = 'true';
  let target;

  const hide = () => {
    if (target) tip.hidePopover();
    target = null;
  };

  const update = e => {
    const node = e.type.endsWith('out') ? e.relatedTarget : e.target;
    const el = node?.closest?.('[title], [data-tooltip]');
    if (!el && target?.matches(':hover, :focus-visible')) return;
    if (el === target) return;
    hide();

    if (!el) return;

    const title = el.getAttribute('title');
    if (title) {
      el.dataset.tooltip = title;
      el.hasAttribute('aria-label') || el.setAttribute('aria-label', title);
      el.removeAttribute('title');
    }

    if (!el.dataset.tooltip) return;

    target = el;
    const rect = el.getBoundingClientRect();
    for (const key of ['left', 'top', 'width', 'height']) tip.style[key] = `${rect[key]}px`;
    tip.dataset.tooltip = el.dataset.tooltip;
    tip.dataset.tooltipPlacement = el.dataset.tooltipPlacement || 'top';
    el.after(tip);
    tip.showPopover();
  };

  for (const type of ['mouseover', 'mouseout', 'focusin', 'focusout']) document.addEventListener(type, update);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') hide(); });
  window.addEventListener('scroll', hide, true);
  window.addEventListener('resize', hide);
}
