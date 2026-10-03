# 文章排版组件（.prose 体系）

出处 `src/styles/global.css`。`.prose` 容器 `font-size: 17px; line-height: 1.8; color: var(--body)`，`p` 间距 `0 0 26px`。排版容器所在的三栏 grid（正文 65ch + TOC 列）归 aurora-layout。

## 标题

```css
.prose h2 {
  font-size: 25px; letter-spacing: -.01em;
  margin: 56px 0 18px;
  padding-left: 16px;
  border-left: 4px solid;
  border-image: linear-gradient(180deg, var(--cyan), var(--blue)) 1;  /* 渐变左边条 */
  scroll-margin-top: 104px;
}
.prose h3 { font-size: 20px; margin: 40px 0 14px; scroll-margin-top: 104px; }
.prose h1 { font-size: 28px; letter-spacing: -.01em; margin: 48px 0 16px; }
.prose strong { color: var(--ink); font-weight: 600; }
.prose a {
  color: #2b6cb0;
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: rgba(63,143,239,.5);
}
.prose a:hover { text-decoration-color: currentColor; }
.prose ul { margin: 0 0 26px; padding-left: 22px; }
.prose li { margin-bottom: 10px; }
.prose li::marker { color: var(--cyan); }
```

## 代码

```css
/* 行内 */
.prose code {
  font: 400 .85em var(--font-mono);
  background: rgba(90,215,242,.14);
  border-radius: 6px;
  padding: 2px 7px;
  color: #0b7d9b;
}
/* 块 */
.prose pre {
  background: linear-gradient(135deg, rgba(135,196,237,.1), rgba(112,244,191,.08));
  border: 1px solid rgba(135,196,237,.35);
  border-radius: var(--r-md);
  padding: 20px 24px;
  font: 400 13.5px/1.75 var(--font-mono);
  color: var(--body);
  overflow-x: auto;
  margin: 0 0 26px;
}
.prose pre code { background: none; padding: 0; color: inherit; font-size: inherit; }
/* 语法高亮三色（自建着色器输出的 span） */
.prose pre .c-kw  { color: #2b6cb0; font-weight: 500; }  /* 关键字：蓝 */
.prose pre .c-str { color: #0f8a5f; }                    /* 字符串：绿 */
.prose pre .c-cm  { color: var(--muted); }               /* 注释：灰 */
```

## 引用块

```css
.prose blockquote {
  margin: 0 0 26px;
  padding: 18px 24px;
  border-radius: var(--r-md);
  background: linear-gradient(135deg, rgba(90,215,242,.08), rgba(135,196,237,.08));
  color: var(--ink);
  font-weight: 500;
}
.prose blockquote p { margin: 0; }
```

## 表格（玻璃表）

```html
<div class="table-wrap">
  <table><thead><tr><th>…</th></tr></thead><tbody><tr><td>…</td></tr></tbody></table>
</div>
```

```css
.prose table {
  width: 100%;
  border-collapse: separate; border-spacing: 0;
  margin: 0 0 26px;
  font-size: 15px;
  background: var(--glass-bg);
  -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
  border: 1px solid var(--glass-border);
  border-radius: var(--r-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}
.prose th {
  font: 600 13px/1.6 var(--font-display); letter-spacing: .08em;
  text-align: left; color: var(--ink);
  background: rgba(135,196,237,.14);
  padding: 12px 16px;
}
.prose td { padding: 12px 16px; border-top: 1px solid rgba(135,196,237,.2); }
.prose .table-wrap { max-width: 100%; overflow-x: auto; }  /* 过宽表格横向滚动兜底，必包 */
```

## 配图

```html
<figure>
  <div class="fig-art" role="img" aria-label="示意图"></div>
  <figcaption>图注</figcaption>
</figure>
```

```css
.prose figure { margin: 0 0 26px; }
.fig-art {   /* 无图时的极光彩斑占位，高 220px */
  height: 220px;
  border-radius: var(--r-md);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--glass-border);
  background:
    radial-gradient(200px 140px at 22% 30%, rgba(90,215,242,.2),  transparent 70%),
    radial-gradient(260px 160px at 76% 68%, rgba(112,244,191,.16), transparent 70%),
    radial-gradient(180px 140px at 55% 20%, rgba(135,196,237,.13), transparent 70%),
    rgba(255,255,255,.55);
}
.prose figcaption { font-size: 13px; color: var(--muted); text-align: center; margin-top: 10px; }
/* 真实配图 */
.prose img.article-image {
  max-width: 100%; height: auto; display: block;
  margin: 0 auto 26px;
  border-radius: var(--r-md);
  box-shadow: var(--shadow-sm);
}
/* 图片加载失败的行内报错 */
.article-image-error {
  font: 400 13px/1.6 var(--font-mono);
  color: #b4552d;
  background: rgba(135,196,237,.2);
  border-radius: 6px;
  padding: 2px 8px;
}
```

## .breakout —— 破版

仅桌面端（≥981px）：元素左缘仍与正文对齐，右侧最多延伸到 TOC 列左缘（正文列宽 + 48px 列间距），不侵入 TOC 列。

```css
@media (min-width: 981px) {
  .prose .breakout {
    width: min(880px, calc(100% + 48px));
    margin-left: 0;
  }
}
```

用法：给 pre / figure / table-wrap 等块加 `class="breakout"`。

## .empty-note —— 淡彩空态

```html
<p class="empty-note">暂无数据</p>
```

```css
.empty-note {
  font-size: 14.5px;
  color: var(--muted);
  background: rgba(135,196,237,.1);
  border: 1px dashed rgba(135,196,237,.45);
  border-radius: var(--r-md);
  padding: 16px 20px;
}
```

## .eyebrow —— 渐变眉题

章节/面板标题上方的大写小字，渐变文字：

```css
.eyebrow {
  font: 600 13px/1 var(--font-display);
  letter-spacing: .22em;
  text-transform: uppercase;
  background: linear-gradient(135deg, #2b6cb0, #0b7d9b);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  margin-bottom: 18px;
}
```

后台 `.admin-scope .eyebrow` 渐变不同：`linear-gradient(135deg, #0e9fc4, #2bb673)`，注意区分作用域。
