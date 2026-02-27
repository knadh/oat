+++
title = "Alert"
weight = 30
description = "Alert messages using role=\"alert\"."
+++

Use `role="alert"` for alert styling. Set `data-variant` for success, warning, or error.

{% demo() %}
```html
<div role="alert" data-variant="success">
  <strong>Success!</strong> Your changes have been saved.
</div>

<div role="alert" data-variant="warning">
  <strong>Warning!</strong> Please review before continuing.
</div>

<div role="alert">
  <strong>Info</strong> This is a default alert message.
</div>

<div role="alert" data-variant="error">
  <strong>Error!</strong> Something went wrong.
</div>
```
{% end %}
