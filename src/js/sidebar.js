/**
 * Sidebar toggle handler
 * Toggles data-sidebar-open on layout when toggle button is clicked
 */
document.addEventListener('click', (e) => {
  const toggle = e.target.closest('[data-sidebar-toggle]');
  if (toggle) {
    const layout = toggle.closest('[data-sidebar-layout]');
    layout?.toggleAttribute('data-sidebar-open');
    return;
  }

  // Dismiss sidebar when clicking outside (when sidebar is not an overlay).
  if (!e.target.closest('[data-sidebar]')) {
    const layout = document.querySelector('[data-sidebar-layout][data-sidebar-open]');
    // Hardcode breakpoint (for now) as there's no way to use a CSS variable in
    // the @media{} query which could've been picked up here.
    if (layout && window.matchMedia('(max-width: 768px)').matches) {
      layout.removeAttribute('data-sidebar-open');
    }
  }
});
