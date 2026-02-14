+++
title = "Toast"
weight = 160
description = "Notification toasts with placement and stacking."
+++

Show toast notifications with `ot.toast(message, title?, options?)`.

{% demo() %}
```html
<button onclick="ot.toast('Action completed successfully', 'All good', { variant: 'success' })">Success</button>
<button onclick="ot.toast('Something went wrong', 'Oops', { variant: 'danger', placement: 'top-left' })" data-variant="danger">Danger</button>
<button onclick="ot.toast('Please review this warning', 'Warning', { variant: 'warning', placement: 'bottom-right' })" class="outline">Warning</button>
<button onclick="ot.toast('New notification', 'For your attention', { placement: 'top-center' })">Info</button>
```
{% end %}

### Placement

```js
ot.toast('Top left', '', { placement: 'top-left' })
ot.toast('Top center', '',{ placement: 'top-center' })
ot.toast('Top right', '',{ placement: 'top-right' })  // default
ot.toast('Bottom left', '', { placement: 'bottom-left' })
ot.toast('Bottom center', '', { placement: 'bottom-center' })
ot.toast('Bottom right', '',{ placement: 'bottom-right' })
```

### Options

| Option      | Default       | Description                          |
| ----------- | ------------- | ------------------------------------ |
| `variant`   | `''`          | `'success'`, `'danger'`, `'warning'` |
| `placement` | `'top-right'` | Position on screen                   |
| `duration`  | `4000`        | Auto-dismiss in ms (0 = persistent)  |

### Custom markup

Use `ot.toastEl(element, options?)` to show toasts with custom HTML content.

{% demo() %}
```html
<template id="undo-toast">
  <output class="toast" data-variant="success">
    <h6 class="toast-title">Changes saved</h6>
    <p>Your document has been updated.</p>
    <button data-variant="secondary" class="small" onclick="this.closest('.toast').remove()">Okay</button>
  </output>
</template>

<button onclick="ot.toastEl(document.querySelector('#undo-toast'), { duration: 8000 })">
  Toast with action
</button>
```
{% end %}

**From a template:**

```js
ot.toastEl(document.querySelector('#my-template'))
ot.toastEl(document.querySelector('#my-template'), { duration: 8000, placement: 'bottom-center' })
```

**Dynamic element:**

```js
const el = document.createElement('output');
el.className = 'toast';
el.setAttribute('data-variant', 'warning');
el.innerHTML = '<h6 class="toast-title">Warning</h6><p>Custom content here</p>';
ot.toastEl(el);
```

The element is cloned before display, so templates can be reused.

### Clearing toasts

```js
ot.toast.clear()              // Clear all
ot.toast.clear('top-right')   // Clear specific placement
```
