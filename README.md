# Oat UI

> Semantic, minimal, zero dependencies. ~8KB CSS and JS.

Oat is an ultra-lightweight HTML + CSS, semantic UI component library with zero dependencies. No framework, build, or dev complexity. Just include the tiny CSS and JS files and you are good to go building decent looking web applications with most commonly needed components and elements.

Semantic tags and attributes are styled contextually out of the box without classes, forcing best practices, and reducing markup class pollution. A few dynamic components are WebComponents and use minimal JavaScript.

I wrote this to use in my own projects after getting sick of the ridiculous bloat, dependencies, and rug-pulls in Javascript UI/component libraries.

See live demo and docs at [**oat.ink**](https://oat.ink)

**IMPORTANT:** The lib is currently sub v1 and is likely to have breaking changes until it hits v1.

## Setup

### Prerequisites

- Node.js 20+
- make
- Zola (for docs preview)

### Install dependencies

~~~bash
npm install
npm install -g esbuild
~~~

### Build assets

~~~bash
make dist
~~~

### Run docs locally

From the repository root:

~~~bash
zola serve --root docs --interface 127.0.0.1 --port 1111
~~~

Then open http://127.0.0.1:1111

-------------

<img width="739" height="735" alt="image" src="https://github.com/user-attachments/assets/b0a2f55c-659d-4aab-922c-b13d89eeab36" />
