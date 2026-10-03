# Aurora Glass · 完整色板参考

所有数值摘自 `src/styles/global.css`（前台与主 token 来源）与 `src/styles/admin.css`（后台扩展/覆盖）。`src/styles/home.css`、`src/styles/project-detail.css` 为特定模块的局部配色，列于文末。

## 核心色板

| token | Hex | 角色 | 典型用法 |
| --- | --- | --- | --- |
| `--sky` | `#7ab9f0` | 天蓝，主品牌冷色 | mq 渐变起点（`.theme-mq`）、极光光晕 |
| `--cyan` | `#5ad7f2` | 青，高频点缀色 | pulse 渐变起点、`::selection` 底色、表单焦点描边、链接渐变下划线起点、`li::marker` |
| `--mint` | `#70f4bf` | 薄荷绿，仅表「当前/活跃」 | pulse/avalon 渐变端点、status-chip、hero-status 底、toggle 开态 |
| `--blue` | `#3f8fef` | 深蓝，渐变收束色 | mq/avalon 渐变终点、链接 hover（`.link-ul:hover`）、下划线终点 |
| `--ink` | `#0f172a` | 墨色·标题 | h1–h4、卡片标题、强调数字 |
| `--body` | `#334155` | 墨色·正文 | body、段落、表格单元 |
| `--muted` | `#64748b` | 墨色·辅助 | 副标题、日期、meta、placeholder |
| `--bg` | `#f8fbff` | 页面底色 | `html` 背景，所有玻璃在其上叠加 |

补充常色（非 token，但反复出现）：

| Hex | 角色 | 出处 |
| --- | --- | --- |
| `#2b6cb0` | 深蓝文字 | `.eyebrow`/`.pn-label` 渐变文字起点、`.link-ul`、prose 链接、`:focus-visible` outline、代码关键字 `.c-kw` |
| `#0b7d9b` | 深青文字 | badge--devlog、pill--cyan、chip/pager 激活态、行内 code、渐变文字收束 |
| `#0f8a5f` | 深薄荷文字 | badge--tool/--published、pill--mint、hero-status 圆点、代码字符串 `.c-str` |
| `#0b7a4d` | 更深绿文字 | status-chip（活跃态）文字 |
| `#2563a8` | 深蓝文字 | badge--spec、pill--sky、chip-feat |
| `#245e83` | 蓝灰文字 | 导航当前页 `[aria-current="page"]` |
| `#475569` | 深灰文字 | badge--essay/--draft、status-chip--muted |
| `#0a6c88` / `#3e8a6d` | 深青 / 深绿文字 | badge--job / badge--resume |
| `#0e9fc4` | 青色操作链接 | 后台表格操作列、media-ops 链接 |
| `#b4552d` | 赭橙·危险 | `.danger` 按钮/操作、图片加载失败提示 |
| `#87c4ed` | 浅天蓝 | misc 渐变起点、各类分隔线/边框 rgba 基色（`rgba(135,196,237,*)`） |
| `#cbd5e1` / `#94a3b8` | 石板灰渐变对 | neutral 渐变起/终点；`rgba(148,163,184,*)` 用于灰色系淡彩底 |

## 淡彩配方表（badge / pill / chip）

铁律：淡彩 rgba 底 + 加深文字色，无渐变、无边框（后台 chip 激活态例外，带同色 40% 描边）。

| 类 | 底色 | 文字色 |
| --- | --- | --- |
| `.badge--spec` | `rgba(135,196,237,.18)` | `#2563a8` |
| `.badge--devlog` | `rgba(90,215,242,.16)` | `#0b7d9b` |
| `.badge--tool` | `rgba(112,244,191,.2)` | `#0f8a5f` |
| `.badge--essay` | `rgba(148,163,184,.18)` | `#475569` |
| `.badge--interview` | `rgba(135,196,237,.18)` | `#2b6cb0` |
| `.badge--job` | `rgba(90,215,242,.22)` | `#0a6c88` |
| `.badge--resume` | `rgba(112,244,191,.2)` | `#3e8a6d` |
| `.badge--published`（仅后台） | `rgba(112,244,191,.2)` | `#0f8a5f` |
| `.badge--draft` | `rgba(148,163,184,.15)` | `#475569` |
| `.pill--cyan` | `rgba(90,215,242,.14)` | `#0b7d9b` |
| `.pill--mint` | `rgba(112,244,191,.18)` | `#0f8a5f` |
| `.pill--sky` | `rgba(135,196,237,.16)` | `#2563a8` |
| `.status-chip`（当前/活跃） | `rgba(112,244,191,.18)` | `#0b7a4d` |
| `.status-chip--muted`（静置/归档） | `rgba(148,163,184,.16)` | `#475569` |
| `.chip.is-active`（后台筛选） | `rgba(90,215,242,.16)` + 描边 `rgba(90,215,242,.4)` | `#0b7d9b` |
| `.chip-feat`（推荐标记） | `rgba(135,196,237,.2)` | `#2563a8` |
| `.pager a.is-current` | `rgba(90,215,242,.16)` | `#0b7d9b` |
| `.tab.is-active`（后台侧栏） | `rgba(90,215,242,.12)` + 左缘 3px `var(--grad-pulse)` | `--ink` |
| `.toc a.is-active` | `rgba(90,215,242,.14)` | `--ink` |
| 行内 `code`（prose） | `rgba(90,215,242,.14)` | `#0b7d9b` |

## 渐变色标表（全部 135deg）

| token | 色标 | 用途 |
| --- | --- | --- |
| `--grad-pulse` | `#5ad7f2 → #70f4bf` | logo 方块、导航下划线、默认 `--pgrad`、toggle 开态、featured 左缘竖条 |
| `--grad-mq` | `#7ab9f0 → #3f8fef` | 项目 mq 主题、小节标题前 16×3 短横 |
| `--grad-avalon` | `#70f4bf → #3f8fef` | 项目 avalon 主题 |
| `--grad-misc` | `#87c4ed → #70f4bf` | 杂项/未分类文章组、时间线第 4 节点 |
| `--grad-neutral` | `#cbd5e1 → #94a3b8` | 无主题兜底 |

非 token 渐变（写在组件里，同样合法）：

| 渐变 | 用途 |
| --- | --- |
| `135deg, #2b6cb0 → #0b7d9b` | `.eyebrow`、`.pn-label` 渐变文字（background-clip: text） |
| `115deg, #2b6cb0 → #0b7d9b 55% → #3f8fef` | `.hero-name` 渐变文字 |
| `90deg, var(--cyan) → var(--blue)` | `.link-ul`/日志标题/架构连接线的下划线与连接条 |
| `135deg, var(--cyan) → var(--blue)` | `.btn-grad` 渐变按钮、prose h2 左缘（border-image 为 `180deg, cyan → blue`） |
| `180deg, rgba(90,215,242,.6) → rgba(112,244,191,.6) → rgba(63,143,239,.5)` | 时间线主轴 |
| `135deg, rgba(135,196,237,.1) → rgba(112,244,191,.08)` | prose `pre` 代码块底 |
| `135deg, rgba(90,215,242,.08) → rgba(135,196,237,.08)` | prose blockquote 底 |
| `180deg, rgba(90,215,242,.06) → rgba(112,244,191,.035)` | `.tint-a` 区块极淡过渡带 |
| `180deg, rgba(122,185,240,.06) → rgba(90,215,242,.035)` | `.tint-b` 区块极淡过渡带 |
| `135deg, #0e9fc4 → #2bb673` | 后台品牌渐变（admin.css 内 logo 等处） |

## 墨色文字层级

| 层级 | 值 | 用法 |
| --- | --- | --- |
| 标题/强调 | `--ink` `#0f172a` | h1–h4、卡片标题、统计大数字、prose `strong` |
| 正文 | `--body` `#334155` | 段落、表格单元、列表 |
| 辅助 | `--muted` `#64748b` | meta、日期、副标题、placeholder、图表注释 |

渐变文字仅限 `.eyebrow` / `.hero-name` / `.pn-label` 三处标题类元素，不扩散。

## 玻璃配方

```
background: var(--glass-bg);            /* rgba(255,255,255,.65) */
backdrop-filter: blur(16px);            /* 附 -webkit- 前缀 */
border: 1px solid var(--glass-border);  /* rgba(255,255,255,.72) */
border-radius: var(--r-lg);             /* 20px，小组件用 --r-md 14px */
box-shadow: var(--shadow-md);           /* 0 12px 40px rgba(15,23,42,.07) */
```

变体（blur 随层级递减，全部仍是半透明白系）：

| 场景 | 背景 | blur |
| --- | --- | --- |
| 卡片/面板（pcard、panel、fgroup） | `--glass-bg` | 16px |
| 次级容器（搜索框、wheel、proj-row） | `--glass-bg` | 12px |
| 轻量挂件（proj-capsule、prose 表格、dropzone、btn-soft） | `--glass-bg` 或 `rgba(255,255,255,.45–.6)` | 8px |
| 图表 tooltip | `rgba(255,255,255,.88)` + 描边 `rgba(122,185,240,.5)` | 10px |
| 吸顶导航 | `rgba(248,251,255,.72)` | 14px |

阴影三档（中性墨色，禁用彩色）：
`--shadow-sm: 0 4px 16px rgba(15,23,42,.05)` / `--shadow-md: 0 12px 40px rgba(15,23,42,.07)` / `--shadow-lg: 0 20px 56px rgba(15,23,42,.12)`。小开关等微件可用 `0 1px 4px rgba(15,23,42,.18)`。

## 焦点 / 选中 / 状态色

| 场景 | 配方 |
| --- | --- |
| 全局 `:focus-visible` | `outline: 2px solid #2b6cb0; outline-offset: 3px` |
| 表单控件焦点（input/search/textarea） | `border-color: var(--cyan); box-shadow: 0 0 0 3px rgba(90,215,242,.25)` |
| 后台作用域焦点（admin.css `.admin-scope`） | `outline: 2px solid #39a9ce; outline-offset: 2px` |
| `::selection` | `background: rgba(90,215,242,.35)` |
| hover 浮起底色（行/链接） | `rgba(255,255,255,.5–.85)` 半透明白 + `--shadow-sm` |
| 选中行/项目（proj-row.is-active、dropzone） | 描边 `rgba(90,215,242,.55)` |
| 危险/删除 | 文字 `#b4552d` |
| 字段错误（admin.css） | 文字 `#b34e4e` |
| 警告提示框（admin.css） | 底 `rgba(254,243,199,.68)` + 描边 `rgba(245,158,11,.25)` + 文字 `#8a5a00` |
| 错误提示框（admin.css） | 底 `rgba(254,226,226,.72)` + 描边 `rgba(239,68,68,.22)` + 文字 `#9f1239` |

## 后台 token 差异（admin.css）

admin.css 在自身作用域重定义了两个值，注入到新后台页面时注意：

- `--sky: #87c4ed`（前台为 `#7ab9f0`）
- `--grad-mq: linear-gradient(135deg, #87c4ed, #5ad7f2)`（前台为 `#7ab9f0 → #3f8fef`）

其余 token 与 global.css 一致。后台多出的 badge：`.badge--published` / `.badge--draft`（见配方表）。

## 模块局部配色（home.css / project-detail.css）

这两个文件引入了自成一体的水青灰系局部色（非 token），用于首页 studio 楼层与项目详情页。复制这些模块时沿用原值即可，新造组件不要从里面取色：

- home.css：`#287395`（tech-node 激活底、统计数字）、`#54768b`/`#56768a`（楼层注释）、`#edf7f9`（studio 楼层页脚）、tech-map 节点 `#f8fdff` 底 / `#c7e0e8` 描边 / `#34637a` 文字。
- project-detail.css：状态点 `#70dfb1` + 光晕 `#70f4bf25`（活跃）/ `#7ab9f0` + `#7ab9f025`（归档）；快捷链接 `#2b6cb0`；lightbox 遮罩 `#173347b3` + `blur(7px)`；场景按钮激活 `#e7f7fa` 底 / `#94d9e6` 描边 / `#177d9a` 文字。

## 反模式清单

1. **彩色阴影**——`box-shadow` 用 `rgba(90,215,242,*)` 之类彩色值制造发光。只允许 `rgba(15,23,42,*)` 墨色三档。
2. **大面积渐变铺底**——页面、卡片、整段背景用项目渐变。渐变只能是小面积点缀；区块过渡只允许 `.tint-a`/`.tint-b` 那种 alpha ≤.06 的极淡带。
3. **渐变标签**——badge/pill/chip 用渐变底。标签必须淡彩 rgba 底 + 加深文字色。
4. **薄荷绿滥用**——mint 出现在非「当前/活跃」语义的位置（装饰、普通标签）。装饰点缀用 cyan/sky/blue。
5. **自调加深文字色**——配方表之外自己压暗颜色做标签文字，破坏全站一致性。
6. **彩色描边卡片**——玻璃卡描边用彩色。描边恒为 `rgba(255,255,255,.72)`（图表 tooltip 的 `rgba(122,185,240,.5)` 是既有例外，不扩散）。
7. **渐变文字扩散**——把 background-clip:text 渐变用到 eyebrow/hero-name/pn-label 之外的大段文字，损害可读性。
8. **主题类刷底色**——`.theme-*` 只提供 `--pgrad`，不得借它给容器上彩色背景。
