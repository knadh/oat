document.addEventListener('DOMContentLoaded', () => {
    const dialog = document.getElementById('command-palette');
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results');
    const links = Array.from(document.querySelectorAll('aside[data-sidebar] nav details a'))
        .map(link => ({
            text: link.childNodes[0].textContent.trim(),
            href: link.getAttribute('href'),
            element: link
        }))
        .filter(item => item.href.includes('#'));

    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            if (dialog.open) {
                dialog.close();
            } else {
                dialog.showModal();
                searchInput.value = '';
                renderResults(links);
                searchInput.focus();
            }
        }
        if (e.key === 'Escape' && dialog.open) {
            dialog.close();
        }
    });

    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
            dialog.close();
        }
    });

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = links.filter(item => item.text.toLowerCase().includes(query));
        renderResults(filtered);
    });

    function renderResults(items) {
        resultsContainer.innerHTML = '';
        items.forEach((item, index) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = item.href;
            a.textContent = item.text;
            if (index === 0) a.classList.add('selected');

            a.addEventListener('click', () => dialog.close());
            a.addEventListener('mouseenter', () => {
                document.querySelectorAll('#search-results a').forEach(el => el.classList.remove('selected'));
                a.classList.add('selected');
            });

            li.appendChild(a);
            resultsContainer.appendChild(li);
        });
    }

    dialog.addEventListener('keydown', (e) => {
        const selected = resultsContainer.querySelector('.selected');
        if (!selected) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const next = selected.parentElement.nextElementSibling?.querySelector('a');
            if (next) {
                selected.classList.remove('selected');
                next.classList.add('selected');
                next.scrollIntoView({ block: 'nearest' });
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prev = selected.parentElement.previousElementSibling?.querySelector('a');
            if (prev) {
                selected.classList.remove('selected');
                prev.classList.add('selected');
                prev.scrollIntoView({ block: 'nearest' });
            }
        } else if (e.key === 'Enter') {
            e.preventDefault();
            selected.click();
        }
    });
});
