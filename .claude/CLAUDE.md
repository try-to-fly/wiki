# Wiki 项目 Claude 配置

## 项目说明

这是一个基于 Nextra 4.x 的个人知识库项目，文档存放在 `content/` 目录。

## 快速文档录入指令

### 触发方式

当用户输入以下格式时，执行快速录入流程：

- `录入：xxx`
- `添加文档：xxx`
- `记录：xxx`

### 执行流程

1. **分析内容关键词**

   - 提取主题、技术栈、工具名称等关键信息
   - 根据关键词判断归属目录

2. **确定目标位置**

   - 检查是否有匹配的现有目录
   - 如需新建子目录，自动创建并生成索引页

3. **创建文档文件**

   - 文件格式：`.mdx`
   - 文件名规范：使用英文，首字母大写，多词用连字符（如 `Docker-Compose.mdx`）
   - frontmatter 必须包含 `title`

4. **更新索引页**

   - 找到父级的 `asIndexPage: true` 文件
   - 在「内容导航」部分添加新条目
   - 格式：`1. [标题](./相对路径) - 简短描述`

5. **输出结果**
   - 告知创建的文件路径
   - 列出更新的索引页

### 示例

输入：`录入：Tailscale 内网穿透配置`

执行：

1. 分析：Tailscale、VPN、网络 → `Development/proxy/`
2. 创建：`content/docs/Development/proxy/Tailscale.mdx`
3. 更新：`content/docs/Development/proxy.mdx` 索引

---

## 目录结构参考

```
content/docs/
├── Development/     # 开发相关
│   ├── frontend/    # 前端开发
│   ├── Linux/       # Linux 工具
│   ├── Python/      # Python
│   ├── proxy/       # 代理/网络
│   ├── Automation/  # 自动化
│   ├── Terminal/    # 终端
│   └── Cross-platform/ # 跨平台
├── ai/              # 人工智能
├── Tools/           # 工具软件
├── Devices/         # 电子设备
│   ├── Mac/         # Mac 相关
│   └── iPhone/      # iPhone 相关
├── Resources/       # 资源
└── Life/            # 生活
    ├── Car/         # 汽车
    └── Travel/      # 旅行
```

---

## 文件格式规范

### 普通文档

```mdx
---
title: 文档标题
---

正文内容...
```

### 索引页（目录首页）

```mdx
---
title: 目录标题
asIndexPage: true
---

### 内容导航

1. [子页面 1](./子目录/文件1.mdx) - 简短描述
2. [子页面 2](./子目录/文件2.mdx) - 简短描述
```

### 新建子目录时

需要同时创建：

1. 目录文件夹（如 `NewTopic/`）
2. 同名索引页（如 `NewTopic.mdx`，带 `asIndexPage: true`）
3. 更新父级索引页

---

## 关键词到目录映射

| 关键词                                | 目标目录                  |
| ------------------------------------- | ------------------------- |
| 前端、React、Vue、CSS、JS、TypeScript | Development/frontend/     |
| Linux、Shell、Bash、命令行            | Development/Linux/        |
| Python、pip、poetry                   | Development/Python/       |
| Docker、容器、K8s                     | Development/Linux/        |
| VPN、代理、Tailscale、网络穿透        | Development/proxy/        |
| Git、版本控制                         | Development/Linux/Git/    |
| Vim、NVim、编辑器                     | Development/Linux/editor/ |
| Mac、macOS、Homebrew                  | Devices/Mac/              |
| iPhone、iOS、快捷指令                 | Devices/iPhone/           |
| AI、LLM、GPT、Claude                  | ai/                       |
| 自动化、RPA、脚本                     | Development/Automation/   |
| 终端、iTerm、Alacritty                | Development/Terminal/     |
