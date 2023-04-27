### 教程

1. [Tmux 使用手册](http://louiszhai.github.io/2017/09/30/tmux/)

### 我的配置

```bash
 set -g prefix C-a #
# unbind C-b # C-b即Ctrl+b键，unbind意味着解除绑定
# bind C-a send-prefix # 绑定Ctrl+a为新的指令前缀

# 从tmux v1.6版起，支持设置第二个指令前缀
set-option -g prefix2 ` # 设置一个不常用的`键作为指令前缀，按键更快些
# 按下两次`，可以输入这个字符。
bind '`' send-keys '`'

unbind '"'
bind - splitw -v -c '#{pane_current_path}' # 垂直方向新增面板，默认进入当前目录
unbind %
bind | splitw -h -c '#{pane_current_path}' # 水平方向新增面板，默认进入当前目录

set-option -g mouse on # 等同于以上4个指令的效果

# 使用hjkl 切换面板
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R

# 设置起始索引
set -g base-index 1
setw -g pane-base-index 1

# List of plugins
set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-sensible'

# Other examples:
# set -g @plugin 'github_username/plugin_name'
# set -g @plugin 'github_username/plugin_name#branch'
# set -g @plugin 'git@github.com:user/plugin'
# set -g @plugin 'git@bitbucket.com:user/plugin'
set -g @plugin 'tmux-plugins/tmux-resurrect'


# Initialize TMUX plugin manager (keep this line at the very bottom of tmux.conf)
run '~/.tmux/plugins/tpm/tpm'
set -g @plugin 'dracula/tmux'
run -b '~/.tmux/plugins/tpm/tpm'

set-option -sg escape-time 10
set-option default-terminal "tmux-256color"
set-option -g renumber-windows on

```
