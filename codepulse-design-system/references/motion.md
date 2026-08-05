# 动效设计

原则：动效服务于体验而非炫技。克制、流畅、有呼吸感，ease-in-out 为主。

## 目录
- [背景氛围动画](#背景氛围动画)
- [交互动效](#交互动效)
- [页面与滚动动效](#页面与滚动动效)
- [无障碍与性能红线](#无障碍与性能红线)

## 背景氛围动画

Blob 变形（核心氛围，纯 CSS / GPU 加速）：

- border-radius 在 blob 形状间循环变形，同时旋转 360°
- 周期 15~20s，多个 blob 错开 delay（0s / 2s / 5s）
- 配色：蓝 blob（opacity 10%，blur 60px）、碧绿 blob（15%，blur 60px）、青柠 blob（10%，blur 80px）
- 尺寸 40~60vw，散布页面四角，负边距出血

```css
@keyframes blob-morph {
  0%, 100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; transform: rotate(0deg) scale(1); }
  50%      { border-radius: 60% 40% 30% 70% / 50% 40% 60% 50%; transform: rotate(180deg) scale(1.2); }
}
/* 使用：animation: blob-morph 15s ease-in-out infinite; */
```

Logo 悬浮：上下浮动 20px + 5° 微旋转，6s 周期 ease-in-out。

## 交互动效

| 场景 | 参数 |
|---|---|
| 卡片 hover | `scale(1.05)`，300ms ease；阴影 soft→medium；微旋转 ±1°；卡内图片 `scale(1.1)` |
| 按钮 hover | 背景渐变平移 + `scale(1.02)`，200ms |
| 按钮点击 | `scale(0.96~0.98)` 弹性回弹 |
| 聚焦态 | 色板色发光阴影（`--shadow-glow`） |
| 标签 hover | 背景色平移过渡 |
| 收藏图标 | 点击填充动画 |

## 页面与滚动动效

- 内容入场：fade-in + 上移 20px
- 网格项：逐个交错入场（每项间隔 50ms，spring stiffness ≈ 100）
- 滚动触发：Intersection Observer（禁用 scroll 事件监听）
- 背景 blob：滚动视差
- 图片加载：blur → clear 渐进
- 页面顶部：滚动进度指示条
- 页面切换：fade + slide

## 无障碍与性能红线

- `prefers-reduced-motion` 媒体查询：为偏好减动的用户关闭动画
- 对比度满足 WCAG 2.1 AA
- blob 动画只用 CSS transform/opacity（GPU 层），不用 JS 逐帧
- 图片懒加载；中文字体做子集化
