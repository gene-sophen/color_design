---
name: codepulse-design-system
description: CodePulse「有机流动 + 几何解构」美术设计系统，用于生成视觉一致的大胆新潮风格网页/UI。当用户要求生成、设计或改造页面、组件、卡片、动效，或提到 CodePulse、天蓝到柠檬黄渐变色板、玻璃拟态、blob 形状、几何解构、大胆新潮博客风格、要求页面"有设计感/拒绝模板感"时使用此 skill。提供色彩系统（六色光谱、彩色阴影、渐变）、组件规范（玻璃卡片、blob 容器、按钮、表单）、动效参数（blob 变形、悬浮呼吸、交错入场）与可直接注入代码的 CSS 变量。
---

# CodePulse 设计系统

风格定位：大胆新潮（Bold & Trendy），清新明亮、有机流动、拒绝模板感。
设计哲学：**Organic Flow（有机流动） + Geometric Deconstruct（几何解构）**。

- 有机流动：圆润 blob 形状、流体渐变背景、玻璃拟态、柔和彩色阴影。拒绝直角。
- 几何解构：卡片轻微倾斜（-3° ~ +3°）、错位网格、层叠遮挡、非对称留白、混用大小卡片。
- 色彩联动：背景色以 8%~15% 低透明度渗透进组件，玻璃卡片自然"沾染"背景色。

## 使用流程

1. 先读 `assets/design-tokens.css`，将全部 CSS 变量与工具类作为生成代码的配色/阴影/字体唯一来源。
2. 按任务类型读对应参考文件（只读需要的）：
   - 配色、渐变、文字层级、阴影 → `references/color-system.md`
   - 卡片、按钮、表单、导航、代码块等组件 → `references/components.md`
   - 背景氛围、hover、滚动入场等动效及参数 → `references/motion.md`
   - 页面布局模式与响应式断点 → `references/layout.md`
3. 生成代码时用变量名引用颜色/阴影（如 `var(--color-palette-cyan)`），不写死近似色值。
4. 交付前用下方清单与反模式自检。

## 生成页面自检清单

- [ ] 至少一个有机 blob 元素（非直角容器）
- [ ] 卡片打破完全对齐（倾斜 / 错位 / 大小不一）
- [ ] 阴影使用色板色 rgba，非中性灰
- [ ] 关键标题使用渐变文字（text-gradient-cool / warm）
- [ ] 动效克制：ease-in-out 为主，提供 prefers-reduced-motion 降级

## 反模式（明确禁止）

- 中性灰阴影（一律用色板色 rgba 阴影）
- 完全对齐的等大同形网格（至少一处打破对齐）
- 直角装饰容器（用 32px 圆角或 blob 形状）
- 滥用 backdrop-filter 铺满全页面（性能开销大，仅关键玻璃元素）
- scroll 事件驱动的动画（用 Intersection Observer）
- 与色板无关的跳色（一切颜色取自六色光谱及其透明度变体）
