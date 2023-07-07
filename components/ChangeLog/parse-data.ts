import dayjs from "dayjs";

export type DataItem = {
  file: string;
  last_modified: string;
  update_count: number;
};

type TimeRange = "week" | "month";

function formatWithinHour(diffInMinutes: number) {
  return `${diffInMinutes} 分钟前`;
}

function formatWithinDay(diffInHours: number) {
  return `${diffInHours} 小时前`;
}

function formatWithinWeek(diffInDays: number) {
  if (diffInDays === 1) {
    return "昨天";
  } else if (diffInDays === 2) {
    return "前天";
  } else {
    return `${diffInDays} 天前`;
  }
}

function formatExactDate(lastModified: dayjs.Dayjs) {
  return lastModified.format("YYYY-MM-DD");
}

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
    const diffInMinutes = now.diff(lastModified, "minute");
    const diffInHours = now.diff(lastModified, "hour");
    const diffInDays = now.diff(lastModified, "day");

    let formattedDate;

    if (diffInMinutes < 60) {
      formattedDate = formatWithinHour(diffInMinutes);
    } else if (diffInHours < 24) {
      formattedDate = formatWithinDay(diffInHours);
    } else if (diffInDays < 5) {
      formattedDate = formatWithinWeek(diffInDays);
    } else {
      formattedDate = formatExactDate(lastModified);
    }

    return { ...item, last_modified: formattedDate };
  });
}
