+++
title = "Date picker"
weight = 95
description = "Progressive date and datetime picker for native form inputs."

[extra]
webcomponent = true
+++

Wrap a native date input in `<ot-datepicker>`. On supported browsers, the native picker is preserved. On unsupported browsers, Oat adds a lightweight custom calendar fallback.

{% demo() %}
```html
<form>
  <label data-field>
    Date
    <ot-datepicker>
      <input type="date" name="date" min="2020-01-01" max="2030-12-31">
    </ot-datepicker>
  </label>

  <label data-field>
    Date and time
    <ot-datepicker>
      <input type="datetime-local" name="dt">
    </ot-datepicker>
  </label>
</form>
```
{% end %}

### Force custom picker UI

Add `force` to always use Oat's custom picker even on browsers with native support.

{% demo() %}
```html
<ot-datepicker force>
  <input type="date" value="2026-02-15">
</ot-datepicker>
```
{% end %}

### Disabled dates

Use `data-disabled-dates` on the input (or `disabled-dates` on the component) with comma-separated `YYYY-MM-DD` values.

```html
<ot-datepicker>
  <input type="date" data-disabled-dates="2026-02-20,2026-02-21,2026-02-22">
</ot-datepicker>
```

### Attributes

| Attribute | Target | Description |
| --- | --- | --- |
| `force` | `<ot-datepicker>` | Always enable custom picker UI |
| `year-start` | `<ot-datepicker>` | Start year for year dropdown |
| `year-end` | `<ot-datepicker>` | End year for year dropdown |
| `disabled-dates` | `<ot-datepicker>` | Comma-separated disabled dates (`YYYY-MM-DD`) |
| `data-disabled-dates` | `<input>` | Same as above, input-scoped |
| `min`, `max` | `<input>` | Disable dates outside range |
| `step` | `<input type="datetime-local">` | Time step for datetime mode |
