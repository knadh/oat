+++
title = "Button"
weight = 50
description = "Button variants and sizes"
+++

The `<button>` element is styled by default. Use `data-variant="primary|secondary|danger"` for semantic variants and classes for visual styles.

{% demo() %}
```html
<button>Primary</button>
<button data-variant="secondary">Secondary</button>
<button data-variant="danger">Danger</button>
<button class="outline">Outline</button>
<button data-variant="danger" class="outline">Danger</button>
<button class="ghost">Ghost</button>
<button disabled>Disabled</button>
```
{% end %}

### Sizes

Use `.small` or `.large` for size variants.

{% demo() %}
```html
<button class="small">Small</button>
<button>Default</button>
<button class="large">Large</button>
<a href="#button" class="button">Hyperlink</a>
```
{% end %}

### Button group

Wrap buttons in `<menu class="buttons">` for connected buttons.

{% demo() %}
```html
<menu class="buttons">
  <button class="outline">Left</button>
  <button class="outline">Center</button>
  <button class="outline">Right</button>
</menu>
```
{% end %}
