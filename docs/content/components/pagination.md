+++
title = "Pagination"
weight = 95
description = "Page navigation with prev/next and page numbers. Pure CSS, no JS required."
+++

Use `<nav class="pagination">` with buttons or links.

{% demo() %}
```html
<nav class="pagination">
  <button disabled>‹ Prev</button>
  <button aria-current="page">1</button>
  <button>2</button>
  <button>3</button>
  <button>4</button>
  <button>5</button>
  <button>Next ›</button>
</nav>
```
{% end %}

## Simple

{% demo() %}
```html
<nav class="pagination">
  <button>‹ Prev</button>
  <span>Page 5 of 20</span>
  <button>Next ›</button>
</nav>
```
{% end %}
