+++
title = "Customizing"
description = "Customize and theme Oat by overriding CSS variables"
+++

Pretty much all properties of Oat are defined as CSS variables that can be overridden. See [theme.css](https://github.com/knadh/oat/blob/master/src/css/01-theme.css) to see all variables. To override, redefine them in a CSS file in your project and include it after the lib's CSS files.

## Picking and choosing

While it is quite okay to bundle all of Oat given how tiny it is, it is possible to include components selectively.

##### Must include
- `00-base.css`
- `01-theme.css`
- `base.js`
- `your files after this`

-------

## Theming

Oat has a handful of theme and colour variables. Override them in your own CSS to create your own theme. [See variables](https://github.com/knadh/oat/blob/master/src/css/01-theme.css). For example:

```css
:root {
  --primary: light-dark(#1d2b4f, #c7d3f0);
  --primary-foreground: light-dark(#fafafa, #18181b);
}
```

See the [demo](/demo) page to see custom themes in action.

---------------

## Dark mode

Dark mode is applied automatically via `light-dark()` and `color-scheme: light dark`, following the OS system preference. To customize the dark theme, redefine the theme variables scoped inside a `[data-theme="dark"]` selector in your own CSS. To forcibly set a theme, `document.body.style.colorScheme = 'dark|light'`.
