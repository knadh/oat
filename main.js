document.addEventListener('DOMContentLoaded', () => {
  // Iterate over Zola syntax highlighte code blocks and create 'Preview' and 'Code' tabs.
  document.querySelectorAll('pre[data-lang]').forEach(pre => {

    // Insert the buttons menu before the code block.
    const menu = document.createElement('menu');
    menu.className = 'actions buttons';
    pre.prepend(menu);

    // 'Copy' button.
    {
      const b = document.createElement('button');
      b.className = 'ghost small';
      b.textContent = 'Copy';
      b.setAttribute('aria-label', 'Copy code to clipboard');
      b.addEventListener('click', () => {
        navigator.clipboard.writeText(pre.querySelector('code').textContent.trim()).then(() => {
          b.textContent = 'Copied';
          setTimeout(() => b.textContent = 'Copy', 2000);
        });
      });
      menu.appendChild(b);
    }

    // Demo code block or just a normal code block?
    const demo = pre.closest('.ot-demo');
    if (!demo) {
      return;
    }

    pre.style.display = 'block';
    const code = pre.querySelector('code');
    const rawHTML = code.textContent;

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

    const panel = demo.querySelector(':scope > ot-tabs > [role="tabpanel"]:last-child');
    panel.appendChild(pre);


    // Make the code block editable and update the preview on change.
    const content = demo.querySelector('.demo-content');
    const el = code || pre;
    const highlighted = el.innerHTML;
    el.setAttribute('contenteditable', 'plaintext-only');
    el.setAttribute('spellcheck', 'false');
    el.addEventListener('input', () => content.innerHTML = el.textContent);

    // 'Reset' button.
    {
      const b = document.createElement('button');
      b.className = 'ghost small btn-reset';
      b.textContent = 'Reset';
      b.setAttribute('aria-label', 'Reset code to original');
      b.addEventListener('click', () => {
        el.innerHTML = highlighted;
        content.innerHTML = rawHTML;
      });
      menu.prepend(b);
    }

    // 'Edit' button to toggle fullscreen side-by-side editubg.
    {
      const b = document.createElement('button');
      b.className = 'ghost small btn-edit';
      b.textContent = 'Edit';
      b.setAttribute('aria-label', 'Toggle fullscreen editor');
      b.addEventListener('click', () => {
        const isFull = demo.classList.toggle('fullscreen');

        b.textContent = isFull ? 'Close' : 'Edit';
        if (isFull) {
          demo.querySelectorAll('[role="tabpanel"]').forEach(p => p.removeAttribute('hidden'));
        } else {
          const active = demo.querySelector('[role="tab"][aria-selected="true"]');
          if (active) active.click();
        }
      });
      menu.prepend(b);
    }
  });

  // On Esc, close fullscreen editor if open.
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const isFull = document.querySelector('.ot-demo.fullscreen');
      if (isFull) {
        isFull.classList.remove('fullscreen');
        isFull.querySelector('.btn-edit').textContent = 'Edit';
        const active = isFull.querySelector('[role="tab"][aria-selected="true"]');
        if (active) active.click();
      }
    }
  });
});


function toggleTheme() {
  var theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}
