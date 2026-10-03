/* ============================================================
   Aurora Glass — motion-reveal.js（可复用资产）
   提炼自项目 public/motion.js，无依赖，可直接 <script defer src="..."> 引入。

   包含：
   - data-reveal 滚动入场（IntersectionObserver + WAAPI，可重复播放，
     同组阶梯延迟 60ms 最多 5 级，含 SVG 图表 .grow-in 生长与 [data-count] 数字滚动）
   - TOC scroll-spy（.toc a[href^="#"] 高亮，纯类切换无动画）
   - 页眉吸附（.site-header 滚动超 8px 加 .is-scrolled）

   不包含（如需自行按 references/motion-patterns.md 配方实现）：
   - wheel 滚轮导航、图表 tooltip、Studio tab 切换

   依赖的 CSS 约定：
   - .js [data-reveal] { opacity: 0 }（初始隐藏由本脚本加 .js 触发，无 JS 直显）
   - .cbar/.cbarh/.cring/.ccell 生长过渡 + .grow-in 终态
   - @media (prefers-reduced-motion: reduce) 全局降级块
   ============================================================ */
(function () {
  'use strict';

  /* 与全局 CSS :root 的动效 token 保持一致（--t-reveal / --ease） */
  var DURATION = 600;                            // --t-reveal
  var EASING = 'cubic-bezier(0.22, 1, 0.36, 1)'; // --ease
  var STAGGER = 60;                              // 阶梯间隔
  var MAX_STEPS = 5;                             // 最多 5 级
  var THRESHOLD = 0.12;

  /* 页眉：滚动超过 8px 加 .is-scrolled（发丝线 + 淡阴影） */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* TOC scroll-spy：纯高亮无动画，不受 prefers-reduced-motion 影响 */
  var toc = document.querySelector('.toc');
  if (toc && 'IntersectionObserver' in window) {
    var tocLinks = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));
    var headingLinks = new Map();
    tocLinks.forEach(function (link) {
      var id = decodeURIComponent(link.getAttribute('href').slice(1));
      var heading = document.getElementById(id);
      if (heading) headingLinks.set(heading, link);
    });
    if (headingLinks.size) {
      var visible = new Set();
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        });
        var active = null;
        headingLinks.forEach(function (link, heading) {
          if (visible.has(heading)) active = link; // Map 按文档序，取视口内最后一个
        });
        if (!active) {
          headingLinks.forEach(function (link, heading) {
            if (heading.getBoundingClientRect().top < 120) active = link; // 回退：视口上方最后一个
          });
        }
        tocLinks.forEach(function (link) {
          link.classList.toggle('is-active', link === active);
        });
      }, { rootMargin: '-96px 0px -55% 0px' });
      headingLinks.forEach(function (_, heading) { spy.observe(heading); });
    }
  }

  /* 降级：减少动效 / 无 IO / 无 WAAPI → 不加 .js，内容直接可见 */
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window) || !Element.prototype.animate) return;

  /* 初始隐藏由 JS 添加：.js [data-reveal] { opacity: 0 }，避免无 JS 隐身 */
  document.documentElement.classList.add('js');

  /* 图表生长：元素内 SVG 图表部件（.cbar/.cbarh/.cring/.ccell）加/去 .grow-in 触发 CSS transition */
  function growCharts(el, on) {
    var parts = el.querySelectorAll('.cbar, .cbarh, .cring, .ccell');
    Array.prototype.forEach.call(parts, function (part) {
      part.classList.toggle('grow-in', on);
    });
  }

  /* 出场重置：取消旧动画，回到隐藏初始态（不积累动画实例） */
  function reset(el) {
    if (el._anim) { el._anim.cancel(); el._anim = null; }
    el.style.opacity = '';                    // 回落到 .js [data-reveal] 的 opacity: 0
    el.style.transform = 'translateY(16px)';  // 入场起点
    growCharts(el, false);                    // 图表回到 0，下次入场重新生长
  }

  /* 数字 count-up：元素入场时 [data-count] 从 0 滚到目标值（700ms cubic-out）。
     无 JS / reduced-motion 时 play() 不执行，服务端渲染的终态直接可见 */
  function countUp(el) {
    if (el._counted) return;
    var nums = el.querySelectorAll('[data-count]');
    if (!nums.length) return;
    el._counted = true;
    Array.prototype.forEach.call(nums, function (node) {
      var target = parseInt(node.getAttribute('data-count'), 10) || 0;
      var start = null;
      node.textContent = '0';
      requestAnimationFrame(function tick(ts) {
        if (start === null) start = ts;
        var t = Math.min(1, (ts - start) / 700);
        var e = 1 - Math.pow(1 - t, 3);
        node.textContent = String(Math.round(target * e));
        if (t < 1) requestAnimationFrame(tick);
      });
    });
  }

  /* 入场播放：每次新建动画，播放前 cancel 旧的；结束后交还样式控制权 */
  function play(el) {
    if (el._anim) { el._anim.cancel(); el._anim = null; }
    growCharts(el, true);                     // 图表从 0 生长到终态
    countUp(el);                              // 数字从 0 滚到目标值
    var anim = el.animate(
      [
        { opacity: 0, transform: 'translateY(16px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ],
      { duration: DURATION, easing: EASING, delay: el._revealDelay || 0, fill: 'forwards' }
    );
    el._anim = anim;
    anim.onfinish = function () {
      if (el._anim !== anim) return;
      anim.cancel();
      el._anim = null;
      el.style.opacity = '1';
      el.style.transform = '';                // 不遮挡 hover 的 transform
    };
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) play(entry.target);
      else reset(entry.target);               // 离开视口 → 重置，等待下次入场
    });
  }, { threshold: THRESHOLD, rootMargin: '0px 0px -8% 0px' }); // 底部 -8%：出场判定稍晚，防抖动

  /* 同区块内子元素阶梯延迟（60ms 递增，最多 5 级）；每次重播延迟照常 */
  var counters = new Map();
  document.querySelectorAll('[data-reveal]').forEach(function (el) {
    var group = el.closest('[data-reveal-group]') || el.parentElement;
    var i = counters.get(group) || 0;
    counters.set(group, i + 1);
    el._revealDelay = Math.min(i, MAX_STEPS - 1) * STAGGER;
    io.observe(el); // 首屏元素 observe 后立即回调入场，不等滚动
  });
})();
