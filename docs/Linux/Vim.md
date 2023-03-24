### 用法

#### 文件

1. 打开文件：`<leader>ff`

#### 选择

1. 智能选择：ctrl+b

#### 查找替换

1. 选择+S+内容
2. 查找替换：`<leader>S`
3. 搜索：`<leader>fg`

### 技巧

1. `d/字符串`：使用 d/字符串命令来删除从当前字符到某个字符串结尾的内容。例如，如果你想删除从当前字符到字符串"end"的内容，你可以使用 d/end 命令

#### 插件

1. [vim-surround](https://github.com/tpope/vim-surround)
   - `ds`  删除环绕字符，如  `ds"`  删除双引号
   - `cs`  修改环绕字符，如  `cs"'`  把双引号改为单引号
   - `ys`  添加环绕字符，如  `ysiw)`  给单词加上圆括号
   - `S`  在可视模式下添加环绕字符，如选中一段文字后按  `S"`  给它加上双引号
2. [nvim-spectre](https://github.com/nvim-pack/nvim-spectre)
   - `<leader>S`: 打开 Spectre 搜索工具
   - `<leader>sw`: 搜索当前单词或选中文本
   - `<leader>sp`: 在当前文件中搜索当前单词

#### 别人的配置

1.  [https://github.com/jdhao/nvim-config](https://github.com/jdhao/nvim-config)
2.  [https://github.com/ayamir/nvimdots](https://github.com/ayamir/nvimdots)
3.  [https://github.com/theniceboy/nvim](https://github.com/theniceboy/nvim)
    - plug、键位
4.  [kickstart.nvim](https://github.com/nvim-lua/kickstart.nvim)
    - lua

### 工具

1. vim 在线教程：[https://openvim.com/](https://openvim.com/)：包含 vim 的一些基本操作