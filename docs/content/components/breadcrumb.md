+++
title = "Breadcrumb"
weight = 45
description = "Simple navigation hierarchy using nav and ordered lists"
+++

Use a semantic breadcrumb `<nav>` with an ordered list and `aria-current="page"` for the active item.

{% demo() %}
```html
<nav aria-label="Breadcrumb">
  <ol class="unstyled hstack" style="font-size: var(--text-7)">
    <li><a href="#breadcrumbs" class="unstyled">Home</a></li>
    <li aria-hidden="true">/</li>
    <li><a href="#breadcrumbs" class="unstyled">Projects</a></li>
    <li aria-hidden="true">/</li>
    <li><a href="#breadcrumbs" class="unstyled">Oat Docs</a></li>
    <li aria-hidden="true">/</li>
    <li><a href="#breadcrumbs" class="unstyled" aria-current="page"><strong>Breadcrumb</strong></a></li>
  </ol>
</nav>
```
{% end %}
