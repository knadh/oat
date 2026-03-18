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
    <button role="menuitem">Save draft</button>
    <button role="menuitem">Save and publish</button>
    <button role="menuitem">Duplicate</button>
  </menu>
</ot-dropdown>
```
{% end %}

## Radio cards
Use `input[type="radio"]` and `label` to create selectable cards.

{% demo() %}
```html
  <div class="container">
 
      <header>
        <h3>Billing</h3>
        <p class="text-light">Select a billing cycle</p>
      </header>
 
      <div class="radio-card-group mt-4">
 
        <label class="radio-card">
          <div class="hstack justify-between">
            <strong>Monthly</strong>
            <input type="radio" name="billing" checked>
          </div>
          <p class="text-light mt-2">$12 / mo</p>
        </label>
 
        <label class="radio-card">
          <div class="hstack justify-between">
            <strong>Yearly</strong>
            <input type="radio" name="billing">
          </div>
          <p class="text-light mt-2">$96 / yr · save 33%</p>
        </label>
 
        <label class="radio-card">
          <div class="hstack justify-between">
            <strong>Lifetime</strong>
            <input type="radio" name="billing">
          </div>
          <p class="text-light mt-2">$299 once</p>
        </label>
 
      </div>
 
  </div>
 
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
        <span class="badge success">+12%</span>
      </header>
      <h2>$42,200</h2>
      <p class="text-light">vs last month</p>
      <progress value="72" max="100"></progress>
    </article>

    <article class="card col-4">
      <header class="hstack justify-between items-center">
        <h4>Completion</h4>
        <span class="badge warning">-2%</span>
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
