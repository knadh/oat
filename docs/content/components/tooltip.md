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

### Special Elements

The technique used to display these tooltips won't work on a few HTML elements, most notably `<img>`, so the native browser tooltip will be shown. To work around this issue, simply wrap those elements into another (e.g. `<div>` or `<span>`), and move the `title` attribute onto that parent element:

```html
<span title="A title for the image">
    <img src="...">
</span>
```

Other elements affected by this are `<input type="image">`, `<video>`, `<embed>`, `<iframe>`, `<fencedframe>`, `<audio>`, `<canvas>`, and `<object>`.
