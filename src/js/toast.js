/**
 * oat - Toast Notifications
 *
 * Usage:
 *   ot.toast('Saved!')
 *   ot.toast('Action completed successfully', 'All good')
 *   ot.toast('Operation completed.', 'Success', { variant: 'success' })
 *   ot.toast('Something went wrong.', 'Error', { variant: 'danger', placement: 'bottom-center' })
 *
 *   // Custom markup
 *   ot.toastEl(element)
 *   ot.toastEl(element, { duration: 4000, placement: 'bottom-center' })
 *   ot.toastEl(document.querySelector('#my-template'))
 */

const ot = window.ot || (window.ot = {});

const containers = {};
const DEFAULT_DURATION = 4000;
const DEFAULT_PLACEMENT = 'top-right';

function getContainer(placement) {
  if (!containers[placement]) {
    const el = document.createElement('div');
    el.className = 'toast-container';
    el.setAttribute('popover', 'manual');
    el.setAttribute('data-placement', placement);
    document.body.appendChild(el);
    containers[placement] = el;
  }

  return containers[placement];
}

function show(toast, options = {}) {
  const { placement = DEFAULT_PLACEMENT, duration = DEFAULT_DURATION } = options;
  const container = getContainer(placement);

  toast.classList.add('toast');

  let timeout;

  // Pause on hover.
  toast.onmouseenter = () => clearTimeout(timeout);
  toast.onmouseleave = () => {
    if (duration > 0) {
      timeout = setTimeout(() => removeToast(toast, container), duration);
    }
  };

  // Show with animation.
  toast.setAttribute('data-entering', '');
  container.appendChild(toast);
  container.showPopover();

  // Double RAF to compute styles before transition starts.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.removeAttribute('data-entering');
    });
  });

  if (duration > 0) {
    timeout = setTimeout(() => removeToast(toast, container), duration);
  }

  return toast;
}

// Simple text toast.
ot.toast = function (message, title, options = {}) {
  const { variant = 'info', ...rest } = options;

  const toast = document.createElement('output');
  toast.setAttribute('data-variant', variant);

  if (title) {
    const titleEl = document.createElement('h6');
    titleEl.className = 'toast-title';
    titleEl.style.color = `var(--${variant})`;
    titleEl.textContent = title;
    toast.appendChild(titleEl);
  }

  if (message) {
    const msgEl = document.createElement('div');
    msgEl.className = 'toast-message';
    msgEl.textContent = message;
    toast.appendChild(msgEl);
  }

  return show(toast, rest);
};

// Element-based toast.
ot.toastEl = function (el, options = {}) {
  let toast;

  if (el instanceof HTMLTemplateElement) {
    toast = el.content.firstElementChild?.cloneNode(true);
  } else if (typeof el === 'string') {
    toast = document.querySelector(el)?.cloneNode(true);
  } else if (el) {
    toast = el.cloneNode(true);
  }

  if (!toast) {
    return;
  }

  toast.removeAttribute('id');

  return show(toast, options);
};

function removeToast(toast, container) {
  if (toast.hasAttribute('data-exiting')) {
    return;
  }
  toast.setAttribute('data-exiting', '');

  const cleanup = () => {
    toast.remove();
    if (!container.children.length) {
      container.hidePopover();
    }
  };

  // Calculate transition duration from computed styles to match CSS
  // Falls back to 200ms if calculation fails (matches CSS transition duration)
  const getTransitionDuration = () => {
    // Force reflow to ensure data-exiting styles are applied
    void toast.offsetHeight;
    const style = window.getComputedStyle(toast);
    const transitionDuration = style.transitionDuration;
    if (transitionDuration && transitionDuration !== '0s') {
      // Parse duration (e.g., "0.2s" -> 200ms)
      // Handle multiple durations by taking the maximum
      const durations = transitionDuration.split(',').map(d => parseFloat(d.trim()) * 1000);
      const maxDuration = Math.max(...durations);
      return Math.max(maxDuration, 200); // Ensure minimum 200ms
    }
    return 200; // Fallback to CSS transition duration
  };

  toast.addEventListener('transitionend', cleanup, { once: true });
  setTimeout(cleanup, getTransitionDuration());
}

// Clear all toasts.
ot.toast.clear = function (placement) {
  if (placement && containers[placement]) {
    containers[placement].innerHTML = '';
    containers[placement].hidePopover();
  } else {
    Object.values(containers).forEach(c => {
      c.innerHTML = '';
      c.hidePopover();
    });
  }
};
