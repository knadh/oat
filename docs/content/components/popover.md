+++
title = "Popover"
weight = 85
description = "Floating content panels using the native popover API. Anchored to a trigger element."

[extra]
webcomponent = true
+++

Wrap in `<ot-popover>`. Use `popovertarget` on the trigger and `popover` on the content panel. Add class `popover` for styling.

{% demo() %}
```html
<ot-popover>
  <button popovertarget="demo-popover" class="outline">Open popover</button>
  <div popover id="demo-popover" class="popover">
    <header>
      <h4>Notifications</h4>
    </header>
    <div>You got a new message!</div>
  </div>
</ot-popover>
```
{% end %}

### With footer actions

Add a `<footer>` for action buttons inside the popover.

{% demo() %}
```html
<ot-popover>
  <button popovertarget="demo-pop-actions" class="outline">Confirm</button>
  <div popover id="demo-pop-actions" class="popover">
    <header>
      <h4>Are you sure?</h4>
      <p>This action cannot be undone.</p>
    </header>
    <footer>
      <button class="outline small" popovertarget="demo-pop-actions">Cancel</button>
      <button class="danger small">Delete</button>
    </footer>
  </div>
</ot-popover>
```
{% end %}

### With rich content

Popovers can contain any HTML content including forms.

{% demo() %}
```html
<ot-popover>
  <button popovertarget="demo-pop-form" class="outline">Edit</button>
  <div popover id="demo-pop-form" class="popover">
    <header>
      <h4>Update email</h4>
    </header>
    <div>
      <label>Email <input type="email" placeholder="name@example.com"></label>
    </div>
    <footer>
      <button class="small">Save</button>
    </footer>
  </div>
</ot-popover>
```
{% end %}
