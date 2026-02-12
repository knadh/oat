document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.ot-demo').forEach(demo => {
    const pre = demo.querySelector('pre');
    if (!pre) return;

    const code = pre.querySelector('code');
    const rawHTML = code.textContent;

    // Create tabbed interface.
    demo.innerHTML = `
      <ot-tabs>
        <div role="tablist">
          <button role="tab">⧉ Preview</button>
          <button role="tab">{} Code</button>
        </div>
        <div role="tabpanel">
          <div class="demo-box"><div class="demo-content">${rawHTML}</div></div>
        </div>
        <div role="tabpanel"></div>
      </ot-tabs>
    `;

    // Move the original Zola syntax-highlighted <pre> into the Code tab.
    demo.querySelector(':scope > ot-tabs > [role="tabpanel"]:last-child').appendChild(pre);
  });

  // Set theme based on saved preference or system setting.
  var t = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', t);

  // Active state scrollspy
  const sidebarLinks = document.querySelectorAll('aside[data-sidebar] nav a');
  const sections = document.querySelectorAll('.demo-section');

  if (sidebarLinks.length > 0 && sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          sidebarLinks.forEach(link => {
            if (link.getAttribute('href').includes(`#${id}`)) {
              link.setAttribute('aria-current', 'location');
            } else {
              link.removeAttribute('aria-current');
            }
          });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' }); // Trigger when section is near top

    sections.forEach(section => observer.observe(section));
  }
});


function toggleTheme() {
  var theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}
