+++
title = "Avatar"
weight = 31
description = "Avatars are used to represent users or entities visually. They can be images, icons, or text initials."
+++

Use `<figure data-variant="avatar">` with an `<img>` tag to create an avatar. Can also use text initials with `<abbr>` or icons instead of image.

{% demo() %}
```html
<figure data-variant="avatar" class="small" aria-label="Jane Doe">
    <img src="/avatar.svg" alt="" />
</figure>

<figure data-variant="avatar" aria-label="Oat">
    <abbr title="Jane Doe">OT</abbr>
</figure>

<figure data-variant="avatar" aria-label="Jane Doe">
    <img src="/avatar.svg" alt="" />
</figure>

<figure data-variant="avatar" class="large" aria-label="Jane Doe">
    <img src="/avatar.svg" alt="" />
</figure>
```
{% end %}

### Avatar group

Wrap avatars in `<figure data-variant="avatar" role="group">` for grouped avatars. To control the size of all avatars in the group, add `.small` or `.large` to the group container.

{% demo() %}
```html
<figure data-variant="avatar" role="group" class="small" aria-label="Team members">
    <figure data-variant="avatar" aria-label="Jane Doe">
        <img src="/avatar.svg" alt="" />
    </figure>
    <figure data-variant="avatar" aria-label="John Smith">
        <img src="/avatar.svg" alt="" />
    </figure>
    <figure data-variant="avatar" aria-label="Alex Lee">
        <img src="/avatar.svg" alt="" />
    </figure>
</figure>

<figure data-variant="avatar" role="group" aria-label="Team members">
    <figure data-variant="avatar" aria-label="Jane Doe">
        <img src="/avatar.svg" alt="" />
    </figure>
    <figure data-variant="avatar" aria-label="John Smith">
        <img src="/avatar.svg" alt="" />
    </figure>
    <figure data-variant="avatar" aria-label="Alex Lee">
        <img src="/avatar.svg" alt="" />
    </figure>
</figure>

<figure data-variant="avatar" role="group" class="large" aria-label="Team members">
    <figure data-variant="avatar" aria-label="Jane Doe">
        <img src="/avatar.svg" alt="" />
    </figure>
    <figure data-variant="avatar" aria-label="John Smith">
        <img src="/avatar.svg" alt="" />
    </figure>
    <figure data-variant="avatar" aria-label="Alex Lee">
        <img src="/avatar.svg" alt="" />
    </figure>
</figure>
```
{% end %}
