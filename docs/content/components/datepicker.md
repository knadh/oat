+++
title = "Datepicker"
weight = 85
description = "Calendar date picker using the native popover API. Minimal and semantic."

[extra]
webcomponent = true
+++

Wrap in `<ot-datepicker>`. Use a hidden button with `popovertarget` to trigger the popover, and a `<div popover>` with class `datepicker` for the calendar.

{% demo() %}
```html
<ot-datepicker>
  <label>
    Select Date
    <input type="text" readonly placeholder="YYYY-MM-DD">
  </label>
  <button type="button" popovertarget="demo-picker" style="display: none;"></button>
  <div popover id="demo-picker" class="datepicker"></div>
</ot-datepicker>
```
{% end %}

## Features

- Native popover API for positioning
- Keyboard accessible
- Month and year navigation with infinite scrolling
- Today indicator and quick select
- Selected date highlighting
- Mouse wheel support for month navigation
- Default date via `value` or `data-value` attribute
- Emits `change` event with selected date
- Local timezone (no UTC conversion issues)

## Default Date

Set a default date using the `value` attribute or `data-value` attribute:

```html
<ot-datepicker>
  <label>
    Birthday
    <input type="text" readonly value="2000-01-15">
  </label>
  <button type="button" popovertarget="picker-id" style="display: none;"></button>
  <div popover id="picker-id" class="datepicker"></div>
</ot-datepicker>
```

## Events

The component emits a `change` event when a date is selected:

```js
document.querySelector('ot-datepicker').addEventListener('change', (e) => {
  console.log('Selected date:', e.detail.date);
  console.log('Formatted:', e.detail.date.toLocaleDateString());
});
```
