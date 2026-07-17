+++
title = "Tabs"
weight = 150
description = "Tabbed interface using a custom WebComponent and semantic behaviour."

[extra]
webcomponent = true
+++

Wrap tab buttons and panels in `<ot-tabs>`. Use `role="tablist"`, `role="tab"`, and `role="tabpanel"`.


Optionally, add `data-anchor="<key>"` to `<ot-tabs>` and give each `role="tab"` an `id` to change the page's URL hash fragment to remember/deep-link to the tab on a new page load.


{% demo() %}
```html
<ot-tabs data-anchor="tab-settings">
  <div role="tablist">
    <button role="tab">Account</button>
    <button role="tab" id="password">Password</button>
    <button role="tab" id="notifications">Notifications</button>
  </div>
  <div role="tabpanel">
    <h3>Account Settings</h3>
    <p>Manage your account information here. This tab doesn't have an anchor id.</p>
  </div>
  <div role="tabpanel">
    <h3>Password Settings</h3>
    <p>Change your password here. This tab change's the URL's anchor.</p>
  </div>
  <div role="tabpanel">
    <h3>Notification Settings</h3>
    <p>Configure your notification preferences. This tab change's the URL's anchor.</p>
  </div>
</ot-tabs>
```
{% end %}
