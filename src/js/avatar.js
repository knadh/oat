/**
 * oat - Avatar Image Fallback
 * Hides broken images when manual fallback text is provided.
 */

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.avatar img').forEach(img => {
    img.addEventListener('error', () => {
      const avatar = img.closest('.avatar');
      if (avatar) {
        const hasText = Array.from(avatar.childNodes).some(n => n.nodeType === 3 && n.textContent.trim());
        if (hasText) {
          img.style.display = 'none';
        }
      }
    });
  });
});
