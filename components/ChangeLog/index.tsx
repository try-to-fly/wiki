import ky from "ky";
import { useEffect, useState } from "react";
import Link from "next/link";
import { DataItem, filterByDateRange } from "./parse-data";
import styles from "./changelog.module.scss";
import { List } from "antd";

export const ChangeLog = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [type, setType] = useState<"week" | "month">("week");

  useEffect(() => {
    ky.get("/last_modified.json")
      .json<DataItem[]>()
      .then((res) => {
        const list = filterByDateRange(res, type);
        console.log(list);
        setData(list);
      });
  }, [type]);

  return (
    <List
      dataSource={data}
      header={
        <div className={styles.header}>
          <div className={styles.title}>更新日志</div>
          <div className={styles.type}>
            <span
              className={type === "week" ? styles.active : ""}
              onClick={() => setType("week")}
            >
              本周
            </span>
            <span
              className={type === "month" ? styles.active : ""}
              onClick={() => setType("month")}
            >
              本月
            </span>
          </div>
        </div>
      }
      renderItem={(item, index) => {
        const url = item.file.replace("./pages", "").replace(".mdx", "");
        return (
          <List.Item>
            <Link href={url} className={styles.item}>
              <div className={styles.index}>{index + 1}、</div>
              <div className={styles.name}>{url}</div>
              <div className={styles.date}>{item.last_modified}</div>
            </Link>
          </List.Item>
        );
      }}
    ></List>
  );
};
