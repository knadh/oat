+++
title = "Skeleton"
weight = 117
description = "Loading placeholders with shimmer animation."
+++

Use `.skeleton` with `role="status"` for loading placeholders. Add `.line` for text or `.box` for images.

{% <demo> %}
```html
<div role="status" class="skeleton line"></div>
<div role="status" class="skeleton box"></div>
```
{% </demo> %}

### Skeleton card 

Put skeleton loader inside `<article>` to get a card layout.

{% <demo> %}
```html
<article style="display: flex; gap: var(--space-3); padding: var(--space-6);">
  <div role="status" class="skeleton box"></div>
  <div style="flex: 1; display: flex; flex-direction: column; gap: var(--space-1);">
    <div role="status" class="skeleton line"></div>
    <div role="status" class="skeleton line" style="width: 60%"></div>
  </div>
</article>
```
{% </demo> %}
