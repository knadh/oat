+++
title = "Customizing"
description = "Customize and theme Oat by overriding CSS variables"
+++

Pretty much all properties of Oat are defined as CSS variables that can be overridden. See [theme.css](https://github.com/knadh/oat/blob/master/src/css/01-theme.css) to see all variables. To override, redefine them in a CSS file in your project and include it after the lib's CSS files.

## Picking and choosing

While it is quite okay to bundle all of Oat given how tiny it is (CSS %KB, JS %KB), it is possible to include components selectively.

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
  --primary: rgb(24 24 27);

  /* Text color on primary buttons */
  --primary-foreground: rgb(250 250 250);

  /* Secondary button background */
  --secondary: rgb(244 244 245);

  /* Text colour on secondary buttons */
  --secondary-foreground: rgb(24 24 27);

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

  /* Accent text color */
  --accent-foreground: rgb(24 24 27);

  /* Error/danger color */
  --danger: rgb(223 81 76);

  /* Text color on danger background */
  --danger-foreground: rgb(250 250 250);

  /* Success color */
  --success: rgb(76 175 80);

  /* Text colour on success background */
  --success-foreground: rgb(250 250 250);

  /* Warning color */
  --warning: rgb(255 140 0);

  /* Text colour on warning background */
  --warning-foreground: rgb(9 9 11);

  /* Border color (boxes) */
  --border: rgb(212 212 216);

  /* Input borders */
  --input: rgb(212 212 216);

  /* Focus ring color */
  --ring: rgb(24 24 27);
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
--accent: #f4f4f5;
--danger: #df514c;
--danger-foreground: #fafafa;
--success: #4caf50;
--success-foreground: #fafafa;
--warning: #ff8c00;
--warning-foreground: #09090b;
--border: #d4d4d8;
--input: #d4d4d8;
--ring: #574747;
```

---------------

## Dark mode

Adding `data-theme="dark"` to `<body>` applies the dark theme. Customize the dark theme by redefining the aforementioned theme variables and scoping them inside `[data-theme="dark"] { ... }`
