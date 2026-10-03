---
name: aurora-layout
description: Aurora Glass 设计系统的界面与布局规范——页面骨架、栅格模式、sticky 侧栏、错落排版与响应式降级规则。当为 Gene-Blog（D:\my_program\blog\2.0）新建页面、调整页面布局、设计栅格/网格结构、处理响应式断点、添加 sticky 侧栏或目录、实现错落（编辑感）排版时使用；触发词包括：页面布局、栅格、网格、响应式、断点、错落排版、sticky 侧栏、三栏、双栏、章节式索引、layout、grid、responsive、breakpoint、sticky sidebar、Aurora Glass。配色细节查 aurora-color，组件样式查 aurora-components，动效参数查 aurora-motion。
---

# Aurora Layout

Aurora Glass 设计系统的布局层规范。生成或修改本博客（Astro 项目 `D:\my_program\blog\2.0`）的任何页面结构时，先读本文件确定用哪种页面骨架与栅格，再按需深入 `references/` 下的模式细节。所有数值均来自 `src/styles/global.css`、`src/styles/home.css`、`src/styles/project-detail.css`、`src/styles/admin.css` 的真实代码，禁止自造数值。

## 职责边界

- 本 skill 只管**布局**：栅格、容器、间距节奏、sticky 定位、响应式降级、页面骨架。
- 颜色变量（--sky/--cyan/--mint/--blue、墨色、渐变）→ 查 **aurora-color**。
- 玻璃卡片、徽章、按钮、表单等组件皮肤 → 查 **aurora-components**。
- 动效时长（120/200/600ms、`cubic-bezier(0.22,1,0.36,1)`）与入场动效 → 查 **aurora-motion**。
- 布局中引用上述变量名即可，不要复制其色值或参数定义。

## 布局哲学

1. **编辑感错落栅格**：拒绝整齐划一的卡片墙。项目卡两列等宽，右列用 `:nth-child(even)` 下沉 48px 形成错落；里程碑时间线用交替宽度（640px / 560px / 760px）制造节奏。新增列表型区块时优先想「哪一项可以破格」。
2. **内容优先的阅读列**：长文正文列锁定 `65ch`，两侧栏只是陪衬（`.post-grid` 三栏 `minmax(0,.7fr) minmax(0,65ch) minmax(0,1.3fr)`）。任何写作/阅读场景都不得让正文行宽失控。
3. **sticky 辅助栏**：索引页章节侧栏、文章页 TOC、项目页 spec 栏、后台 tab 栏全部 `position: sticky`，跟随滚动但不抢戏。桌面端偏移量统一 `top: 104px`（由来见下）；后台无站点头部，用 `top: 24px`。
4. **极光背景铺满全文档**：`body { position: relative; min-height: 100vh; overflow-x: clip }`，`.aurora` 为 `position: absolute; z-index: -1` 的 S 形流光带，尺寸 106%×108% 随页面长度拉伸。所有页面层叠在其上，内容默认透明底，玻璃卡片提供层次。
5. **`minmax(0, …)` 防溢出**：所有栅格列轨道都写 `minmax(0, 1fr)` 而非裸 `1fr`，栅格内长内容（标题、表格、代码块）用 `min-width: 0` + 省略或滚动兜底。

## 全局骨架

每个页面都是同一副骨架（`src/layouts/BaseLayout.astro`）：

```html
<body>
  <svg class="aurora" …></svg>          <!-- 背景层，absolute，z-index:-1 -->
  <header class="site-header">…</header> <!-- sticky top:0，z-index:50，毛玻璃 -->
  <main>
    <section class="section">            <!-- 或 hero/post 等首屏区块 -->
      <div class="container">…</div>
    </section>
    …
  </main>
  <footer class="site-footer"><div class="container footer-inner">…</div></footer>
</body>
```

关键数值：

| 项 | 值 | 出处 |
|---|---|---|
| 内容容器 | `--container: 1080px`，`.container` 左右 padding 28px | global.css |
| 首页 Studio 容器 | `.home-studio .container` 放宽到 1240px | home.css |
| 项目详情容器 | `.pd` 为 1130px，上下 padding 26px/40px | project-detail.css |
| 后台容器 | `.admin-container` 为 `min(1520px, calc(100vw - 48px))` | admin.css |
| 标准章节节奏 | `.section { padding: 88px 0 }`；`.section-head` 下边距 44px、限宽 56ch | global.css |
| 首页楼层 | `.studio-floor` min-height `calc(100svh - 90px)`、`scroll-margin-top: 88px` | home.css |
| 站点头部 | `.site-header` sticky `top: 0`；`.site-nav-inner` 上下 padding 各 22px，整高约 84px | global.css |
| 圆角 | `--r-pill: 999px` / `--r-md: 14px` / `--r-lg: 20px` | global.css |

## sticky 偏移量 top:104px 的由来

`.site-header` 是 `position: sticky; top: 0` 的毛玻璃导航：`.site-nav-inner` 上下 padding 各 22px，导航链接 `min-height: 40px`，整头高度约 84px。所有 sticky 侧栏（`.chapter-side`、`.toc-col`、`.spec-col`、global.css 的 `.admin-side`）统一用 `top: 104px` = 头部高度 84px + 20px 呼吸间距，保证侧栏吸附时不顶到导航下缘。配套规则：正文锚点标题 `.prose h2/h3` 用 `scroll-margin-top: 104px`，项目详情面板用 `scroll-margin-top: 110px`，首页楼层用 `88px`，锚点跳转同样避开头部。后台页面隐藏站点头尾（`body:has(.admin-scope) > .site-header { display: none }`），因此后台侧栏用 `top: 24px`。

## 页面骨架速查

| 页面 | 源文件 | 栅格模式 | 关键类 |
|---|---|---|---|
| 首页 | `src/pages/index.astro` + home.css | 楼层式单栏 + 吉祥物侧轨；内部 hero 双栏、项目错落双列 | `.home-studio` `.studio-floor` `.hero-inner` `.projects` |
| 文章索引 | `src/pages/articles/index.astro` | 12 列章节栅格：sticky 侧栏 1/5 + 主区 5/13 | `.chapter-grid` `.chapter-side` `.chapter-main` |
| 文章详情 | `src/pages/articles/[slug].astro` | 三栏：留白 .7fr / 正文 65ch / sticky TOC 1.3fr | `.post-grid` `.toc-col` `.prose` |
| 项目详情 | `src/components/ProjectDetail.astro` + project-detail.css | 容器 1130px；展示区双栏 `1.8fr / minmax(285px,1fr)`，下方记录单列 | `.pd` `.pd-exhibit` `.pd-panel` `.pd-record-list` |
| 项目详情（旧版 12 栅格模式，仍在 global.css） | global.css | 12 列：sticky spec 栏 1/5 + 主区 5/13 | `.pgrid` `.spec-col` `.pmain` `.pbanner` |
| 后台 Studio | `src/pages/admin/index.astro` + admin.css | 双栏：214px sticky tab 侧栏（top:24px）+ 主区 | `.admin-scope` `.admin-layout` `.admin-side` `.admin-main` |

各模式的「适用场景 + HTML 骨架 + 关键 CSS」见 `references/layout-patterns.md`。

## 断点表

| 断点 | 作用范围 | 降级要点 |
|---|---|---|
| `max-width: 980px` | 全站（global.css）+ 后台（admin.css） | 所有多栏栅格塌缩成单列；所有 sticky 侧栏解除 sticky；hero orb 装饰隐藏；后台侧栏变抽屉 |
| `max-width: 640px` | 全站 + 后台 | 导航纵向堆叠；章节/卡片 padding 收缩；行内列表允许换行；后台表格转卡片式 |
| `max-width: 860px` | 仅导航滚轮 | `.wheel` 与 `.nav-sep` 隐藏 |
| 页面级补充 | home.css: 1100/760/360；project-detail.css: 900/620；admin.css: 760 | 见 responsive.md 附录 |

逐条降级规则见 `references/responsive.md`。新增页面时优先复用 980/640 两档，不要自造断点。

## References 索引

- **`references/layout-patterns.md`** —— 要新建页面或重写某个区块的栅格结构时读。含首页 hero+错落项目栅格、章节式 log 索引、文章页三栏+TOC、项目详情双栏与 12 栅格、后台双栏五种模式的完整骨架与关键 CSS，以及 sticky 偏移量的推导。
- **`references/responsive.md`** —— 要做响应式适配、排查窄屏破版、或新增组件需要定义降级行为时读。从各 `@media` 块逐条提炼的降级清单。

## 自检清单

交付页面前逐项核对：

- [ ] 页面包在 `BaseLayout` 骨架内：aurora 背景层在最底（`z-index: -1`），内容未被不透明底色盖住极光。
- [ ] 内容都在 `.container`（1080px / padding 0 28px）内；只有首页 Studio、项目详情、后台用各自的加宽容器。
- [ ] 栅格列轨道全部写 `minmax(0, …)`，长文本单元有 `min-width: 0` 与省略/滚动兜底。
- [ ] 选对了页面模式：索引类用 12 列章节栅格，长文用 65ch 三栏，列表卡片用错落双列。
- [ ] sticky 侧栏 `top: 104px`（后台 `top: 24px`），且 ≤980px 时解除 sticky 并塌缩为单列。
- [ ] 锚点跳转目标带 `scroll-margin-top`（104px / 110px / 88px，按所在页面）。
- [ ] 响应式只挂 980/640 两档（导航滚轮相关才用 860）；新组件在 ≤980px 有明确单列行为。
- [ ] 未在布局代码里硬编码色值/阴影/动效参数——引用变量，细节归 aurora-color / aurora-components / aurora-motion。
