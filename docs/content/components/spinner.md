+++
title = "Spinner"
weight = 115
description = "Loading indicators with role=\"status\"."
+++

Use `aria-busy="true"` on any element to show a loading indicator. Size with `data-spinner="small|large"`.

{% demo() %}
```html
<div class="hstack" style="gap: var(--space-8)">
    <div aria-busy="true" data-spinner="small"></div>
    <div aria-busy="true"></div>
    <div aria-busy="true" data-spinner="large"></div>
    <button aria-busy="true" data-spinner="small" disabled>Loading</button>
</div>
```
{% end %}

### Overlay
Adding `data-spinner="overlay"` dims contents of the container and overlays the spinner on top.

{% demo() %}
```html
<article class="card" aria-busy="true" data-spinner="large overlay">
  <header>
    <h3>Card Title</h3>
    <p>Card description goes here.</p>
  </header>
  <p>This is the card content. It can contain any HTML.</p>
  <footer class="flex gap-2 mt-4">
    <button class="outline">Cancel</button>
    <button>Save</button>
  </footer>
</article>
```
{% end %}
