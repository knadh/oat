+++
title = "Accordion"
weight = 20
description = "Collapsible sections using native <details> and <summary> elements. No JS required."
+++

Use native `<details>` and `<summary>` for collapsible content.

{% demo() %}
```html
<details>
  <summary>What is Oat</summary>
  <p>Oat is a minimal, semantic-first UI component library with zero dependencies.</p>
</details>

<details>
  <summary>How do I use it</summary>
  <p>Include the CSS and JS files, then write semantic HTML. Most elements are styled by default.</p>
</details>

<details>
  <summary>Is it accessible</summary>
  <p>Yes! It uses semantic HTML and ARIA attributes. Keyboard navigation works out of the box.</p>
</details>

<details name="same">
  <summary>This is grouped with the next one</summary>
  <p>Using the <code>name</code> attribute groups items like radio.</p>
</details>

<details name="same">
  <summary>This is grouped with the previous one</summary>
  <p>Using the <code>name</code> attribute groups items like radio.</p>
</details>
```
{% end %}
