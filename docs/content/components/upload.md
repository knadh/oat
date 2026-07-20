+++
title = "Upload"
weight = 95
description = "Tiny click and drag/drop file uploader."

[extra]
webcomponent = true
+++

Wrap a native `<input type="file" />` in `<ot-upload>`. The `change` event is fired on selection, drop, and removal of files.

{% demo() %}
```html
<ot-upload>
  <div data-field class="vstack">
    <input type="file" name="attachments" multiple hidden />
    <strong>Attachments</strong>

    <button type="button" class="ghost" aria-label="Choose files">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 16V4m0 0 4 4m-4-4-4 4" /><path d="M20 16v4H4v-4" /></svg>
    </button>

    <div data-files>
      <small data-hint>Drop files here or click to choose</small>
    </div>
  </div>
</ot-upload>
```
{% end %}
