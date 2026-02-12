+++
title = "Breadcrumb"
weight = 35
description = "Breadcrumb navigation using semantic HTML."
+++

Use `<nav aria-label="breadcrumb">` with an `<ol>` list for breadcrumb navigation.
Mark the current page with `aria-current="page"`.

{% demo() %}
```html
<nav aria-label="breadcrumb">
  <ol>
    <li><a href="#">Home</a></li>
    <li><a href="#">Components</a></li>
    <li><a href="#" aria-current="page">Breadcrumb</a></li>
  </ol>
</nav>
```
{% end %}
