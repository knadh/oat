+++
title = "Avatar"
weight = 20
description = "Avatars are used to represent users or entities visually. They can be images, icons, or text initials."
+++

Use `.avatar` with an `<img>` tag to create an avatar. Can also use text initials or icons instead of image.

{% demo() %}
```html
<span class="avatar">
    <img src="/avatar.jpg" alt="Avatar" />
</span>
```
{% end %}

### Sizes

Use `.small` or `.large` for size variants.

{% demo() %}
```html
<span class="avatar small">
    <img src="/avatar.jpg" alt="Small Avatar" />
</span>
<span class="avatar large">
    <img src="/avatar.jpg" alt="Large Avatar" />
</span>
```
{% end %}

### Avatar group

Wrap avatars in `<div class="avatar-group">` for grouped avatars. To control the size of all avatars in the group, add `.small` or `.large` to the group container.

{% demo() %}
```html
<div class="avatar-group small">
    <span class="avatar">
      <img src="/avatar.jpg" alt="Avatar" />
    </span>
    <span class="avatar">
      <img src="/avatar.jpg" alt="Avatar" />
    </span>
    <span class="avatar">
      <img src="/avatar.jpg" alt="Avatar" />
    </span>
</div>
```
{% end %}