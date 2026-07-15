const skills = {
  strategy: {
    index: '01', kicker: 'TEST STRATEGY', title: '从需求到版本准出的全局设计',
    description: '制定测试策略、主计划、里程碑和版本准入/退出标准；组织需求评审与范围分析，识别关键链路、高风险场景及资源依赖，持续跟踪进度与质量风险。',
    tags: ['测试策略', '主计划', '需求评审', '风险识别', '版本准出']
  },
  team: {
    index: '02', kicker: 'TEAM LEADERSHIP', title: '让团队目标、节奏与标准对齐',
    description: '开展任务拆解、优先级安排、进度跟踪、用例评审和测试指导；主持测试例会与缺陷复盘，协调产品、开发、供应商和整车团队推动阻塞问题闭环。',
    tags: ['任务分配', '用例评审', '测试指导', '跨团队协同', '质量复盘']
  },
  cockpit: {
    index: '03', kicker: 'COCKPIT VALIDATION', title: '覆盖座舱核心链路与真实场景',
    description: '覆盖多媒体、语音、导航、蓝牙、手机互联、车辆设置、OTA和车身交互；兼顾功能、交互、兼容性、异常容错、稳定性、性能、弱网和长稳测试。',
    tags: ['多媒体', '语音', '导航', '蓝牙', '手机互联', 'OTA']
  },
  quality: {
    index: '04', kicker: 'QUALITY DELIVERY', title: '用数据驱动缺陷闭环与交付决策',
    description: '建立测试日报、阶段报告与风险清单，跟踪覆盖率、缺陷趋势和遗留风险；牵头严重问题定级、根因分析、修复验证和风险收敛，为版本发布与量产验收提供依据。',
    tags: ['质量报告', '缺陷管理', '根因分析', '回归验证', 'SOP交付']
  }
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  }), { threshold: 0.1 });
  $$('.reveal').forEach(element => revealObserver.observe(element));
} else {
  $$('.reveal').forEach(element => element.classList.add('visible'));
}

let counted = false;
const countMetrics = () => {
  if (counted) return;
  counted = true;
  $$('.metric-number').forEach(element => {
    const target = Number(element.dataset.count);
    if (reduceMotion) { element.textContent = target; return; }
    const start = performance.now();
    const tick = now => {
      const progress = Math.min((now - start) / 1200, 1);
      element.textContent = Math.floor(target * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
};

if ('IntersectionObserver' in window) {
  const metricsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { countMetrics(); metricsObserver.disconnect(); }
  }, { threshold: 0.35 });
  metricsObserver.observe($('.metrics'));
} else countMetrics();

const selectSkill = tab => {
  const data = skills[tab.dataset.skill];
  $$('.skill-tab').forEach(item => {
    const active = item === tab;
    item.classList.toggle('active', active);
    item.setAttribute('aria-selected', active);
    item.tabIndex = active ? 0 : -1;
  });
  const panel = $('#skillPanel');
  panel.setAttribute('aria-labelledby', tab.id);
  if (!reduceMotion) panel.animate([{ opacity: .25, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 280 });
  $('#skillIndex').textContent = data.index;
  $('#skillKicker').textContent = data.kicker;
  $('#skillTitle').textContent = data.title;
  $('#skillDescription').textContent = data.description;
  $('#skillTags').innerHTML = data.tags.map(tag => `<span>${tag}</span>`).join('');
};

$$('.skill-tab').forEach((tab, index, tabs) => {
  tab.tabIndex = index === 0 ? 0 : -1;
  tab.addEventListener('click', () => selectSkill(tab));
  tab.addEventListener('keydown', event => {
    if (!['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let target = index;
    if (['ArrowDown', 'ArrowRight'].includes(event.key)) target = (index + 1) % tabs.length;
    if (['ArrowUp', 'ArrowLeft'].includes(event.key)) target = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') target = 0;
    if (event.key === 'End') target = tabs.length - 1;
    tabs[target].focus();
    selectSkill(tabs[target]);
  });
});

$$('.expand').forEach(button => button.addEventListener('click', () => {
  const body = button.closest('.project-main').querySelector('.project-body');
  const open = body.classList.toggle('open');
  button.setAttribute('aria-expanded', open);
  button.textContent = open ? '−' : '+';
  const label = button.getAttribute('aria-label').replace(open ? '展开' : '收起', open ? '收起' : '展开');
  button.setAttribute('aria-label', label);
}));

$$('.filter').forEach(button => button.addEventListener('click', () => {
  $$('.filter').forEach(item => item.classList.toggle('active', item === button));
  const filter = button.dataset.filter;
  $$('.project-card').forEach(card => {
    const matches = filter === 'all' || card.dataset.type.split(' ').includes(filter);
    card.classList.toggle('hidden', !matches);
  });
}));

const themeToggle = $('#themeToggle');
const applyTheme = theme => {
  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute('aria-pressed', theme === 'light');
  document.querySelector('meta[name="theme-color"]').setAttribute('content', theme === 'light' ? '#eff8f3' : '#06110f');
};
const savedTheme = localStorage.getItem('resume-theme');
if (savedTheme) applyTheme(savedTheme);
themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  applyTheme(theme);
  localStorage.setItem('resume-theme', theme);
});

$('#copyPhone').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText($('#copyPhone').dataset.phone); }
  catch {
    const area = document.createElement('textarea');
    area.value = $('#copyPhone').dataset.phone;
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }
  const toast = $('#toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1800);
});

$('#printResume').addEventListener('click', () => window.print());

if ('IntersectionObserver' in window) {
  const sections = $$('main section[id]');
  const navLinks = $$('.site-header nav a');
  const navObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  }), { rootMargin: '-35% 0px -55%' });
  sections.forEach(section => navObserver.observe(section));
}

$('#year').textContent = new Date().getFullYear();
