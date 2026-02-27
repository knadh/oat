+++
title = "Pagination"
weight = 105
description = "Pagination nav bars."
+++

Pagination does not use any special markup or classes and re-uses the exiting buttons `<menu>`.

{% demo() %}
```html
<nav aria-label="Pagination">
    <menu class="buttons">
        <li><a href="#pagination" class="button outline small">&larr; Previous</a></li>
        <li><a href="#pagination" class="button outline small">1</a></li>
        <li><a href="#pagination" class="button outline small">2</a></li>
        <li><a href="#pagination" class="button small" aria-current="page">3</a></li>
        <li><a href="#pagination" class="button outline small">4</a></li>
        <li><a href="#pagination" class="button outline small">5</a></li>
        <li><a href="#pagination" class="button outline small">Next &rarr;</a></li>
    </menu>
</nav>
```
{% end %}
