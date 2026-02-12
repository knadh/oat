+++
title = "Sidebar"
weight = 120
description = "Responsive admin dashboard layout with sticky sidebar, optional topnav, and collapsible sections."
+++

Use `data-sidebar-layout` on a container (typically `<body>`) with `<aside data-sidebar>` for the sidebar and `<main>` for content. The sidebar stays sticky while the main content scrolls. On mobile, the sidebar becomes a slide-out overlay toggled by a `[data-sidebar-toggle]` button.

<div class="sidebar-example">
{% demo() %}
```html
<div data-sidebar-layout>
  <aside data-sidebar>
    <nav>
      <ul>
        <li><a href="#" aria-current="page">Home</a></li>
        <li><a href="#">Users</a></li>
        <li>
          <details open>
            <summary>Settings</summary>
            <ul>
              <li><a href="#">General</a></li>
              <li><a href="#">Security</a></li>
              <li><a href="#">Billing</a></li>
            </ul>
          </details>
        </li>
      </ul>
    </nav>
    <footer>
      <button class="outline" class="sm" style="width: 100%;">Logout</button>
    </footer>
  </aside>
  <main>
    <p>Main content area. Scrolls with the page body.</p>
  </main>
</div>
```
{% end %}
</div>

### With top sticky nav

Add `data-topnav` to a header element for a full-width top navigation bar. The sidebar will adjust to sit below it.

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

| Attribute             | Element    |                                                          |
| --------------------- | ---------- | -------------------------------------------------------- |
| `data-sidebar-layout` | Container  | Grid layout wrapper (sidebar + main), typically `<body>` |
| `data-topnav`         | `<header>` | Full-width top nav (optional, spans full width)          |
| `data-sidebar`        | `<aside>`  | Sticky sidebar element                                   |
| `data-sidebar-toggle` | `<button>` | Toggles sidebar visibility on mobile                     |
| `data-sidebar-open`   | Layout     | Applied to layout when sidebar is open                   |
