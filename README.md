# CodePulse Design System Skill

一套可复用的 AI Agent Skill：CodePulse「有机流动 + 几何解构」美术设计系统。让 AI 在生成网页、组件与动效时保持统一的大胆新潮（Bold & Trendy）视觉风格——天蓝到柠檬黄的六色渐变光谱、玻璃拟态、有机 blob 形状与克制的呼吸感动效。

提炼自《CodePulse 技术博客设计方案 v3.1》设计文档与 HTML 原型源码，所有色值、阴影、动效参数均为精确数值，可直接落地为代码。

## 安装

将整个 `codepulse-design-system/` 目录复制（或克隆本仓库）到你的 Agent skills 目录即可，例如：

```bash
git clone https://github.com/gene-sophen/color_design.git
cp -r color_design/codepulse-design-system ~/.agents/skills/
```

支持 Claude Code / Kimi Code 等兼容 SKILL.md 规范的 Agent。

## 目录结构

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

采用渐进式加载设计：SKILL.md 只保留核心流程与红线，细节按需读取 references，节省上下文。

## 设计系统速览

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

## 使用方式

安装后直接对 Agent 下达指令，skill 会自动触发，例如：

- "生成一个文章卡片组件，玻璃拟态 + blob 封面遮罩 + hover 动效"
- "给这个页面加背景 blob 氛围层，纯 CSS"
- "把现有组件配色迁移到这套设计系统的 CSS 变量上"

也可以手动引用：`@codepulse-design-system/assets/design-tokens.css` 作为项目样式基座。

## Aurora Glass 设计系统（四件套）

提炼自个人博客 gene-blog（极光背景 × 玻璃拟态 × 淡彩标签 × 错落编辑栅格），拆分为四个可独立触发、互相引用的子技能：

    aurora-glass/
    ├── aurora-color/        # 色彩系统：色板、淡彩配方、渐变红线、design-tokens.css
    ├── aurora-layout/       # 界面布局：页面骨架、栅格模式、sticky 侧栏、响应式降级
    ├── aurora-components/   # 组件规范：玻璃卡片、标签徽章、表单、导航、图表容器
    └── aurora-motion/       # 动效规范：120/200/600ms 参数组、滚动入场、极光背景

与 CodePulse 风格的区别：本套用中性墨色阴影（非彩色阴影）、渐变仅小面积点缀、薄荷绿仅表「当前/活跃」状态。

安装：把需要的子目录复制到 Agent skills 目录（如 `~/.agents/skills/`）即可，支持 Claude Code / Kimi Code 等兼容 SKILL.md 规范的 Agent。
