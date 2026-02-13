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

  updateThemeToggle(document.documentElement.getAttribute('data-theme') || 'light');
});

const THEME_ICONS = {
  light: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
  dark: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
};

function toggleTheme() {
  var theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeToggle(theme);
}

function updateThemeToggle(theme) {
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.querySelector('.theme-icon').innerHTML = THEME_ICONS[theme];
  btn.querySelector('.theme-label').textContent = theme === 'dark' ? 'Dark mode' : 'Light mode';
}
