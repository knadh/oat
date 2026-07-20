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
    <button role="menuitem" class="ghost">Profile</button>
    <button role="menuitem" class="ghost" popovertarget="demo-menu" popovertargetaction="hide">Click to close</button>
    <button role="menuitem" class="ghost">Help</button>
    <a href="#" role="menuitem" class="unstyled">Link</a>
    <hr>
    <button role="menuitem" class="ghost">Logout</button>
    <button role="menuitem" data-variant="danger" class="ghost">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
      Delete
    </button>
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
      <button data-variant="danger" class="small" popovertarget="demo-confirm">Delete</button>
    </footer>
  </article>
</ot-dropdown>
```
{% end %}
