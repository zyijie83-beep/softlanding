const stages = {
  day2: {
    zh: { title: '先稳住', summary: '先列三件急事，确认授权和材料，指定一位跟进管家。', tasks: ['确认证明和当前安排', '确认授权和所需材料', '指定一位跟进管家'], marker: '48h' },
    en: { title: 'Stabilize', summary: 'Confirm authorization and documents, set three priorities, and assign a case manager.', tasks: ['Confirm certificate and arrangements', 'Confirm authorization and documents', 'Assign one case manager'], marker: '48h' },
  },
  day7: {
    zh: { title: '排清楚', summary: '把家庭关系、机构、期限和依赖排成一张 90 天计划，家属只看这一周要做什么.', tasks: ['整理银行、保险、社保与数字账户清单', '标出必须本人到场的事项', '交付第一张 90 天计划'], marker: 'DAY 07' },
    en: { title: 'Make a plan', summary: 'Turn family, institutions, deadlines, and dependencies into one 90-day plan. The family sees only this week’s next steps.', tasks: ['List banks, insurance, benefits, and digital accounts', 'Mark tasks that require an in-person visit', 'Deliver the first 90-day plan'], marker: 'DAY 07' },
  },
  day30: {
    zh: { title: '逐项办', summary: '按优先级推进银行、保险、社保、公积金和数字账户，缺材料时先说清缺什么.', tasks: ['追踪已提交的材料与机构回复', '处理自动扣款、账户和保单事项', '重大变化在 24 小时内说明'], marker: 'DAY 30' },
    en: { title: 'Work through', summary: 'Move through banking, insurance, benefits, and digital accounts in order. When something is missing, say exactly what is needed.', tasks: ['Track submitted documents and institution replies', 'Handle payments, accounts, and policy items', 'Explain material changes within 24 hours'], marker: 'DAY 30' },
  },
  day90: {
    zh: { title: '收好尾', summary: '把已完成、未完成和待跟进事项写进结案报告，数字档案按授权留在家庭手里.', tasks: ['确认已完成与仍在等待的事项', '交付结案报告和家庭地图', '按授权下载或删除数字档案'], marker: 'DAY 90' },
    en: { title: 'Close well', summary: 'Record completed, open, and follow-up items in a closeout report. The family keeps its digital file within the agreed authorization.', tasks: ['Confirm completed and still-pending items', 'Deliver the closeout report and family map', 'Download or delete the digital file within authorization'], marker: 'DAY 90' },
  },
};

let language = 'zh';

function applyLanguage(next) {
  language = next;
  document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const value = node.dataset[next];
    if (value) node.textContent = value;
  });
  document.querySelectorAll('[data-aria-zh][data-aria-en]').forEach((node) => {
    node.setAttribute('aria-label', node.dataset[`aria${next[0].toUpperCase()}${next.slice(1)}`]);
  });
  document.querySelectorAll('[data-label-zh][data-label-en]').forEach((node) => {
    node.setAttribute('aria-label', node.dataset[`label${next[0].toUpperCase()}${next.slice(1)}`]);
  });
  document.querySelectorAll('[data-alt-zh][data-alt-en]').forEach((node) => {
    node.setAttribute('alt', node.dataset[`alt${next[0].toUpperCase()}${next.slice(1)}`]);
  });
  const switcher = document.querySelector('[data-language-switch]');
  switcher?.setAttribute('aria-pressed', String(next === 'en'));
  switcher?.setAttribute('aria-label', next === 'zh' ? 'Switch to English' : '切换为中文');
  document.title = next === 'zh' ? 'SoftLanding 安落 | 90 天身后事协调服务' : 'SoftLanding | 90-day family coordination';
  const active = document.querySelector('.stage-tab.is-active')?.dataset.stage || 'day2';
  renderStage(active, false);
}

function renderStage(key, animate = true) {
  const stage = stages[key];
  if (!stage) return;
  const copy = stage[language];
  const card = document.querySelector('.stage-card');
  if (animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    card?.animate([{ opacity: .45, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 260, easing: 'cubic-bezier(.2,.8,.2,1)' });
  }
  const index = Object.keys(stages).indexOf(key) + 1;
  document.querySelector('.map-rail')?.style.setProperty('--step', String(index - 1));
  const title = document.querySelector('#stage-title');
  const summary = document.querySelector('#stage-summary');
  const marker = document.querySelector('.stage-card__marker');
  if (title) title.textContent = copy.title;
  if (summary) summary.textContent = copy.summary;
  if (marker) marker.textContent = copy.marker;
  const list = document.querySelector('#task-list');
  if (list) list.innerHTML = copy.tasks.map((task) => `<li><span class="task-check" aria-hidden="true"></span><span>${task}</span></li>`).join('');
}

function initTimeline() {
  const tabs = [...document.querySelectorAll('.stage-tab')];
  tabs.forEach((tab, index) => {
    tab.tabIndex = tab.classList.contains('is-active') ? 0 : -1;
    tab.addEventListener('click', () => {
      tabs.forEach((item) => {
        const selected = item === tab;
        item.classList.toggle('is-active', selected);
        item.setAttribute('aria-selected', String(selected));
        item.tabIndex = selected ? 0 : -1;
      });
      renderStage(tab.dataset.stage);
    });
    tab.addEventListener('keydown', (event) => {
      const next = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? index + 1
        : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? index - 1
          : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : -1;
      if (next < 0) return;
      event.preventDefault();
      const target = tabs[(next + tabs.length) % tabs.length];
      target.focus();
      target.click();
    });
  });
}

function initNavigation() {
  const nav = document.querySelector('.nav');
  const toggle = nav?.querySelector('.nav__toggle');
  toggle?.addEventListener('click', () => {
    const open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open
      ? (language === 'zh' ? '关闭菜单' : 'Close menu')
      : (language === 'zh' ? '打开菜单' : 'Open menu'));
  });
  nav?.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
  }));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      nav?.classList.remove('is-open');
      toggle?.setAttribute('aria-expanded', 'false');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTimeline();
  initNavigation();
  document.querySelector('[data-language-switch]')?.addEventListener('click', () => applyLanguage(language === 'zh' ? 'en' : 'zh'));
});
