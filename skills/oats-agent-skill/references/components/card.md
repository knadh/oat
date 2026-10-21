+++
title = "Card"
weight = 60
description = "Card containers using the semantic <article> tag."
+++

Use `class="card"` for a visual box-like card look.

{% <demo> %}
```html
<article class="card">
  <header>
    <h3>Card Title</h3>
    <p>Card description goes here.</p>
  </header>
  <p>This is the card content. It can contain any HTML.</p>
  <footer class="hstack">
    <button class="outline">Cancel</button>
    <button>Save</button>
  </footer>
</article>
```
{% </demo> %}
