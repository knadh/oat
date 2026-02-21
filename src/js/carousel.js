/**
 * oat - Carousel Component
 * Usage:
 * <ot-carousel>
 *   <div data-carousel-track>
 *     <article data-carousel-slide>Slide 1</article>
 *     <article data-carousel-slide>Slide 2</article>
 *   </div>
 * </ot-carousel>
 */

class OtCarousel extends OtBase {
  #track;
  #slides = [];
  #prevBtn;
  #nextBtn;
  #dots;
  #dotButtons = [];
  #index = 0;
  #autoplay = 0;
  #timer;
  #pointerId = null;
  #pointerStartX = 0;
  #pointerStartY = 0;
  #wheelCooldownUntil = 0;

  init() {
    this.#track = this.$(':scope > [data-carousel-track]');
    this.#slides = this.#track ? [...this.#track.children] : [];

    if (!this.#track || this.#slides.length === 0) {
      console.warn('ot-carousel: Missing [data-carousel-track] with slide elements');
      return;
    }

    this.setAttribute('role', 'region');
    this.setAttribute('aria-roledescription', 'carousel');
    this.setAttribute('aria-live', 'off');
    this.setAttribute('tabindex', this.getAttribute('tabindex') || '0');
    this.setAttribute('aria-label', this.getAttribute('aria-label') || 'Carousel');

    this.#prevBtn = this.$(':scope > [data-carousel-prev]') || this.#createControl('prev');
    this.#nextBtn = this.$(':scope > [data-carousel-next]') || this.#createControl('next');
    this.#dots = this.$(':scope > [data-carousel-dots]') || this.#createDots();

    this.#slides.forEach((slide, i) => {
      slide.dataset.carouselSlide ||= '';
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `${i + 1} of ${this.#slides.length}`);
    });

    this.#syncDots();
    this.#setIndex(this.#initialIndex(), false, true);

    this.#autoplay = Number.parseInt(this.getAttribute('autoplay') || '0', 10);
    if (this.#slides.length < 2) {
      this.dataset.carouselSingle = '';
    } else {
      delete this.dataset.carouselSingle;
      this.#startAutoplay();
    }

    this.addEventListener('click', this);
    this.addEventListener('keydown', this);
    this.addEventListener('mouseenter', this);
    this.addEventListener('mouseleave', this);
    this.addEventListener('focusin', this);
    this.addEventListener('focusout', this);
    this.addEventListener('wheel', this, { passive: false });
    this.#track.addEventListener('pointerdown', this);
    this.#track.addEventListener('pointerup', this);
    this.#track.addEventListener('pointercancel', this);
  }

  cleanup() {
    this.#stopAutoplay();
  }

  onclick(e) {
    const control = e.target.closest('[data-carousel-prev], [data-carousel-next], [data-carousel-dot]');
    if (!control || !this.contains(control)) {
      return;
    }

    if (control.hasAttribute('data-carousel-prev')) {
      this.prev();
      return;
    }

    if (control.hasAttribute('data-carousel-next')) {
      this.next();
      return;
    }

    const index = Number.parseInt(control.dataset.index || '-1', 10);
    if (index >= 0) {
      this.goTo(index);
    }
  }

  onkeydown(e) {
    if (e.altKey || e.ctrlKey || e.metaKey) {
      return;
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      this.prev();
      return;
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      this.next();
      return;
    }

    if (e.key === 'Home') {
      e.preventDefault();
      this.goTo(0);
      return;
    }

    if (e.key === 'End') {
      e.preventDefault();
      this.goTo(this.#slides.length - 1);
    }
  }

  onmouseenter() {
    this.#stopAutoplay();
  }

  onmouseleave() {
    this.#startAutoplay();
  }

  onfocusin() {
    this.#stopAutoplay();
  }

  onfocusout(e) {
    if (!this.contains(e.relatedTarget)) {
      this.#startAutoplay();
    }
  }

  onpointerdown(e) {
    if (this.#slides.length < 2) {
      return;
    }

    if (e.pointerType === 'mouse' && e.button !== 0) {
      return;
    }

    this.#pointerId = e.pointerId;
    this.#pointerStartX = e.clientX;
    this.#pointerStartY = e.clientY;
    this.#track.setPointerCapture?.(e.pointerId);
  }

  onpointerup(e) {
    if (e.pointerId !== this.#pointerId) {
      return;
    }

    const dx = e.clientX - this.#pointerStartX;
    const dy = e.clientY - this.#pointerStartY;
    this.#pointerId = null;

    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) {
      return;
    }

    if (dx > 0) {
      this.prev();
    } else {
      this.next();
    }
  }

  onpointercancel() {
    this.#pointerId = null;
  }

  onwheel(e) {
    if (this.#slides.length < 2) {
      return;
    }

    const now = performance.now();
    if (now < this.#wheelCooldownUntil) {
      return;
    }

    const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (Math.abs(delta) < 18) {
      return;
    }

    e.preventDefault();
    this.#wheelCooldownUntil = now + 220;

    if (delta > 0) {
      this.next();
    } else {
      this.prev();
    }
  }

  next() {
    return this.goTo(this.#index + 1);
  }

  prev() {
    return this.goTo(this.#index - 1);
  }

  goTo(index) {
    const changed = this.#setIndex(index, true, false);
    if (changed) {
      this.#restartAutoplay();
    }
    return changed;
  }

  get activeIndex() {
    return this.#index;
  }

  set activeIndex(value) {
    this.goTo(value);
  }

  #initialIndex() {
    const start = Number.parseInt(this.getAttribute('start') || '0', 10);
    if (Number.isNaN(start)) {
      return 0;
    }
    return Math.max(0, Math.min(start, this.#slides.length - 1));
  }

  #setIndex(index, emit = true, force = false) {
    if (!this.#slides.length) {
      return false;
    }

    const len = this.#slides.length;
    const next = ((index % len) + len) % len;
    const changed = next !== this.#index;

    if (!changed && !force) {
      return false;
    }

    this.#index = next;
    this.#track.style.transform = `translateX(-${next * 100}%)`;
    this.#track.setAttribute('aria-label', `Slide ${next + 1} of ${len}`);

    this.#slides.forEach((slide, i) => {
      const active = i === next;
      slide.setAttribute('aria-hidden', String(!active));
    });

    this.#dotButtons.forEach((dot, i) => {
      const active = i === next;
      dot.setAttribute('aria-current', active ? 'true' : 'false');
      dot.ariaLabel = `Go to slide ${i + 1}`;
    });

    if (emit) {
      this.emit('ot-carousel-change', {
        index: next,
        slide: this.#slides[next]
      });
    }

    return true;
  }

  #createControl(direction) {
    const btn = document.createElement('button');
    btn.type = 'button';

    if (direction === 'prev') {
      btn.dataset.carouselPrev = '';
      btn.setAttribute('aria-label', 'Previous slide');
      btn.innerHTML = '&#x2039;';
    } else {
      btn.dataset.carouselNext = '';
      btn.setAttribute('aria-label', 'Next slide');
      btn.innerHTML = '&#x203a;';
    }

    this.append(btn);
    return btn;
  }

  #createDots() {
    const nav = document.createElement('nav');
    nav.dataset.carouselDots = '';
    nav.setAttribute('aria-label', 'Slide navigation');
    this.append(nav);
    return nav;
  }

  #syncDots() {
    const current = [...this.#dots.querySelectorAll('[data-carousel-dot]')];
    const len = this.#slides.length;

    if (current.length > len) {
      current.slice(len).forEach(dot => dot.remove());
    }

    if (current.length < len) {
      for (let i = current.length; i < len; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.dataset.carouselDot = '';
        dot.dataset.index = String(i);
        this.#dots.append(dot);
      }
    }

    this.#dotButtons = [...this.#dots.querySelectorAll('[data-carousel-dot]')].slice(0, len);
    this.#dotButtons.forEach((dot, i) => {
      if (dot instanceof HTMLButtonElement) {
        dot.type = 'button';
      }
      dot.dataset.index = String(i);
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    });
  }

  #startAutoplay() {
    this.#stopAutoplay();

    if (this.#autoplay <= 0 || this.#slides.length < 2) {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    if (this.matches(':hover') || this.contains(document.activeElement)) {
      return;
    }

    this.#timer = setInterval(() => {
      this.#setIndex(this.#index + 1, true, false);
    }, this.#autoplay);
  }

  #stopAutoplay() {
    if (this.#timer) {
      clearInterval(this.#timer);
      this.#timer = null;
    }
  }

  #restartAutoplay() {
    this.#startAutoplay();
  }
}

customElements.define('ot-carousel', OtCarousel);
