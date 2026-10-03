# Aurora Layout — 页面布局模式

每种模式给出：适用场景 → HTML 骨架 → 关键 CSS。所有数值摘自项目真实源码（`src/styles/global.css`、`home.css`、`project-detail.css`、`admin.css`）。玻璃皮肤、徽章、按钮等组件外观见 aurora-components；色值见 aurora-color；动效见 aurora-motion。

## 通用规则

- 栅格列轨道一律 `minmax(0, 1fr)`，主区列加 `min-width: 0`——防止长标题/宽表格撑破栅格。
- 多栏栅格容器加 `align-items: start`，让 sticky 侧栏有滚动行程。
- 所有 sticky 侧栏桌面端 `top: 104px`（站点头部约 84px + 20px 呼吸间距）；后台无站点头部，用 `top: 24px`。
- ≤980px 时一切多栏塌缩单列、sticky 全部解除（细则见 responsive.md）。

---

## 模式 1：首页 —— hero 双栏 + 错落项目栅格

**适用场景**：首页（`src/pages/index.astro`）及任何「身份介绍 + 作品陈列」型首屏。首页整体是楼层式：每个 `.studio-floor` 满一屏（`min-height: calc(100svh - 90px)`），容器内是 `minmax(0,1fr) var(--lane)` 双列——主内容 + 130px 吉祥物侧轨（`--lane: 130px`，≤1100px 缩到 90px，≤760px 隐藏）。

### Hero 双栏

```html
<section class="hero studio-hero" id="identity">
  <div class="container">
    <div class="floor-caption"><span>01</span> A PERSONAL SPACE</div>
    <div class="hero-inner">
      <div>
        <h1 class="hero-name"><span class="pdot"></span>名字</h1>
        <div class="hero-tags"><span class="pill pill--cyan">…</span></div>
        <p class="hero-intro">…</p>
        <div class="hero-links"><a class="link-ul" href="…">…</a></div>
        <div class="hero-status"><span>当前状态</span><b>…</b></div>
      </div>
      <div class="mascot-home-space" aria-hidden="true"></div>
    </div>
    <a class="studio-explore" href="#projects">查看项目 ↓</a>
  </div>
</section>
```

```css
/* global.css —— 通用 hero */
.hero { padding: 64px 0 88px; }
.hero-inner {
  display: grid;
  grid-template-columns: 1.15fr .85fr;  /* 左文右饰，文略宽 */
  gap: 64px;
  align-items: center;
}
/* home.css —— 首页覆写：更满的满屏 hero */
.studio-hero { min-height: calc(100svh - 90px); padding: 48px 0 26px; display: flex; }
.studio-hero .hero-inner { flex: 1; min-height: 440px; grid-template-columns: 1.12fr 1fr; gap: 85px; }
.hero-intro { max-width: 46ch; }              /* 首页覆写为 40ch */
```

右栏装饰（非首页可用 `.hero-orbs` 模糊渐变 orb，≤980px 隐藏）；首页右栏是吉祥物占位 `.mascot-home-space`（min-height 360px）。

### 错落项目栅格

```html
<div class="projects">
  <article class="pcard theme-pulse">…</article>
  <article class="pcard theme-mq">…</article>
  <!-- 卡片数量不限，主题类按序循环 theme-pulse/mq/avalon/misc -->
</div>
```

```css
/* 两列等宽；右列用 :nth-child(even) 下沉 48px。
   不写死 grid-row，任意数量卡片都不会重叠 */
.projects {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
}
.projects > .pcard:nth-child(even) { margin-top: 48px; }
```

要点：错落靠 `margin-top` 而非显式行定位实现，增删卡片零成本；≤980px 单列且 `margin-top` 归零。首页项目卡额外加 `.studio-project-card`（min-height 220px、纵向 flex）。统计砖 `.tile--stat` 是栅格外的横向注脚：`width: fit-content; margin: 40px auto 0`。

---

## 模式 2：章节式 log 索引 —— 12 列栅格 + sticky 章节侧栏

**适用场景**：文章索引页（`src/pages/articles/index.astro`）及任何「按组归档的列表」。每个章节是一个 `.section`（可用 `.tint-a`/`.tint-b` 极淡彩带交替底色），内部 12 列栅格。

```html
<section class="section tint-a theme-pulse" id="ongoing">
  <div class="container chapter-grid">
    <aside class="chapter-side">
      <h2><span class="group-swatch theme-pulse"></span>项目名</h2>
      <p class="chapter-meta">12 篇 · 进行中</p>
      <div class="chapter-bar">…迷你统计条…</div>
      <a class="link-ul" href="/project/slug">项目详情</a>
    </aside>
    <div class="chapter-main">
      <a class="feat-card" href="…">…推荐/最新一篇…</a>
      <a class="crow" href="…">
        <span class="badge badge--devlog">devlog</span>
        <span class="crow-title">标题</span>
        <span class="crow-date">2026-09-24</span>
      </a>
      <!-- 更多 .crow 行；可用 .gcol-title 再分组 -->
    </div>
  </div>
</section>
```

```css
.chapter-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 32px;
  align-items: start;               /* sticky 前提 */
}
.chapter-side {
  grid-column: 1 / 5;                 /* 12 列中占 4 列 */
  position: sticky;
  top: 104px;                         /* 头部 84px + 20px 间距 */
}
.chapter-main {
  grid-column: 5 / 13;                /* 剩余 8 列 */
  min-width: 0;
  display: grid;
  gap: 6px;
  align-content: start;
}
```

主区结构：一张 `.feat-card`（推荐或最新文章，左缘 4px 项目渐变竖条）+ 若干 `.crow` 紧凑行（badge / 标题单行省略 / mono 日期，min-height 42px）。侧栏 `h2` 前的 `.group-swatch` 是 12px 项目渐变圆点，与卡片主题类呼应。

---

## 模式 3：文章页 —— 三栏 + sticky TOC

**适用场景**：文章详情页（`src/pages/articles/[slug].astro`）及一切长文阅读页。

```html
<article class="post">
  <div class="container">
    <div class="post-grid">
      <aside class="toc-col">
        <nav class="toc" aria-label="目录">
          <p class="toc-title">目录</p>
          <a href="#h2-anchor">…</a>
          <a class="toc-sub" href="#h3-anchor">…</a>
        </nav>
      </aside>
      <header class="post-head">…badge / proj-capsule / h1 / post-meta…</header>
      <div class="prose">…正文（set:html）…</div>
      <a class="proj-banner" href="…">…所属项目卡…</a>
      <nav class="pn-nav" aria-label="文章导航">…上一篇 / 下一篇…</nav>
    </div>
  </div>
</article>
```

```css
.post { padding: 64px 0 96px; }
.post-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.7fr) minmax(0, 65ch) minmax(0, 1.3fr);
  column-gap: 48px;
  align-items: start;
}
.post-grid > * { grid-column: 2; min-width: 0; }  /* 默认全部进中列 */
.toc-col {
  grid-column: 3;
  grid-row: 1 / 6;                    /* 跨越多行，与正文全程并行 */
  align-self: start;
  position: sticky;
  top: 104px;
  padding-top: 8px;
}
```

要点：

- **65ch 正文列是硬约束**：中列 `minmax(0, 65ch)`，左列 0.7fr 留白、右列 1.3fr 给 TOC。不要让正文列换成像素或更宽的 ch。
- TOC 跨行用 `grid-row: 1 / 6`，新增顶部/底部区块时注意行数是否仍够（内容只增不减时 1/6 仍安全，因为显式行外会自动流）。
- 锚点偏移：`.prose h2/h3 { scroll-margin-top: 104px }`，与 sticky 头部对齐。
- 破版元素（桌面端）：`.prose .breakout` 宽度 `min(880px, calc(100% + 48px))`——左缘与正文对齐，右侧最多吃掉 48px 列间距，不侵入 TOC 列；仅在 `min-width: 981px` 生效。
- 文末 `.pn-nav` 上一篇/下一篇是 `1fr 1fr` 双列玻璃卡（≤640px 单列）。

---

## 模式 4：项目详情 —— 1130px 容器 + 展示区双栏

**适用场景**：项目详情页（`src/pages/project/[slug].astro` → `src/components/ProjectDetail.astro`，样式在 project-detail.css）。这是现行实现，结构比 12 栅格更自由：hero 信息带 → 作品/设计双栏展区 → 记录单列流。

```html
<main class="pd">
  <div class="pd-breadcrumb">…</div>
  <section class="pd-hero">
    <p class="pd-status"><span class="pd-status-dot"></span>开发中<span class="mono"> / PROJECT</span></p>
    <h1>项目名</h1>
    <p class="pd-lead">…</p>
    <div class="pd-meta">…篇数 / 更新日期 / pd-progress 进度条…</div>
    <div class="pd-shortcuts"><a href="#product">看看作品 ↓</a>…</div>
    <div class="pd-tags"><span class="pill pill--cyan">…</span></div>
  </section>

  <div class="pd-exhibit">             <!-- 无设计栏时加 .single -->
    <section class="pd-panel" id="product">…pd-cover 大图 + pd-scenes 场景条…</section>
    <aside class="pd-panel pd-design" id="design">…设计一瞥…</aside>
  </div>

  <section class="pd-records" id="records">
    <div class="pd-tools">…pd-filters / pd-search…</div>
    <div class="pd-record-list">
      <a class="pd-record is-featured" href="…">…首条精选…</a>
      <a class="pd-record" href="…"><time>…</time><div class="pd-record-text">…</div><span class="badge">…</span></a>
    </div>
  </section>
</main>
```

```css
.pd { max-width: 1130px; padding-top: 26px; padding-bottom: 40px; }
.pd-exhibit {
  display: grid;
  grid-template-columns: minmax(0, 1.8fr) minmax(285px, 1fr);  /* 作品宽、设计窄 */
  gap: 20px;
  margin: 4px 0 36px;
  align-items: start;
}
.pd-exhibit.single { grid-template-columns: minmax(0, 1fr); }   /* 无设计栏时单栏 */
.pd-exhibit.single .pd-design { max-width: 720px; }
.pd-panel { scroll-margin-top: 110px; /* 锚点避开头部，比通用 104 多 6px */ }
.pd-record {
  display: grid;
  grid-template-columns: 88px minmax(0, 1fr) auto 16px;  /* 日期/正文/badge/箭头 */
  gap: 20px;
  align-items: center;
}
```

要点：`.pd-lead` 限宽 760px；记录行首条用 `.is-featured` 变体（grid-template 重排为 `auto auto 1fr auto`，带左缘 4px 渐变竖条，呼应 feat-card）；本页断点是 900px/620px 而非 980/640（见 responsive.md 附录）。

### 附：global.css 中的 12 列 spec 栅格（旧版模式）

global.css 保留了另一套项目页模式，当前页面未引用，但它是「12 列 + sticky spec 侧栏」的规范写法，适合需要参数表侧栏的新页面：

```css
.pgrid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 32px; align-items: start; }
.spec-col { grid-column: 1 / 5; position: sticky; top: 104px; }
.pmain { grid-column: 5 / 13; min-width: 0; }
```

配合 `.pbanner`（玻璃横幅，`padding: 40px 44px; margin: 48px 0 72px`，有海报时 `.has-poster` 转 flex、海报 `flex: 0 0 40%`）与 `.spec-card`（玻璃 dl 参数卡）。降级规则与 `.chapter-grid` 完全同构（≤980px 单列、解除 sticky）。

---

## 模式 5：后台 Studio —— 214px sticky tab 侧栏 + 主区

**适用场景**：后台管理页（`src/pages/admin/index.astro`，样式在自包含的 admin.css，token 与前台同体系）。后台隐藏站点头尾与公共 aurora（`body:has(.admin-scope) > .site-header/.site-footer/.aurora { display: none }`），自带 `.admin-scope` 作用域与低透明 aurora。

```html
<div class="admin-scope">
  <svg class="aurora">…</svg>
  <div class="admin-container">
    <div id="studio" class="admin-layout">
      <button class="admin-menu-backdrop" hidden></button>  <!-- 移动端抽屉遮罩 -->
      <aside class="admin-side">
        <div class="admin-brand">…</div>
        <p class="side-group">工作入口</p>
        <button class="tab is-active">工作台</button>
        <button class="tab">文章</button>
        <div class="admin-side-actions">…保存 / 退出…</div>
      </aside>
      <div class="admin-main">
        <div class="admin-topbar">…☰ + 标题 + 保存按钮…</div>
        <section class="admin-panel" data-panel="dashboard">…</section>
        <section class="admin-panel" data-panel="articles" hidden>…</section>
      </div>
    </div>
  </div>
</div>
```

```css
.admin-container { width: min(1520px, calc(100vw - 48px)); margin: 0 auto; }
.admin-layout {
  display: grid;
  grid-template-columns: 214px minmax(0, 1fr);
  gap: 34px;
  padding-top: 24px;
  align-items: start;
}
.admin-side {
  position: sticky;
  top: 24px;                /* 后台无站点头部，不用 104px */
  /* 玻璃卡皮肤：圆角 --r-lg、padding 12px、tab 纵向堆叠 */
}
.admin-main { min-width: 0; }
```

要点：

- 侧栏 214px 是现行值（global.css 另有 220px 的旧版定义，以 admin.css 为准）。
- 面板切换靠 `.admin-panel[hidden] { display: none }`，主区一次只显示一个面板。
- 主区内部次级栅格：仪表盘 `.dashboard-grid`（`minmax(0,1.45fr) minmax(250px,1fr)`）、项目维护 `.proj-admin-grid`（340px 列表 + 主区）、媒体库 `.media-grid`（4 列）、表单 `.frow`（2 列）——全部在 ≤980px 塌缩单列（媒体库先降 2 列）。
- ≤980px 时侧栏变抽屉：`.admin-layout` 转 block，`.admin-side` 改 `position: fixed; left:12px; top:76px; bottom:12px; width:min(260px, 100vw-24px)` 默认隐藏，`.menu-open` 时展开 + 遮罩；`.admin-topbar` 变 sticky（top:0，毛玻璃）。
