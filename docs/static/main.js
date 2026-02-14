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

  // Add a 'copy' button to code blocks.
  document.querySelectorAll('pre[data-lang]').forEach(el => {
    const btn = document.createElement('button');
    btn.className = 'copy-btn ghost small';
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy code to clipboard');
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(el.querySelector('code').textContent.trim()).then(() => {
        btn.textContent = 'Copied';
        setTimeout(() => btn.textContent = 'Copy', 2000);
      });
    });
    el.prepend(btn);
  });
});


function toggleTheme() {
  var theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}
