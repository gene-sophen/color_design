---
name: aurora-color
description: "为网页生成/修改应用 Aurora Glass 设计系统的色彩规范：极光背景 × 玻璃拟态 × 淡彩标签。当需要配色、色板、色彩系统、design tokens、color palette、淡彩标签（badge/pill/status-chip 配方）、玻璃拟态配色、小面积渐变的取舍，或提到 Aurora Glass、aurora 色板时使用本 skill。布局见 aurora-layout，组件结构见 aurora-components，动效参数见 aurora-motion。"
---

# Aurora Glass · 色彩

为个人博客/作品集类页面输出与 Aurora Glass 一致的色彩决策。所有数值均来自真实生产代码，禁止自行发明色值。

## 色彩哲学

- **极光淡彩**：底色 `#f8fbff`，一层缓慢漂移的极光 SVG 光晕提供氛围；界面本身几乎不上彩，彩色只以低透明度（alpha .1–.35）出现。
- **玻璃拟态**：卡片与面板统一「半透明白 + 白描边 + backdrop blur」，描边用白色而非彩色（见下文玻璃配方）。
- **克制渐变**：5 条项目渐变全部 135deg，只允许出现在小面积点缀（圆点、进度条、下划线、按钮、图标块、节点）。渐变大面积铺底 = 翻车。
- **中性阴影**：阴影只用墨色 `rgba(15,23,42,...)` 三档，不用彩色阴影制造「发光」。
- **墨色文字层级**：正文、标题、辅助信息分别吃 `--ink/--body/--muted` 三级墨色，不用彩色文字充当层级（渐变文字仅限 .eyebrow / .hero-name / .pn-label 三处标题类元素）。

## 色板速查

| token | 值 | 角色 |
| --- | --- | --- |
| `--sky` | `#7ab9f0` | 天蓝（主品牌冷色，mq 渐变起点） |
| `--cyan` | `#5ad7f2` | 青（pulse 渐变起点、选中态、表单焦点） |
| `--mint` | `#70f4bf` | 薄荷绿（仅表「当前/活跃」状态） |
| `--blue` | `#3f8fef` | 深蓝（mq/avalon 渐变终点、链接 hover） |
| `--ink` | `#0f172a` | 标题/强调文字 |
| `--body` | `#334155` | 正文 |
| `--muted` | `#64748b` | 辅助/次要文字 |
| `--bg` | `#f8fbff` | 页面底色 |

玻璃：`--glass-bg: rgba(255,255,255,.65)` + `--glass-border: rgba(255,255,255,.72)` + `blur(16px)`。

阴影：`--shadow-sm/md/lg` = `rgba(15,23,42,.05/.07/.12)`，位移依次 `0 4px 16px / 0 12px 40px / 0 20px 56px`。

渐变（135deg）：pulse `#5ad7f2→#70f4bf`、mq `#7ab9f0→#3f8fef`、avalon `#70f4bf→#3f8fef`、misc `#87c4ed→#70f4bf`、neutral `#cbd5e1→#94a3b8`。

## 红线（渐变与淡彩）

1. 渐变禁止大面积铺底；合法使用位仅限：12px 识别圆点、进度条填充、左缘 4px 竖条、渐变下划线（2px 高）、渐变按钮、时间线节点/连接线、图标小块、装饰 orb（直径 <200px、blur 48px、opacity ≤.4）。
2. 标签（badge / pill / status-chip）一律「淡彩 rgba 底 + 加深文字色」，无渐变、无描边渐变。薄荷绿底的 status-chip 仅表示「当前/活跃」，静置/归档用 `--muted` 灰色变体（`status-chip--muted`）。
3. 加深文字色必须从配方表取（见 references/palette.md），不要自己调深。
4. 主题类 `.theme-*` 只提供 `--pgrad` 变量给小面积点缀消费，不刷大面积底色。
5. 阴影永远中性墨色，禁用 `box-shadow` 带彩色值。

## 按任务取文件

- **快速给元素上色**（badge/pill/chip/链接/标题）→ 查本文档速查表即可。
- **需要完整配方与全部边角色值**（淡彩配方表、渐变色标表、焦点/选中色、prose 代码块/引用配色、反模式清单）→ 读 `references/palette.md`。
- **从零搭建新项目或迁移** → 直接注入 `assets/design-tokens.css`（:root 全部 token + tint/selection/focus/theme/ptrack/pfill），再按需写组件样式。
- **布局结构**（栅格、错落、容器 1080px）→ 用姊妹 skill `aurora-layout`；**组件结构**（卡片、导航、表格的 HTML/CSS 骨架）→ `aurora-components`；**动效时长与曲线**（120/200/600ms、`cubic-bezier(0.22,1,0.36,1)`）→ `aurora-motion`。本 skill 只管色值。

## 自检清单

- [ ] 渐变只出现在小面积点缀？页面/卡片背景不是渐变？
- [ ] 标签全部是「rgba 淡彩底 + 加深文字色」，无渐变标签？
- [ ] 薄荷绿只用于「当前/活跃」状态？
- [ ] 所有阴影均为 `rgba(15,23,42,…)` 中性墨色？
- [ ] 玻璃卡使用 `--glass-bg` + `--glass-border` + `blur(16px)`？
- [ ] 文字层级只用 `--ink/--body/--muted`？渐变文字未扩散到 .eyebrow/.hero-name/.pn-label 之外？
- [ ] 所有色值都能在 references/palette.md 或 design-tokens.css 中找到出处？
