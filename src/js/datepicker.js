/**
 * oat - Date Picker
 * Progressive enhancement for <input type="date"> and <input type="datetime-local">.
 *
 * Usage:
 * <ot-datepicker>
 *   <input type="date" name="dob">
 * </ot-datepicker>
 *
 * <ot-datepicker>
 *   <input type="datetime-local" name="meeting">
 * </ot-datepicker>
 */

const OT_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const OT_WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

class OtDatepicker extends OtBase {
  static #supportCache = {};

  #input;
  #type;
  #trigger;
  #panel;
  #grid;
  #month;
  #year;
  #time;
  #open = false;
  #viewYear;
  #viewMonth;
  #selected = null;
  #focused = null;
  #min = null;
  #max = null;
  #disabled = new Set();

  init() {
    this.#input = this.$(':scope > input[type="date"], :scope > input[type="datetime-local"]');
    if (!this.#input) return;

    this.#type = this.#input.type;
    if (!this.getBool('force') && this.#isNativeSupported(this.#type)) return;

    this.setAttribute('data-enhanced', '');
    this.#prepareInput();
    this.#readConstraints();
    this.#createUI();
    this.#syncFromInput();
    this.#render();

    this.#trigger.addEventListener('click', this);
    this.#panel.addEventListener('click', this);
    this.#panel.addEventListener('keydown', this);
    this.#input.addEventListener('keydown', this);
    this.#input.addEventListener('input', this);
    this.#input.addEventListener('change', this);
    this.#month.addEventListener('change', this);
    this.#year.addEventListener('change', this);
    this.#time?.addEventListener('input', this);
    this.#time?.addEventListener('change', this);
  }

  onclick(e) {
    const trigger = e.target.closest('[data-trigger]');
    if (trigger === this.#trigger) {
      this.#toggle();
      return;
    }

    const target = e.target.closest('button');
    if (!target) return;

    if (target.hasAttribute('data-prev')) {
      this.#shiftMonth(-1);
      this.#focusGrid();
      return;
    }

    if (target.hasAttribute('data-next')) {
      this.#shiftMonth(1);
      this.#focusGrid();
      return;
    }

    if (target.hasAttribute('data-today')) {
      const now = this.#today();
      if (!this.#isDayDisabled(now)) {
        this.#select(now, this.#type === 'date');
      }
      return;
    }

    if (target.hasAttribute('data-clear')) {
      this.#clear();
      return;
    }

    if (target.hasAttribute('data-close')) {
      this.#closePanel(true);
      return;
    }

    if (target.hasAttribute('data-day') && !target.disabled) {
      const day = this.#parseDatePart(target.getAttribute('data-day'));
      if (!day) return;

      this.#select(day, this.#type === 'date');
      if (this.#type === 'datetime-local') {
        this.#time?.focus();
      }
    }
  }

  oninput(e) {
    if (e.target === this.#input) {
      this.#syncFromInput();
      return;
    }

    if (e.target === this.#time) {
      this.#syncTime(true);
    }
  }

  onchange(e) {
    if (e.target === this.#input) {
      this.#syncFromInput();
      return;
    }

    if (e.target === this.#month || e.target === this.#year) {
      this.#viewMonth = Number.parseInt(this.#month.value, 10);
      this.#viewYear = Number.parseInt(this.#year.value, 10);
      this.#focused = this.#clampFocusedDay(this.#focused || this.#selected || this.#today());
      this.#render();
      return;
    }

    if (e.target === this.#time) {
      this.#syncTime(true);
    }
  }

  onkeydown(e) {
    if (e.target === this.#input) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        e.preventDefault();
        this.#openPanel();
      }
      return;
    }

    if (!this.#open) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      this.#closePanel(true);
      return;
    }

    if (!e.target.closest('[data-day]')) return;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        this.#moveFocus(-1);
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.#moveFocus(1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.#moveFocus(-7);
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.#moveFocus(7);
        break;
      case 'Home':
        e.preventDefault();
        this.#moveFocus(-this.#focused.getDay());
        break;
      case 'End':
        e.preventDefault();
        this.#moveFocus(6 - this.#focused.getDay());
        break;
      case 'PageUp':
        e.preventDefault();
        this.#shiftMonth(-1);
        this.#focusGrid();
        break;
      case 'PageDown':
        e.preventDefault();
        this.#shiftMonth(1);
        this.#focusGrid();
        break;
      case ' ':
      case 'Enter':
        e.preventDefault();
        this.#select(this.#focused, this.#type === 'date');
        if (this.#type === 'datetime-local') {
          this.#time?.focus();
        }
        break;
    }
  }

  onmousedown(e) {
    if (this.#open && !this.contains(e.target)) {
      this.#closePanel(false);
    }
  }

  onfocusin(e) {
    if (this.#open && !this.contains(e.target)) {
      this.#closePanel(false);
    }
  }

  cleanup() {
    this.#closePanel(false);

    this.#trigger?.removeEventListener('click', this);
    this.#panel?.removeEventListener('click', this);
    this.#panel?.removeEventListener('keydown', this);
    this.#input?.removeEventListener('keydown', this);
    this.#input?.removeEventListener('input', this);
    this.#input?.removeEventListener('change', this);
    this.#month?.removeEventListener('change', this);
    this.#year?.removeEventListener('change', this);
    this.#time?.removeEventListener('input', this);
    this.#time?.removeEventListener('change', this);
  }

  #isNativeSupported(type) {
    if (Object.hasOwn(OtDatepicker.#supportCache, type)) {
      return OtDatepicker.#supportCache[type];
    }

    const probe = document.createElement('input');
    probe.setAttribute('type', type);
    probe.value = 'not-a-valid-value';
    OtDatepicker.#supportCache[type] = probe.type === type && probe.value === '';

    return OtDatepicker.#supportCache[type];
  }

  #prepareInput() {
    this.#input.type = 'text';
    this.#input.setAttribute('autocomplete', 'off');
    this.#input.setAttribute('inputmode', 'numeric');

    if (!this.#input.getAttribute('placeholder')) {
      this.#input.setAttribute(
        'placeholder',
        this.#type === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM-DDTHH:MM'
      );
    }

    if (!this.#input.getAttribute('pattern')) {
      this.#input.setAttribute(
        'pattern',
        this.#type === 'date'
          ? '\\d{4}-\\d{2}-\\d{2}'
          : '\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}(:\\d{2})?'
      );
    }
  }

  #readConstraints() {
    this.#min = this.#parseDatePart(this.#input.getAttribute('min'));
    this.#max = this.#parseDatePart(this.#input.getAttribute('max'));

    const raw = this.#input.dataset.disabledDates || this.getAttribute('disabled-dates') || '';
    this.#disabled = new Set(
      raw.split(',')
        .map(v => v.trim())
        .filter(Boolean)
    );
  }

  #createUI() {
    const panelID = `ot-datepicker-panel-${this.uid()}`;
    const headingID = `ot-datepicker-heading-${this.uid()}`;

    this.#trigger = document.createElement('button');
    this.#trigger.type = 'button';
    this.#trigger.setAttribute('data-trigger', '');
    this.#trigger.setAttribute('aria-label', 'Open date picker');
    this.#trigger.setAttribute('aria-haspopup', 'dialog');
    this.#trigger.ariaExpanded = 'false';
    this.#trigger.setAttribute('aria-controls', panelID);
    this.#trigger.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="4" width="18" height="18" rx="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    `;

    this.#panel = document.createElement('section');
    this.#panel.id = panelID;
    this.#panel.setAttribute('data-panel', '');
    this.#panel.setAttribute('role', 'dialog');
    this.#panel.setAttribute('aria-modal', 'false');
    this.#panel.setAttribute('aria-labelledby', headingID);
    this.#panel.hidden = true;

    const heading = document.createElement('h6');
    heading.id = headingID;
    heading.className = 'sr-only';
    heading.textContent = this.#type === 'date' ? 'Choose date' : 'Choose date and time';
    this.#panel.appendChild(heading);

    const nav = document.createElement('header');
    nav.setAttribute('data-nav', '');

    const prev = document.createElement('button');
    prev.type = 'button';
    prev.setAttribute('data-prev', '');
    prev.setAttribute('aria-label', 'Previous month');
    prev.textContent = '<';

    this.#month = document.createElement('select');
    this.#month.setAttribute('aria-label', 'Month');
    OT_MONTHS.forEach((label, i) => {
      const opt = document.createElement('option');
      opt.value = String(i);
      opt.textContent = label;
      this.#month.appendChild(opt);
    });

    this.#year = document.createElement('select');
    this.#year.setAttribute('aria-label', 'Year');

    const next = document.createElement('button');
    next.type = 'button';
    next.setAttribute('data-next', '');
    next.setAttribute('aria-label', 'Next month');
    next.textContent = '>';

    nav.append(prev, this.#month, this.#year, next);
    this.#panel.appendChild(nav);

    const table = document.createElement('table');
    table.setAttribute('data-calendar', '');
    table.setAttribute('role', 'grid');

    const head = document.createElement('thead');
    const headRow = document.createElement('tr');
    OT_WEEKDAYS.forEach(label => {
      const th = document.createElement('th');
      th.scope = 'col';
      th.textContent = label;
      headRow.appendChild(th);
    });
    head.appendChild(headRow);
    table.appendChild(head);

    this.#grid = document.createElement('tbody');
    table.appendChild(this.#grid);
    this.#panel.appendChild(table);

    if (this.#type === 'datetime-local') {
      const timeField = document.createElement('label');
      timeField.setAttribute('data-time', '');
      timeField.textContent = 'Time';

      this.#time = document.createElement('input');
      this.#time.type = 'time';
      this.#time.setAttribute('aria-label', 'Time');
      const step = this.#input.getAttribute('step');
      if (step) this.#time.step = step;

      timeField.appendChild(this.#time);
      this.#panel.appendChild(timeField);
    }

    const actions = document.createElement('footer');
    actions.setAttribute('data-actions', '');

    const today = document.createElement('button');
    today.type = 'button';
    today.className = 'ghost small';
    today.setAttribute('data-today', '');
    today.textContent = 'Today';

    const clear = document.createElement('button');
    clear.type = 'button';
    clear.className = 'outline small';
    clear.setAttribute('data-clear', '');
    clear.textContent = 'Clear';

    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'small';
    close.setAttribute('data-close', '');
    close.textContent = 'Done';

    actions.append(today, clear, close);
    this.#panel.appendChild(actions);

    this.append(this.#trigger, this.#panel);
  }

  #openPanel() {
    if (this.#open) return;

    this.#open = true;
    this.#panel.hidden = false;
    this.#trigger.ariaExpanded = 'true';

    document.addEventListener('mousedown', this, true);
    document.addEventListener('focusin', this, true);

    this.#render();
    this.#focusGrid();
  }

  #closePanel(focusTrigger) {
    if (!this.#open) return;

    this.#open = false;
    this.#panel.hidden = true;
    this.#trigger.ariaExpanded = 'false';

    document.removeEventListener('mousedown', this, true);
    document.removeEventListener('focusin', this, true);

    if (focusTrigger) {
      this.#trigger.focus();
    }
  }

  #toggle() {
    if (this.#open) {
      this.#closePanel(true);
    } else {
      this.#openPanel();
    }
  }

  #syncFromInput() {
    const parsed = this.#parseValue(this.#input.value);
    if (!parsed) {
      if (!this.#input.value) {
        this.#selected = null;
        this.#focused = this.#today();
        this.#viewYear = this.#focused.getFullYear();
        this.#viewMonth = this.#focused.getMonth();
        if (this.#time) this.#time.value = '';
        this.#render();
      }
      return;
    }

    this.#selected = parsed.date;
    this.#focused = parsed.date;
    this.#viewYear = parsed.date.getFullYear();
    this.#viewMonth = parsed.date.getMonth();

    if (this.#time && parsed.time) {
      this.#time.value = parsed.time;
    }

    this.#render();
  }

  #syncTime(emit) {
    if (this.#type !== 'datetime-local') return;

    if (!this.#selected) {
      this.#selected = this.#focused || this.#today();
    }

    if (!this.#time.value) return;

    this.#setInputValue(this.#selected, emit);
  }

  #setInputValue(day, emit) {
    if (!day) return;

    const dateValue = this.#toDateValue(day);
    const value = this.#type === 'date'
      ? dateValue
      : `${dateValue}T${this.#time?.value || this.#extractTime(this.#input.value) || '00:00'}`;

    if (this.#input.value !== value) {
      this.#input.value = value;
    }

    if (emit) {
      this.#input.dispatchEvent(new Event('input', { bubbles: true }));
      this.#input.dispatchEvent(new Event('change', { bubbles: true }));
      this.emit('ot-date-change', { value: this.#input.value, input: this.#input });
    }
  }

  #select(day, closeAfter) {
    if (!day || this.#isDayDisabled(day)) return;

    this.#selected = new Date(day.getFullYear(), day.getMonth(), day.getDate());
    this.#focused = this.#selected;
    this.#viewYear = this.#selected.getFullYear();
    this.#viewMonth = this.#selected.getMonth();

    if (this.#type === 'datetime-local' && this.#time && !this.#time.value) {
      this.#time.value = this.#extractTime(this.#input.value) || '00:00';
    }

    this.#setInputValue(this.#selected, true);
    this.#render();

    if (closeAfter) this.#closePanel(true);
  }

  #clear() {
    this.#selected = null;
    this.#focused = this.#today();
    this.#viewYear = this.#focused.getFullYear();
    this.#viewMonth = this.#focused.getMonth();
    this.#input.value = '';
    if (this.#time) this.#time.value = '';

    this.#input.dispatchEvent(new Event('input', { bubbles: true }));
    this.#input.dispatchEvent(new Event('change', { bubbles: true }));
    this.emit('ot-date-change', { value: '', input: this.#input });

    this.#render();
  }

  #shiftMonth(delta) {
    const anchor = this.#focused || this.#selected || this.#today();
    const shifted = new Date(anchor.getFullYear(), anchor.getMonth() + delta, 1);

    this.#viewYear = shifted.getFullYear();
    this.#viewMonth = shifted.getMonth();
    this.#focused = this.#clampFocusedDay(anchor);

    this.#render();
  }

  #moveFocus(days) {
    let next = this.#focused || this.#selected || this.#today();
    next = new Date(next.getFullYear(), next.getMonth(), next.getDate() + days);

    const direction = days < 0 ? -1 : 1;
    let attempts = 0;
    while (this.#isDayDisabled(next) && attempts < 366) {
      next = new Date(next.getFullYear(), next.getMonth(), next.getDate() + direction);
      attempts += 1;
    }

    this.#focused = next;
    this.#viewYear = next.getFullYear();
    this.#viewMonth = next.getMonth();

    this.#render();
    this.#focusGrid();
  }

  #focusGrid() {
    const target = this.#panel.querySelector('[data-day][data-focused]');
    target?.focus();
  }

  #render() {
    if (!this.#panel) return;

    const base = this.#selected || this.#today();
    if (!Number.isInteger(this.#viewYear)) this.#viewYear = base.getFullYear();
    if (!Number.isInteger(this.#viewMonth)) this.#viewMonth = base.getMonth();

    this.#focused = this.#focused || this.#selected || this.#today();
    this.#focused = this.#clampFocusedDay(this.#focused);

    this.#month.value = String(this.#viewMonth);
    this.#renderYears();
    this.#year.value = String(this.#viewYear);

    const first = new Date(this.#viewYear, this.#viewMonth, 1);
    const firstWeekday = first.getDay();
    const daysInMonth = new Date(this.#viewYear, this.#viewMonth + 1, 0).getDate();
    const prevMonthDays = new Date(this.#viewYear, this.#viewMonth, 0).getDate();

    const selectedValue = this.#selected ? this.#toDateValue(this.#selected) : '';
    const focusedValue = this.#focused ? this.#toDateValue(this.#focused) : '';
    const todayValue = this.#toDateValue(this.#today());

    this.#grid.innerHTML = '';
    for (let week = 0; week < 6; week++) {
      const tr = document.createElement('tr');

      for (let dayIdx = 0; dayIdx < 7; dayIdx++) {
        const cellIndex = week * 7 + dayIdx;
        let dayNum = 0;
        let monthOffset = 0;

        if (cellIndex < firstWeekday) {
          dayNum = prevMonthDays - firstWeekday + cellIndex + 1;
          monthOffset = -1;
        } else if (cellIndex >= firstWeekday + daysInMonth) {
          dayNum = cellIndex - firstWeekday - daysInMonth + 1;
          monthOffset = 1;
        } else {
          dayNum = cellIndex - firstWeekday + 1;
        }

        const cellDate = new Date(this.#viewYear, this.#viewMonth + monthOffset, dayNum);
        const cellValue = this.#toDateValue(cellDate);
        const isDisabled = this.#isDayDisabled(cellDate);
        const isOutside = monthOffset !== 0;

        const td = document.createElement('td');
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.setAttribute('data-day', cellValue);
        btn.textContent = String(cellDate.getDate());
        btn.disabled = isDisabled;
        btn.tabIndex = -1;

        if (isOutside) btn.setAttribute('data-outside', '');
        if (cellValue === selectedValue) btn.setAttribute('data-selected', '');
        if (cellValue === todayValue) btn.setAttribute('aria-current', 'date');
        if (!isDisabled && cellValue === focusedValue) {
          btn.tabIndex = 0;
          btn.setAttribute('data-focused', '');
        }

        td.appendChild(btn);
        tr.appendChild(td);
      }

      this.#grid.appendChild(tr);
    }

    if (!this.#panel.querySelector('[data-day][data-focused]')) {
      const fallback = this.#panel.querySelector('[data-day]:not(:disabled)');
      if (fallback) {
        fallback.tabIndex = 0;
        fallback.setAttribute('data-focused', '');
        this.#focused = this.#parseDatePart(fallback.getAttribute('data-day'));
      }
    }
  }

  #renderYears() {
    const [start, end] = this.#yearRange();
    const current = this.#year.value;
    this.#year.innerHTML = '';

    for (let y = start; y <= end; y++) {
      const opt = document.createElement('option');
      opt.value = String(y);
      opt.textContent = String(y);
      this.#year.appendChild(opt);
    }

    if (current) this.#year.value = current;
  }

  #yearRange() {
    const pivot = this.#viewYear || new Date().getFullYear();
    let start = Number.parseInt(this.getAttribute('year-start') || '', 10);
    let end = Number.parseInt(this.getAttribute('year-end') || '', 10);

    if (!Number.isInteger(start)) start = this.#min ? this.#min.getFullYear() : pivot - 100;
    if (!Number.isInteger(end)) end = this.#max ? this.#max.getFullYear() : pivot + 50;

    if (start > end) {
      [start, end] = [end, start];
    }

    if (this.#min) start = Math.max(start, this.#min.getFullYear());
    if (this.#max) end = Math.min(end, this.#max.getFullYear());

    if (start > end) {
      [start, end] = [end, start];
    }

    if (end - start > 300) {
      start = pivot - 150;
      end = pivot + 150;
    }

    return [start, end];
  }

  #clampFocusedDay(source) {
    const daysInView = new Date(this.#viewYear, this.#viewMonth + 1, 0).getDate();
    const day = Math.min(source.getDate(), daysInView);
    let date = new Date(this.#viewYear, this.#viewMonth, day);

    if (this.#isDayDisabled(date)) {
      const first = this.#firstEnabledInView();
      if (first) date = first;
    }

    return date;
  }

  #firstEnabledInView() {
    const daysInView = new Date(this.#viewYear, this.#viewMonth + 1, 0).getDate();
    for (let i = 1; i <= daysInView; i++) {
      const date = new Date(this.#viewYear, this.#viewMonth, i);
      if (!this.#isDayDisabled(date)) return date;
    }
    return null;
  }

  #isDayDisabled(date) {
    if (!date) return true;

    const stamp = this.#dayStamp(date);
    if (this.#min && stamp < this.#dayStamp(this.#min)) return true;
    if (this.#max && stamp > this.#dayStamp(this.#max)) return true;

    return this.#disabled.has(this.#toDateValue(date));
  }

  #dayStamp(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  }

  #today() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  #toDateValue(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  #extractTime(value) {
    const match = String(value || '').match(/T(\d{2}:\d{2}(?::\d{2})?)$/);
    return match ? match[1] : '';
  }

  #parseValue(value) {
    if (!value) return null;

    if (this.#type === 'date') {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
      const date = this.#parseDatePart(value);
      if (!date || this.#toDateValue(date) !== value) return null;
      return { date, time: '' };
    }

    const match = String(value).match(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}(?::\d{2})?)$/);
    if (!match) return null;

    const date = this.#parseDatePart(match[1]);
    if (!date) return null;

    return { date, time: match[2] };
  }

  #parseDatePart(value) {
    const match = String(value || '').match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!match) return null;

    const y = Number.parseInt(match[1], 10);
    const m = Number.parseInt(match[2], 10) - 1;
    const d = Number.parseInt(match[3], 10);
    const date = new Date(y, m, d);

    if (
      date.getFullYear() !== y ||
      date.getMonth() !== m ||
      date.getDate() !== d
    ) {
      return null;
    }

    return date;
  }
}

customElements.define('ot-datepicker', OtDatepicker);
