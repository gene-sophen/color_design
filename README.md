# color_design — AI Agent 设计系统 Skill 合集

收录两套可复用的美术设计系统 Skill，让 AI 在生成网页、组件与动效时保持统一的视觉风格。所有色值、阴影、动效参数均为提炼自真实项目的精确数值，可直接落地为代码。支持 Claude Code / Kimi Code 等兼容 SKILL.md 规范的 Agent。

## 合集一览

| 设计系统 | 风格关键词 | 目录 | 结构 |
|---|---|---|---|
| **CodePulse** | 有机流动 + 几何解构，大胆新潮（Bold & Trendy） | `codepulse-design-system/` | 单 skill + references |
| **Aurora Glass** | 极光背景 × 玻璃拟态 × 淡彩标签 × 错落编辑栅格 | `aurora-glass/` | 四个可独立触发的子技能 |

两套风格互斥，不要混用：CodePulse 用彩色阴影与大面积六色渐变；Aurora Glass 用中性墨色阴影，渐变仅小面积点缀。

## 安装

```bash
git clone https://github.com/gene-sophen/color_design.git

# 装 CodePulse（整套一个目录）
cp -r color_design/codepulse-design-system ~/.agents/skills/

# 装 Aurora Glass（四个子技能，可按需全装或单装）
cp -r color_design/aurora-glass/* ~/.agents/skills/
```

## CodePulse Design System

提炼自《CodePulse 技术博客设计方案 v3.1》设计文档与 HTML 原型源码。

**设计哲学**：Organic Flow（有机流动）+ Geometric Deconstruct（几何解构）

**主色板**（天蓝 → 柠檬黄）：

| 名称 | Hex | 用途 |
|---|---|---|
| 天蓝 Sky Blue | `#87C4ED` | 渐变起点、Hero 背景 |
| 亮青 Cyan | `#5AD7F2` | 链接、交互元素 |
| 碧绿 Turquoise | `#44E8E2` | 强调色、CTA 按钮 |
| 薄荷 Mint | `#70F4BF` | 成功状态、标签 |
| 青柠 Lime | `#B1FA94` | 装饰、图标 |
| 柠檬 Lemon | `#F9F871` | 高亮、警告 |

**字体**：Outfit（标题）/ Space Grotesk（正文）/ JetBrains Mono（代码）

**核心特征**：

- 玻璃拟态卡片（`backdrop-filter: blur(12px)`，白色 85% 透明底）
- 有机 blob 形状与纯 CSS 变形背景动画（15~20s 周期，GPU 加速）
- 彩色阴影系统（色板色 rgba，禁用中性灰）
- 渐变文字标题（`background-clip: text`）
- 卡片 ±1°~3° 微旋转的几何解构布局
- 动效克制：ease-in-out 为主，遵守 `prefers-reduced-motion` 降级

**目录结构**：

```
codepulse-design-system/
├── SKILL.md                      # 触发描述 + 设计哲学 + 使用流程 + 自检清单 + 反模式
├── references/
│   ├── color-system.md           # 六色光谱色板、分层背景、文字层级、彩色阴影、渐变组合
│   ├── components.md             # 玻璃拟态卡片、blob 形状、按钮、表单、导航等组件规范
│   ├── motion.md                 # blob 变形、悬浮呼吸、hover、滚动入场等动效参数
│   └── layout.md                 # 响应式断点、页面布局模式、字体系统
└── assets/
    └── design-tokens.css         # 可直接注入项目的 CSS 变量与工具类
```

## Aurora Glass 设计系统

提炼自个人博客 gene-blog 的生产代码（Astro + 纯 CSS/JS），拆分为四个互相引用、可独立触发的子技能：

```
aurora-glass/
├── aurora-color/        # 色彩系统：色板、淡彩配方表、渐变红线、反模式
│   └── assets/design-tokens.css        # 可直接注入的 :root 变量文件
├── aurora-layout/       # 界面布局：页面骨架、栅格模式、sticky 侧栏、响应式降级
├── aurora-components/   # 组件规范：玻璃卡片、标签徽章、文章排版、后台表单、导航与图表
└── aurora-motion/       # 动效规范：120/200/600ms 参数组、滚动入场、极光背景
    └── assets/          # aurora-background.css + motion-reveal.js（可直接引入）
```

**设计哲学**：极光淡彩打底，玻璃载物，渐变克制——彩色只属于背景极光与小面积点缀。

**主色板**：

| Token | Hex | 角色 |
|---|---|---|
| `--sky` | `#7ab9f0` | 天蓝（主品牌冷色） |
| `--cyan` | `#5ad7f2` | 青（选中态、表单焦点） |
| `--mint` | `#70f4bf` | 薄荷绿（仅表「当前/活跃」状态） |
| `--blue` | `#3f8fef` | 深蓝（渐变终点、链接 hover） |
| `--ink` / `--body` / `--muted` | `#0f172a` / `#334155` / `#64748b` | 墨色文字三级层级 |
| `--bg` | `#f8fbff` | 页面底色 |

**字体**：Space Grotesk + Noto Sans SC（标题）/ Noto Sans SC（正文）/ JetBrains Mono（代码）

**核心特征**：

- S 形极光流光带背景（60s 极缓漂移，`z-index: -1`，随页面长度拉伸）
- 玻璃拟态卡片（`blur(16px)` + 65% 白底 + 白色描边），阴影一律中性墨色三档
- 淡彩标签系统：badge/pill 全部「rgba 淡彩底 + 加深同色文字」，禁用渐变标签
- 错落编辑栅格：项目卡右列下沉 48px、文章页 65ch 阅读列 + sticky TOC
- 全站唯一动效参数组：120/200/600ms + `cubic-bezier(0.22,1,0.36,1)`，严格 `prefers-reduced-motion` 降级

## 使用方式

安装后直接对 Agent 下达指令，skill 会自动触发，例如：

- "用 Aurora Glass 风格生成一个项目卡片，玻璃拟态 + 错落栅格"
- "给这个页面加极光背景层，按 aurora-motion 的参数来"
- "把现有组件配色迁移到 aurora-color 的 design-tokens 上"
- "生成一个文章卡片组件，玻璃拟态 + blob 封面遮罩 + hover 动效"（CodePulse）

也可以手动引用资产文件作为项目样式基座：

- `@codepulse-design-system/assets/design-tokens.css`
- `@aurora-color/assets/design-tokens.css`、`@aurora-motion/assets/motion-reveal.js`

所有 skill 均采用渐进式加载设计：SKILL.md 只保留核心流程与红线，细节按需读取 references，节省上下文。
