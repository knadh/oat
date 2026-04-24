+++
title = "File Drop"
weight = 85
description = "Dropzone-style file picker with drag and drop support."

[extra]
webcomponent = true
+++

Use `<ot-file-drop>` to let users drag files onto a target or click it to open the native file picker. Add `multiple` to accept more than one file and `accept` to restrict MIME types or extensions, just like `<input type="file">`.

{% demo() %}

```html
<ot-file-drop id="drop-demo" accept="image/*" multiple>
  <span class="content">
    <strong>Drop images here</strong>
    <small>or click to browse PNG, JPG, GIF, or WebP files</small>
  </span>
</ot-file-drop>

<script>
  document.querySelector("#drop-demo").addEventListener("ot-file-drop", (e) => {
    console.log("accepted", e.detail.files);
    console.log("rejected", e.detail.rejected);
  });
</script>
```

{% end %}

The component dispatches `ot-file-drop` with `{ files, accepted, rejected }` whenever files are selected or dropped.
