function setupDemos() {
  document.querySelectorAll('.ot-demo').forEach(demo => {
    const pre = demo.querySelector('pre');
    if (!pre) return;

    const code = pre.querySelector('code');
    const rawHTML = code ? code.textContent : pre.textContent;

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
}

function setupCodeCopyButtons() {
  if (!navigator.clipboard || !navigator.clipboard.writeText) {
    return;
  }

  const copyIcon = `
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="4" y="3" width="9" height="9" rx="2" fill="none" stroke="currentColor" stroke-width="1.6" />
      <rect x="8" y="7" width="9" height="9" rx="2" fill="none" stroke="currentColor" stroke-width="1.6" />
    </svg>
  `;

  const checkIcon = `
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <polyline points="4 12 10 18 20 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `;

  document.querySelectorAll('pre').forEach(pre => {
    // Avoid re-processing the same block.
    if (pre.dataset.copyButtonAttached === 'true') {
      return;
    }
    pre.dataset.copyButtonAttached = 'true';

    const parent = pre.parentNode;
    if (!parent) {
      return;
    }

    // Wrap <pre> in a container so we can position the button.
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block';
    parent.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-button';
    button.setAttribute('aria-label', 'Copy code');
    button.setAttribute('title', 'Copy');
    button.innerHTML = copyIcon;

    button.addEventListener('click', () => {
      const codeEl = pre.querySelector('code');
      const text = codeEl ? codeEl.textContent : pre.textContent || '';

      navigator.clipboard.writeText(text)
        .then(() => {
          button.innerHTML = checkIcon;
          button.setAttribute('aria-label', 'Copied');
          button.disabled = true;

          window.setTimeout(() => {
            button.innerHTML = copyIcon;
            button.setAttribute('aria-label', 'Copy code');
            button.disabled = false;
          }, 1200);
        })
        .catch(() => {
          // On failure, leave the button as-is.
        });
    });

    wrapper.appendChild(button);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupDemos();
  setupCodeCopyButtons();
});

function toggleTheme() {
  var theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}
