+++
title = "Recipes"
weight = 172
description = "Composable UI recipes using existing Oat components."

[extra]
webcomponent = true
+++

Examples for various composable widgets using Oat components.

--------

## Split button

Use `menu.buttons` for joined controls and `ot-dropdown` for secondary actions.

{% demo() %}
```html
<ot-dropdown>
  <menu class="buttons">
    <li><button class="outline">Save</button></li>
    <li>
      <button  class="outline" popovertarget="save-actions" aria-label="More save actions">
        More
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6" /></svg>
      </button>
    </li>
  </menu>
  <menu popover id="save-actions">
    <button role="menuitem" class="ghost">Save draft</button>
    <button role="menuitem" class="ghost">Save and publish</button>
    <button role="menuitem" class="ghost">Duplicate</button>
  </menu>
</ot-dropdown>
```
{% end %}

## Radio cards

Wrap each option in a `<label>` so the whole card is selectable, and group them in a `<fieldset>` with a `<legend>`.

{% demo() %}
```html
<fieldset class="w-100">
  <legend>Billing</legend>
  <p class="text-light">Select a billing cycle</p>

  <div class="row">
    <label class="col-4 card vstack">
      <span class="w-100 hstack justify-between">
        <strong>Monthly</strong>
        <input type="radio" name="billing">
      </span>
      <span class="text-light">$12 / mo</span>
    </label>

    <label class="col-4 card vstack">
      <span class="w-100 hstack justify-between">
        <strong>Yearly</strong>
        <input type="radio" name="billing">
      </span>
      <span class="text-light">$96 / yr · save 33%</span>
    </label>

    <label class="col-4 card vstack">
      <span class="w-100 hstack justify-between">
        <strong>Lifetime</strong>
        <input type="radio" name="billing" checked>
      </span>
      <span class="text-light">$299 once</span>
    </label>
  </div>
</fieldset>
```
{% end %}

## Form card

Group related form fields inside a card with standard field containers and actions.

{% demo() %}
```html
<article class="card">
  <header>
    <h3>Profile</h3>
    <p class="text-light">Update account information</p>
  </header>

  <div class="mt-4">
    <label data-field>
      Name
      <input type="text" value="Your name" />
    </label>

    <label data-field>
      Email
      <input type="email" value="mila@example.com" />
    </label>

    <label data-field>
      <input type="checkbox" role="switch" checked> Email notifications
    </label>
  </div>

  <footer class="hstack justify-end mt-4">
    <button class="outline">Cancel</button>
    <button>Save</button>
  </footer>
</article>
```
{% end %}

## Empty state

Use a card, text, and primary actions for list/result empty states.

{% demo() %}
```html
<article class="card align-center">
  <h3>Nothing here yet</h3>
  <p class="text-light">Why don't you create something?</p>
  <footer class="hstack justify-center mt-4">
    <button>New something</button>
  </footer>
</article>
```
{% end %}

## Stats cards

Compose dashboard metrics with `grid`, `card`, `badge`, and `progress`/`meter`.

{% demo() %}
```html
<div class="container">
  <div class="row">
    <article class="card col-4">
      <header class="hstack justify-between items-center">
        <h4>Revenue</h4>
        <span class="badge" data-variant="success">+12%</span>
      </header>
      <h2>$42,200</h2>
      <p class="text-light">vs last month</p>
      <progress value="72" max="100"></progress>
    </article>

    <article class="card col-4">
      <header class="hstack justify-between items-center">
        <h4>Completion</h4>
        <span class="badge" data-variant="warning">-2%</span>
      </header>
      <h2>4.6%</h2>
      <p class="text-light">checkout completion</p>
      <meter value="0.46" min="0" max="1" low="0.3" high="0.7" optimum="1"></meter>
    </article>

    <article class="card col-4">
      <header class="hstack justify-between items-center">
        <h4>Tickets</h4>
        <span class="badge">14</span>
      </header>
      <h2>14</h2>
      <p class="text-light">support queue</p>
      <progress value="35" max="100"></progress>
    </article>
  </div>
</div>
```
{% end %}

## Download button

Add the `download` attribute to a hyperlink to trigger a file download. Style it with `.button` and any button variant, same as any other link.

{% demo() %}
```html
<a href="/oat.min.css" download class="button">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 4v12m0 0-4-4m4 4 4-4" /><path d="M4 16v4h16v-4" /></svg>
  Download CSS
</a>

<a href="/oat.min.js" download class="outline">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 4v12m0 0-4-4m4 4 4-4" /><path d="M4 16v4h16v-4" /></svg>
  Download JS
</a>
```
{% end %}

## Copy-to-clipboard button

An icon button that copies text and briefly swaps to a checkmark icon to confirm the action, using the Clipboard API and the native `hidden` attribute. No new component or CSS state needed.

{% demo() %}
```html
<button class="icon outline" aria-label="Copy install command" onclick="navigator.clipboard.writeText('npm install oat-ui'); this.querySelector('[data-icon=copy]').hidden = true; this.querySelector('[data-icon=check]').hidden = false; setTimeout(() => { this.querySelector('[data-icon=copy]').hidden = false; this.querySelector('[data-icon=check]').hidden = true }, 1500)">
  <svg data-icon="copy" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
  <svg data-icon="check" hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
</button>
```
{% end %}

For anything beyond a one-liner, wire the same swap up as a real event listener instead of an inline attribute:

```javascript
button.addEventListener('click', async () => {
  await navigator.clipboard.writeText('npm install oat-ui');
  button.querySelector('[data-icon=copy]').hidden = true;
  button.querySelector('[data-icon=check]').hidden = false;
  setTimeout(() => {
    button.querySelector('[data-icon=copy]').hidden = false;
    button.querySelector('[data-icon=check]').hidden = true;
  }, 1500);
});
```

## Loading button

Toggle `aria-busy="true"` and `disabled` on submit to show the built-in spinner while an action is pending. No new markup or JS beyond the one-line handler.

{% demo() %}
```html
<form onsubmit="event.preventDefault(); const b = this.querySelector('button'); b.setAttribute('aria-busy', 'true'); b.disabled = true">
  <button type="submit" data-spinner="small">Save</button>
</form>
```
{% end %}

## Confirm-before-delete dialog

Reuse the native `<dialog>` `commandfor`/`command` pattern to confirm a destructive action before it runs. Zero JavaScript.

{% demo() %}
```html
<button data-variant="danger" class="outline" commandfor="confirm-delete" command="show-modal">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
  Delete
</button>

<dialog id="confirm-delete" closedby="any">
  <form method="dialog">
    <header>
      <h3>Delete item</h3>
      <p>This action cannot be undone.</p>
    </header>
    <footer>
      <button type="button" commandfor="confirm-delete" command="close" class="outline">Cancel</button>
      <button value="confirm" data-variant="danger">Delete</button>
    </footer>
  </form>
</dialog>
```
{% end %}
