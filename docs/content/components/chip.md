+++
title = "Chip Input"
weight = 90
description = "Tag/chip input for adding and removing items. Keyboard accessible."

[extra]
webcomponent = true
+++

Wrap in `<ot-chip-input>` with a `.chip-input` container and an `<input>`.

{% demo() %}
```html
<ot-chip-input data-chips="JavaScript,CSS,HTML">
  <div class="chip-input">
    <input type="text" placeholder="Add tag...">
  </div>
</ot-chip-input>
```
{% end %}

## With Label

```html
<label>
  Tags
  <ot-chip-input data-chips="React,Vue">
    <div class="chip-input">
      <input type="text" placeholder="Add tag...">
    </div>
  </ot-chip-input>
</label>
```

## Features

- Press Enter to add tags
- Click × to remove tags
- Press Backspace on empty input to remove last tag
- Prevents duplicate tags
- Emits `change` event

## Attributes

| Attribute | Element | Description |
|-----------|---------|-------------|
| `data-chips` | `<ot-chip-input>` | Comma-separated initial tags |
| `class="chip-input"` | `<div>` | Container styling |

## Events

```js
document.querySelector('ot-chip-input').addEventListener('change', (e) => {
  console.log('Tags:', e.detail.chips);
});
```

## API

```js
const chipInput = document.querySelector('ot-chip-input');

// Get current tags
console.log(chipInput.value); // ['JavaScript', 'CSS', 'HTML']

// Set tags programmatically
chipInput.value = ['React', 'Vue', 'Angular'];
```
