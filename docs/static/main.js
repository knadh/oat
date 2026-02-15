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
      b.className = 'copy-btn ghost small';
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
      b.className = 'btn-reset ghost small';
      b.textContent = 'Reset';
      b.setAttribute('aria-label', 'Reset code changes');
      b.addEventListener('click', () => {
         el.innerHTML = highlighted;
         content.innerHTML = el.textContent;
      });
      menu.appendChild(b);
    }
      
    // Playground Button (only for HTML)
    if (pre.getAttribute('data-lang') === 'html') {
        const playBtn = document.createElement('a');
        playBtn.className = 'playground-btn button ghost small';
        playBtn.textContent = 'Run';
        playBtn.href = '/playground/?code=' + encodeURIComponent(rawHTML);
        playBtn.target = '_blank';
        playBtn.setAttribute('aria-label', 'Open in Playground');
        menu.appendChild(playBtn);
    }
  });
  // Initialize Playground if present
  const editor = document.getElementById('editor');
  if (editor) {
    const preview = document.getElementById('preview-container');
    const resetBtn = document.getElementById('reset-btn');
    const copyBtn = document.getElementById('copy-btn');
    
    // Update preview helper
    const updatePreview = (html) => {
        preview.innerHTML = html;
    };

    const defaultCode = `<!-- Welcome to the Oat Playground! -->
<div class="card">
  <h3>Hello, World!</h3>
  <p>Edit this code to see live changes.</p>
  <button>Click Me</button>
</div>`;

    const params = new URLSearchParams(window.location.search);
    // Prioritize URL param > localStorage > default
    const savedCode = localStorage.getItem('oat-playground-code');
    const initialCode = params.get('code') || savedCode || defaultCode;

    editor.value = initialCode;
    updatePreview(initialCode);

    editor.addEventListener('input', () => {
        const code = editor.value;
        updatePreview(code);
        localStorage.setItem('oat-playground-code', code);
    });

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if(confirm('Reset playground to default?')) {
                editor.value = defaultCode;
                updatePreview(defaultCode);
                localStorage.setItem('oat-playground-code', defaultCode);
                // Remove query param if present
                if (params.get('code')) {
                     const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
                     window.history.pushState({path:newUrl},'',newUrl);
                }
            }
        });
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(editor.value).then(() => {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Copied!';
                setTimeout(() => copyBtn.textContent = originalText, 2000);
            });
        });
    }
  }
});


function toggleTheme() {
  var theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}
