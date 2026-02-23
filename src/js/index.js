import './base.js';
import './tabs.js';
import './dropdown.js';
import './tooltip.js';
import './sidebar.js';
import './dialog.js';
import { toast, toastEl, toastClear } from './toast.js';

// Register the global window.ot.* APIs.
const ot = window.ot || (window.ot = {});
ot.toast = toast;
ot.toast.el = toastEl;
ot.toast.clear = toastClear;
