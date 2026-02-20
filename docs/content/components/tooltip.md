+++
title = "Tooltip"
weight = 155
description = "Smooth tooltips using the native title attribute."
+++

Use the standard `title` attribute on any element to render a tooltip with smooth transition.

{% demo() %}
```html
<button title="Save your changes">Save</button>
<button title="Delete this item" data-variant="danger">Delete</button>
<a href="#" title="View your profile">Profile</a>
```
{% end %}

### Manual Initialisation

Every element with a `title` attribute will have its tooltip set up when the document is loaded. Manually inserted elements will need a call of `ot.tooltip(...elements)` to initialise them or they will only show the native browser tooltip:

```js
el.setAttribute('title', 'Tooltip content');
ot.tooltip(el);
document.body.appendChild(el);
```

`ot.tooltip` takes any number of arguments:

```js
ot.tooltip(el1, el2, el3);

// Or if you have an Array of elements
ot.tooltip(...elArray)

// Initialise all the elements with a 'title' attribute already in the document
ot.tooltip()
```
