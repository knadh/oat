+++
title = "Meter"
weight = 100
description = "Measurements using the semantic <meter> element."
+++

Use `<meter>` for values within a known range. Browser shows colors based on low/high/optimum attributes.

{% <demo> %}
```html
<meter value="0.8" min="0" max="1" low="0.3" high="0.7" optimum="1"></meter>
<meter value="0.5" min="0" max="1" low="0.3" high="0.7" optimum="1"></meter>
<meter value="0.2" min="0" max="1" low="0.3" high="0.7" optimum="1"></meter>
```
{% </demo> %}
