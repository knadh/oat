+++
title = "Carousel"
weight = 90
description = "Horizontal content carousel with keyboard navigation, optional autoplay, and dot controls."

[extra]
webcomponent = true
+++

Wrap slides in `<ot-carousel>` with a `[data-carousel-track]` container.

{% demo() %}
```html
<ot-carousel style="max-width: 34rem;">
  <div data-carousel-track>
    <article data-carousel-slide style="padding: var(--space-8); background: var(--muted);">
      <h4>Slide one</h4>
      <p>Semantic HTML and tiny CSS/JS footprint.</p>
    </article>
    <article data-carousel-slide style="padding: var(--space-8); background: var(--faint);">
      <h4>Slide two</h4>
      <p>Keyboard support with Arrow keys, Home, and End.</p>
    </article>
    <article data-carousel-slide style="padding: var(--space-8); background: var(--accent);">
      <h4>Slide three</h4>
      <p>Works with custom content and custom controls.</p>
    </article>
  </div>
</ot-carousel>
```
{% end %}

Carousel supports arrow keys, swipe, and mouse wheel scroll to change slides.

### Autoplay

Set `autoplay` in milliseconds to auto-advance slides. Autoplay pauses on hover/focus and respects reduced motion preferences.

{% demo() %}
```html
<ot-carousel autoplay="2500" style="max-width: 34rem;">
  <div data-carousel-track>
    <article data-carousel-slide style="padding: var(--space-8); background: var(--muted);">
      <h4>Fast to build</h4>
      <p>No external dependencies.</p>
    </article>
    <article data-carousel-slide style="padding: var(--space-8); background: var(--faint);">
      <h4>Small bundles</h4>
      <p>Carousel logic stays lightweight.</p>
    </article>
    <article data-carousel-slide style="padding: var(--space-8); background: var(--accent);">
      <h4>Accessible defaults</h4>
      <p>Buttons and dot navigation are automatic.</p>
    </article>
  </div>
</ot-carousel>
```
{% end %}

### JavaScript API

```js
const carousel = document.querySelector('ot-carousel');

carousel.next();
carousel.prev();
carousel.goTo(2);      // zero-based index
carousel.activeIndex;  // current index
```

### Event

On slide change, the component emits `ot-carousel-change` with `{ index, slide }`.

```js
document.querySelector('ot-carousel').addEventListener('ot-carousel-change', (e) => {
  console.log(e.detail.index); // 0, 1, 2...
});
```
