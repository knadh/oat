+++
title = "Dialog"
weight = 70
description = "Modal dialogs using native <dialog> with command/commandfor."
+++

Fully semantic, zero-Javascript, dynamic dialog with `<dialog>`. Use `commandfor` and `command="show-modal"` attributes on an element to open a target dialog. Focus trapping, z placement, keyboard shortcuts all work out of the box.

{% demo() %}
```html
<button commandfor="demo-dialog" command="show-modal">Open dialog</button>
<dialog id="demo-dialog" closedby="any">
  <form method="dialog">
    <header>
      <h3>Title</h3>
      <p>This is a dialog description.</p>
    </header>
    <div>
      <p>Dialog content goes here. You can put any HTML inside.</p>
      <p>Click outside or press Escape to close.</p>
    </div>
    <footer>
      <button type="button" commandfor="demo-dialog" command="close" class="outline">Cancel</button>
      <button value="confirm">Confirm</button>
    </footer>
  </form>
</dialog>
```
{% end %}

### With form fields

Forms inside dialogs work naturally. Use `command="close"` on cancel buttons to close.

{% demo() %}
```html
<button commandfor="demo-dialog-form" command="show-modal">Open form dialog</button>
<dialog id="demo-dialog-form">
  <form method="dialog">
    <header>
      <h3>Edit form</h3>
    </header>
    <div class="flex flex-col gap-4">
      <label>Name <input name="name" required></label>
      <label>Email <input name="email" type="email"></label>
    </div>
    <footer>
      <button type="button" commandfor="demo-dialog-form" command="close" class="outline">Cancel</button>
      <button value="save">Save</button>
    </footer>
  </form>
</dialog>
```
{% end %}

### Handling return value

Listen to the native `close` event to get the button value:

```javascript
const dialog = document.querySelector("#demo-dialog");
dialog.addEventListener('close', (e) => {
  console.log(dialog.returnValue); // "confirm"
});
```

or use `onclose` inline:

```
<dialog id="my-dialog" onclose="console.log(this.returnValue)">
```
