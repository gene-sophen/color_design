# Aurora Layout — 响应式降级规则

全站断点只有三档：**980px / 640px / 860px**（均 `max-width`）。以下清单从 `src/styles/global.css`、`admin.css` 的 `@media` 块逐条提炼；新增组件的降级行为应挂到 980/640 两档，不要自造断点。页面级补充断点见文末附录。

## 断点总览

| 断点 | 职责 |
|---|---|
| `max-width: 980px` | 结构降级：多栏塌缩单列、sticky 解除、装饰隐藏 |
| `max-width: 640px` | 密度降级：padding 收缩、导航堆叠、行内元素允许换行 |
| `max-width: 860px` | 单点降级：只隐藏导航滚轮 `.wheel` |

## ≤980px —— 结构降级（global.css）

栅格塌缩：

- `.hero-inner` → 单列 `1fr`，gap 缩到 8px。
- `.projects` → 单列；`.projects > .pcard:nth-child(even)` 的 48px 下沉归零（错落只存在于桌面双列）。
- `.tile--stat` → `width: auto`，不再居中收缩（`margin-left/right: 0`）。
- `.skills-grid` → 单列，gap 36px。
- `.stat-grid`（首页仪表组）→ 单列。
- `.chapter-grid`、`.pgrid` → 单列 `1fr`。

sticky 全部解除：

- `.chapter-side`、`.spec-col` → `position: static; grid-column: 1 / -1`（侧栏内容自然排在主区之前）。
- `.chapter-main`、`.pmain` → `grid-column: 1 / -1`。
- `.post-grid` → 单列 `minmax(0, 65ch)` 并 `justify-content: center`；所有子项（含 `.toc-col`）落到唯一列；`.toc-col` 解除 sticky，`margin-bottom: 40px`——TOC 变文档流内的前置区块，仍在正文上方。

装饰与弹性布局：

- `.hero-orbs` → `display: none`（模糊 orb 只活在宽屏）。
- `.pbanner.has-poster` → 纵向 flex（`flex-direction: column; align-items: stretch; gap: 24px`），海报不再占 40%。
- `.section-head--split` → 纵向堆叠、左对齐（热力图面板落到标题下方）。

注意：`.prose .breakout` 的破版宽度只在 `min-width: 981px` 定义，980px 以下自然回到正文列宽，无需覆写。

## ≤640px —— 密度降级（global.css）

导航：

- `.site-nav-inner` → 纵向堆叠（`flex-direction: column; align-items: flex-start; gap: 14px`），上下 padding 22px → 18px。
- `.nav-links` → 允许换行（`flex-wrap: wrap; gap: 12px 22px`）。

节奏收缩：

- `.hero` padding `64px 0 88px` → `36px 0 56px`。
- `.section` padding `88px 0` → `52px 0`。

卡片 padding 收缩：

- `.pcard`、`.tile`：`32px 34px` → `24px 22px`。
- `.pbanner`：`40px 44px` → `28px 24px`，margin `48px 0 72px` → `32px 0 48px`。
- `.feat-card`：`28px 32px 28px 36px` → `22px 20px 22px 26px`。
- `.pcard-poster` 负边距联动收缩：`-32px -34px` → `-24px -22px`（海报贴卡片边缘的写法必须与卡片 padding 同步改）。

排版放宽：

- `.crow-title` → `white-space: normal`（索引行标题允许折行，不再单行省略）。
- `.pn-nav`（上一篇/下一篇）→ 单列。

## ≤860px —— 导航滚轮（global.css）

- `.wheel`、`.nav-sep` → `display: none`。仅此一条；滚轮是桌面端导航的增强组件，窄屏直接隐藏，不降级成别的形态。

## 后台断点（admin.css）

### ≤980px

- `.admin-layout` → `display: block`；侧栏变抽屉：`.admin-side` 改 `position: fixed; left: 12px; top: 76px; bottom: 12px; width: min(260px, calc(100vw - 24px))`，默认 `display: none`，`.admin-layout.menu-open` 时展开；`.admin-menu-backdrop` 遮罩随抽屉出现。
- `#adminMenu`（☰）显示；`.admin-topbar` 变 sticky（`top: 0`，`background: #f8fbffe8` + `blur(12px)`）。
- `.proj-admin-grid`（340px+主区）→ 单列；`.media-grid` 4 列 → 2 列；`.frow` 表单两列 → 单列；`.dashboard-grid` 保持但主区已变窄。
- 后台基础层（旧版规则）：`.admin-layout` 单列、`.admin-side` 转横向 flex 排列 tab——现行抽屉规则在其后覆写，以抽屉为准。

### ≤640px

- 表格转卡片：`.admin-table` 整体 `display: block`，`thead` 隐藏，每行转 flex 换行布局，`.cell-title` 占整行；`.cell-proj`、`.cell-date` 及对应 `th:nth-child(3)/(4)` 隐藏。
- `.admin-foot` → 纵向堆叠；`.panel-head` → 纵向堆叠。
- `.dashboard-grid` → 单列，`.dashboard-create` → 两列；`.media-grid` → `1fr 1fr`。
- `.admin-topbar h1` 缩到 19px；`.admin-top-actions > span`（草稿计数）隐藏。
- 文章表单 `.fgroup` padding 26/28 → 16px；`.career-fields` → 单列。
- 媒体详情抽屉 `.media-detail` → 全宽（`width: 100vw`，去圆角）。

### ≤760px（后台补充）

- `.history-diff` 双列对比 → 单列。
- `.milestone-workspace`（220–280px 时间线 + 编辑区）→ 单列，时间线限高 230px 可滚动。
- 编辑器分屏模式禁用：`.admin-editor[data-mode=split]` 回退单列，预览面板落到输入区下方。
- `.project-gallery-row`（2fr 1fr 2fr）→ 单列。

## 附录：页面级断点（不与全站三档混用）

这些断点只属于各自页面的样式文件，新增全局规则不要引用它们：

| 页面 | 断点 | 要点 |
|---|---|---|
| 首页 home.css | 1100px | `--lane` 130px → 90px；楼层容器 gap 36→24；hero gap 85→40；tech-map 双栏 → 单列 |
| 首页 home.css | 760px | hero 单列、字号收缩；楼层不再满屏（min-height: 0）；吉祥物侧轨隐藏；`.projects` 单列 gap 22px；ocean 时间线缩进收缩；`.crow` 转两行栅格（badge+日期一行、标题一行） |
| 首页 home.css | 360px | tech-map 圆形散布图 → 三列网格，连线和中心字隐藏 |
| 项目详情 project-detail.css | 900px | `.pd-exhibit` 列比收窄为 `1.4fr / minmax(250px,1fr)`；面板 padding 24→20；记录行栅格收窄 |
| 项目详情 project-detail.css | 620px | `.pd-exhibit` 转纵向 flex；`.pd` padding 收缩；记录行转 `1fr auto` 两行栅格（badge+日期一行、正文一行），箭头隐藏 |

## 降级行为速查（写新组件时照此归类）

1. **多栏栅格** → ≤980px 单列 `1fr`，sticky 一并解除。
2. **错落/破格效果**（48px 下沉、breakout、orb）→ 桌面专属，窄屏直接归零或隐藏，不做中间态。
3. **横向 flex 工具行** → 允许 `flex-wrap: wrap`；≤640px 再视需要转纵向。
4. **padding** → 只在 ≤640px 收缩一档，幅度约为桌面值的 2/3。
5. **表格** → 先藏次要列，仍不够再整表转卡片式 flex 行。
6. **单行省略的标题** → 最窄档可放开 `white-space: normal`。
