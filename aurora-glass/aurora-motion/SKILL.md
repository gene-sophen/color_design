---
name: aurora-motion
description: Aurora Glass 设计系统的动效规范与配方库。为网页添加或修改动效、动画、过渡时使用：滚动入场（scroll reveal）、悬停抬升/按压（hover effect）、渐变下划线、SVG 图表生长（柱状/环形/热力图 stagger）、wheel 滚轮导航展开时序、极光背景（aurora background）漂移、tooltip 淡入、文字滑入滑出。强制全站唯一动效参数组（120/200/600ms + cubic-bezier(0.22,1,0.36,1)）与 prefers-reduced-motion 降级。触发词：动效、动画、过渡、滚动入场、悬停效果、极光背景、animation、transition、scroll reveal、hover effect、prefers-reduced-motion、Aurora Glass。
---

# Aurora Motion

Aurora Glass 设计系统的动效部分。给页面加任何动效前，先读本文件确立约束，再按「动效模式索引」去读 `references/motion-patterns.md` 里对应模式的完整配方。配色见 aurora-color，布局见 aurora-layout，组件结构见 aurora-components——本 skill 只管动效。

## 动效哲学

克制。全站只有一组动效参数，所有元素共享；动效是反馈不是表演。

- 只用 GPU 友好属性：`transform` 和 `opacity`。唯一例外是 SVG 圆环的 `stroke-dashoffset` 和 wheel 容器的 `max-width`（布局动画，已有意接受其成本）。
- 不引入新的时长、新的缓动、新的关键帧。需要动效时从下表参数里选，不要现造。
- 交互反馈快（120–200ms），入场稍慢（600ms），背景氛围极慢（60s）。三者层次不可混用。
- 每个动效都必须能在 `prefers-reduced-motion: reduce` 下安全消失，且内容不因此不可见。

## 参数速查表

CSS 自定义属性，定义在 `:root`，全站唯一：

| Token | 值 | 用途 |
|---|---|---|
| `--t-press` | `120ms` | `:active` 按压（scale 收缩） |
| `--t-hover` | `200ms` | `:hover` 过渡（位移、阴影、变色） |
| `--t-reveal` | `600ms` | 滚动入场 |
| `--ease` | `cubic-bezier(0.22, 1, 0.36, 1)` | 唯一缓动曲线，CSS 与 JS(WAAPI) 共用 |

JS 侧必须与上表保持一致的字面量（见 `assets/motion-reveal.js` 头部常量）：`DURATION = 600`、`EASING = 'cubic-bezier(0.22, 1, 0.36, 1)'`。

其他已批准的固定数值（来自项目真实代码，可直接复用，不得再发明新值）：

| 场景 | 数值 |
|---|---|
| 渐变下划线滑入 | `300ms`（`--ease`，`transform-origin: left`） |
| 入场阶梯延迟 | `60ms` 递增，最多 5 级 |
| 柱状图生长 | `700ms`，延迟 `calc(var(--i, 0) * 40ms)` |
| 热力图格子弹入 | `600ms`，延迟 `calc(var(--i, 0) * 35ms)` |
| 圆环生长 | `800ms`（`stroke-dashoffset`） |
| tooltip 淡入 | `150ms` |
| 数字 count-up | `700ms`，cubic-out |
| 极光漂移 | `60s`，`alternate infinite` |
| 页眉滚动阈值 | `scrollY > 8` 加 `.is-scrolled` |

## 动效模式索引

按需求查下表，到 `references/motion-patterns.md` 读对应小节的「触发时机 + CSS/JS 配方」后再动手：

| 需求 | 模式 |
|---|---|
| 元素随滚动进入视口淡入上移、可重复播放、同组阶梯延迟 | 滚动入场（scroll reveal） |
| 卡片/按钮 hover 抬升、active 按压收缩 | hover 抬升 / 按压 |
| 链接 hover 时渐变下划线从左滑入 | 渐变下划线 |
| SVG 柱状图/条形图/圆环/热力图入场生长 | SVG 图表生长（stagger） |
| 首页区块滚轮导航 hover 展开/收起的交错时序 | wheel 导航展开收起 |
| 页面背景的 S 形极光流光带缓慢漂移 | 极光背景漂移 |
| 图表格子 hover/focus 弹出气泡提示 | 图表 tooltip 淡入 |
| 收起态标签文字左右滑入滑出切换 | 文字滑入滑出（WAAPI） |
| 页面上滑后页眉出现发丝线与淡阴影 | 页眉吸附（.is-scrolled） |

可直接复用的资产：

- `assets/aurora-background.css` — 极光背景层完整可注入 CSS（`.aurora` + `@keyframes aurora-sway` + body 背景约定 + reduced-motion 降级），文件头有用法注释。
- `assets/motion-reveal.js` — 无依赖 vanilla JS：`data-reveal` IntersectionObserver 入场（含阶梯延迟、图表生长、数字 count-up）+ TOC scroll-spy + 页眉吸附。可直接 `<script defer>` 引入。

## reduced-motion 红线

- CSS 必须含全局降级块：`@media (prefers-reduced-motion: reduce)` 内关 smooth scroll、关 `.aurora` 动画、`.js [data-reveal]` 直显 `opacity: 1`，并把 `*` 的 transition/animation duration 压到 `.01ms !important`。
- 初始隐藏必须由 JS 添加（JS 给 `<html>` 加 `.js` 类，选择器写作 `.js [data-reveal] { opacity: 0 }`）。禁止在基础 CSS 里无前缀隐藏——无 JS 或降级时内容必须直接可见。
- JS 动效入口先检测 `prefers-reduced-motion`、`IntersectionObserver`、`Element.prototype.animate`，任一不满足直接 return，不动 DOM。
- `matchMedia('(prefers-reduced-motion: reduce)')` 要监听 `change`，用户中途切换偏好时立即停掉进行中的动画并还原终态。
- SVG 图表的终态写在 SVG 属性上，初始 0 态只在 `.js` 下生效——无 JS 时图表以终态直接可见。

## 自检清单

交付前逐项核对：

- [ ] 所有时长/缓动都来自参数速查表，没有新造数值
- [ ] 过渡属性只含 `transform` / `opacity`（SVG 圆环 `stroke-dashoffset`、wheel `max-width` 除外）
- [ ] `:active` 按压 = 在 hover 位移基础上追加 `scale(.97)` 且 `transition-duration: var(--t-press)`
- [ ] 初始隐藏带 `.js` 前缀，无 JS 内容可见
- [ ] reduced-motion 下动画消失且内容可见
- [ ] WAAPI 动画播放前 cancel 旧实例，结束（`onfinish`）后把样式控制权交还 CSS（清内联 transform，不遮挡 hover）
- [ ] IntersectionObserver 回调幂等，离开视口的重置不积累动画实例
