+++
title = "Table"
weight = 140
description = "Data tables with thead, tbody. Styled automatically."
+++

Tables are styled by default. Use `<thead>` and `<tbody>` tags. Wrap in a `class="table"` container to get a horizontal scrollbar on small screens.

{% demo() %}
```html
<div class="table">
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>root@localhost</td>
        <td>root@example.com</td>
        <td>Admin</td>
        <td><span class="badge" data-variant="success">Active</span></td>
      </tr>
      <tr>
        <td>Byte Bandit</td>
        <td>byte@example.com</td>
        <td>Editor</td>
        <td><span class="badge">Active</span></td>
      </tr>
      <tr>
        <td>Null Pointer</td>
        <td>null@example.com</td>
        <td>Viewer</td>
        <td><span class="badge" data-variant="secondary">Pending</span></td>
      </tr>
      <tr>
        <td>Bit Stream</td>
        <td>bit@example.com</td>
        <td>Editor</td>
        <td><span class="badge">Active</span></td>
      </tr>
      <tr>
        <td>code@localhost</td>
        <td>code@example.com</td>
        <td>Admin</td>
        <td><span class="badge" data-variant="success">Active</span></td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Status</th>
      </tr>
    </tfoot>
  </table>
</div>
```
{% end %}
