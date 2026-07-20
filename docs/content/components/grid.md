+++
title = "Grid"
weight = 170
description = "12-column responsive grid using container queries and CSS grid."
+++

A 12-column grid system using CSS grid. Use `.container`, `.row`, and `.col` classes. Column widths use `.col-{n}` where n is 1-12.

{% demo() %}
```html
<div class="container demo-grid">
  <div class="row">
    <div class="col-4">col-4</div>
    <div class="col-4">col-4</div>
    <div class="col-4">col-4</div>
  </div>
  <div class="row">
    <div class="col-6">col-6</div>
    <div class="col-6">col-6</div>
  </div>
  <div class="row">
    <div class="col-3">col-3</div>
    <div class="col-6">col-6</div>
    <div class="col-3">col-3</div>
  </div>
  <div class="row">
    <div class="col-4 offset-2">col-4 offset-2</div>
    <div class="col-4">col-4</div>
  </div>
  <div class="row">
    <div class="col-8">col-8</div>
    <div class="col-3 offset-1">col-3 offset-1</div>
  </div>
  <div class="row">
    <div class="col-3">col-3</div>
    <div class="col-4 col-end">col-4 col-end</div>
  </div>
</div>
```
{% end %}
