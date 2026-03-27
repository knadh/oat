+++
title = "Breadcrumb"
weight = 45
description = "Simple navigation hierarchy using nav and ordered lists"
+++

Use a semantic breadcrumb `<nav>` with an ordered list and `aria-current="page"` for the active item. The component is styled automatically via `nav[aria-label="Breadcrumb"]` — no extra classes needed.

{% demo() %}
```html
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="#breadcrumbs">Home</a></li>
    <li aria-hidden="true">/</li>
    <li><a href="#breadcrumbs">Projects</a></li>
    <li aria-hidden="true">/</li>
    <li><a href="#breadcrumbs">Oat Docs</a></li>
    <li aria-hidden="true">/</li>
    <li><a href="#breadcrumbs" aria-current="page">Breadcrumb</a></li>
  </ol>
</nav>
```
{% end %}
