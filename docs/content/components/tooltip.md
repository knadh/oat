+++
title = "Tooltip"
weight = 155
description = "Smooth tooltips using the native title attribute."
+++

Use the standard `title` attribute on any element to render a tooltip with smooth transition. [Replaced elements](https://developer.mozilla.org/en-US/docs/Glossary/Replaced_elements) like `<img>`, `<iframe>` etc. need to be wrapped in a parent with the `title` attribute. Add `data-tooltip-placement` to position the tooltip. Default is `top`.

{% demo() %}
```html
<button title="Save your changes">Save</button>
<button title="Delete this item" data-variant="danger">Delete</button>
<a href="#" title="View your profile">Profile</a>
<span title="Images need a parent with title"><img src="https://oat.ink/logo.svg" height="32" /></span>

<button title="On top">Top</button>
<button title="Below" data-tooltip-placement="bottom">Bottom</button>
<button title="On the left" data-tooltip-placement="left">Left</button>
<button title="On the right" data-tooltip-placement="right">Right</button>
```
{% end %}
