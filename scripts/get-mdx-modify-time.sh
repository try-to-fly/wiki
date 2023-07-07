#!/bin/bash

# 检查命令行参数
if [ "$#" -ne 2 ]; then
    echo "Usage: ./script.sh <target_directory> <output_json>"
    exit 1
fi

# 获取命令行参数
target_directory=$1
output_json=$2

# 检查目标目录是否存在
if [ ! -d "$target_directory" ]; then
    echo "Error: Target directory does not exist."
    exit 1
fi

# 检测操作系统类型
os_type=$(uname)

# 初始化JSON数组
json_array='['

# 当前时间
current_time=$(date +%s)

# 遍历目标目录中的所有mdx文件
while IFS= read -r -d '' file
do
    # 获取Git日志
    git_log=$(git log --format="%ai" -- "$file")

    # 计算一周和一个月内的更新次数
    week_count=0
    month_count=0
    while IFS= read -r date; do
        # 转换日期为秒
        if [ "$os_type" = "Darwin" ]; then # macOS
            log_time=$(date -jf "%Y-%m-%d %H:%M:%S %z" "$date" +%s 2>/dev/null)
        else # Linux
            log_time=$(date --date="$date" +%s)
        fi

        # 检查更新是否在一周内
        if [ "$((current_time - log_time))" -le "$((7 * 24 * 60 * 60))" ]; then
            ((week_count++))
        fi

        # 检查更新是否在一个月内
        if [ "$((current_time - log_time))" -le "$((30 * 24 * 60 * 60))" ]; then
            ((month_count++))
        fi

    done <<< "$git_log"

    # 获取最后一次修改时间
    last_modified=$(head -n 1 <<< "$git_log")

    # 将结果添加到JSON数组
    json_array+="$(printf '{"file": "%s", "last_modified": "%s", "update_count_week": %d, "update_count_month": %d},' "$file" "$last_modified" "$week_count" "$month_count")"

done < <(find "$target_directory" -type f -name '*.mdx' -print0)

# 移除最后一个逗号，并关闭JSON数组
json_array=${json_array%,}
json_array+=']'

# 将结果写入输出JSON文件
echo "$json_array" > "$output_json"