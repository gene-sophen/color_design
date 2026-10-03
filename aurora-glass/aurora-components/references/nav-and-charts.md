# 导航、时间线与图表容器

出处 `src/styles/global.css` + `src/components/Nav.astro` / `TechMap.astro`。入场/生长动效的触发机制（`.js`、`.grow-in`、`data-reveal`）归 aurora-motion，这里只给终态样式与钩子。

## .site-header / .nav-links —— 顶栏

```html
<header class="site-header">
  <div class="container site-nav-inner">
    <a class="logo" href="/">站点名</a>
    <nav class="nav-links" aria-label="主导航">
      <div class="wheel" data-wheel>…</div>
      <span class="nav-sep" aria-hidden="true"></span>
      <a href="/" aria-current="page"><svg/>首页</a>
      <a href="/articles"><svg/>项目</a>
    </nav>
  </div>
</header>
```

```css
.site-header {
  position: sticky; top: 0; z-index: 50;
  background: rgba(248,251,255,.72);
  -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px);
  transition: box-shadow var(--t-hover) var(--ease);
}
.site-header.is-scrolled { box-shadow: 0 1px 0 rgba(135,196,237,.4), 0 10px 30px rgba(15,23,42,.05); }

/* logo：文字 + ::before 12px 渐变方块（--grad-pulse，圆角 4px） */
.logo { font: 700 20px/1 var(--font-display); letter-spacing: -.01em; display: inline-flex; align-items: center; gap: 9px; }
.logo:active { transform: scale(.97); transition-duration: var(--t-press); }

/* 页面项链接（仅直接子级，滚轮内链接走 .wheel 样式） */
.nav-links > a {
  position: relative; display: inline-flex; align-items: center; gap: 6px;
  font-size: 15px; color: var(--muted);
  padding: 8px 12px; min-height: 40px; border-radius: var(--r-pill);
  transition: color var(--t-hover) var(--ease), background var(--t-hover) var(--ease), transform var(--t-hover) var(--ease);
}
.nav-links > a::after {  /* 渐变下划线，从左滑入 */
  content: ""; position: absolute; left: 14px; right: 14px; bottom: 2px;
  height: 2px; border-radius: 2px; background: var(--grad-pulse);
  transform: scaleX(0); transform-origin: left;
  transition: transform 300ms var(--ease);
}
.nav-links > a:hover { background: rgba(255,255,255,.5); color: var(--ink); }
.nav-links > a:hover::after { transform: scaleX(1); }
.nav-links > a[aria-current="page"] {
  color: #245e83; font-weight: 500;
  background: rgba(255,255,255,.8);
  box-shadow: 0 2px 10px rgba(32,92,122,.04);
}
.nav-links > a[aria-current="page"]::after { transform: scaleX(1); }
.nav-links > a:active { transform: scale(.97); transition-duration: var(--t-press); }
.nav-sep { width: 1px; height: 16px; background: rgba(122,185,240,.45); flex: 0 0 auto; margin: 0 8px; }
```

## .wheel —— 滚轮区块导航（收起/展开机制）

结构（照抄 Nav.astro）：图标 + 链接组 + 右端标签，三段都在文档流内。

```html
<div class="wheel" data-wheel aria-label="区块导航">
  <span class="wheel-icon" aria-hidden="true"><svg/></span>
  <span class="wheel-links">
    <span class="wheel-indicator" aria-hidden="true"></span>
    <a href="/#identity" data-anchor="identity" class="is-active">简介</a>
    <a href="/#projects" data-anchor="projects">项目</a>
    …
  </span>
  <span class="wheel-label"><span class="wheel-label-text">简介</span></span>
</div>
```

机制要点（数值照抄，勿改时序——编排理由见源码注释与 aurora-motion）：

```css
.wheel {
  position: relative; display: inline-flex; align-items: center;
  /* 轻玻璃 blur(12px) + --r-pill + --shadow-sm */
  padding: 4px; white-space: nowrap; min-height: 42px; flex-shrink: 0;
}
.wheel-links {
  position: relative;            /* 指示器 offsetParent 恒定 */
  display: inline-flex; align-items: center;
  max-width: 0; overflow: hidden; white-space: nowrap;
  transition: max-width 380ms var(--ease);   /* 收起稍快 */
}
.wheel:hover .wheel-links, .wheel:focus-within .wheel-links {
  max-width: 600px;                          /* 上限而已，实际宽度=内容 */
  transition: max-width 620ms var(--ease);   /* 展开放慢 */
}
```

- 收起/展开**只动 max-width**；不对容器做 opacity 过渡（整组上合成层会让文字次像素发虚），淡入淡出由各链接自己承担：默认 `opacity: 0; transition: … opacity 150ms`（收起快速退场），展开时 `opacity: 1; transition: … opacity 300ms var(--ease) 150ms`（容器拉宽后显现）。
- `.wheel-links a`：`font-size: 13.5px; padding: 6px 10px; border-radius: var(--r-pill)`，按内容自适应宽度；`.is-active` 为 `--ink` + 500 字重。
- `.wheel-label`（收起态当前段标签，位于右端）：`max-width: 5.5em`，padding 与段链接一致（`6px 10px`）保证 crossfade 像素级重合；展开时 `max-width: 0; opacity: 0; transition: max-width 400ms, opacity 100ms`（文字先走），收起时 `opacity 150ms delay 200ms`（链接退完后回来）。标签文字切换由 JS 驱动内层 `.wheel-label-text` 的 translateX 滑入滑出。
- `.wheel-indicator`（激活段蓝底）：`position: absolute; background: rgba(122,185,240,.22); border-radius: var(--r-pill)`；展开瞬间由 JS 无过渡直置激活段位置再原地淡入（`opacity 200ms delay 300ms`），展开后 spy/点击滑动 350ms。
- ≤860px 时 `.wheel` 与 `.nav-sep` 整体 `display: none`。

## .link-ul —— 渐变下划线文字链接

```css
.link-ul { position: relative; display: inline-block; font-weight: 500; color: #2b6cb0;
  transition: transform var(--t-hover) var(--ease), color var(--t-hover) var(--ease); }
.link-ul:hover { color: var(--blue); }
.link-ul::after {
  content: ""; position: absolute; left: 0; bottom: -3px; width: 100%; height: 2px; border-radius: 2px;
  background: linear-gradient(90deg, var(--cyan), var(--blue));
  transform: scaleX(0); transform-origin: left; transition: transform 300ms var(--ease);
}
.link-ul:hover::after { transform: scaleX(1); }
.link-ul:active { transform: scale(.97); transition-duration: var(--t-press); }
```

## .timeline —— 里程碑

```html
<div class="timeline">
  <div class="tl-item">
    <span class="tl-date">2026-09</span>
    <p class="tl-title">节点标题</p>
    <p class="tl-desc">描述</p>
  </div>
</div>
```

```css
.timeline { position: relative; max-width: 680px; padding-left: 30px; }
.timeline::before {  /* 左侧 2px 渐变轴 */
  content: ""; position: absolute; left: 6px; top: 8px; bottom: 8px; width: 2px; border-radius: 2px;
  background: linear-gradient(180deg, rgba(90,215,242,.6), rgba(112,244,191,.6), rgba(63,143,239,.5));
}
.tl-item { position: relative; padding-bottom: 26px; }
.tl-item:last-child { padding-bottom: 0; }
.tl-item::before {  /* 12px 节点圆点，白色光晕 */
  content: ""; position: absolute; left: -29px; top: 5px;
  width: 12px; height: 12px; border-radius: 50%;
  background: var(--tl-dot, var(--grad-pulse));
  box-shadow: 0 0 0 4px rgba(255,255,255,.75);
}
/* 圆点色按 4n 轮换 pulse → mq → avalon → misc */
.tl-item:nth-child(4n+1) { --tl-dot: var(--grad-pulse); }
.tl-item:nth-child(4n+2) { --tl-dot: var(--grad-mq); }
.tl-item:nth-child(4n+3) { --tl-dot: var(--grad-avalon); }
.tl-item:nth-child(4n+4) { --tl-dot: var(--grad-misc); }
.tl-date  { display: block; font: 500 12.5px/1.5 var(--font-mono); color: var(--muted); margin-bottom: 2px; }
.tl-title { font: 600 16px/1.5 var(--font-display); color: var(--ink); }
.tl-desc  { font-size: 14px; color: var(--body); }
```

## .arch —— 架构节点流

```html
<div class="arch">
  <span class="arch-node">采集</span><span class="arch-link"></span>
  <span class="arch-node">存储</span><span class="arch-link"></span>
  <span class="arch-node">渲染</span>
</div>
```

```css
.arch { display: flex; align-items: center; flex-wrap: wrap; row-gap: 18px; margin-bottom: 8px; }
.arch-node {
  font: 600 13.5px/1 var(--font-display); color: var(--ink);
  background: rgba(90,215,242,.12);
  border: 1px solid rgba(135,196,237,.45);
  border-radius: var(--r-pill);
  padding: 11px 20px; white-space: nowrap;
}
.arch-node:nth-of-type(4n+3) {  /* 每第 3 个节点换薄荷色 */
  background: rgba(112,244,191,.14); border-color: rgba(112,244,191,.5);
}
.arch-link {
  width: 40px; height: 2px; border-radius: 2px; flex: 0 0 auto; margin: 0 6px;
  background: linear-gradient(90deg, var(--cyan), var(--blue));
}
```

## SVG 图表承载卡与钩子

图表本体是服务端渲染的内联 SVG（终态写在 SVG 属性上，无 JS 也可见）；JS 只负责入场生长（细节归 aurora-motion）。

- `.chart { display: block; overflow: visible; }`
- 柱子 `.cbar`（纵向 scaleY）/ `.cbarh`（横向 scaleX）/ 环 `.cring`（stroke-dashoffset）：`.js` 下初态收为 0，加 `.grow-in` 回到终态；`.cring-text` 用 mono 600、`fill: var(--ink)`。
- `.cloud-card`（词云卡）：`padding: 32px 28px`，内放 `.chart-cloud`（`width: 100%; height: auto`）。套在玻璃容器（tile/panel 皮肤）上使用。
- `.arch-card`（架构图卡）：`padding: 26px 28px`，内放 `.chart-arch`。
- `.stat-card:hover .chart { transform: scale(1.02); }` —— 仪表组唯一允许的图表 hover。

## .heatmap —— 贡献热力图

```html
<div class="updates-panel">
  <div class="heatmap">
    <svg class="chart-heatmap">…<rect class="ccell" style="--i:7"/>…</svg>
  </div>
  <p class="updates-panel-stat">近一年 <b>248</b> 次更新</p>
</div>
```

```css
.updates-panel {  /* 章节头右侧的轻玻璃卡 */
  display: grid; gap: 10px;
  /* blur(12px) + --r-lg + --shadow-sm */
  padding: 16px 18px;
}
.updates-panel-stat { font-size: 12.5px; color: var(--muted); }
.updates-panel-stat b { font-family: var(--font-mono); font-weight: 600; color: var(--ink); }
.heatmap { overflow-x: auto; }
.heatmap .chart-heatmap { max-width: 100%; height: auto; }
.ccell { transition: transform .6s var(--ease); transition-delay: calc(var(--i, 0) * 35ms); }
.js .ccell { transform: scale(0); transform-box: fill-box; transform-origin: center; }
.js .ccell.grow-in { transform: none; }
```

格子色阶在绿青蓝范围内（GitHub 绿点墙风格），具体色值见 aurora-color。

## .chart-tooltip —— 图表提示浮层（单例，JS 定位）

```css
.chart-tooltip {
  position: fixed; z-index: 90;
  background: rgba(255,255,255,.88);
  -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
  border: 1px solid rgba(122,185,240,.5);
  border-radius: 8px;
  padding: 5px 10px;
  font: 500 12px/1.4 var(--font-mono);
  color: var(--ink);
  box-shadow: var(--shadow-sm);
  pointer-events: none; white-space: nowrap;
  opacity: 0; transform: translateY(3px);
  transition: opacity 150ms var(--ease), transform 150ms var(--ease);
}
.chart-tooltip.is-show { opacity: 1; transform: translateY(0); }
```

全页只挂一个 `.chart-tooltip` 元素，由 JS 复用定位。
