/**
 * oat - Datepicker Component
 * Usage:
 * <ot-datepicker>
 *   <input type="text" name="start_date" value="2025-06-01" placeholder="Select date" />
 * </ot-datepicker>
 */

class OtDatepicker extends OtBase {
  #input;
  #submitInput;
  #panel;
  #toggle;
  #monthLabel;
  #daysGrid;
  #viewDate;
  #selectedDate;
  #minDate;
  #maxDate;
  #position;
  #locale;
  #displayFmt;
  #monthFmt;

  init() {
    this.#input = this.$(':scope > input') || this.$('input') || this.#createInput();
    if (!this.#input) return;

    this.#setupInput();
    this.#buildUI();

    this.#locale = this.getAttribute('locale') || document.documentElement.lang || 'en-US';
    this.#displayFmt = new Intl.DateTimeFormat(this.#locale, {
      month: 'long',
      day: '2-digit',
      year: 'numeric'
    });
    this.#monthFmt = new Intl.DateTimeFormat(this.#locale, {
      month: 'long',
      year: 'numeric'
    });

    this.#minDate = this.#parseDate(this.#input.getAttribute('min'));
    this.#maxDate = this.#parseDate(this.#input.getAttribute('max'));

    const preset = this.#parseDate(this.#input.dataset.value || this.#input.value);
    this.#selectedDate = preset && this.#inRange(preset) ? preset : null;
    this.#viewDate = this.#selectedDate ? this.#startOfMonth(this.#selectedDate) : this.#startOfMonth(this.#today());

    this.#syncInput();
    this.#render();

    this.#position = () => this.#placePanel();
    this.#input.addEventListener('click', this);
    this.#input.addEventListener('keydown', this);
    this.#panel.addEventListener('click', this);
    this.#panel.addEventListener('keydown', this);
    this.#panel.addEventListener('toggle', this);
  }

  cleanup() {
    window.removeEventListener('resize', this.#position);
    window.removeEventListener('scroll', this.#position, true);
  }

  onclick(e) {
    if (e.target === this.#input) {
      requestAnimationFrame(() => this.#open());
      return;
    }

    const nav = e.target.closest('[data-datepicker-nav]');
    if (nav) {
      this.#viewDate = this.#addMonths(this.#viewDate, nav.dataset.datepickerNav === 'prev' ? -1 : 1);
      this.#render();
      this.#focusActiveDay();
      return;
    }

    const day = e.target.closest('[data-day]');
    if (!day || day.disabled) {
      return;
    }

    const date = this.#parseDate(day.dataset.date);
    if (!date || !this.#inRange(date)) {
      return;
    }

    this.#applySelectedDate(date, true);
    this.#close();
    this.#input.focus();
  }

  onkeydown(e) {
    if (e.target === this.#input) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.#open();
        this.#focusActiveDay();
      } else if (e.key === 'Escape') {
        this.#close();
      }
      return;
    }

    const day = e.target.closest('[data-day]');
    if (!day) {
      if (e.key === 'Escape') {
        e.preventDefault();
        this.#close();
        this.#input.focus();
      }
      return;
    }

    const date = this.#parseDate(day.dataset.date);
    if (!date) return;

    let next = null;
    if (e.key === 'ArrowLeft') next = this.#addDays(date, -1);
    if (e.key === 'ArrowRight') next = this.#addDays(date, 1);
    if (e.key === 'ArrowUp') next = this.#addDays(date, -7);
    if (e.key === 'ArrowDown') next = this.#addDays(date, 7);
    if (e.key === 'Home') next = this.#addDays(date, -date.getDay());
    if (e.key === 'End') next = this.#addDays(date, 6 - date.getDay());
    if (e.key === 'PageUp') next = this.#addMonths(date, -1);
    if (e.key === 'PageDown') next = this.#addMonths(date, 1);

    if (next) {
      e.preventDefault();
      this.#focusDate(this.#clampDate(next));
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      this.#close();
      this.#input.focus();
    }
  }

  ontoggle(e) {
    if (e.newState === 'open') {
      this.#placePanel();
      window.addEventListener('resize', this.#position);
      window.addEventListener('scroll', this.#position, true);
      this.#focusActiveDay();
    } else {
      this.cleanup();
    }
  }

  fetchDate() {
    return this.#selectedDate ? new Date(this.#selectedDate.getTime()) : null;
  }

  fetchISODate() {
    return this.#selectedDate ? this.#formatISO(this.#selectedDate) : null;
  }

  fetchDisplayDate() {
    return this.#input?.value || '';
  }

  fetchMinDate() {
    return this.#minDate ? new Date(this.#minDate.getTime()) : null;
  }

  fetchMaxDate() {
    return this.#maxDate ? new Date(this.#maxDate.getTime()) : null;
  }

  setDate(value, options = {}) {
    if (!this.#input) return false;

    const { emit = true, clamp = true } = options;

    if (value === null || value === undefined || value === '') {
      return this.clearDate({ emit });
    }

    const parsed = this.#parseDate(value);
    if (!parsed) return false;

    const date = clamp ? this.#clampDate(parsed) : parsed;
    if (!this.#inRange(date)) return false;

    this.#applySelectedDate(date, emit);
    return true;
  }

  setMinDate(value, options = {}) {
    if (!this.#input) return false;

    const { clamp = true, emit = false } = options;

    if (value === null || value === undefined || value === '') {
      this.#minDate = null;
      this.#input.removeAttribute('min');
      this.#refreshAfterConstraintChange(clamp, emit);
      return true;
    }

    const parsed = this.#parseDate(value);
    if (!parsed) return false;

    this.#minDate = parsed;
    this.#input.setAttribute('min', this.#formatISO(parsed));

    if (this.#maxDate && this.#maxDate < this.#minDate) {
      this.#maxDate = new Date(this.#minDate.getTime());
      this.#input.setAttribute('max', this.#formatISO(this.#maxDate));
    }

    this.#refreshAfterConstraintChange(clamp, emit);
    return true;
  }

  setMaxDate(value, options = {}) {
    if (!this.#input) return false;

    const { clamp = true, emit = false } = options;

    if (value === null || value === undefined || value === '') {
      this.#maxDate = null;
      this.#input.removeAttribute('max');
      this.#refreshAfterConstraintChange(clamp, emit);
      return true;
    }

    const parsed = this.#parseDate(value);
    if (!parsed) return false;

    this.#maxDate = parsed;
    this.#input.setAttribute('max', this.#formatISO(parsed));

    if (this.#minDate && this.#minDate > this.#maxDate) {
      this.#minDate = new Date(this.#maxDate.getTime());
      this.#input.setAttribute('min', this.#formatISO(this.#minDate));
    }

    this.#refreshAfterConstraintChange(clamp, emit);
    return true;
  }

  clearDate(options = {}) {
    if (!this.#input) return false;

    const { emit = true } = options;
    const hadSelection = Boolean(this.#selectedDate);

    this.#selectedDate = null;
    this.#viewDate = this.#startOfMonth(this.#today());
    this.#syncInput();
    this.#render();
    if (emit && hadSelection) this.#emitDateChange();
    return true;
  }

  open() {
    if (!this.#panel || !this.#input) return;
    this.#open();
  }

  close() {
    if (!this.#panel) return;
    this.#close();
  }

  #buildUI() {
    this.#panel = this.$(':scope > [data-datepicker-panel]');
    if (!this.#panel) {
      this.#panel = document.createElement('section');
      this.#panel.dataset.datepickerPanel = '';
      this.#panel.setAttribute('popover', '');
      this.#panel.innerHTML = `
        <header>
          <button type="button" data-datepicker-nav="prev" aria-label="Previous month">&#x2039;</button>
          <strong data-datepicker-month aria-live="polite"></strong>
          <button type="button" data-datepicker-nav="next" aria-label="Next month">&#x203a;</button>
        </header>
        <div data-datepicker-weekdays aria-hidden="true"></div>
        <div data-datepicker-days role="grid" aria-label="Calendar"></div>
      `;
      this.append(this.#panel);
    }

    this.#panel.id ||= `ot-datepicker-${this.uid()}`;
    this.#monthLabel = this.#panel.querySelector('[data-datepicker-month]');
    this.#daysGrid = this.#panel.querySelector('[data-datepicker-days]');

    this.#toggle = this.$(':scope > [data-datepicker-toggle]') || this.#createToggle();
    this.#toggle.setAttribute('type', 'button');
    this.#toggle.setAttribute('aria-label', 'Toggle calendar');
    this.#toggle.setAttribute('popovertarget', this.#panel.id);
    this.#ensureToggleIcon(this.#toggle);
    if (this.#input.disabled) {
      this.#toggle.disabled = true;
    }

    const weekdays = this.#panel.querySelector('[data-datepicker-weekdays]');
    if (!weekdays?.children.length) {
      ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].forEach(day => {
        const cell = document.createElement('span');
        cell.textContent = day;
        weekdays.append(cell);
      });
    }
  }

  #createToggle() {
    const btn = document.createElement('button');
    btn.dataset.datepickerToggle = '';
    btn.append(this.#createCalendarIcon());
    this.append(btn);
    return btn;
  }

  #ensureToggleIcon(toggle) {
    if (!toggle || toggle.querySelector('[data-datepicker-icon]')) return;
    toggle.prepend(this.#createCalendarIcon());
  }

  #createCalendarIcon() {
    const svgNs = 'http://www.w3.org/2000/svg';
    const icon = document.createElementNS(svgNs, 'svg');
    icon.dataset.datepickerIcon = '';
    icon.setAttribute('viewBox', '0 0 24 24');
    icon.setAttribute('width', '16');
    icon.setAttribute('height', '16');
    icon.setAttribute('aria-hidden', 'true');
    icon.setAttribute('focusable', 'false');
    icon.setAttribute('fill', 'none');
    icon.setAttribute('stroke', 'currentColor');
    icon.setAttribute('stroke-width', '2');
    icon.setAttribute('stroke-linecap', 'round');
    icon.setAttribute('stroke-linejoin', 'round');
    icon.style.display = 'block';

    const rect = document.createElementNS(svgNs, 'rect');
    rect.setAttribute('x', '3');
    rect.setAttribute('y', '4');
    rect.setAttribute('width', '18');
    rect.setAttribute('height', '18');
    rect.setAttribute('rx', '2');
    rect.setAttribute('fill', 'none');
    rect.setAttribute('stroke', 'currentColor');
    rect.setAttribute('stroke-width', '2');

    const path = document.createElementNS(svgNs, 'path');
    path.setAttribute('d', 'M16 2v4M8 2v4M3 10h18');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'currentColor');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');

    icon.append(rect, path);
    return icon;
  }

  #createInput() {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Select date';
    this.prepend(input);
    return input;
  }

  #setupInput() {
    this.#input.type = 'text';
    this.#input.readOnly = true;
    this.#input.autocomplete = 'off';
    this.#input.setAttribute('aria-haspopup', 'dialog');

    if (this.#input.name) {
      this.#submitInput = document.createElement('input');
      this.#submitInput.type = 'hidden';
      this.#submitInput.name = this.#input.name;
      this.#input.removeAttribute('name');
      this.#input.insertAdjacentElement('afterend', this.#submitInput);
    }
  }

  #open() {
    if (!this.#panel.matches(':popover-open') && !this.#input.disabled) {
      this.#panel.showPopover();
    }
  }

  #close() {
    if (this.#panel.matches(':popover-open')) {
      this.#panel.hidePopover();
    }
  }

  #applySelectedDate(date, emit = true) {
    this.#selectedDate = date;
    this.#viewDate = this.#startOfMonth(date);
    this.#syncInput();
    this.#render();
    if (emit) this.#emitDateChange();
  }

  #emitDateChange() {
    this.emit('ot-date-change', {
      value: this.#selectedDate ? this.#formatISO(this.#selectedDate) : null,
      date: this.#selectedDate ? new Date(this.#selectedDate.getTime()) : null
    });
  }

  #placePanel() {
    const trigger = this.#input.getBoundingClientRect();
    const panel = this.#panel.getBoundingClientRect();
    const gap = 8;

    let top = trigger.top - panel.height - gap;
    if (top < gap && trigger.bottom + panel.height + gap <= window.innerHeight) {
      top = trigger.bottom + gap;
    }
    top = Math.max(gap, top);

    let left = trigger.left;
    if (left + panel.width > window.innerWidth - gap) {
      left = window.innerWidth - panel.width - gap;
    }
    left = Math.max(gap, left);

    this.#panel.style.top = `${Math.round(top)}px`;
    this.#panel.style.left = `${Math.round(left)}px`;
  }

  #render() {
    this.#monthLabel.textContent = this.#monthFmt.format(this.#viewDate);
    this.#daysGrid.textContent = '';

    const fragment = document.createDocumentFragment();
    const first = this.#startOfMonth(this.#viewDate);
    const start = this.#addDays(first, -first.getDay());
    const today = this.#today();

    for (let i = 0; i < 42; i++) {
      const date = this.#addDays(start, i);
      const iso = this.#formatISO(date);
      const btn = document.createElement('button');
      const inMonth = date.getMonth() === first.getMonth();
      const disabled = !this.#inRange(date);

      btn.type = 'button';
      btn.dataset.day = '';
      btn.dataset.date = iso;
      btn.textContent = String(date.getDate());
      btn.setAttribute('aria-label', this.#displayFmt.format(date));
      btn.setAttribute('aria-selected', this.#isSameDay(date, this.#selectedDate) ? 'true' : 'false');
      btn.tabIndex = -1;

      if (!inMonth) {
        btn.dataset.outside = '';
      }
      if (this.#isSameDay(date, today)) {
        btn.dataset.today = '';
      }
      if (disabled) {
        btn.disabled = true;
      }

      fragment.append(btn);
    }

    this.#daysGrid.append(fragment);
    this.#setFocusableDay(this.#selectedDate || today);
  }

  #focusActiveDay() {
    const active = this.#daysGrid.querySelector('[data-day][tabindex="0"]:not(:disabled)');
    active?.focus();
  }

  #focusDate(date) {
    if (!date) return;

    this.#viewDate = this.#startOfMonth(date);
    this.#render();

    const btn = this.#daysGrid.querySelector(`[data-date="${this.#formatISO(date)}"]:not(:disabled)`);
    if (btn) {
      this.#daysGrid.querySelectorAll('[data-day]').forEach(el => el.tabIndex = -1);
      btn.tabIndex = 0;
      btn.focus();
    }
  }

  #setFocusableDay(fallbackDate) {
    const match = fallbackDate && this.#daysGrid.querySelector(`[data-date="${this.#formatISO(fallbackDate)}"]:not(:disabled)`);
    const first = this.#daysGrid.querySelector('[data-day]:not(:disabled)');
    const target = match || first;

    this.#daysGrid.querySelectorAll('[data-day]').forEach(day => day.tabIndex = -1);
    if (target) {
      target.tabIndex = 0;
    }
  }

  #syncInput() {
    if (!this.#selectedDate) {
      this.#input.value = '';
      delete this.#input.dataset.value;
      if (this.#submitInput) this.#submitInput.value = '';
      return;
    }

    const iso = this.#formatISO(this.#selectedDate);
    this.#input.value = this.#displayFmt.format(this.#selectedDate);
    this.#input.dataset.value = iso;
    if (this.#submitInput) this.#submitInput.value = iso;
  }

  #refreshAfterConstraintChange(clamp, emit) {
    if (this.#selectedDate && !this.#inRange(this.#selectedDate)) {
      if (clamp) {
        const clamped = this.#clampDate(this.#selectedDate);
        this.#applySelectedDate(clamped, emit);
      } else {
        this.clearDate({ emit });
      }
      return;
    }

    this.#render();
  }

  #clampDate(date) {
    if (this.#minDate && date < this.#minDate) return this.#minDate;
    if (this.#maxDate && date > this.#maxDate) return this.#maxDate;
    return date;
  }

  #inRange(date) {
    if (this.#minDate && date < this.#minDate) return false;
    if (this.#maxDate && date > this.#maxDate) return false;
    return true;
  }

  #parseDate(input) {
    if (!input) return null;
    if (input instanceof Date && !Number.isNaN(input.getTime())) {
      return this.#toDay(input);
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
      const [y, m, d] = input.split('-').map(Number);
      const date = new Date(y, m - 1, d);
      if (date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d) {
        return date;
      }
      return null;
    }

    const date = new Date(input);
    return Number.isNaN(date.getTime()) ? null : this.#toDay(date);
  }

  #today() {
    return this.#toDay(new Date());
  }

  #toDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  #startOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  #addDays(date, n) {
    const out = new Date(date.getFullYear(), date.getMonth(), date.getDate() + n);
    return this.#toDay(out);
  }

  #addMonths(date, n) {
    return new Date(date.getFullYear(), date.getMonth() + n, 1);
  }

  #formatISO(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  #isSameDay(a, b) {
    return Boolean(a && b &&
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate());
  }
}

customElements.define('ot-datepicker', OtDatepicker);

class OtDateRange extends OtBase {
  #startPicker;
  #endPicker;
  #onStartChange;
  #onEndChange;
  #updating = false;

  init() {
    this.setAttribute('role', 'group');
    this.setAttribute('aria-label', this.getAttribute('aria-label') || 'Date range');

    this.#resolvePickers();

    this.#onStartChange = () => this.#handleStartChange();
    this.#onEndChange = () => this.#handleEndChange();
    this.#startPicker?.addEventListener('ot-date-change', this.#onStartChange);
    this.#endPicker?.addEventListener('ot-date-change', this.#onEndChange);

    requestAnimationFrame(() => {
      this.#syncConstraints();
    });
  }

  cleanup() {
    if (this.#onStartChange) {
      this.#startPicker?.removeEventListener('ot-date-change', this.#onStartChange);
    }
    if (this.#onEndChange) {
      this.#endPicker?.removeEventListener('ot-date-change', this.#onEndChange);
    }
  }

  fetchRange() {
    const fromDate = this.#startPicker?.fetchDate() || null;
    const toDate = this.#endPicker?.fetchDate() || null;

    return {
      from: this.#startPicker?.fetchISODate() || null,
      to: this.#endPicker?.fetchISODate() || null,
      fromDate,
      toDate
    };
  }

  setFromDate(value, options = {}) {
    if (!this.#startPicker || !this.#endPicker) return false;

    const { emit = true, clamp = true } = options;
    const hasValue = !(value === null || value === undefined || value === '');

    this.#updating = true;
    const ok = this.#startPicker.setDate(value, { emit: false, clamp });
    if (hasValue && !ok) {
      this.#updating = false;
      return false;
    }

    this.#applyStartConstraint();
    this.#updating = false;

    if (emit) this.#emitRangeChange();
    return true;
  }

  setToDate(value, options = {}) {
    if (!this.#startPicker || !this.#endPicker) return false;

    const { emit = true, clamp = true } = options;
    const hasValue = !(value === null || value === undefined || value === '');

    this.#updating = true;
    const ok = this.#endPicker.setDate(value, { emit: false, clamp });
    if (hasValue && !ok) {
      this.#updating = false;
      return false;
    }

    this.#applyEndConstraint();
    this.#updating = false;

    if (emit) this.#emitRangeChange();
    return true;
  }

  setRange(from, to, options = {}) {
    const { emit = true, clamp = true } = options;

    const fromOk = this.setFromDate(from, { emit: false, clamp });
    if (!fromOk) return false;

    const toOk = this.setToDate(to, { emit: false, clamp });
    if (!toOk) return false;

    if (emit) this.#emitRangeChange();
    return true;
  }

  clearRange(options = {}) {
    const { emit = true } = options;
    return this.setRange(null, null, { emit, clamp: true });
  }

  #resolvePickers() {
    const pickers = this.$$(':scope > ot-datepicker');

    this.#startPicker =
      this.$(':scope > ot-datepicker[data-range-start]') ||
      pickers[0] ||
      this.#createPicker('start');

    this.#endPicker =
      this.$(':scope > ot-datepicker[data-range-end]') ||
      pickers.find(p => p !== this.#startPicker) ||
      this.#createPicker('end');

    if (this.#startPicker === this.#endPicker) {
      this.#endPicker = this.#createPicker('end');
    }

    this.#startPicker.dataset.rangeStart = '';
    this.#endPicker.dataset.rangeEnd = '';
  }

  #createPicker(type) {
    const picker = document.createElement('ot-datepicker');
    const input = document.createElement('input');
    const isStart = type === 'start';

    input.type = 'text';
    input.name = this.getAttribute(isStart ? 'from-name' : 'to-name') || (isStart ? 'from_date' : 'to_date');
    input.placeholder = this.getAttribute(isStart ? 'from-placeholder' : 'to-placeholder') || (isStart ? 'From date' : 'To date');

    picker.append(input);
    this.append(picker);
    return picker;
  }

  #handleStartChange() {
    if (this.#updating) return;
    this.#updating = true;
    this.#applyStartConstraint();
    this.#updating = false;
    this.#emitRangeChange();
  }

  #handleEndChange() {
    if (this.#updating) return;
    this.#updating = true;
    this.#applyEndConstraint();
    this.#updating = false;
    this.#emitRangeChange();
  }

  #applyStartConstraint() {
    const fromDate = this.#startPicker.fetchDate();
    const fromISO = this.#startPicker.fetchISODate();
    this.#endPicker.setMinDate(fromISO, { clamp: true, emit: false });

    const toDate = this.#endPicker.fetchDate();
    if (fromDate && toDate && toDate < fromDate) {
      this.#endPicker.setDate(fromDate, { emit: false, clamp: true });
    }
  }

  #applyEndConstraint() {
    const toDate = this.#endPicker.fetchDate();
    const toISO = this.#endPicker.fetchISODate();
    this.#startPicker.setMaxDate(toISO, { clamp: true, emit: false });

    const fromDate = this.#startPicker.fetchDate();
    if (fromDate && toDate && fromDate > toDate) {
      this.#startPicker.setDate(toDate, { emit: false, clamp: true });
    }
  }

  #syncConstraints() {
    if (!this.#startPicker || !this.#endPicker) return;

    this.#updating = true;
    this.#applyStartConstraint();
    this.#applyEndConstraint();
    this.#updating = false;
  }

  #emitRangeChange() {
    const detail = this.fetchRange();
    this.emit('ot-date-range-change', detail);
  }
}

customElements.define('ot-date-range', OtDateRange);
