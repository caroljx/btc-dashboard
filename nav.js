/**
 * nav.js — 左侧侧边栏导航
 *
 * 新增页面只需两步：
 * 1. 在 NAV_GROUPS 对应分类里加一行
 * 2. 新页面调用 renderNav('key')
 */

// ── 导航分类配置 ────────────────────────────────────
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
      { key: 'cvdd',            label: 'CVDD',               file: 'cvdd.html'           },
      { key: '2yma',            label: '2-Year MA',          file: '2yma.html'           },
      { key: '200wma',          label: '200周均线热力图',    file: '200wma.html'         },
      { key: 'profitable-days', label: '比特币盈利天数',     file: 'profitable-days.html'},
      { key: 'rainbow',         label: '彩虹价格图表',       file: 'rainbow.html'        },
      { key: 'power-law',       label: '幂律模型',           file: 'power-law.html'      },
      { key: 'pi-cycle',        label: 'Pi Cycle Top',       file: 'pi-cycle.html'       },
      { key: 'golden-ratio',    label: 'Golden Ratio',       file: 'golden-ratio.html'   },
      { key: 'stock-to-flow',   label: 'Stock-to-Flow',      file: 'stock-to-flow.html'  },
      { key: 'halving',         label: '减半倒计时',         file: 'halving.html'        },
    ]
  },
  {
    key:   'sentiment',
    label: '😨 情绪指标',
    items: [
      { key: 'fng',  label: '恐惧与贪婪指数', file: 'fng.html'  },
      { key: 'nupl', label: 'NUPL 净未实现盈亏', file: 'nupl.html' },
    ]
  },
  {
    key:   'onchain',
    label: '🔗 链上指标',
    items: [
      { key: 'mvrv',         label: 'MVRV Z-Score',    file: 'mvrv.html'         },
      { key: 'puell',        label: 'Puell Multiple',  file: 'puell.html'        },
      { key: 'reserve-risk', label: 'Reserve Risk',    file: 'reserve-risk.html' },
      { key: 'rhodl',        label: 'RHODL Ratio',     file: 'rhodl.html'        },
    ]
  },
  {
    key:   'miner',
    label: '⛏ 矿工指标',
    items: [
      { key: 'hash-ribbons', label: 'Hash Ribbons',   file: 'hash-ribbons.html' },
      { key: 'miner-revenue',label: 'Miner Revenue',  file: 'miner-revenue.html'},
      { key: 'hashrate',     label: 'Bitcoin Hashrate', file: 'hashrate.html'   },
    ]
  },
  {
    key:   'tools',
    label: '🛠 工具',
    items: [
      { key: 'dca',           label: 'DCA 投资模拟',     file: 'dca-simulator.html'   },
      { key: 'monthly-heatmap', label: '月度收益热力图', file: 'monthly-heatmap.html' },
      { key: 'yoy',           label: 'BTC价格同比YoY',   file: 'yoy.html'             },
    ]
  },
];

// ── 渲染侧边栏 ───────────────────────────────────────
function renderNav(currentKey) {
  // 注入CSS（只注入一次）
  if (!document.getElementById('nav-style')) {
    var style = document.createElement('style');
    style.id  = 'nav-style';
    style.textContent = NAV_CSS;
    document.head.appendChild(style);
  }

  // 插入侧边栏 + 页面包装结构
  var root = document.getElementById('nav-root');
  if (!root) return;

  // 构建侧边栏HTML
  var groupsHtml = NAV_GROUPS.map(function(group) {
    var itemsHtml = group.items.map(function(item) {
      var isActive = item.key === currentKey;
      return '<a href="' + item.file + '" class="nav-item' + (isActive ? ' nav-item--active' : '') + '">' +
        item.label +
      '</a>';
    }).join('');

    // 检查当前页面是否在这个分组里
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

  // 把 .main 包装在 .page-body 里（如果还没包装）
  var mainEl = document.querySelector('.main');
  if (mainEl && !mainEl.closest('.page-body')) {
    var pageBody = document.createElement('div');
    pageBody.className = 'page-body';
    mainEl.parentNode.insertBefore(pageBody, mainEl);
    pageBody.appendChild(mainEl);
  }
}

// ── 分组折叠/展开 ────────────────────────────────────
function toggleGroup(labelEl) {
  var items = labelEl.nextElementSibling;
  var arrow = labelEl.querySelector('.nav-group-arrow');
  var isOpen = items.classList.contains('nav-group-items--open');
  items.classList.toggle('nav-group-items--open', !isOpen);
  arrow.textContent = isOpen ? '▸' : '▾';
}

// ── 侧边栏收起/展开（移动端） ────────────────────────
function toggleSidebar() {
  var sidebar = document.getElementById('sidebar');
  var overlay = document.getElementById('sidebarOverlay');
  sidebar.classList.toggle('sidebar--open');
  overlay.classList.toggle('sidebar-overlay--show');
}

// ── 样式 ─────────────────────────────────────────────
var NAV_CSS = '\
/* ── 整体布局 ── */\
html, body { height: 100%; }\
body {\
  display: flex;\
  flex-direction: row;\
}\
\
/* ── 侧边栏 ── */\
.sidebar {\
  width: 220px;\
  min-width: 220px;\
  height: 100vh;\
  position: sticky;\
  top: 0;\
  background: #0d0d14;\
  border-right: 1px solid #1e1e2e;\
  display: flex;\
  flex-direction: column;\
  z-index: 200;\
  overflow: hidden;\
  flex-shrink: 0;\
}\
\
/* ── 侧边栏头部 ── */\
.sidebar-header {\
  display: flex;\
  align-items: center;\
  justify-content: space-between;\
  padding: 20px 16px 16px;\
  border-bottom: 1px solid #1e1e2e;\
  flex-shrink: 0;\
}\
.sidebar-logo {\
  display: flex; align-items: center; gap: 10px;\
  text-decoration: none;\
}\
.sidebar-btc-icon {\
  width: 32px; height: 32px;\
  background: #f7b731;\
  border-radius: 50%;\
  display: flex; align-items: center; justify-content: center;\
  font-weight: 800; color: #000; font-size: 14px;\
  box-shadow: 0 0 12px rgba(247,183,49,0.35);\
  flex-shrink: 0;\
}\
.sidebar-logo-text {\
  font-family: Syne, sans-serif;\
  font-size: 14px; font-weight: 800;\
  letter-spacing: 0.04em; color: #e8e8f0;\
  line-height: 1.2;\
}\
.sidebar-logo-text span { color: #f7b731; }\
.sidebar-toggle {\
  background: none; border: none;\
  color: #5a5a7a; font-size: 16px;\
  cursor: pointer; padding: 4px;\
  display: none;\
}\
\
/* ── 导航区域 ── */\
.sidebar-nav {\
  flex: 1;\
  overflow-y: auto;\
  padding: 12px 0;\
  scrollbar-width: thin;\
  scrollbar-color: #1e1e2e transparent;\
}\
.sidebar-nav::-webkit-scrollbar { width: 4px; }\
.sidebar-nav::-webkit-scrollbar-track { background: transparent; }\
.sidebar-nav::-webkit-scrollbar-thumb { background: #1e1e2e; border-radius: 2px; }\
\
/* ── 分组 ── */\
.nav-group { margin-bottom: 2px; }\
.nav-group-label {\
  display: flex;\
  align-items: center;\
  justify-content: space-between;\
  padding: 8px 16px;\
  font-family: "Space Mono", monospace;\
  font-size: 11px;\
  font-weight: 700;\
  color: #5a5a7a;\
  letter-spacing: 0.08em;\
  cursor: pointer;\
  user-select: none;\
  transition: color 0.15s;\
}\
.nav-group-label:hover { color: #e8e8f0; }\
.nav-group-arrow { font-size: 10px; transition: transform 0.2s; }\
\
/* ── 分组内容折叠动画 ── */\
.nav-group-items {\
  display: none;\
  flex-direction: column;\
  padding: 0 8px 6px;\
}\
.nav-group-items--open { display: flex; }\
\
/* ── 导航项 ── */\
.nav-item {\
  display: block;\
  padding: 7px 10px;\
  border-radius: 7px;\
  font-family: "Space Mono", monospace;\
  font-size: 11px;\
  color: #5a5a7a;\
  text-decoration: none;\
  transition: all 0.15s;\
  white-space: nowrap;\
  overflow: hidden;\
  text-overflow: ellipsis;\
}\
.nav-item:hover {\
  background: #1e1e2e;\
  color: #e8e8f0;\
}\
.nav-item--active {\
  background: rgba(247,183,49,0.12);\
  color: #f7b731 !important;\
}\
\
/* ── 底部徽章区 ── */\
.sidebar-footer {\
  padding: 12px 16px;\
  border-top: 1px solid #1e1e2e;\
  flex-shrink: 0;\
}\
\
/* ── 页面内容区 ── */\
.page-body {\
  flex: 1;\
  min-width: 0;\
  overflow-y: auto;\
  height: 100vh;\
}\
\
/* ── 遮罩层（移动端） ── */\
.sidebar-overlay {\
  display: none;\
  position: fixed; inset: 0;\
  background: rgba(0,0,0,0.6);\
  z-index: 199;\
}\
.sidebar-overlay--show { display: block; }\
\
/* ── 移动端响应式 ── */\
@media (max-width: 768px) {\
  .sidebar {\
    position: fixed;\
    left: -220px;\
    transition: left 0.25s ease;\
    height: 100%;\
  }\
  .sidebar--open { left: 0; }\
  .sidebar-toggle { display: block; }\
  .page-body { height: 100vh; }\
}\
';
