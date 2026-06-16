+++
title = "Form elements"
weight = 90
description = "Inputs, selects, textareas, checkboxes, radios, and fieldsets"
+++

Form elements are styled automatically. Wrap inputs in `<label>` for proper association.

{% demo() %}
```html
<form>
  <label data-field>
    Name
    <input type="text" placeholder="Enter your name" />
  </label>

  <label data-field>
    Email
    <input type="email" placeholder="you@example.com" />
  </label>

  <label data-field>
    Password
    <input type="password" placeholder="Password" aria-describedby="password-hint" />
    <small id="password-hint" data-hint>This is a small hint</small>
  </label>

  <div data-field>
    <label>Select</label>
    <select aria-label="Select an option">
      <option value="">Select an option</option>
      <option value="a">Option A</option>
      <option value="b">Option B</option>
      <option value="c">Option C</option>
      <option value="d">Option D</option>
      <option value="e">Option E</option>
      <option value="f">Option F</option>
    </select>
  </div>

  <label data-field>
    Message
    <textarea placeholder="Your message..."></textarea>
  </label>

  <label data-field>
    Disabled
    <input type="text" placeholder="Disabled" disabled />
  </label>

  <label data-field>
    File<br />
    <input type="file" placeholder="Pick a file..." />
  </label>

  <label data-field>
    Date and time
    <input type="datetime-local" />
  </label>

  <label data-field>
    Date
    <input type="date" />
  </label>

  <label data-field>
    <input type="checkbox" /> I agree to the terms
    <span data-hint>This is a hint</span>
  </label>

  <fieldset class="hstack">
    <legend>Preference</legend>
    <label><input type="radio" name="pref">Option A</label>
    <label><input type="radio" name="pref">Option B</label>
    <label><input type="radio" name="pref">Option C</label>
  </fieldset>

  <label data-field>
    Volume
    <input type="range" min="0" max="100" value="50" />
    <span data-hint>This is a hint</span>
  </label>

  <label data-field>
    State
    <input type="checkbox" role="switch" />
    <span data-hint>This is a hint</span>
  </label>

  <button type="submit">Submit</button>
</form>
```
{% end %}


### Input group

Use `.group` on a `<fieldset>` to combine inputs with buttons or labels.

{% demo() %}
```html
<fieldset class="group">
  <legend>https://</legend>
  <input type="url" placeholder="subdomain">
  <select aria-label="Select a subdomain">
    <option value="" disabled selected>Select</option>
    <option>.example.com</option>
    <option>.example.net</option>
  </select>
  <button>Go</button>
</fieldset>

<fieldset class="group">
  <input type="text" placeholder="Search" />
  <button>Go</button>
</fieldset>
```
{% end %}

### Validation error

Error messages are shown when an input is invalid. Use either:
- HTML5 validation (the browser detects `:user-invalid` after user interaction)
- `aria-invalid="true"` for custom validation logic

**HTML5 validation**
{% demo() %}
```html
<div data-field>
  <label for="email-error-input">Email</label>
  <input type="email" aria-describedby="email-error-message" id="email-error-input" placeholder="try an invalid email here"  />
  <div id="email-error-message" class="error" role="status">Please enter a valid email address.</div>
</div>
```
{% end %}

**Custom validation with JavaScript:**

Toggle the `aria-invalid="true"` attribute on the input using JavaScript to show or hide the error message
{% demo() %}
```html

<label data-field>
  New Password
  <input type="password" aria-invalid="true" id="new-password" aria-describedby="new-password-error" placeholder="Enter new password" value="asdfasdf"/>
  <div id="new-password-error" class="error" role="status">New password cannot be the same as old password.</div>
</label>
```
{% end %}

Both approaches work seamlessly together:
