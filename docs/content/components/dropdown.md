+++
title = "Dropdown"
weight = 80
description = "Dropdown menus and popover using the native popover API. Supports keyboard navigation."

[extra]
webcomponent = true
+++

Wrap in `<ot-dropdown>`. Use `popovertarget` on the trigger and `popover` on the target. If a dropdown `<menu>`, items use `role="menuitem"`.

{% demo() %}
```html
<ot-dropdown>
  <button popovertarget="demo-menu" class="outline">
    Options
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6" /></svg>
  </button>
  <menu popover id="demo-menu">
    <button role="menuitem">Profile</button>
    <button role="menuitem">Settings</button>
    <button role="menuitem">Help</button>
    <hr>
    <button role="menuitem">Logout</button>
  </menu>
</ot-dropdown>
```
{% end %}

### Popover

`<ot-dropdown>` can also be used to show popover dropdown elements.

{% demo() %}
```html
<ot-dropdown>
  <button popovertarget="demo-confirm" class="outline">
    Confirm
  </button>
  <article class="card" popover id="demo-confirm">
    <header>
      <h4>Are you sure?</h4>
      <p>This action cannot be undone.</p>
    </header>
    <br />
    <footer>
      <button class="outline small" popovertarget="demo-confirm">Cancel</button>
      <button class="danger small" popovertarget="demo-confirm">Delete</button>
    </footer>
  </article>
</ot-dropdown>
```
{% end %}