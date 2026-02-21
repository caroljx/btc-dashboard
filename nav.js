/**
 * nav.js — 共用导航栏
 *
 * 使用方法：
 *   1. 在 HTML 的 <head> 里引入：<script src="nav.js"></script>
 *   2. 在 <body> 最顶部放：<div id="nav-root"></div>
 *   3. 调用：renderNav('当前页面的key')
 *
 * 新增页面时，只需在下面的 NAV_ITEMS 里加一行。
 */

// ── 导航菜单配置 ────────────────────────────────────
// 新增页面：在对应分类下加一个对象即可
// { key: '唯一标识', label: '显示名称', file: '文件名.html' }

var NAV_ITEMS = {
  indicators: [
    { key: 'cvdd',  label: 'CVDD',              file: 'bitcoin-dashboard.html#cvdd' },
    { key: '2yma',  label: '2-Year MA',          file: '2yma.html' },
    { key: '200wma', label: '200W MA Heatmap', file: '200wma.html' },
    { key: 'fng', label: 'Fear & Greed', file: 'fng.html' },
    // 在这里继续添加指标页面 ↓
  ],
  tools: [
    { key: 'dca',   label: 'DCA 投资模拟',       file: 'dca-simulator.html' },
    // 在这里继续添加工具页面 ↓
  ],
};

// ── 渲染导航 ────────────────────────────────────────
function renderNav(currentKey) {
  var root = document.getElementById('nav-root');
  if (!root) return;

  // 构建「指标」下拉菜单
  var indicatorItems = NAV_ITEMS.indicators.map(function(item) {
    var active = item.key === currentKey ? 'nav-dropdown-item--active' : '';
    return '<a href="' + item.file + '" class="nav-dropdown-item ' + active + '">' + item.label + '</a>';
  }).join('');

  // 构建「工具」下拉菜单
  var toolItems = NAV_ITEMS.tools.map(function(item) {
    var active = item.key === currentKey ? 'nav-dropdown-item--active' : '';
    return '<a href="' + item.file + '" class="nav-dropdown-item ' + active + '">' + item.label + '</a>';
  }).join('');

  root.innerHTML =
    '<nav class="site-nav">' +
      '<a href="bitcoin-dashboard.html" class="nav-logo">' +
        '<div class="nav-btc-icon">&#8383;</div>' +
        '<div class="nav-logo-text">BTC <span>Dashboard</span></div>' +
      '</a>' +
      '<div class="nav-links">' +
        // 指标下拉
        '<div class="nav-dropdown">' +
          '<button class="nav-dropdown-trigger">指标 &#9662;</button>' +
          '<div class="nav-dropdown-menu">' + indicatorItems + '</div>' +
        '</div>' +
        // 工具下拉
        '<div class="nav-dropdown">' +
          '<button class="nav-dropdown-trigger">工具 &#9662;</button>' +
          '<div class="nav-dropdown-menu">' + toolItems + '</div>' +
        '</div>' +
      '</div>' +
      // 倒计时徽章（只在主页显示，其他页面为空）
      '<div id="nav-badge"></div>' +
    '</nav>';

  // 下拉菜单交互
  document.querySelectorAll('.nav-dropdown').forEach(function(dropdown) {
    var trigger = dropdown.querySelector('.nav-dropdown-trigger');
    var menu    = dropdown.querySelector('.nav-dropdown-menu');
    trigger.addEventListener('click', function(e) {
      e.stopPropagation();
      // 关闭其他已打开的菜单
      document.querySelectorAll('.nav-dropdown-menu--open').forEach(function(m) {
        if (m !== menu) m.classList.remove('nav-dropdown-menu--open');
      });
      menu.classList.toggle('nav-dropdown-menu--open');
    });
  });

  // 点击页面其他地方关闭菜单
  document.addEventListener('click', function() {
    document.querySelectorAll('.nav-dropdown-menu--open').forEach(function(m) {
      m.classList.remove('nav-dropdown-menu--open');
    });
  });

  // 注入样式（只注入一次）
  if (!document.getElementById('nav-style')) {
    var style = document.createElement('style');
    style.id  = 'nav-style';
    style.textContent = NAV_CSS;
    document.head.appendChild(style);
  }
}

// ── 导航样式 ────────────────────────────────────────
var NAV_CSS = '\
.site-nav {\
  display: flex;\
  align-items: center;\
  justify-content: space-between;\
  padding: 20px 40px;\
  border-bottom: 1px solid #1e1e2e;\
  background: #0a0a0f;\
  position: relative;\
  z-index: 100;\
}\
.nav-logo {\
  display: flex; align-items: center; gap: 12px;\
  text-decoration: none;\
}\
.nav-btc-icon {\
  width: 36px; height: 36px;\
  background: #f7b731;\
  border-radius: 50%;\
  display: flex; align-items: center; justify-content: center;\
  font-weight: 800; color: #000; font-size: 16px;\
  box-shadow: 0 0 16px rgba(247,183,49,0.4);\
}\
.nav-logo-text {\
  font-family: Syne, sans-serif;\
  font-size: 18px; font-weight: 800;\
  letter-spacing: 0.05em; color: #e8e8f0;\
}\
.nav-logo-text span { color: #f7b731; }\
.nav-links {\
  display: flex; align-items: center; gap: 8px;\
}\
.nav-dropdown { position: relative; }\
.nav-dropdown-trigger {\
  background: none;\
  border: 1px solid #1e1e2e;\
  color: #5a5a7a;\
  font-family: "Space Mono", monospace;\
  font-size: 12px;\
  padding: 7px 16px;\
  border-radius: 20px;\
  cursor: pointer;\
  transition: all 0.2s;\
  letter-spacing: 0.05em;\
}\
.nav-dropdown-trigger:hover {\
  color: #f7b731;\
  border-color: #a07820;\
}\
.nav-dropdown-menu {\
  display: none;\
  position: absolute;\
  top: calc(100% + 8px);\
  right: 0;\
  background: #13131a;\
  border: 1px solid #1e1e2e;\
  border-radius: 10px;\
  padding: 6px;\
  min-width: 180px;\
  box-shadow: 0 8px 32px rgba(0,0,0,0.5);\
  z-index: 200;\
}\
.nav-dropdown-menu--open { display: block; }\
.nav-dropdown-item {\
  display: block;\
  padding: 9px 14px;\
  border-radius: 7px;\
  font-family: "Space Mono", monospace;\
  font-size: 12px;\
  color: #5a5a7a;\
  text-decoration: none;\
  transition: all 0.15s;\
  letter-spacing: 0.03em;\
}\
.nav-dropdown-item:hover {\
  background: #1e1e2e;\
  color: #e8e8f0;\
}\
.nav-dropdown-item--active {\
  color: #f7b731;\
}\
@media (max-width: 600px) {\
  .site-nav { padding: 16px 20px; }\
  .nav-logo-text { font-size: 15px; }\
}\
';
