+++
title = "Datepicker"
weight = 95
description = "Calendar date selector with keyboard navigation, min/max limits, and form-friendly ISO values."

[extra]
webcomponent = true
+++

Wrap an input in `<ot-datepicker>`. Provide an optional ISO date (`YYYY-MM-DD`) in `value`, and optional `min` and `max`.

If the input has a `name`, Oat keeps submission form-friendly by storing ISO in an auto-created hidden input while showing a formatted display value. A calendar SVG icon is added inside the field by default.

{% demo() %}
```html
<ot-datepicker>
  <input type="text" name="start_date" value="2025-06-01" placeholder="Pick a date" />
</ot-datepicker>
```
{% end %}

### JavaScript API

```js
const picker = document.querySelector('ot-datepicker');

picker.setDate('2025-06-20');        // true
picker.fetchDate();                  // Date instance
picker.fetchISODate();               // "2025-06-20"
picker.fetchDisplayDate();           // Locale-formatted value shown in input
picker.setMinDate('2025-06-01');     // set lower bound
picker.setMaxDate('2025-06-30');     // set upper bound
picker.clearDate();                  // clears current value
picker.open();                       // opens calendar popover
picker.close();                      // closes calendar popover
```

`setDate(value, options)` accepts `Date` or date string input.

- `value`: `Date`, `YYYY-MM-DD`, any valid `Date`-parseable string, or `null`/empty (to clear).
- `options.emit`: Emit `ot-date-change` (default: `true`).
- `options.clamp`: Clamp to `min`/`max` instead of failing out-of-range values (default: `true`).

### Date range constraints

Use `min` and `max` to constrain available dates.

{% demo() %}
```html
<ot-datepicker>
  <input
    type="text"
    name="billing_date"
    value="2025-06-15"
    min="2025-06-10"
    max="2025-06-25"
    placeholder="Pick billing date"
  />
</ot-datepicker>
```
{% end %}

### From-To packed date range

Use `<ot-date-range>` to pack two datepickers as a linked from/to pair.

{% demo() %}
```html
<ot-date-range>
  <ot-datepicker data-range-start>
    <input type="text" name="from_date" placeholder="From date" />
  </ot-datepicker>
  <ot-datepicker data-range-end>
    <input type="text" name="to_date" placeholder="To date" />
  </ot-datepicker>
</ot-date-range>
```
{% end %}

When the start date changes, end date minimum is updated automatically.
When the end date changes, start date maximum is updated automatically.

### Date range JavaScript API

```js
const range = document.querySelector('ot-date-range');

range.setRange('2025-06-10', '2025-06-20');
range.setFromDate('2025-06-12');
range.setToDate('2025-06-26');
range.fetchRange(); // { from, to, fromDate, toDate }
range.clearRange();
```

### Event

On selection (or when changed via JS API with `emit: true`), the component emits `ot-date-change` with `{ value, date }`.

```js
document.querySelector('ot-datepicker').addEventListener('ot-date-change', (e) => {
  console.log(e.detail.value); // "2025-06-01"
});
```

`<ot-date-range>` emits `ot-date-range-change` with `{ from, to, fromDate, toDate }`.
