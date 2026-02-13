+++
title = "Avatar"
weight = 45
description = "User profile images with text fallback. Pure CSS, no JS required."
+++

Use `.avatar` class with an `<img>` or text initials.

{% demo() %}
```html
<span class="avatar">
  <img src="https://i.pravatar.cc/150?img=1" alt="User">
</span>
<span class="avatar">
  <img src="https://i.pravatar.cc/150?img=2" alt="User">
</span>
<span class="avatar">JD</span>
<span class="avatar">AB</span>
```
{% end %}

## Sizes

{% demo() %}
```html
<span class="avatar xs">
  <img src="https://i.pravatar.cc/150?img=3" alt="User">
</span>
<span class="avatar small">
  <img src="https://i.pravatar.cc/150?img=4" alt="User">
</span>
<span class="avatar">
  <img src="https://i.pravatar.cc/150?img=5" alt="User">
</span>
<span class="avatar large">
  <img src="https://i.pravatar.cc/150?img=6" alt="User">
</span>
<span class="avatar xl">
  <img src="https://i.pravatar.cc/150?img=7" alt="User">
</span>
```
{% end %}

## Square

{% demo() %}
```html
<span class="avatar square xs">XS</span>
<span class="avatar square small">SM</span>
<span class="avatar square">DF</span>
<span class="avatar square large">LG</span>
<span class="avatar square xl">XL</span>
```
{% end %}

## Fallback

Without fallback text, shows default browser behavior (broken image + alt text):

{% demo() %}
```html
<span class="avatar">
  <img src="broken.jpg" alt="Alice Brown">
</span>
```
{% end %}

With fallback text, hides broken image and shows your text:

{% demo() %}
```html
<span class="avatar">
  <img src="invalid.jpg" alt="John Doe">
  JD
</span>
<span class="avatar">
  <img src="broken.jpg" alt="Sarah Wilson">
  SW
</span>
```
{% end %}
