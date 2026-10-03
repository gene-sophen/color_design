# Aurora Motion 配方库

每类动效给出「触发时机 + CSS/JS 配方」。所有数值取自项目真实代码（`src/styles/global.css`、`public/motion.js`），直接照抄，不要改参数。通用 token：`--t-press: 120ms`、`--t-hover: 200ms`、`--t-reveal: 600ms`、`--ease: cubic-bezier(0.22, 1, 0.36, 1)`。

## 1. 滚动入场（scroll reveal）

**触发时机**：区块/卡片随滚动进入视口时淡入上移；离开视口后重置，再次进入重播。同组子元素阶梯延迟。

**CSS**（初始隐藏带 `.js` 前缀，由 JS 加类，无 JS 直显）：

```css
.js [data-reveal] { opacity: 0; }
```

**JS**：完整实现见 `../assets/motion-reveal.js`。要点：

- 守卫：`prefers-reduced-motion` / 无 `IntersectionObserver` / 无 `Element.prototype.animate` → 直接 return，不加 `.js`。
- WAAPI 播放：`{ opacity: 0, transform: 'translateY(16px)' }` → `{ opacity: 1, transform: 'translateY(0)' }`，`duration: 600`，`easing` 用 `--ease` 同值，`fill: 'forwards'`。
- 阶梯：同组（`[data-reveal-group]` 或同一父元素）内按文档序 `delay = min(i, 4) * 60ms`。
- 观察器：`threshold: 0.12`，`rootMargin: '0px 0px -8% 0px'`（底部 -8%，出场判定稍晚防抖动）。`isIntersecting` 播放入场，否则重置（cancel 旧动画、回到 `translateY(16px)` 起点、图表回到 0）。
- `onfinish` 后 cancel 动画并交还样式：`el.style.opacity = '1'; el.style.transform = ''`，避免遮挡 hover 的 transform。

**HTML 用法**：

```html
<div data-reveal-group>
  <article data-reveal>…</article>
  <article data-reveal>…</article>
</div>
```

## 2. hover 抬升 / 按压

**触发时机**：可点击的卡片、按钮、链接的 hover 与 active 反馈。

**CSS 配方**（大卡片抬 3px、小元素抬 2px，阴影同步升档；active 在 hover 位移基础上追加 scale，时长切到按压档）：

```css
.card {
  transition: transform var(--t-hover) var(--ease), box-shadow var(--t-hover) var(--ease);
}
.card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); }
.card:active { transform: translateY(-3px) scale(.97); transition-duration: var(--t-press); }
```

项目内的既定变体：

| 元素 | hover | active scale |
|---|---|---|
| `.pcard` `.tile` `.feat-card` `.proj-banner` | `translateY(-3px)` | `.97` |
| `.proj-capsule` `.pn-nav a` `.btn-grad` `.btn-soft` `.media-card` `.proj-row` | `translateY(-2px)` | `.97`（`.proj-row` 用 `.98`） |
| `.crow`（列表行） | `translateX(3px)` + 白底 + 浅阴影 | `.97` |
| `.link-ul` `.nav-links > a` `.tab` `.chip`（无位移类） | 变色/底色 | `.97` |
| `.toggle` `.pager a` | 变色 | `.94` |
| `.dropzone` | 边框/底色加深 | `.99` |

新增元素按尺寸与层级从上表选最近的一档，不要发明新档位。

## 3. 渐变下划线滑入

**触发时机**：文字链接 hover，下划线从左向右展开。

```css
.link-ul { position: relative; display: inline-block; }
.link-ul::after {
  content: "";
  position: absolute;
  left: 0; bottom: -3px;
  width: 100%; height: 2px;
  border-radius: 2px;
  background: linear-gradient(90deg, var(--cyan), var(--blue));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 300ms var(--ease);
}
.link-ul:hover::after { transform: scaleX(1); }
```

导航链接变体：下划线 `left: 14px; right: 14px; bottom: 2px`，背景用 `var(--grad-pulse)`；当前页 `[aria-current="page"]::after` 常显 `scaleX(1)`。

## 4. SVG 图表生长（stagger）

**触发时机**：含图表的 `[data-reveal]` 元素入场时，JS 给图表部件加 `.grow-in`，CSS transition 从 0 生长到终态；出场重置时移除 `.grow-in`。终态写在 SVG 属性上，初始 0 态只在 `.js` 下存在——无 JS 图表直接可见。

**CSS**：

```css
.cbar  { transition: transform .7s var(--ease); transition-delay: calc(var(--i, 0) * 40ms); }
.cbarh { transition: transform .7s var(--ease); }
.cring { transition: stroke-dashoffset .8s var(--ease); }
.js .cbar  { transform: scaleY(0); transform-box: fill-box; transform-origin: center bottom; }
.js .cbarh { transform: scaleX(0); transform-box: fill-box; transform-origin: left center; }
.js .cring { stroke-dashoffset: var(--dash); }
.js .cbar.grow-in, .js .cbarh.grow-in { transform: none; }
.js .cring.grow-in { stroke-dashoffset: var(--off); }

.ccell { transition: transform .6s var(--ease); transition-delay: calc(var(--i, 0) * 35ms); }
.js .ccell { transform: scale(0); transform-box: fill-box; transform-origin: center; }
.js .ccell.grow-in { transform: none; }
```

要点：

- `transform-box: fill-box` 必须写，否则 transform-origin 相对整个 SVG 而非自身。
- 柱状图逐根给 `style="--i: 0|1|2|…"` 产生 40ms stagger；热力图格子 35ms；横条与圆环无 stagger。
- 圆环在 SVG 上准备两个自定义属性：`--dash`（全空 offset）与 `--off`（目标 offset）。

**JS**（随 reveal 播/收）：

```js
function growCharts(el, on) {
  el.querySelectorAll('.cbar, .cbarh, .cring, .ccell').forEach(function (part) {
    part.classList.toggle('grow-in', on);
  });
}
```

**数字 count-up**（可选搭配）：元素入场时 `[data-count]` 从 0 滚到目标值，`700ms`，缓动 `1 - Math.pow(1 - t, 3)`（cubic-out），rAF 驱动；无 JS / reduced-motion 时服务端渲染的终态直接可见。

## 5. wheel 滚轮导航展开/收起

**触发时机**：页眉区块导航 `.wheel`，收起态 = 图标 + 当前段标签；`:hover` / `:focus-within` 展开为全部段链接。结构（在流布局，内部位置恒定，指示器才能瞬置无闪现）：

```html
<span class="wheel">
  <span class="wheel-icon">…</span>
  <span class="wheel-links">
    <span class="wheel-indicator"></span>
    <a data-anchor="section-id">…</a>
  </span>
  <span class="wheel-label"><span class="wheel-label-text">当前段</span></span>
</span>
```

**展开时序**（hover/focus-within 进入）：

1. `.wheel-label` 文字先走：`opacity 100ms`、`max-width 400ms` 收没。
2. `.wheel-links` 容器拉宽：`max-width 0 → 600px`，`620ms`（展开放慢，看清拉宽过程）。
3. 各链接显现：`opacity 300ms`，延迟 `150ms`（等容器拉开后）。
4. 指示器蓝底最后浮现：`opacity/scale 200ms`，延迟 `300ms`；`transform/width` 恒为 `350ms`。

**收起时序**（全部加快退场）：

1. 链接快速退场：`opacity 150ms`，无延迟。
2. 容器收没：`max-width 380ms`（收起稍快）。
3. 标签回来：`opacity 150ms` 延迟 `200ms`（链接退完后），`max-width 350ms`。
4. 指示器快速隐去：`opacity/scale 120ms`，无延迟。

**CSS 关键片段**：

```css
.wheel-links { max-width: 0; overflow: hidden; transition: max-width 380ms var(--ease); }
.wheel:hover .wheel-links, .wheel:focus-within .wheel-links {
  max-width: 600px; transition: max-width 620ms var(--ease);
}
.wheel-links a { opacity: 0; transition: color var(--t-hover) var(--ease), opacity 150ms var(--ease); }
.wheel:hover .wheel-links a, .wheel:focus-within .wheel-links a {
  opacity: 1; transition: color var(--t-hover) var(--ease), opacity 300ms var(--ease) 150ms;
}
.wheel-label { max-width: 5.5em; overflow: hidden; transition: max-width 350ms var(--ease), opacity 150ms var(--ease) 200ms; }
.wheel:hover .wheel-label, .wheel:focus-within .wheel-label {
  max-width: 0; opacity: 0; transition: max-width 400ms var(--ease), opacity 100ms var(--ease);
}
.wheel-indicator {
  position: absolute; top: 0; left: 0; height: 100%; width: 0;
  border-radius: var(--r-pill);
  background: rgba(122, 185, 240, .22);
  opacity: 0; scale: .95; pointer-events: none;
  transition: transform 350ms var(--ease), width 350ms var(--ease), opacity 120ms var(--ease), scale 120ms var(--ease);
}
.wheel:hover .wheel-indicator, .wheel:focus-within .wheel-indicator {
  opacity: 1; scale: 1;
  transition: transform 350ms var(--ease), width 350ms var(--ease), opacity 200ms var(--ease) 300ms, scale 200ms var(--ease) 300ms;
}
```

**JS 要点**：

- 展开瞬间（`mouseenter`/`focusin`）指示器无过渡直置激活段位置：`indicator.style.transition = 'none'` → 写 `width`/`translateX` → `void indicator.offsetWidth` 强制 reflow → 恢复 transition。只做原地淡入，不播旅行动画。
- 展开后 scroll-spy / 点击驱动的滑动保留 350ms transform 过渡。
- scroll-spy：IntersectionObserver `rootMargin: '-30% 0px -55% 0px'`，取视口内文档序最后一个 section；无命中时回退「`getBoundingClientRect().top < 160` 的最后一个」。
- 初始定位：`requestAnimationFrame` 一次 + `document.fonts.ready` 后再校一次 + `resize` 时重校。

## 6. 极光背景漂移

**触发时机**：全页面背景氛围层，60s 极缓往返漂移，人眼几乎察觉不到在运动。

直接用 `../assets/aurora-background.css`（含 `.aurora`、`@keyframes aurora-sway`、body 背景约定与 reduced-motion 降级，文件头有用法注释）。核心参数：

```css
.aurora {
  position: absolute;
  top: -4%; left: -3%;
  width: 106%; height: 108%;
  z-index: -1;
  pointer-events: none;
  animation: aurora-sway 60s var(--ease) infinite alternate;
}
@keyframes aurora-sway {
  from { transform: translate3d(-1.5%, -1%, 0); }
  to   { transform: translate3d(1.5%, 1%, 0); }
}
```

SVG 结构（S 形双光带，高斯模糊）：两条 path 共用渐变 `#5ad7f2 → #3f8fef → #70f4bf`，`feGaussianBlur stdDeviation="80"`，主带 `stroke-width="360"` `opacity=".13"`，副带 `stroke-width="280"` `opacity=".08"`；`viewBox="0 0 1200 3200"` + `preserveAspectRatio="none"` 随页面高度拉伸。`overflow-x: clip` 在 body 上，防止光带溢出产生横向滚动条。

## 7. 图表 tooltip 淡入

**触发时机**：hover/focus 热力图格子（`.ccell[data-tip]`）时弹出气泡；滚动时隐藏。

**CSS**：

```css
.chart-tooltip {
  position: fixed; z-index: 90;
  background: rgba(255, 255, 255, .88);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(122, 185, 240, .5);
  border-radius: 8px;
  padding: 5px 10px;
  box-shadow: var(--shadow-sm);
  pointer-events: none; white-space: nowrap;
  opacity: 0; transform: translateY(3px);
  transition: opacity 150ms var(--ease), transform 150ms var(--ease);
}
.chart-tooltip.is-show { opacity: 1; transform: translateY(0); }
```

**JS 要点**：单例复用（首次用时创建 `div.chart-tooltip[role=tooltip]` 挂 body）；定位 = 格子中心上方，左右按视口钳制 `8px`，顶部放不下（`top < 8`）时翻到格子下方；事件委托 `mouseover`/`mouseout`/`focusin`/`focusout` + `scroll` 时隐藏。

## 8. 文字滑入滑出（wheel-label-text，WAAPI）

**触发时机**：wheel 收起态下滚动切换区块时，标签文字横向滑动切换。向下滚（进入后段）→ 新文字从右滑入、旧文字从左滑出；向上滚反之。

**CSS**：容器只需裁剪与基态。

```css
.wheel-label-text { display: inline-block; opacity: 1; transform: none; }
```

**JS 要点**（完整实现见 `public/motion.js` 的 `swapLabel`）：

- 旧文字滑出：`translateX(0) → translateX(∓110%)`，`opacity 1 → 0`，`duration: 140`，`fill: 'forwards'`。
- `onfinish` 后换 `textContent`，新文字滑入：`translateX(±110%) → 0`，`opacity 0 → 1`，`duration: 160`（无 fill）。
- 防竞态：revision 计数器 + 播放前 cancel 旧动画；`onfinish` 里校验 revision 再续播。
- `prefers-reduced-motion` 或不支持 WAAPI → 直接换文本；监听偏好 `change` 时立即停动画还原终态文本。

## 9. 页眉吸附（.is-scrolled）

**触发时机**：页面下滑后页眉出现发丝线与淡阴影，区分内容层。

```css
.site-header { transition: box-shadow var(--t-hover) var(--ease); }
.site-header.is-scrolled {
  box-shadow: 0 1px 0 rgba(135, 196, 237, .4), 0 10px 30px rgba(15, 23, 42, .05);
}
```

```js
window.addEventListener('scroll', function () {
  header.classList.toggle('is-scrolled', window.scrollY > 8);
}, { passive: true });
```

## 附：TOC scroll-spy（无动画）

纯高亮、无过渡，因此不受 reduced-motion 影响也不进降级块：IntersectionObserver `rootMargin: '-96px 0px -55% 0px'`，取视口内文档序最后一个标题；无命中回退「视口上方（`top < 120`）最后一个」；给对应链接切 `.is-active`。实现见 `../assets/motion-reveal.js`。
