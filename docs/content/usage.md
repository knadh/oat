+++
title = "Installation and usage"
+++

### CDN

Include the CSS and JS files directly in your HTML:

```html
<link rel="stylesheet" href="https://unpkg.com/@knadh/oat/oat.min.css">
<script src="https://unpkg.com/@knadh/oat/oat.min.js" defer></script>
```

----------

### npm

```bash
npm install @knadh/oat
```

Then import in your project:

```js
import '@knadh/oat/oat.min.css';
import '@knadh/oat/oat.min.js';
```

Or import individual files from `@knadh/oat/css` and `@knadh/oat/js`.

----------

### Download

Download the CSS and JS files:

```shell
wget https://raw.githubusercontent.com/knadh/oat/refs/heads/gh-pages/oat.min.css
wget https://raw.githubusercontent.com/knadh/oat/refs/heads/gh-pages/oat.min.js
```

Then include them in your project:

```html
<link rel="stylesheet" href="./oat.min.css">
<script src="./oat.min.js" defer></script>
```

## Basic usage

Oat styles semantic HTML elements by default. No classes needed for basic styling:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My App</title>
  <link rel="stylesheet" href="oat.css">
  <script src="oat.js" defer></script>
</head>
<body>
  <h1>Hello World</h1>
  <p>This paragraph is styled automatically.</p>
  <button>Click me</button>
</body>
</html>
```
