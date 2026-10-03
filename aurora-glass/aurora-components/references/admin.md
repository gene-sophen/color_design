# 后台（Studio）组件

出处 `src/styles/admin.css`。所有样式挂在 `.admin-scope` 作用域下，该作用域自带一套 token（注意 `--sky` 为 `#87c4ed`，与前台 `#7ab9f0` 不同；`.btn-grad` 背景用 `var(--grad-pulse)` 而非前台的 cyan→blue 渐变）。页面骨架：`.admin-container > .admin-topbar + .admin-layout(.admin-side + .admin-main)`，布局细节归 aurora-layout。

## .panel + .admin-table —— 玻璃表格面板

```html
<div class="panel">
  <table class="admin-table">
    <thead><tr><th>标题</th><th>状态</th><th>项目</th><th>日期</th><th>推荐</th><th></th><th>操作</th></tr></thead>
    <tbody>
      <tr>
        <td><span class="cell-title"><strong>主标题</strong><small>副标题</small></span></td>
        <td><span class="badge badge--published">已发布</span></td>
        <td><span class="cell-proj">项目名</span></td>
        <td><span class="cell-date">2026-09-24</span></td>
        <td><button class="toggle is-on" type="button" aria-label="推荐"></button></td>
        <td></td>
        <td class="ops"><button>编辑</button><button class="danger">删除</button></td>
      </tr>
    </tbody>
  </table>
</div>
```

```css
.panel {
  background: var(--glass-bg);
  -webkit-backdrop-filter: blur(16px); backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  border-radius: var(--r-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
}
.admin-table { width: 100%; border-collapse: collapse; table-layout: fixed; font-size: 14.5px; }
.admin-table th {
  font: 600 12px/1.6 var(--font-display); letter-spacing: .12em; text-transform: uppercase;
  text-align: left; color: var(--muted);
  padding: 14px 16px; border-bottom: 1px solid rgba(135,196,237,.3);
}
.admin-table td { padding: 13px 16px; border-bottom: 1px solid rgba(135,196,237,.18); color: var(--body); vertical-align: middle; }
.admin-table tbody tr { transition: background var(--t-hover) var(--ease); }
.admin-table tbody tr:hover { background: rgba(255,255,255,.55); }
/* 定宽列：1 auto / 2:96 / 3:150 / 4:110 / 5:88 / 6:64 / 7:118 px */
```

单元格约定：`.cell-title` 单行省略（strong 主标题 13px/600/`#233448` + small 副标题 10px/`#8396a6`，`max-width: 360px`）；`.cell-proj` 13px muted；`.cell-date` 用 mono `400 12.5px/1`；`.ops` 内文字按钮 `#0e9fc4`、`.danger` `#b4552d`、hover 变 `--ink`。空态 `.admin-table-empty` 居中 `padding: 40px 20px`。≤640px 整表转 flex 行卡、隐藏表头与 proj/date 列。

## 按钮

```html
<button class="btn-grad" type="button">保存</button>
<button class="btn-soft" type="button">取消</button>
<button class="btn-soft danger" type="button">删除</button>
```

```css
.btn-grad {   /* 主操作：小面积渐变合法使用位 */
  display: inline-flex; align-items: center; gap: 8px;
  font: 600 14px/1 var(--font-display);
  color: var(--ink);
  background: var(--grad-pulse);      /* 前台 global.css 版本为 linear-gradient(135deg, var(--cyan), var(--blue)) */
  border: none; border-radius: var(--r-pill);
  padding: 11px 22px;
  box-shadow: var(--shadow-sm);
  transition: transform var(--t-hover) var(--ease), box-shadow var(--t-hover) var(--ease);
}
.btn-grad:hover  { transform: translateY(-2px); box-shadow: var(--shadow-md); }
.btn-grad:active { transform: translateY(-2px) scale(.97); transition-duration: var(--t-press); }
.btn-grad:disabled { opacity: .55; cursor: not-allowed; transform: none; }

.btn-soft {   /* 次级幽灵按钮：轻玻璃胶囊，blur(8px) */
  font: 500 13px/1 var(--font-body); color: var(--body);
  background: var(--glass-bg); border: 1px solid var(--glass-border);
  border-radius: var(--r-pill); padding: 9px 16px; box-shadow: var(--shadow-sm);
}
.btn-soft:hover { color: var(--ink); transform: translateY(-2px); box-shadow: var(--shadow-md); }
.btn-soft.danger { color: #b4552d; }
.btn-soft svg { margin-right: 5px; vertical-align: -2px; }
```

## .toolbar + .search + .chip 过滤

```html
<div class="toolbar">
  <input class="search" type="search" placeholder="搜索…">
  <button class="chip is-active">全部</button>
  <select class="select">…</select>
  <button class="btn-grad">新建</button>
</div>
```

```css
.toolbar { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-bottom: 16px; }
.toolbar .select { width: auto; }
.search {
  flex: 1 1 220px; min-width: 0;
  font: 400 14.5px/1.5 var(--font-body);
  background: var(--glass-bg);
  -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: var(--r-pill);
  padding: 10px 18px;
  outline: none;
  box-shadow: var(--shadow-sm);
}
.search:focus { outline: none; border-color: var(--cyan); box-shadow: 0 0 0 3px rgba(90,215,242,.25); }
```

chip 的样式与状态见 tags-and-badges.md。

## .toggle —— 开关

```html
<button class="toggle is-on" type="button" role="switch" aria-checked="true"></button>
```

```css
.toggle {
  position: relative; width: 36px; height: 20px;
  border-radius: var(--r-pill);
  background: rgba(148,163,184,.3);
  border: none; padding: 0; cursor: pointer;
  transition: background var(--t-hover) var(--ease), transform var(--t-hover) var(--ease);
}
.toggle::after {
  content: ""; position: absolute; left: 2px; top: 2px;
  width: 16px; height: 16px; border-radius: 50%;
  background: #fff; box-shadow: 0 1px 4px rgba(15,23,42,.18);
  transition: transform var(--t-hover) var(--ease);
}
.toggle.is-on { background: var(--grad-pulse); }
.toggle.is-on::after { transform: translateX(16px); }
.toggle:active { transform: scale(.94); transition-duration: var(--t-press); }
```

## .pager —— 分页

```html
<div class="admin-foot">
  <span class="admin-foot-count">共 42 篇</span>
  <nav class="pager">
    <button disabled>‹</button><button class="is-current">1</button><button>2</button>
    <span class="pager-gap">…</span><button>9</button><button>›</button>
  </nav>
</div>
```

```css
.pager { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
.pager button, .pager .pager-gap {
  font: 500 12.5px/1 var(--font-mono);
  color: var(--muted); border: none; background: transparent;
  border-radius: 10px; padding: 8px 12px; cursor: pointer;
}
.pager button:hover:not(:disabled) { color: var(--ink); background: rgba(255,255,255,.7); }
.pager button:active:not(:disabled) { transform: scale(.94); transition-duration: var(--t-press); }
.pager button.is-current { background: rgba(90,215,242,.16); color: #0b7d9b; font-weight: 600; }
.pager button:disabled { opacity: .38; cursor: not-allowed; }
.pager .pager-gap { cursor: default; padding: 8px 4px; }
```

## 表单：.fgroup / .frow / .fitem / .input / .select / .textarea

```html
<form id="articleForm">
  <fieldset class="fgroup">
    <h3 class="fgroup-title">基本信息</h3>
    <div class="frow">
      <label class="fitem"><span>标题</span><input class="input" type="text"></label>
      <label class="fitem"><span>分类</span><select class="select">…</select></label>
      <label class="fitem fitem--full"><span>摘要</span>
        <textarea class="textarea"></textarea>
        <em class="hint">一两句话即可</em>
      </label>
    </div>
  </fieldset>
  <div class="form-actions"><button class="btn-grad">保存</button></div>
</form>
```

```css
.fgroup {  /* 玻璃表单卡 */
  /* 玻璃皮肤 blur(16px) + --r-lg + --shadow-md */
  padding: 26px 28px; margin-bottom: 24px;
}
.fgroup-title {
  font: 600 12px/1 var(--font-display); letter-spacing: .2em; text-transform: uppercase;
  color: var(--muted); margin: 0 0 18px;
  display: flex; align-items: center; gap: 10px;
}
.fgroup-title::before { content: ""; width: 16px; height: 3px; border-radius: 2px; background: var(--grad-pulse); }
.frow { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 16px 20px; }
.frow--single { grid-template-columns: 1fr; }
.frow .fitem--full { grid-column: 1 / -1; }
.fitem { display: grid; gap: 6px; min-width: 0; align-content: start; }
.fitem > span { font-size: 13px; color: var(--muted); }
.fitem .hint { font-size: 12px; color: var(--muted); font-style: normal; }
.input, .select, .textarea {
  width: 100%; min-width: 0;
  font: 400 14.5px/1.6 var(--font-body);
  color: var(--ink);
  background: rgba(255,255,255,.6);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 9px 14px;
  outline: none;
  transition: border-color var(--t-hover) var(--ease), box-shadow var(--t-hover) var(--ease);
}
.textarea { resize: vertical; min-height: 84px; }
.input:focus, .select:focus, .textarea:focus {
  outline: none; border-color: var(--cyan); box-shadow: 0 0 0 3px rgba(90,215,242,.25);
}
.input.mono-field, .textarea.mono-field { font-family: var(--font-mono); font-size: 13px; }
.field-error { font-size: 11px; color: #b34e4e; }
```

## .dropzone —— 上传区

```html
<button class="dropzone" type="button">
  <strong>点击或拖入图片</strong>
  <span>支持 PNG / JPG / WebP</span>
</button>
```

```css
.dropzone {
  width: 100%;
  border: 1.5px dashed rgba(90,215,242,.55);
  border-radius: var(--r-lg);
  background: rgba(255,255,255,.45);
  -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
  padding: 34px 20px;
  display: grid; gap: 6px; justify-items: center;
  cursor: pointer;
  transition: border-color var(--t-hover) var(--ease), background var(--t-hover) var(--ease), transform var(--t-hover) var(--ease);
}
.dropzone strong { font-size: 16px; color: var(--ink); font-weight: 600; }
.dropzone span   { font-size: 13px; color: var(--muted); }
.dropzone:hover, .dropzone.drag-active { border-color: var(--cyan); background: rgba(255,255,255,.7); }
.dropzone:active { transform: scale(.99); transition-duration: var(--t-press); }
.dropzone:disabled { opacity: .55; cursor: not-allowed; }
```

## .media-card —— 图床缩略卡

```html
<div class="media-grid">
  <div class="media-card">
    <label class="media-select"><input type="checkbox"></label>
    <div class="media-thumb"><img src="…" alt=""></div>
    <button class="media-name">hero.png</button>
    <p class="media-size">128 KB</p>
    <div class="media-group"><button class="chip">封面</button></div>
    <div class="media-ops"><button>复制地址</button><button class="danger">删除</button></div>
  </div>
</div>
```

```css
.media-grid { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 16px; }  /* ≤980px 2 列 */
.media-card {
  /* 轻玻璃 blur(12px) + --r-md + --shadow-sm */
  padding: 10px;
  transition: transform var(--t-hover) var(--ease), box-shadow var(--t-hover) var(--ease);
}
.media-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
.media-thumb {
  height: 88px; border-radius: 10px; margin-bottom: 8px;
  overflow: hidden; background: #eef6f8; display: grid; place-items: center;
}
.media-thumb img { width: 100%; height: 100%; object-fit: contain; display: block; }
.media-name { font: 400 11.5px/1.4 var(--font-mono); color: var(--ink); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.media-size { font: 400 11px/1.4 var(--font-mono); color: var(--muted); margin-top: 2px; }
.media-group .chip { padding: 4px 10px; font-size: 11.5px; }
.media-ops { margin-top: 8px; display: flex; flex-wrap: wrap; gap: 10px; }
.media-ops a, .media-ops button { font: 500 12px/1 var(--font-body); color: #0e9fc4; background: none; border: none; cursor: pointer; }
.media-ops .danger { color: #b4552d; }
.media-empty { grid-column: 1 / -1; padding: 54px 20px; color: var(--muted); text-align: center; }
```

变体 `.media-grid.is-list`：单列行式，卡内改 `grid-template-columns: 95px minmax(0,1fr) auto`，ops 固定在 `grid-column: 3; grid-row: 1/4`。

## .proj-row —— 项目维护行卡

```html
<div class="proj-list">
  <button class="proj-row theme-pulse is-active" type="button">
    <span class="proj-row-head"><span class="pdot"></span><b>项目名</b><span class="status-chip">Ongoing</span></span>
    <span class="proj-row-meta"><span>12 篇</span><span>2026-09-24</span></span>
    <span class="ptrack"><span class="pfill" style="width:72%"></span></span>
  </button>
</div>
```

```css
.proj-admin-grid { display: grid; grid-template-columns: 340px minmax(0,1fr); gap: 24px; align-items: start; }  /* ≤980px 单列 */
.proj-list { display: grid; gap: 12px; }
.proj-row {
  display: block; width: 100%; min-width: 0; text-align: left;
  /* 轻玻璃 blur(12px) + --r-md + --shadow-sm */
  padding: 16px 18px; cursor: pointer;
  transition: transform var(--t-hover) var(--ease), box-shadow var(--t-hover) var(--ease), border-color var(--t-hover) var(--ease);
}
.proj-row:hover  { transform: translateY(-2px); box-shadow: var(--shadow-md); }
.proj-row:active { transform: translateY(-2px) scale(.98); transition-duration: var(--t-press); }  /* 注意是 .98 */
.proj-row.is-active { border-color: rgba(90,215,242,.55); box-shadow: var(--shadow-md); }
.proj-row-head { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
.proj-row-head b { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 15px; color: var(--ink); font-weight: 600; }
.proj-row-head .status-chip { margin-left: auto; }
.proj-row-meta { display: flex; justify-content: space-between; min-width: 0; font: 400 11.5px/1 var(--font-mono); color: var(--muted); margin-bottom: 8px; }
```

注意：`button` 内的 `.ptrack` 必须 `display: block; width: 100%`，否则内层 `%` 宽度失去参照溢出卡片（源码注释明确此坑）。
