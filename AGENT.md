# 项目 Agent 指南（AGENT.md）

> 这是给 AI 编程助手 / 自动化 Agent 的项目说明文档，便于后续协作与自动化改动。你可以持续补充内容。

## 项目概览

- 类型：个人 Wiki/博客站点（Next.js + Nextra）
- 线上地址：https://wiki.dev-hub.top/
- 主要内容：`pages/docs` 下的 `.mdx` 文档

## 技术栈（Tech Stack）

- Next.js 13（Pages Router）
- Nextra 2（`nextra-theme-docs`）
- React 18 + TypeScript
- TailwindCSS + Ant Design（局部）
- 搜索：Algolia DocSearch（配置位于 `theme.config.tsx`）

## 目录结构（重点）

- `pages/docs/**`：Wiki 主体文档（MDX）
- `pages/blog/**`：博客（MDX）
- `pages/cook/**`：菜谱（MDX）
- `pages/timeline/**`：时间线（MDX）
- `pages/tools/**`：工具页（MDX/TSX，通常由 `@components/pages` 渲染）
- `pages/api/**`：API Routes
- `components/**`：站点组件（包含工具页组件）
- `public/**`：静态资源；构建前会更新 `public/last_modified.json`
- `scripts/**`：维护脚本（文档修改时间、索引等）

## 常用命令（pnpm）

```bash
# 开启 corepack（可选，但推荐）
corepack enable

# 安装依赖
pnpm install

# 开发（默认端口 8888）
pnpm dev

# 构建（会先生成 public/last_modified.json）
pnpm build
```

## 内容维护约定（MDX）

### 新增/修改 docs 文档

1. 在 `pages/docs/...` 新建/编辑 `.mdx`
2. 如需出现在侧边栏：更新对应目录的 `_meta.json`
3. 链接尽量用相对路径（示例：`./Development/Python.mdx`）

### 导航与侧边栏（_meta.json）

- 顶部导航：`pages/_meta.json`
- docs 侧边栏根：`pages/docs/_meta.json`
- 子目录侧边栏：`pages/docs/**/_meta.json`

### 静态资源（图片/文件）

- 放在 `public/` 下
- 引用使用绝对路径（示例：`/img/logo.png`）

## Agent 工作规范（默认）

### 语言

- 默认中文（简体）
- 常用英文技术术语保留英文原文，并在必要时补充中文解释

### 依赖管理（Node）

- 优先使用 `pnpm` 管理与安装依赖
- 如新增/删除依赖：同步更新 `pnpm-lock.yaml`

### 改动边界

- 不编辑生成目录：`.next/`、`node_modules/`
- 仅做与需求直接相关的最小改动，避免无关重构
- 不执行破坏性命令（如 `git reset --hard`、大规模删除）除非明确要求

### 自检建议

- 内容/导航相关改动：至少确认对应页面可访问、侧边栏与链接无明显错误
- 构建前置脚本：`pnpm build` 会自动执行 `pnpm modify-date` 生成 `public/last_modified.json`

## TODO（留空给你后续录入）

- <!-- TODO: 内容分类/命名/归档策略（例如：文件名大小写、中文文件名是否允许） -->
- <!-- TODO: 新增工具页的约定（目录结构、组件复用、路由命名） -->
- <!-- TODO: 发布流程（Vercel/CI、域名、环境变量） -->
- <!-- TODO: PR/Commit 规范（如需对外协作） -->

