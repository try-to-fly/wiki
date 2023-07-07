import dayjs from "dayjs";

export type DataItem = {
  file: string;
  last_modified: string;
};

type TimeRange = "week" | "month";

export function filterByDateRange(data: DataItem[], range: TimeRange) {
  const now = dayjs();
  const cutOffDate =
    range === "week" ? now.subtract(7, "day") : now.subtract(1, "month");

  // 过滤出在指定时间范围内的数据
  const filteredData = data.filter((item) => {
    const lastModified = dayjs(item.last_modified);
    return lastModified.isAfter(cutOffDate);
  });

  // 按日期排序
  filteredData.sort((a, b) => {
    return dayjs(b.last_modified).valueOf() - dayjs(a.last_modified).valueOf();
  });

  // 格式化日期
  return filteredData.map((item) => {
    const lastModified = dayjs(item.last_modified);
    if (lastModified.isSame(now, "day")) {
      return { ...item, last_modified: "今天" };
    } else if (lastModified.isSame(now.subtract(1, "day"), "day")) {
      return { ...item, last_modified: "昨天" };
    } else if (lastModified.isSame(now.subtract(2, "day"), "day")) {
      return { ...item, last_modified: "前天" };
    } else {
      return { ...item, last_modified: lastModified.format("YYYY-MM-DD") };
    }
  });
}
