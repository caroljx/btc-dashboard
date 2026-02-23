/**
 * nav.js — 左侧侧边栏导航
 *
 * 新增页面只需两步：
 * 1. 在 NAV_GROUPS 对应分类里加一行
 * 2. 新页面调用 renderNav('key')
 *
 * 注：尚未完成的页面标注 coming:true，显示为灰色不可点击
 */

var NAV_GROUPS = [
  {
    key:   'home',
    label: '🏠 主页',
    items: [
      { key: 'dashboard', label: 'K线图 · 实时价格', file: 'bitcoin-dashboard.html' },
    ]
  },
  {
    key:   'cycle',
    label: '📈 周期指标',
    items: [
      { key: 'cvdd',            label: 'CVDD',                file: 'cvdd.html'            },
      { key: '2yma',            label: '2年均线乘数',          file: '2yma.html'            },
      { key: '200wma',          label: '200周均线热力图',      file: '200wma.html'          },
      { key: 'profitable-days', label: '比特币盈利天数',       file: 'profitable-days.html' },
      { key: 'rainbow',         label: '彩虹价格图表',         file: 'rainbow.html'         },
      { key: 'power-law',       label: '幂律模型',             file: 'power-law.html'       },
    ]
  },
  {
    key:   'sentiment',
    label: '😨 情绪指标',
    items: [
      { key: 'fng',  label: '恐惧与贪婪指数', file: 'fng.html' },
      { key: 'nupl', label: 'NUPL 净未实现盈亏', file: 'nupl.html', coming: true },
    ]
  },
  {
    key:   'onchain',
    label: '🔗 链上指标',
    items: [
      { key: 'mvrv',          label: 'MVRV Z-Score',         file: 'mvrv.html',          coming: true },
      { key: 'realized',      label: '实现价格',              file: 'realized.html',      coming: true },
      { key: 'lth-sth',       label: '长/短期持有者实现价格', file: 'lth-sth.html',       coming: true },
      { key: 'rhodl',         label: 'RHODL 比率',            file: 'rhodl.html',         coming: true },
      { key: 'sopr',          label: 'SOPR',                  file: 'sopr.html',          coming: true },
      { key: 'top-cap',       label: 'Top Cap 市值最高',      file: 'top-cap.html',       coming: true },
      { key: 'delta-top',     label: 'Delta Top',             file: 'delta-top.html',     coming: true },
      { key: 'balanced',      label: 'Balanced Price',        file: 'balanced.html',      coming: true },
      { key: 'terminal',      label: 'Terminal Price',        file: 'terminal.html',      coming: true },
      { key: 'addr-profit',   label: '盈利地址百分比',        file: 'addr-profit.html',   coming: true },
      { key: 'addr-loss',     label: '亏损地址百分比',        file: 'addr-loss.html',     coming: true },
      { key: 'vdd',           label: 'VDD 倍数',              file: 'vdd.html',           coming: true },
      { key: 'lth-supply',    label: '长期持有者供应',        file: 'lth-supply.html',    coming: true },
      { key: 'sth-supply',    label: '短期持有者供应',        file: 'sth-supply.html',    coming: true },
      { key: 'cdd',           label: '供应调整后 CDD',        file: 'cdd.html',           coming: true },
    ]
  },
  {
    key:   'miner',
    label: '⛏ 矿工指标',
    items: [
      { key: 'puell', label: 'Puell 倍数', file: 'puell.html', coming: true },
    ]
  },
  {
    key:   'tools',
    label: '🛠 工具',
    items: [
      { key: 'dca', label: 'DCA 投资模拟', file: 'dca-simulator.html' },
    ]
  },
];

// ── 渲染侧边栏 ───────────────────────────────────────
function renderNav(currentKey) {
  if (!document.getElementById('nav-style')) {
    var style = document.createElement('style');
    style.id  = 'nav-style';
    style.textContent = NAV_CSS;
    document.head.appendChild(style);
  }

  var root = document.getElementById('nav-root');
  if (!root) return;

  var groupsHtml = NAV_GROUPS.map(function(group) {
    var itemsHtml = group.items.map(function(item) {
      var isActive = item.key === currentKey;
      if (item.coming) {
        // 尚未完成：灰色，不可点击，显示"即将上线"标签
        return '<span class="nav-item nav-item--coming">' +
          item.label +
          '<span class="nav-coming-tag">即将</span>' +
        '</span>';
      }
      return '<a href="' + item.file + '" class="nav-item' + (isActive ? ' nav-item--active' : '') + '">' +
        item.label +
      '</a>';
    }).join('');

    var groupActive = group.items.some(function(item) { return item.key === currentKey; });

    return '<div class="nav-group">' +
      '<div class="nav-group-label" onclick="toggleGroup(this)">' +
        '<span>' + group.label + '</span>' +
        '<span class="nav-group-arrow">' + (groupActive ? '▾' : '▸') + '</span>' +
      '</div>' +
      '<div class="nav-group-items' + (groupActive ? ' nav-group-items--open' : '') + '">' +
        itemsHtml +
      '</div>' +
    '</div>';
  }).join('');

  root.innerHTML =
    '<aside class="sidebar" id="sidebar">' +
      '<div class="sidebar-header">' +
        '<a href="bitcoin-dashboard.html" class="sidebar-logo">' +
          '<div class="sidebar-btc-icon">&#8383;</div>' +
          '<div class="sidebar-logo-text">BTC <span>Dashboard</span></div>' +
        '</a>' +
        '<button class="sidebar-toggle" onclick="toggleSidebar()" title="收起侧边栏">&#9776;</button>' +
      '</div>' +
      '<nav class="sidebar-nav">' + groupsHtml + '</nav>' +
      '<div class="sidebar-footer" id="nav-badge"></div>' +
    '</aside>' +
    '<div class="sidebar-overlay" id="sidebarOverlay" onclick="toggleSidebar()"></div>';

  var mainEl = document.querySelector('.main');
  if (mainEl && !mainEl.closest('.page-body')) {
    var pageBody = document.createElement('div');
    pageBody.className = 'page-body';
    mainEl.parentNode.insertBefore(pageBody, mainEl);
    pageBody.appendChild(mainEl);
  }
}

function toggleGroup(labelEl) {
  var items = labelEl.nextElementSibling;
  var arrow = labelEl.querySelector('.nav-group-arrow');
  var isOpen = items.classList.contains('nav-group-items--open');
  items.classList.toggle('nav-group-items--open', !isOpen);
  arrow.textContent = isOpen ? '▸' : '▾';
}

function toggleSidebar() {
  var sidebar = document.getElementById('sidebar');
  var overlay = document.getElementById('sidebarOverlay');
  sidebar.classList.toggle('sidebar--open');
  overlay.classList.toggle('sidebar-overlay--show');
}

var NAV_CSS = '\
html, body { height: 100%; }\
body { display: flex; flex-direction: row; }\
\
.sidebar {\
  width: 220px; min-width: 220px; height: 100vh;\
  position: sticky; top: 0;\
  background: #0d0d14; border-right: 1px solid #1e1e2e;\
  display: flex; flex-direction: column;\
  z-index: 200; overflow: hidden; flex-shrink: 0;\
}\
\
.sidebar-header {\
  display: flex; align-items: center; justify-content: space-between;\
  padding: 20px 16px 16px; border-bottom: 1px solid #1e1e2e; flex-shrink: 0;\
}\
.sidebar-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }\
.sidebar-btc-icon {\
  width: 32px; height: 32px; background: #f7b731; border-radius: 50%;\
  display: flex; align-items: center; justify-content: center;\
  font-weight: 800; color: #000; font-size: 14px;\
  box-shadow: 0 0 12px rgba(247,183,49,0.35); flex-shrink: 0;\
}\
.sidebar-logo-text { font-family: Syne,sans-serif; font-size: 14px; font-weight: 800; letter-spacing: 0.04em; color: #e8e8f0; line-height: 1.2; }\
.sidebar-logo-text span { color: #f7b731; }\
.sidebar-toggle { background: none; border: none; color: #5a5a7a; font-size: 16px; cursor: pointer; padding: 4px; display: none; }\
\
.sidebar-nav { flex: 1; overflow-y: auto; padding: 12px 0; scrollbar-width: thin; scrollbar-color: #1e1e2e transparent; }\
.sidebar-nav::-webkit-scrollbar { width: 4px; }\
.sidebar-nav::-webkit-scrollbar-track { background: transparent; }\
.sidebar-nav::-webkit-scrollbar-thumb { background: #1e1e2e; border-radius: 2px; }\
\
.nav-group { margin-bottom: 2px; }\
.nav-group-label {\
  display: flex; align-items: center; justify-content: space-between;\
  padding: 8px 16px; font-family: "Space Mono",monospace;\
  font-size: 11px; font-weight: 700; color: #5a5a7a;\
  letter-spacing: 0.08em; cursor: pointer; user-select: none; transition: color 0.15s;\
}\
.nav-group-label:hover { color: #e8e8f0; }\
.nav-group-arrow { font-size: 10px; transition: transform 0.2s; }\
\
.nav-group-items { display: none; flex-direction: column; padding: 0 8px 6px; }\
.nav-group-items--open { display: flex; }\
\
.nav-item {\
  display: block; padding: 7px 10px; border-radius: 7px;\
  font-family: "Space Mono",monospace; font-size: 11px; color: #5a5a7a;\
  text-decoration: none; transition: all 0.15s;\
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;\
}\
.nav-item:hover { background: #1e1e2e; color: #e8e8f0; }\
.nav-item--active { background: rgba(247,183,49,0.12); color: #f7b731 !important; }\
\
.nav-item--coming {\
  display: flex; align-items: center; justify-content: space-between;\
  padding: 7px 10px; border-radius: 7px;\
  font-family: "Space Mono",monospace; font-size: 11px;\
  color: #2e2e45; cursor: default;\
  white-space: nowrap; overflow: hidden;\
}\
.nav-coming-tag {\
  font-size: 9px; padding: 1px 5px; border-radius: 4px;\
  background: #1e1e2e; color: #3a3a5a;\
  flex-shrink: 0; margin-left: 4px;\
}\
\
.sidebar-footer { padding: 12px 16px; border-top: 1px solid #1e1e2e; flex-shrink: 0; }\
\
.page-body { flex: 1; min-width: 0; overflow-y: auto; height: 100vh; }\
\
.sidebar-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 199; }\
.sidebar-overlay--show { display: block; }\
\
@media (max-width: 768px) {\
  .sidebar { position: fixed; left: -220px; transition: left 0.25s ease; height: 100%; }\
  .sidebar--open { left: 0; }\
  .sidebar-toggle { display: block; }\
  .page-body { height: 100vh; }\
}\
';
