+++
title = "Breadcrumb"
weight = 45
description = "Navigation breadcrumb trail."
+++

Use semantic `<nav aria-label="breadcrumb">` with an ordered list.

{% demo() %}
```html
<nav aria-label="breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/components">Components</a></li>
    <li>Breadcrumb</li>
  </ol>
</nav>
```
{% end %}
