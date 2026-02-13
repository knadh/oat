+++
title = "Stepper"
weight = 100
description = "Multi-step progress indicator for forms and wizards. Pure CSS, no JS required."
+++

Use `<ol class="stepper">` with list items. Mark current step with `aria-current="step"` and completed steps with `data-completed`.

{% demo() %}
```html
<ol class="stepper">
  <li class="step" data-completed>
    <span class="step-icon">1</span>
    <span class="step-label">Account</span>
  </li>
  <li class="step" aria-current="step">
    <span class="step-icon">2</span>
    <span class="step-label">Profile</span>
  </li>
  <li class="step">
    <span class="step-icon">3</span>
    <span class="step-label">Confirm</span>
  </li>
</ol>
```
{% end %}

## With Icons

{% demo() %}
```html
<ol class="stepper">
  <li class="step" data-completed>
    <span class="step-icon">✓</span>
    <span class="step-label">Shipping</span>
  </li>
  <li class="step" aria-current="step">
    <span class="step-icon">💳</span>
    <span class="step-label">Payment</span>
  </li>
  <li class="step">
    <span class="step-icon">📦</span>
    <span class="step-label">Review</span>
  </li>
</ol>
```
{% end %}

## More Steps

{% demo() %}
```html
<ol class="stepper">
  <li class="step" data-completed>
    <span class="step-icon">1</span>
    <span class="step-label">Personal Information</span>
  </li>
  <li class="step" data-completed>
    <span class="step-icon">2</span>
    <span class="step-label">Contact Details</span>
  </li>
  <li class="step" aria-current="step">
    <span class="step-icon">3</span>
    <span class="step-label">Review</span>
  </li>
  <li class="step">
    <span class="step-icon">4</span>
    <span class="step-label">Payment Method</span>
  </li>
  <li class="step">
    <span class="step-icon">5</span>
    <span class="step-label">Confirmation</span>
  </li>
</ol>
```
{% end %}

## Attributes

| Attribute | Description |
|-----------|-------------|
| `aria-current="step"` | Marks the current active step |
| `data-completed` | Marks a step as completed |
