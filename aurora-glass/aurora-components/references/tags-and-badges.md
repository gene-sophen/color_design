# 标签与徽章

共同语言：胶囊圆角 `var(--r-pill)`、`white-space: nowrap`、「浅 rgba 底 + 加深同色文字」，无渐变底色、无边框（除 chip）。色值出处 `src/styles/global.css` 与 `src/styles/admin.css`。

## .badge —— 文章分类徽章

```html
<span class="badge badge--devlog">devlog</span>
```

```css
.badge {
  display: inline-flex; align-items: center; gap: 5px;   /* gap 为内联 SVG 图标留位 */
  font: 600 12px/1 var(--font-display);
  letter-spacing: .06em;
  border-radius: var(--r-pill);
  padding: 5px 12px;
  white-space: nowrap;
  flex: 0 0 auto;
}
```

变体（底 / 字）：

| 类 | background | color |
| --- | --- | --- |
| `.badge--spec` | rgba(135,196,237,.18) | #2563a8 |
| `.badge--devlog` | rgba(90,215,242,.16) | #0b7d9b |
| `.badge--tool` | rgba(112,244,191,.2) | #0f8a5f |
| `.badge--essay` | rgba(148,163,184,.18) | #475569 |
| `.badge--interview` | rgba(135,196,237,.18) | #2b6cb0 |
| `.badge--job` | rgba(90,215,242,.22) | #0a6c88 |
| `.badge--resume` | rgba(112,244,191,.2) | #3e8a6d |
| `.badge--published`（仅后台） | rgba(112,244,191,.2) | #0f8a5f |
| `.badge--draft` | rgba(148,163,184,.15) | #475569 |

项目详情 `.pd-record` 内的 badge 缩小：`600 10px var(--font-mono); letter-spacing: .04em; padding: 5px 9px`。

## .pill —— 技术栈 / 身份小胶囊

```html
<span class="pill pill--cyan">Astro</span>
```

```css
.pill {
  display: inline-flex; align-items: center;
  font: 500 13px/1 var(--font-body);
  border-radius: var(--r-pill);
  padding: 7px 14px;
  white-space: nowrap;
}
.pill--cyan { background: rgba(90,215,242,.14);  color: #0b7d9b; }
.pill--mint { background: rgba(112,244,191,.18); color: #0f8a5f; }
.pill--sky  { background: rgba(135,196,237,.16); color: #2563a8; }
.pill--lg { font-size: 15px; font-weight: 600; padding: 9px 18px; }
.pill--sm { font-size: 12px; padding: 5px 12px; opacity: .85; }
```

用法约定：一组 pill 循环三色（`['cyan','mint','sky'][i%3]`，见 ProjectDetail.astro）；内联 SVG 图标 `vertical-align: -2px; margin-right: 5px`。成组容器 `.pills { display: flex; flex-wrap: wrap; gap: 10px; }`。

## .status-chip —— 状态标签

薄荷绿仅用于「当前/活跃」，归档/次要态用 `--muted` 灰。

```css
.status-chip {
  font: 600 11px/1 var(--font-display);
  letter-spacing: .14em;
  text-transform: uppercase;
  background: rgba(112,244,191,.18);
  color: #0b7a4d;
  border-radius: var(--r-pill);
  padding: 6px 14px;
  white-space: nowrap;
  flex: 0 0 auto;
}
.status-chip--muted { background: rgba(148,163,184,.16); color: #475569; }
```

## .chip —— 可点击过滤器

与上面纯展示标签不同：chip 是 `<button>`，带边框和指针交互。

```html
<button class="chip is-active" type="button">全部</button>
```

```css
.chip {
  font: 500 13px/1 var(--font-body);
  color: var(--body);
  background: rgba(255,255,255,.55);
  border: 1px solid var(--glass-border);
  border-radius: var(--r-pill);
  padding: 8px 14px;
  cursor: pointer;
  transition: background var(--t-hover) var(--ease), color var(--t-hover) var(--ease), transform var(--t-hover) var(--ease);
}
.chip:hover  { background: rgba(255,255,255,.85); color: var(--ink); }
.chip:active { transform: scale(.97); transition-duration: var(--t-press); }
.chip.is-active {
  background: rgba(90,215,242,.16);
  color: #0b7d9b;
  border-color: rgba(90,215,242,.4);
  font-weight: 600;
}
```

## .chip-feat —— feat-card 内「精选」小标

```css
.chip-feat {
  display: inline-flex; align-items: center; gap: 4px;
  font: 600 11px/1 var(--font-display); letter-spacing: .08em;
  background: rgba(135,196,237,.2); color: #2563a8;
  border-radius: var(--r-pill); padding: 4px 10px; white-space: nowrap;
}
```

## .pdot / .group-swatch —— 12px 渐变识别圆点

替代首字大图标，吃主题变量 `--pgrad`。`.pdot` 用于项目/身份识别，`.group-swatch` 用于日志章节分组（fallback 不同）。

```css
.pdot {
  width: 12px; height: 12px; flex: 0 0 auto; border-radius: 50%;
  background: var(--pgrad, var(--grad-pulse));
  box-shadow: 0 0 0 4px rgba(255,255,255,.55);
}
.group-swatch {
  /* 同上尺寸与光晕 */
  background: var(--pgrad, var(--grad-neutral));
}
```

hero 大标题内的 `.hero-name .pdot` 放大为 16×16。

## .proj-capsule —— 文章头「所属项目」玻璃胶囊

```html
<a class="proj-capsule theme-pulse" href="/project/slug">项目名</a>
```

```css
.proj-capsule {
  display: inline-flex; align-items: center; gap: 8px;
  font: 600 12px/1 var(--font-display); letter-spacing: .04em;
  color: var(--ink);
  background: var(--glass-bg);
  -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);   /* 轻玻璃 */
  border: 1px solid var(--glass-border);
  border-radius: var(--r-pill);
  padding: 7px 14px;
  box-shadow: var(--shadow-sm);
  transition: transform var(--t-hover) var(--ease), box-shadow var(--t-hover) var(--ease);
}
.proj-capsule::before {   /* 小渐变方块点 */
  content: ""; width: 9px; height: 9px; border-radius: 3px;
  background: var(--pgrad, var(--grad-misc));
}
.proj-capsule:hover  { transform: translateY(-2px); box-shadow: var(--shadow-md); }
.proj-capsule:active { transform: translateY(-2px) scale(.97); transition-duration: var(--t-press); }
```

## .ptrack / .pfill —— 进度条

```html
<span class="ptrack"><span class="pfill" style="width:72%"></span></span>
```

```css
/* 前台 global.css */
.ptrack { height: 6px; border-radius: 3px; background: rgba(15,23,42,.06); overflow: hidden; }
.pfill  { height: 100%; border-radius: 3px; background: var(--pgrad, var(--grad-pulse)); }
/* 后台 admin.css（在 button 内必须块级化） */
.ptrack { display: block; width: 100%; height: 4px; background: rgba(135,196,237,.28); }
.pfill  { display: block; max-width: 100%; }
```

填充色吃 `--pgrad`；宽度由行内 `style="width:N%"` 给出。
