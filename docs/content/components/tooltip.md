+++
title = "Tooltip"
weight = 155
description = "Smoothl tooltips using the native title attribute."
+++

Use the standard `title` attribute on any non-replaced element to render a tooltip with smooth transition.

{% demo() %}
```html
<button title="Save your changes">Save</button>
<button title="Delete this item" data-variant="danger">Delete</button>
<a href="#" title="View your profile">Profile</a>
```
{% end %}

### Replaced Elements

A few HTML elements are categorised as *replaced*, i.e. their content is determined by external resources. As a consequence, the pseudo-classes `::before` and `::after` cannot be used on them, which is exactly the technique used to create these tooltips. Therefore, these elements are skipped so that the native browser behaviour is used when hovering over them. A simple workaround is to move the `title` attribute onto the parent element, creating it manually if necessary.

The most widely used of those replaced elements is `<img>`. The others are `<video>`, `<embed>`, `<input type="image">`, `<iframe>`, and `<fencedframe>`. Finally, three elements are *sometimes* considered replaced: `<audio>`, `<canvas>`, and `<object>`.
