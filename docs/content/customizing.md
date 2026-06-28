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

The following color variables from theme.css control the theme (colour profile). Override them to create your own theme.

```css
:root {

  /* Page background */
  --background: rgb(255 255 255);

  /* Primary text color */
  --foreground: rgb(9 9 11);

  /* Card background */
  --card: rgb(255 255 255);

  /* Card text color */
  --card-foreground: rgb(9 9 11);

  /* Primary buttons and links */
  --primary: rgb(87 71 71);

  /* Text color on primary buttons */
  --primary-foreground: rgb(250 250 250);

  /* Secondary button background */
  --secondary: rgb(244 244 245);

  /* Text colour on secondary buttons */
  --secondary-foreground: rgb(87 71 71);

  /* Muted (lighter) background */
  --muted: rgb(244 244 245);

  /* Muted (lighter) text colour */
  --muted-foreground: rgb(113 113 122);

  /* Subtler than muted background */
  --faint: rgb(250 250 250);

  /* Subtler than muted text color */
  --faint-foreground: rgb(161 161 170);

  /* Accent background */
  --accent: rgb(244 244 245);

  /* Error/danger color */
  --danger: rgb(211 47 47);

  /* Text color on danger background */
  --danger-foreground: rgb(250 250 250);

  /* Success color */
  --success: rgb(0 128 50);

  /* Text colour on success background */
  --success-foreground: rgb(250 250 250);

  /* Warning color */
  --warning: rgb(166 91 0);

  /* Text colour on warning background */
  --warning-foreground: rgb(9 9 11);

  /* Border color (boxes) */
  --border: rgb(212 212 216);

  /* Input borders */
  --input: rgb(212 212 216);

  /* Focus ring color */
  --ring: rgb(87 71 71);
}
```


After these, include CSS and JS files the respective components.

## Example themes

### Default Oat brown
```css
--background: #fff;
--foreground: #09090b;
--card: #fff;
--card-foreground: #09090b;
--primary: #574747;
--primary-foreground: #fafafa;
--secondary: #f4f4f5;
--secondary-foreground: #574747;
--muted: #f4f4f5;
--muted-foreground: #71717a;
--faint: #fafafa;
--faint-foreground: #a1a1aa;
--accent: #f4f4f5;
--danger: #d32f2f;
--danger-foreground: #fafafa;
--success: #008032;
--success-foreground: #fafafa;
--warning: #a65b00;
--warning-foreground: #09090b;
--border: #d4d4d8;
--input: #d4d4d8;
--ring: #574747;
```

---------------

## Dark mode

Dark mode is applied automatically via `light-dark()` and `color-scheme: light dark`, following the OS system preference. To customize the dark theme, redefine the theme variables scoped inside a `[data-theme="dark"]` selector in your own CSS, and set `data-theme="dark"` on `<body>` to activate it manually.
