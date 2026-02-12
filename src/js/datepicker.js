/**
 * oat - Datepicker Component
 * Provides a minimal calendar picker for date selection.
 *
 * Usage:
 * <ot-datepicker>
 *   <label>
 *     Select Date
 *     <input type="text" readonly placeholder="YYYY-MM-DD" value="2024-12-25">
 *   </label>
 *   <button type="button" popovertarget="picker-id" style="display: none;"></button>
 *   <div popover id="picker-id" class="datepicker"></div>
 * </ot-datepicker>
 */

class OtDatepicker extends OtBase {
  #input;
  #trigger;
  #popover;
  #currentDate;
  #selectedDate;
  #position;

  init() {
    this.#input = this.$('input[type="text"]');
    this.#trigger = this.$('[popovertarget]');
    this.#popover = this.$('[popover].datepicker');

    if (!this.#input || !this.#popover || !this.#trigger) return;

    this.#currentDate = new Date();
    
    // Check for default value from input value or data-value attribute
    const defaultValue = this.#input.value || this.#input.dataset.value;
    if (defaultValue) {
      const [y, m, d] = defaultValue.split('-').map(Number);
      if (y && m && d) {
        this.#selectedDate = new Date(y, m - 1, d);
        this.#currentDate = new Date(y, m - 1, d);
        this.#input.value = defaultValue;
      }
    } else {
      this.#selectedDate = null;
    }

    // Click input to trigger popover
    this.#input.addEventListener('click', () => {
      this.#trigger.click();
    });

    this.#popover.addEventListener('toggle', this);
    this.#popover.addEventListener('click', this);
    this.#popover.addEventListener('change', this);
    this.#popover.addEventListener('wheel', this);

    this.#position = () => {
      const rect = this.#input.getBoundingClientRect();
      this.#popover.style.top = `${rect.bottom + 4}px`;
      this.#popover.style.left = `${rect.left}px`;
    };
  }

  ontoggle(e) {
    if (e.newState === 'open') {
      this.#render();
      this.#position();
      window.addEventListener('scroll', this.#position, true);
    } else {
      window.removeEventListener('scroll', this.#position, true);
    }
  }

  onchange(e) {
    // Removed - no longer using selects
  }

  onwheel(e) {
    // Only prevent default for calendar view, allow natural scrolling in year picker
    if (this.#popover.querySelector('.datepicker-grid')) {
      e.preventDefault();
      if (e.deltaY > 0) {
        this.#currentDate.setMonth(this.#currentDate.getMonth() + 1);
      } else {
        this.#currentDate.setMonth(this.#currentDate.getMonth() - 1);
      }
      this.#render();
    }
  }

  onclick(e) {
    const btn = e.target.closest('button');
    if (!btn) return;
    
    if (btn.dataset.action === 'prev') {
      this.#currentDate.setMonth(this.#currentDate.getMonth() - 1);
      this.#render();
    } else if (btn.dataset.action === 'next') {
      this.#currentDate.setMonth(this.#currentDate.getMonth() + 1);
      this.#render();
    } else if (btn.dataset.action === 'back') {
      this.#render();
    } else if (btn.dataset.action === 'toggle-month') {
      this.#renderMonthPicker();
    } else if (btn.dataset.action === 'toggle-year') {
      this.#renderYearPicker();
    } else if (btn.dataset.month !== undefined) {
      this.#currentDate.setMonth(parseInt(btn.dataset.month));
      this.#render();
    } else if (btn.dataset.year) {
      this.#currentDate.setFullYear(parseInt(btn.dataset.year));
      this.#render();
    } else if (btn.dataset.action === 'prev-decade') {
      this.#currentDate.setFullYear(this.#currentDate.getFullYear() - 10);
      this.#renderYearPicker();
    } else if (btn.dataset.action === 'next-decade') {
      this.#currentDate.setFullYear(this.#currentDate.getFullYear() + 10);
      this.#renderYearPicker();
    } else if (btn.dataset.action === 'today') {
      const today = new Date();
      this.#selectedDate = today;
      this.#currentDate = new Date(today);
      this.#input.value = this.#formatDate(today);
      this.emit('change', { date: today });
      this.#popover.hidePopover();
    } else if (btn.dataset.action === 'cancel') {
      this.#popover.hidePopover();
    } else if (btn.dataset.date) {
      const dateStr = btn.dataset.date;
      const [y, m, d] = dateStr.split('-').map(Number);
      this.#selectedDate = new Date(y, m - 1, d);
      this.#input.value = dateStr;
      this.emit('change', { date: this.#selectedDate });
      this.#popover.hidePopover();
    }
  }

  #render() {
    const year = this.#currentDate.getFullYear();
    const month = this.#currentDate.getMonth();
    const today = new Date();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    let html = `
      <div class="datepicker-header">
        <button type="button" data-action="prev" aria-label="Previous month">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>
        <div class="datepicker-title">
          <button type="button" class="month-btn" data-action="toggle-month">${monthNames[month]}</button>
          <button type="button" class="year-btn" data-action="toggle-year">${year}</button>
        </div>
        <button type="button" data-action="next" aria-label="Next month">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
      </div>
      <div class="datepicker-grid">
        <div class="day-label">Su</div>
        <div class="day-label">Mo</div>
        <div class="day-label">Tu</div>
        <div class="day-label">We</div>
        <div class="day-label">Th</div>
        <div class="day-label">Fr</div>
        <div class="day-label">Sa</div>
    `;

    for (let i = 0; i < firstDay; i++) {
      html += '<button type="button" disabled></button>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = this.#formatDate(date);
      const isToday = date.toDateString() === today.toDateString();
      const isSelected = this.#selectedDate && dateStr === this.#formatDate(this.#selectedDate);
      const classes = [isToday && 'today', isSelected && 'selected'].filter(Boolean).join(' ');

      html += `<button type="button" data-date="${dateStr}" class="${classes}">${day}</button>`;
    }

    html += `
      </div>
      <div class="datepicker-footer">
        <button type="button" data-action="cancel" class="outline">Cancel</button>
        <button type="button" data-action="today" class="outline">Today</button>
      </div>
    `;
    this.#popover.innerHTML = html;
  }

  #renderMonthPicker() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    
    let html = `
      <div class="datepicker-header">
        <button type="button" data-action="back" aria-label="Back to calendar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>
        <span>Select Month</span>
        <div style="width: 2rem;"></div>
      </div>
      <div class="datepicker-month-picker">
    `;
    monthNames.forEach((name, i) => {
      html += `<button type="button" data-month="${i}">${name.slice(0, 3)}</button>`;
    });
    html += '</div>';
    this.#popover.innerHTML = html;
  }

  #renderYearPicker() {
    const currentYear = this.#currentDate.getFullYear();
    const startYear = currentYear - 50;
    const endYear = currentYear + 50;
    
    let html = `
      <div class="datepicker-header">
        <button type="button" data-action="back" aria-label="Back to calendar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>
        <span>Select Year</span>
        <div style="width: 2rem;"></div>
      </div>
      <div class="datepicker-year-picker">
        <div class="year-scroll" data-start="${startYear}" data-end="${endYear}">
    `;
    
    for (let year = startYear; year <= endYear; year++) {
      const isSelected = year === currentYear;
      html += `<button type="button" data-year="${year}" ${isSelected ? 'class="selected"' : ''}>${year}</button>`;
    }
    
    html += '</div></div>';
    this.#popover.innerHTML = html;
    
    const scrollContainer = this.#popover.querySelector('.year-scroll');
    
    // Infinite scroll handler
    scrollContainer.addEventListener('scroll', () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const start = parseInt(scrollContainer.dataset.start);
      const end = parseInt(scrollContainer.dataset.end);
      
      // Load more years at top
      if (scrollTop < 100) {
        const newStart = start - 20;
        let html = '';
        for (let year = newStart; year < start; year++) {
          const isSelected = year === currentYear;
          html += `<button type="button" data-year="${year}" ${isSelected ? 'class="selected"' : ''}>${year}</button>`;
        }
        scrollContainer.insertAdjacentHTML('afterbegin', html);
        scrollContainer.dataset.start = newStart;
        scrollContainer.scrollTop = scrollTop + 400;
      }
      
      // Load more years at bottom
      if (scrollTop + clientHeight > scrollHeight - 100) {
        const newEnd = end + 20;
        let html = '';
        for (let year = end + 1; year <= newEnd; year++) {
          const isSelected = year === currentYear;
          html += `<button type="button" data-year="${year}" ${isSelected ? 'class="selected"' : ''}>${year}</button>`;
        }
        scrollContainer.insertAdjacentHTML('beforeend', html);
        scrollContainer.dataset.end = newEnd;
      }
    });
    
    // Scroll to current year
    setTimeout(() => {
      const selected = scrollContainer.querySelector('.selected');
      if (selected) {
        selected.scrollIntoView({ block: 'center' });
      }
    }, 0);
  }

  #formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  cleanup() {
    window.removeEventListener('scroll', this.#position, true);
  }
}

customElements.define('ot-datepicker', OtDatepicker);
