+++
title = "TagInput"
weight = 85
description = "Type words and press Enter or comma to turn them into a tags collection. Supports autocomplete."

[extra]
webcomponent = true
+++

Use `<ot-taginput>`. Type a word and press <kbd>Enter</kbd> or <kbd>,</kbd> (comma) to add.

{% demo() %}
```html
<ot-taginput value="apple, mango">
  <input placeholder="Add tags ..." maxlength="15" />
</ot-taginput>
```
{% end %}

### Autocomplete

Give the `<input>` a `list` and a `<datalist>`, then populate the datalist from the input's native `oninput` and `onfocus` handler. Selecting a suggestion creates a tag.

A suggestion item can be a plain string or an object. Attach the object to its `<option>` via `option.data`.

{% demo() %}
```html
<ot-taginput id="taginput-demo">
  <input list="fruit-list" placeholder="Type a fruit name" oninput="tagInputAutoComplete(this)">
  <datalist id="fruit-list"></datalist>
</ot-taginput>
```
{% end %}


```html
<script>
class Fruit {
  constructor(id, name) { this.id = id; this.name = name; }
  toString() { return this.name; }   // Display text
}

function tagInputAutoComplete(el) {
  // A mix of plain strings and objects.
  const fruits = [
    'Apple',
    'Apricot',
    new Fruit(1, 'Banana'),
    new Fruit(2, 'Cherry'),
    'Mango',
    'Melon',
  ];
  el.list.replaceChildren(...fruits
    .filter(f => String(f).toLowerCase().startsWith(el.value.toLowerCase()))
    .map(f => {
      const o = new Option(f);
      o.data = f;
      return o;
    }));
}
</script>
```

### Programmatic read and write

Mutate the `value` property of the component. A standard `input` event is dispatched (and bubbles) whenever a tag is added or removed.

```html
<ot-taginput id="tags"><input /></ot-taginput>

<script>
  const el = document.getElementById('tags');
  el.value = ['apple', 'mango'];     // replace all
  el.value = [...el.value, 'kiwi'];  // append
  el.value = [];                     // clear

  console.log(el.value);             // read

  el.addEventListener('input', e => {
    console.log(e.detail); // ['apple', 'mango'] <-- current tags
  });
</script>
```

### Options

| Property      | Description                                                                     |
| ------------- | ------------------------------------------------------------------------------- |
| `<input>`     | Child input field where the user types                                          |
| `value`       | Comma-separated list of initial tags.                                           |
| `.value`      | Array of tags (strings or objects). Setting this does not emit `input`.         |
| `option.data` | Optional object attached to a `<datalist>` `<option>`. |
| `input` event | Dispatched (bubbles) on add/remove. `detail` is the current tag array.          |
