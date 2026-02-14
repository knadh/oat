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
    <label>Country</label>
    <select>
      <option value="">Select a country</option>
      <option value="us">United States</option>
      <option value="uk">United Kingdom</option>
      <option value="ca">Canada</option>
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
  </label>

  <fieldset class="hstack">
    <legend>Preference</legend>
    <label><input type="radio" name="pref">OptionA</label>
    <label><input type="radio" name="pref">Option B</label>
    <label><input type="radio" name="pref">Option C</label>
  </fieldset>

  <label data-field>
    Volume
    <input type="range" min="0" max="100" value="50" />
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
  <input type="url" placeholder="Subdomain">
  <select placeholder="Select">
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

Use `data-field="error"` on field containers to reveal and style error messages.

{% demo() %}
```html
<div data-field="error">
  <label for="error-input">Email</label>
  <input type="email" aria-invalid="true" aria-errormessage="error-input"
    id="error-input" value="invalid-email" />
  <div id="error-message" class="error" role="status">Please enter a valid email address.</div>
</div>
```
{% end %}
