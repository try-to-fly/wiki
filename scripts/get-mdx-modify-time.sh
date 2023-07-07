
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

# 初始化JSON数组
json_array='['

# 遍历目标目录中的所有mdx文件
while IFS= read -r -d '' file
do
    # 获取Git最后一次修改时间
    last_modified=$(git log -1 --format="%ai" -- "$file")

    # 将结果添加到JSON数组
    json_array+="$(printf '{"file": "%s", "last_modified": "%s"},' "$file" "$last_modified")"

done < <(find "$target_directory" -type f -name '*.mdx' -print0)

# 移除最后一个逗号，并关闭JSON数组
json_array=${json_array%,}
json_array+=']'

# 将结果写入输出JSON文件
echo "$json_array" > "$output_json"