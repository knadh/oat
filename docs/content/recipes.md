+++
title = "Recipes"
description = "Practical patterns built with Oat primitives."
+++

Small, composable patterns built from semantic HTML + Oat styles.

## Grouped accordion (single-open)

Use native `<details>` elements with the same `name` to make a group where opening one closes the others.

{% demo() %}
```html
<div>
  <h4>FAQ</h4>

  <details name="faq">
    <summary>What is Oat?</summary>
    <p>Oat is a tiny semantic CSS + WebComponents UI library.</p>
  </details>

  <details name="faq">
    <summary>Does this need JavaScript?</summary>
    <p>No. The single-open behavior comes from native HTML details grouping.</p>
  </details>

  <details name="faq">
    <summary>Can I keep multiple open?</summary>
    <p>Yes. Remove the shared <code>name</code> attribute.</p>
  </details>
</div>
```
{% end %}

### Notes

- This is progressive enhancement friendly and works without custom JS.
- Keep summary text short and descriptive for accessibility.

## Slider patterns (without a custom component)

Use native `<input type="range">` for performance and accessibility.

### Simple range slider

{% demo() %}
```html
<div class="row" style="gap: 1.5rem;">
  <div class="col-6">
    <label for="volume">Volume</label>
    <input id="volume" type="range" min="0" max="100" step="5" value="40" />
  </div>

  <div class="col-6">
    <label for="brightness">Brightness (disabled)</label>
    <input id="brightness" type="range" min="0" max="10" step="1" value="6" disabled />
  </div>

  <div class="col-6">
    <label for="vertical-slider">Vertical</label>
    <div style="height: 140px; display: flex; align-items: center;">
      <input
        id="vertical-slider"
        type="range"
        min="0"
        max="100"
        value="60"
        style="transform: rotate(-90deg); width: 140px;"
      />
    </div>
  </div>
</div>
```
{% end %}


### Range (min-max), multiple slider range

{% demo() %}
```html
<div style="max-width: 28rem;">
  <strong id="price-range-value">$20 - $80</strong>

  <label for="price-min">Minimum</label>
  <input
    id="price-min"
    type="range"
    min="0"
    max="100"
    step="1"
    value="20"
    oninput="const min=this;const max=document.getElementById('price-max');if(+min.value>+max.value){min.value=max.value;}document.getElementById('price-range-value').textContent='$'+min.value+' - $'+max.value;"
  />

  <label for="price-max" style="margin-top: 0.75rem;">Maximum</label>
  <input
    id="price-max"
    type="range"
    min="0"
    max="100"
    step="1"
    value="80"
    oninput="const max=this;const min=document.getElementById('price-min');if(+max.value<+min.value){max.value=min.value;}document.getElementById('price-range-value').textContent='$'+min.value+' - $'+max.value;"
  />
</div>
```
{% end %}

### Range (min-max), multiple thumbs single slider

{% demo() %}
```html
<div class="dual-range" data-min="0" data-max="100" style="width: 100%; margin: 2rem 0;">
  <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-weight: var(--font-bold);">
    <span id="range-val-min">$20</span>
    <span id="range-val-max">$80</span>
  </div>

  <div style="position: relative; height: 1.25rem;">
    <div style="position: absolute; left: 0; right: 0; top: 50%; transform: translateY(-50%); height: 0.45rem; background: var(--muted); border-radius: 999px;"></div>
    <div id="range-progress" style="position: absolute; left: 20%; right: 20%; top: 50%; transform: translateY(-50%); height: 0.45rem; background: var(--primary); border-radius: 999px; z-index: 1;"></div>

    <input type="range" id="input-min" min="0" max="100" value="20" step="1" 
      style="position: absolute; width: 100%; pointer-events: none; appearance: none; background: transparent; z-index: 2; margin: 0; top: 50%; transform: translateY(-50%); height: 100%;"
      oninput="const min=this; const max=document.getElementById('input-max'); const vMin=parseInt(min.value); const vMax=parseInt(max.value); if(vMin > vMax - 5){ min.value=vMax-5; return; } document.getElementById('range-progress').style.left=(min.value)+'%'; document.getElementById('range-val-min').textContent='$'+min.value;">
    
    <input type="range" id="input-max" min="0" max="100" value="80" step="1" 
      style="position: absolute; width: 100%; pointer-events: none; appearance: none; background: transparent; z-index: 2; margin: 0; top: 50%; transform: translateY(-50%); height: 100%;"
      oninput="const max=this; const min=document.getElementById('input-min'); const vMin=parseInt(min.value); const vMax=parseInt(max.value); if(vMax < vMin + 5){ max.value=vMin+5; return; } document.getElementById('range-progress').style.right=(100-max.value)+'%'; document.getElementById('range-val-max').textContent='$'+max.value;">
  </div>

  <style>
    .dual-range input[type=range]::-webkit-slider-thumb {
      pointer-events: auto;
      -webkit-appearance: none;
      width: 1.25rem;
      height: 1.25rem;
      background: var(--primary);
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 0 0 2px var(--background);
      transition: transform var(--transition-fast);
    }
    .dual-range input[type=range]::-webkit-slider-thumb:hover {
      transform: scale(1.1);
    }
    .dual-range input[type=range]::-moz-range-thumb {
      pointer-events: auto;
      width: 1.25rem;
      height: 1.25rem;
      background: var(--primary);
      border: none;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 0 0 2px var(--background);
      transition: transform var(--transition-fast);
    }
    .dual-range input[type=range]::-moz-range-thumb:hover {
      transform: scale(1.1);
    }
    .dual-range input[type=range]:focus::-webkit-slider-thumb {
        border: 1px solid var(--ring);
    }
  </style>
</div>
```
{% end %}

### Notes

- Standard `<input type="range" />` attributes like `min`, `max`, `step`, and `disabled` are fully supported.
- Vertical sliders created using a CSS `rotate()` transform.
- Multi-thumb sliders achieved by stacking two range inputs, providing a lightweight alternative to complex custom libraries.
