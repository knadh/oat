/**
 * oat - Dialog Scroll Lock
 * Automatically locks body scrolling when a native <dialog> is open.
*/
document.addEventListener("DOMContentLoaded", () => {
  
  const observer = new MutationObserver((mutations) => {
    const isDialogOpen = !!document.querySelector('dialog[open]');
    
    if (isDialogOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  observer.observe(document.body, { 
    attributes: true, 
    subtree: true, 
    attributeFilter: ['open'] 
  });
});