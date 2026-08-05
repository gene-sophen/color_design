# 色彩系统

## 目录
- [主色板（六色光谱）](#主色板六色光谱)
- [背景系统](#背景系统)
- [文字层级](#文字层级)
- [彩色阴影系统](#彩色阴影系统)
- [渐变组合](#渐变组合)
- [渐变文字](#渐变文字)

## 主色板（六色光谱）

天蓝 → 柠檬黄的清新渐变，所有颜色只能从此光谱及其透明度变体中取。

| 名称 | Hex | 用途 |
|---|---|---|
| 天蓝 Sky Blue | `#87C4ED` | 渐变起点、Hero 背景 |
| 亮青 Cyan | `#5AD7F2` | 链接、交互元素 |
| 碧绿 Turquoise | `#44E8E2` | 强调色、CTA 按钮 |
| 薄荷 Mint | `#70F4BF` | 成功状态、标签 |
| 青柠 Lime | `#B1FA94` | 装饰、图标 |
| 柠檬 Lemon | `#F9F871` | 高亮、警告 |

## 背景系统

分层制造纵深，区块交替使用：

```
主背景   #F8FBFF   超浅蓝白，主内容区
次级背景 #F0F9FF   略饱和，交替区块
三级背景 #F5FFFA   浅薄荷调，精选内容区
暖调背景 #FAFFF5   浅黄绿调，CTA 区块
卡片背景 rgba(255,255,255,0.85)   玻璃拟态卡片
玻璃背景 rgba(255,255,255,0.7)    覆盖层元素
```

## 文字层级

同一深色基底的四级体系，禁止引入其他文字颜色：

```
一级 #0F172A   标题与关键内容（带蓝底的近黑）
二级 #334155   正文与描述（深岩灰）
三级 #64748B   元信息、时间戳
四级 #94A3B8   占位符、禁用态、装饰文字
```

## 彩色阴影系统

阴影永远用色板色 rgba，不用中性灰：

```css
--shadow-soft:   0 4px 20px rgba(135,196,237,0.15);  /* 卡片常规悬浮 */
--shadow-medium: 0 8px 30px rgba(90,215,242,0.2);    /* 悬浮元素 */
--shadow-strong: 0 12px 40px rgba(68,232,226,0.25);  /* 弹窗/模态 */
--shadow-glow:   0 0 15px rgba(90,215,242,0.4);      /* 聚焦/交互发光 */
```

## 渐变组合

```
全光谱：蓝 → 青 → 绿 → 黄     Hero、核心视觉
冷色调：天蓝 → 碧绿           主标题渐变文字
暖色调：碧绿 → 青柠           次级/强调标题渐变文字
阳光：  薄荷 → 柠檬           装饰点缀
```

## 渐变文字

```css
.text-gradient-cool {
  background: linear-gradient(135deg, #87C4ED, #5AD7F2, #44E8E2, #70F4BF);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.text-gradient-warm {
  background: linear-gradient(135deg, #44E8E2, #70F4BF, #B1FA94, #F9F871);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
```
