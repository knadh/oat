+++
title = "Sidebar"
weight = 120
description = "Responsive admin dashboard layout with sticky sidebar, optional topnav, and collapsible sections."
+++

- Use `data-sidebar-layout` on a container (typically `<body>`) with `<aside data-sidebar>` for the sidebar and `<main>` for content. The sidebar stays sticky while the main content scrolls.
- On mobile, the sidebar becomes a slide-out overlay toggled by a `[data-sidebar-toggle]` button. To show the toggle and make it collapse the sidebar at all widths, set `data-sidebar-layout="always"`.
- Set the `--sidebar-width` variable to adjust its width globally.

<div class="sidebar-example">
{% demo() %}
```html
<div data-sidebar-layout>
  <aside data-sidebar>
    <nav>
      <ul>
        <li><a href="#sidebar" aria-current="page">Home</a></li>
        <li><a href="#sidebar">Users</a></li>
        <li>
          <details open>
            <summary>Settings</summary>
            <ul>
              <li><a href="#sidebar">General</a></li>
              <li><a href="#sidebar">Security</a></li>
              <li><a href="#sidebar">Billing</a></li>
            </ul>
          </details>
        </li>
      </ul>
    </nav>
    <footer>
      <button class="outline small" style="width: 100%;">Logout</button>
    </footer>
  </aside>
  <main>
    <div style="padding: var(--space-3)">Main content area. Scrolls with the page body.</div>
  </main>
</div>
```
{% end %}
</div>

### Always-collapsible

Set `data-sidebar-layout="always"` to keep the toggle visible and make it collapse the sidebar on all screen sizes.

```html
<body data-sidebar-layout="always">
  ...
</body>
```

### With top sticky nav

Add `data-topnav` to a nav element for a full-width top navigation bar. The sidebar will adjust to sit below it. Inspect the HTML source of this website for a live example.

```html
<body data-sidebar-layout>
  <nav data-topnav>
    <button data-sidebar-toggle aria-label="Toggle menu" class="outline">☰</button>
    <span>App Name</span>
  </nav>

  <aside data-sidebar>
    <header>Logo</header>
    <nav>...navigation...</nav>
    <footer>Actions</footer>
  </aside>

  <main>
    Main page content.
  </main>
</body>
```

#### Structure

| Attribute                      | Element    |                                                                                |
| ------------------------------ | ---------- | ------------------------------------------------------------------------------ |
| `data-sidebar-layout`          | Container  | Grid layout wrapper (sidebar + main), typically `<body>`                       |
| `data-sidebar-layout="always"` | Container  | Always-collapsible sidebar (toggle visible and functional on all screen sizes) |
| `data-topnav`                  | `<nav>`    | Full-width top nav (optional, spans full width)                                |
| `data-sidebar`                 | `<aside>`  | Sticky sidebar element                                                         |
| `data-sidebar-toggle`          | `<button>` | Toggles sidebar (mobile) and collapse (always mode)                            |
| `data-sidebar-open`            | Layout     | Applied to layout when sidebar is open                                         |
