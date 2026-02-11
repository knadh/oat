+++
title = "Avatar"
weight = 25
description = "User avatars with image support, initials fallback, status indicators, and grouping."
+++

Use `.avatar` for a circular user avatar. Supports images and text initials.

{% demo() %}
```html
<span class="avatar"><img src="https://i.pravatar.cc/80?img=1" alt="Jane"></span>
<span class="avatar"><img src="https://i.pravatar.cc/80?img=2" alt="John"></span>
<span class="avatar">AB</span>
<span class="avatar">K</span>
```
{% end %}

### Sizes

Use `.small` or `.large` for size variants.

{% demo() %}
```html
<span class="avatar small"><img src="https://i.pravatar.cc/80?img=3" alt="Small"></span>
<span class="avatar"><img src="https://i.pravatar.cc/80?img=4" alt="Default"></span>
<span class="avatar large"><img src="https://i.pravatar.cc/80?img=5" alt="Large"></span>
```
{% end %}

### Square

Use `.square` for rounded-rectangle avatars.

{% demo() %}
```html
<span class="avatar square"><img src="https://i.pravatar.cc/80?img=6" alt="Square"></span>
<span class="avatar square">OA</span>
```
{% end %}

### Status indicator

Add a `.status` span inside the avatar. Use `.online` for a green dot.

{% demo() %}
```html
<span class="avatar">
  <img src="https://i.pravatar.cc/80?img=7" alt="Online">
  <span class="status online"></span>
</span>
<span class="avatar">
  <img src="https://i.pravatar.cc/80?img=8" alt="Offline">
  <span class="status"></span>
</span>
```
{% end %}

### Avatar group

Wrap avatars in `.avatar-group` to stack them with overlap.

{% demo() %}
```html
<div class="avatar-group">
  <span class="avatar"><img src="https://i.pravatar.cc/80?img=9" alt=""></span>
  <span class="avatar"><img src="https://i.pravatar.cc/80?img=10" alt=""></span>
  <span class="avatar"><img src="https://i.pravatar.cc/80?img=11" alt=""></span>
  <span class="avatar count">+3</span>
</div>
```
{% end %}
