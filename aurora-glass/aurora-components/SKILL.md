---
name: aurora-components
description: Aurora Glass 设计系统的组件规范——为个人博客/作品集站点生成或修改 UI 组件（卡片、标签徽章、按钮、表单、导航、排版、图表容器）时保持玻璃拟态风格统一。当任务涉及组件、卡片、玻璃拟态、标签、徽章、按钮、表单、导航、排版、component、card、glassmorphism、badge、pill、button、form、nav、Aurora Glass 时触发。配色细节见 aurora-color，页面栅格见 aurora-layout，动效时序见 aurora-motion。
---

# Aurora Components

Aurora Glass 设计系统的组件层规范。源码事实：`src/styles/global.css`（前台 + 旧版后台）、`src/styles/admin.css`（Studio 后台，`.admin-scope` 作用域自带 token）、`src/styles/project-detail.css`（项目详情 `.pd-*`）、`src/components/*.astro`（HTML 结构约定）。所有数值以源码为准，禁止编造。

## 组件哲学

- **极光打底，玻璃载物**：彩色只属于背景极光与小面积点缀（渐变条、识别点、进度条、下划线）；内容容器一律半透明白玻璃。
- **淡彩标签，不用渐变刷底色**：badge/pill/chip 用「浅色 rgba 底 + 加深同色文字」表达分类，渐变只允许出现在 `::before` 竖条、圆点、进度填充、链接下划线。
- **一个交互语言**：所有可交互元素共享同一组 hover/active/transition 参数（见下），不得自创时长或缓动。
- **玻璃分轻重**：主容器 blur(16px) + `--shadow-md`；次级元素（按钮、胶囊、行卡、表格内嵌）blur(8–12px) + `--shadow-sm`。

## 通用配方

### 玻璃皮肤（任何新容器默认这套）

```css
.card {
  background: var(--glass-bg);            /* rgba(255,255,255,.65) */
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);  /* rgba(255,255,255,.72) */
  border-radius: var(--r-lg);             /* 20px；次级元素用 --r-md 14px */
  box-shadow: var(--shadow-md);           /* 次级用 --shadow-sm */
}
```

### 交互态（悬浮卡 / 按钮通用）

```css
.el {
  transition: transform var(--t-hover) var(--ease), box-shadow var(--t-hover) var(--ease);
}
.el:hover  { transform: translateY(-3px); box-shadow: var(--shadow-lg); }  /* 轻量元素用 -2px + --shadow-md */
.el:active { transform: translateY(-3px) scale(.97); transition-duration: var(--t-press); } /* 120ms */
```

规则：
- 过渡一律 `var(--t-hover) var(--ease)`（200ms cubic-bezier(0.22,1,0.36,1)），active 时把 `transition-duration` 切成 `var(--t-press)`。
- hover 位移幅度按体量分级：大卡片 -3px，按钮/小卡 -2px，行内元素（`.crow`）用 `translateX(3px)`。
- active 一律追加 `scale(.97)`；toggle/pager 等微小控件用 `scale(.94)`，dropzone 用 `scale(.99)`。
- focus-visible：前台 `outline: 2px solid #2b6cb0; outline-offset: 3px`；表单控件用 `border-color: var(--cyan)` + `box-shadow: 0 0 0 3px rgba(90,215,242,.25)`；admin 作用域 `outline: 2px solid #39a9ce`。
- 尊重 `@media (prefers-reduced-motion: reduce)`：去掉 transform 与 transition。

### 主题变量

项目主题只通过一个变量传递：`--pgrad`（由 `.theme-pulse / .theme-mq / .theme-avalon / .theme-neutral / .theme-misc` 设置），消费方写 `var(--pgrad, var(--grad-pulse))`。色值、渐变定义归 **aurora-color**，这里只引用变量名。动效编排（reveal、图表生长）归 **aurora-motion**。页面级栅格（projects 错落列、post-grid、admin-layout）归 **aurora-layout**。

## 组件速查表

| 组件 | 一句话用途 | 详情 |
| --- | --- | --- |
| `.pcard` / `.pcard-poster` | 项目主卡（可带 16:9 海报头） | references/cards.md |
| `.tile` / `.tile--stat` | 单行功能砖 / 统计砖 | references/cards.md |
| `.feat-card` | 左缘 4px 渐变竖条的推荐文章卡 | references/cards.md |
| `.crow` | 文章列表行（hover 右移 3px） | references/cards.md |
| `.proj-banner` | 文末「所属项目」玻璃链接卡 | references/cards.md |
| `.pn-nav` | 上一篇/下一篇双卡导航 | references/cards.md |
| `.badge--*` | 文章分类徽章（7 类 + draft/published） | references/tags-and-badges.md |
| `.pill--cyan/mint/sky` | 技术栈/身份小胶囊（+ --lg/--sm） | references/tags-and-badges.md |
| `.status-chip` | 大写状态标签（活跃薄荷绿 / --muted 灰） | references/tags-and-badges.md |
| `.chip` | 可点击过滤器胶囊（.is-active 高亮） | references/tags-and-badges.md |
| `.pdot` / `.group-swatch` | 12px 渐变识别圆点（吃 --pgrad） | references/tags-and-badges.md |
| `.proj-capsule` | 文章头所属项目玻璃胶囊 | references/tags-and-badges.md |
| `.chip-feat` | feat-card 内的「精选」小标 | references/tags-and-badges.md |
| `.prose` 排版 | h2 渐变左边条 / 行内 code / pre 代码块 | references/prose.md |
| 语法高亮 `.c-kw/.c-str/.c-cm` | pre 内关键字/字符串/注释三色 | references/prose.md |
| `.prose blockquote` / `table` / `.table-wrap` | 引用块 / 玻璃表格（横向滚动兜底） | references/prose.md |
| `figure` / `.fig-art` / `figcaption` | 配图与极光彩斑占位图 | references/prose.md |
| `.breakout` | 桌面端破版（向右延 48px，不侵 TOC 列） | references/prose.md |
| `.empty-note` | 淡蓝虚线空态提示 | references/prose.md |
| `.panel` + `.admin-table` | 后台玻璃表格面板（定宽列） | references/admin.md |
| `.btn-grad` / `.btn-soft` | 主操作渐变按钮 / 次级玻璃按钮 | references/admin.md |
| `.search` | 工具行胶囊搜索框 | references/admin.md |
| `.toggle` | 36×20 开关（is-on 渐变） | references/admin.md |
| `.pager` | 等宽数字分页（is-current） | references/admin.md |
| `.fgroup/.frow/.fitem` + `.input/.select/.textarea` | 玻璃表单组与控件 | references/admin.md |
| `.dropzone` | 虚线上传区（drag-active 态） | references/admin.md |
| `.media-card` / `.media-grid` | 图床缩略卡（含 is-list 行式变体） | references/admin.md |
| `.proj-row` | 项目维护列表行卡（内嵌进度条） | references/admin.md |
| `.nav-links > a` | 顶栏页面链接（下划线 + aria-current） | references/nav-and-charts.md |
| `.wheel` 滚轮导航 | 收起=图标+当前段标签，悬停展开段链接 | references/nav-and-charts.md |
| `.timeline` / `.tl-item` | 左侧渐变轴里程碑列表 | references/nav-and-charts.md |
| `.arch` / `.arch-node` / `.arch-link` | 架构节点流（淡彩节点+渐变连线） | references/nav-and-charts.md |
| `.heatmap` / `.ccell` | 贡献热力图（生长动效钩子） | references/nav-and-charts.md |
| `.cloud-card` / `.arch-card` | 词云 / 架构 SVG 的玻璃承载卡 | references/nav-and-charts.md |
| `.chart-tooltip` | fixed 定位图表提示浮层（单例） | references/nav-and-charts.md |
| `.ptrack` / `.pfill` | 进度轨道 + 渐变填充（吃 --pgrad） | references/tags-and-badges.md |
| `.link-ul` | 渐变下划线文字链接 | references/nav-and-charts.md |
| `.eyebrow` | 大写渐变眉题 | references/prose.md |

## 选用指引

1. **先找现成组件**：新需求先查速查表；优先组合现有类（玻璃皮肤 + pill + badge），不要发明新视觉语言。
2. **新组件走配方**：确实需要新组件时，套「玻璃皮肤 + 交互态」两配方，圆角按层级选 `--r-lg`（主卡）/ `--r-md`（次级）/ `--r-pill`（胶囊、按钮、标签），阴影 hover 只升一档。
3. **颜色只靠变量**：背景/边框用 `--glass-bg` / `--glass-border`；点缀用 `--pgrad` 或 `--grad-*`；文字用 `--ink/--body/--muted`。具体色值选择规则见 aurora-color。
4. **前后台分源**：前台组件从 `global.css` 抄；后台（Studio）组件从 `admin.css` 抄并置于 `.admin-scope` 内（它自带一套 token，注意其 `--sky` 是 `#87c4ed`，与前台 `#7ab9f0` 不同）；项目详情页组件用 `project-detail.css` 的 `.pd-*` 体系。
5. **结构照抄组件**：HTML 骨架以 `src/components/` 为准（如 Nav.astro 的 wheel 三段结构、ProjectDetail.astro 的 pd-record 网格），references 里每个组件都给了骨架。
6. **JS 行为归位**：滚轮指示器定位、scroll-spy、图表生长（`.grow-in`）、tooltip 定位由 `/public/*.js` 驱动；本 skill 只规定终态样式与钩子类名，时序细节见 aurora-motion。

## 自检清单

交付前逐项确认：

- [ ] 容器用了 `--glass-bg` + `backdrop-filter`（带 `-webkit-` 前缀）+ `--glass-border` + 变量圆角 + 变量阴影，无手写 rgba 白底。
- [ ] transition 全部 `var(--t-hover) var(--ease)`；active 有 `scale()` 且 `transition-duration: var(--t-press)`。
- [ ] 大面积渐变只出现在背景极光；组件内渐变仅用于竖条/圆点/进度/下划线/主按钮。
- [ ] 标签类组件是「浅底深字」，white-space: nowrap，圆角 `--r-pill`。
- [ ] 新增可聚焦元素有 focus-visible 样式；hover transform 在 `prefers-reduced-motion` 下被移除。
- [ ] 消费项目色时写 `var(--pgrad, <fallback>)`，没有硬编码主题渐变。
- [ ] 长文本容器有 `min-width: 0` / 单行省略（`overflow:hidden; text-overflow:ellipsis; white-space:nowrap`）。
- [ ] 数值（padding、字号、模糊量、阴影档位）能在源码中找到出处，非凭空取值。
