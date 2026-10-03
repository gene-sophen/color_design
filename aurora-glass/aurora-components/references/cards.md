# 卡片类组件

数值出自 `src/styles/global.css`；项目详情页的 `.pd-panel / .pd-record` 见文末附注。玻璃皮肤与交互态通用配方见 SKILL.md，此处只列差异。

## .pcard —— 项目主卡

主页 `.projects` 两列错落栅格的成员（栅格本身归 aurora-layout）。

```html
<a class="pcard theme-pulse">
  <div class="pcard-top">
    <div class="pcard-title"><span class="pdot"></span><h3>项目名</h3></div>
    <span class="status-chip">Ongoing</span>
  </div>
  <p class="pcard-en">PROJECT NAME</p>
  <p class="pcard-sum">一句话简介…</p>
  <div class="pcard-tech">
    <span class="pill pill--cyan">Astro</span><span class="pill pill--mint">TS</span>
  </div>
  <div class="pcard-meta"><span>PROGRESS</span><span>72%</span></div>
  <span class="ptrack"><span class="pfill" style="width:72%"></span></span>
  <div class="pcard-logs">
    <p class="pcard-logs-label">最近更新</p>
    <a href="#"><span class="d">2026-09-24</span><span class="t">文章标题</span></a>
  </div>
</a>
```

```css
.pcard {
  background: var(--glass-bg);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  border-radius: var(--r-lg);
  padding: 32px 34px;              /* ≤640px: 24px 22px */
  box-shadow: var(--shadow-md);
  transition: transform var(--t-hover) var(--ease), box-shadow var(--t-hover) var(--ease);
}
.pcard:hover  { transform: translateY(-3px); box-shadow: var(--shadow-lg); }
.pcard:active { transform: translateY(-3px) scale(.97); transition-duration: var(--t-press); }
```

内部排版：

- `.pcard-top`：flex 两端对齐，`margin-bottom: 6px`。
- `.pcard-title`：flex `gap: 16px; min-width: 0`；h3 为 `clamp(21px, 2.4vw, 27px)`。
- `.pcard-en`：英文眉题 `600 12px/1 var(--font-display)`，`letter-spacing: .24em`，大写，`--muted`，`margin-bottom: 14px`。
- `.pcard-sum`：16px/1.75，`--body`，`max-width: 62ch`，`margin-bottom: 18px`。
- `.pcard-tech`：flex 包裹 `gap: 8px`，`margin-bottom: 20px`。
- `.pcard-meta`：flex 两端，`600 12px/1 var(--font-display)`，`letter-spacing: .12em`，`--muted`，`margin-bottom: 10px`。
- `.pcard-logs`：`margin-top: 26px; padding-top: 20px; border-top: 1px solid rgba(135,196,237,.3); display: grid; gap: 10px`。每行 `<a>` 为 baseline 对齐 flex `gap: 14px`；`.d` 是 `500 12px/1.6 var(--font-mono)` 日期；`.t` 单行省略且带渐变下划线（`linear-gradient(90deg, var(--cyan), var(--blue))`，hover scaleX 0→1，300ms）。

### 变体：.pcard-poster 海报头

```html
<a class="pcard theme-pulse">
  <div class="pcard-poster"><img src="…" alt="…"></div>
  …
</a>
```

```css
.pcard-poster {
  position: relative;
  margin: -32px -34px 20px;                       /* 吃掉卡 padding，≤640px 为 -24px -22px 16px */
  border-radius: calc(var(--r-lg) - 1px) calc(var(--r-lg) - 1px) 0 0;
  overflow: hidden;
  aspect-ratio: 16 / 9;
}
.pcard-poster img { width: 100%; height: 100%; object-fit: cover; display: block; }
.pcard-poster::after {                            /* 底部白色渐变过渡，保持玻璃卡身通透 */
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(180deg, transparent 55%, rgba(255,255,255,.65));
}
```

## .tile —— 功能砖 / 统计砖

网格之外的横向单行注脚卡（如工具页分组卡）。

```css
.tile {
  align-self: start;
  border-radius: var(--r-lg);
  padding: 24px 26px;
  /* 玻璃皮肤同 .pcard，阴影 --shadow-md，hover/active 同配方 */
}
.tile h3 { font-size: 18px; letter-spacing: -.01em; margin-bottom: 12px; }
.tile .crow { margin: 0 -10px; }   /* 内嵌列表行外扩对齐 */
```

### 变体：.tile--stat 统计砖

```html
<div class="tile tile--stat">
  <div class="stat"><span class="tile-num">12</span><span class="tile-sub">项目</span></div>
</div>
```

```css
.tile--stat { display: flex; gap: 28px; padding: 18px 24px; width: fit-content; margin: 40px auto 0; }
.tile--stat .tile-num { font-size: 26px; }
.tile-num { font: 700 32px/1.1 var(--font-display); letter-spacing: -.01em; color: var(--ink); }
.tile-sub { font-size: 12.5px; color: var(--muted); margin-top: 4px; }
```

## .feat-card —— 推荐文章卡（左缘渐变竖条）

```html
<a class="feat-card theme-misc">
  <div class="feat-top">
    <span class="feat-tags"><span class="group-swatch"></span><span class="chip-feat">精选</span></span>
    <span class="feat-date">2026-09-24</span>
  </div>
  <h3>标题</h3>
  <p>摘要（两行截断）…</p>
</a>
```

```css
.feat-card {
  display: block; position: relative; overflow: hidden;
  /* 玻璃皮肤同 .pcard */
  padding: 28px 32px 28px 36px;    /* 左侧多 4px+ 给竖条；≤640px: 22px 20px 22px 26px */
  margin-bottom: 18px;
}
.feat-card::before {               /* 左缘 4px 项目渐变竖条 */
  content: ""; position: absolute; left: 0; top: 22px; bottom: 22px;
  width: 4px; border-radius: 0 4px 4px 0;
  background: var(--pgrad, var(--grad-misc));
}
.feat-card p {
  font-size: 15px; color: var(--body);
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.feat-date { font-size: 12.5px; color: var(--muted); }
```

## .crow —— 文章列表行

```html
<a class="crow" href="#">
  <span class="crow-title">标题单行省略</span>
  <span class="crow-date">2026-09-24</span>
</a>
```

```css
.crow {
  display: flex; align-items: center; gap: 12px;
  min-height: 42px; padding: 4px 10px; border-radius: 10px;
  transition: background var(--t-hover) var(--ease), box-shadow var(--t-hover) var(--ease), transform var(--t-hover) var(--ease);
}
.crow:hover  { background: rgba(255,255,255,.75); box-shadow: var(--shadow-sm); transform: translateX(3px); }
.crow:active { transform: translateX(3px) scale(.97); transition-duration: var(--t-press); }
.crow-title { flex: 1; min-width: 0; font-size: 15px; color: var(--ink); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.crow-date  { font: 400 12px/1 var(--font-mono); color: var(--muted); flex: 0 0 auto; }
```

注意：行内元素 hover 用 **横向** translateX(3px)，不是卡片的 translateY。

## .proj-banner —— 文末「所属项目」链接卡

```html
<a class="proj-banner theme-pulse" href="/project/slug">
  <span class="pdot"></span>
  <span><span class="pb-label">所属项目</span><span class="pb-name">项目名</span></span>
  <span class="pb-arrow">→</span>
</a>
```

```css
.proj-banner {
  display: flex; align-items: center; gap: 18px;
  margin: 56px 0 0; padding: 24px 28px;
  /* 玻璃皮肤 + hover/active 同 .pcard 配方 */
}
.proj-banner .pb-label { display: block; font: 600 11px/1 var(--font-display); letter-spacing: .2em; color: var(--muted); margin-bottom: 6px; }
.proj-banner .pb-name  { display: block; font: 600 18px/1.3 var(--font-display); }
.proj-banner .pb-arrow { margin-left: auto; font-size: 22px; font-weight: 600; color: var(--muted); }
```

## .pn-nav —— 上一篇 / 下一篇

```html
<nav class="pn-nav">
  <a href="#"><span class="pn-label">← 上一篇</span><span class="pn-title">标题</span></a>
  <a href="#"><span class="pn-label">下一篇 →</span><span class="pn-title">标题</span></a>
</nav>
```

```css
.pn-nav { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 64px; } /* ≤640px 单列 */
.pn-nav a {
  /* 轻玻璃：blur(12px) + --shadow-sm，圆角 --r-md */
  padding: 20px 24px;
}
.pn-nav a:hover  { transform: translateY(-2px); box-shadow: var(--shadow-md); }
.pn-nav a:active { transform: translateY(-2px) scale(.97); transition-duration: var(--t-press); }
.pn-label {  /* 渐变文字眉题 */
  display: block; font: 600 11px/1 var(--font-display); letter-spacing: .18em;
  background: linear-gradient(135deg, #2b6cb0, #0b7d9b);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  margin-bottom: 8px;
}
.pn-title { font-size: 15px; font-weight: 500; color: var(--ink); }
```

## 附：项目详情页的卡片（project-detail.css）

- `.pd-panel`：详情页通用玻璃面板——`padding: 24px; border-radius: var(--r-lg); blur(16px); box-shadow: var(--shadow-md); scroll-margin-top: 110px`。
- `.pd-record`：记录行卡，`display: grid; grid-template-columns: 88px minmax(0,1fr) auto 16px; gap: 20px; padding: 16px 22px; border-radius: var(--r-md)`；hover `background: #ffffffcc; transform: translateX(3px)`。首条 `.is-featured` 升级为完整玻璃卡（`border-radius: var(--r-lg); box-shadow: var(--shadow-md); padding: 24px 27px`）并带 `::before` 左缘 4px `var(--grad-pulse)` 竖条（`top: 23px; bottom: 23px`）。
- `.pd-record .badge` 在记录内缩小为 `600 10px var(--font-mono); padding: 5px 9px`。
- 结构骨架照抄 `src/components/ProjectDetail.astro`。
