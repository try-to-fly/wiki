import ky from "ky";
import { useEffect, useState } from "react";
import Link from "next/link";
import { DataItem, filterByDateRange } from "./parse-data";
import styles from "./changelog.module.scss";
import { Table, TableProps } from "antd";
import { Wrap } from "@components/Wrap";

type TableDataItem = DataItem & {
  url: string;
  title: string;
};

export const ChangeLog = () => {
  const [data, setData] = useState<TableDataItem[]>([]);
  const [type, setType] = useState<"week" | "month">("week");

  useEffect(() => {
    const fetchData = async () => {
      const pageDatas = await ky
        .get(
          "https://wiki.dev-hub.top/_next/static/chunks/nextra-data-en-US.json"
        )
        .json();

      await ky
        .get("/last_modified.json")
        .json<DataItem[]>()
        .then((res) => {
          const list = filterByDateRange(res, type).map((item) => {
            const { file } = item;
            const url = file.replace("./pages", "").replace(".mdx", "");
            const title = pageDatas[url]?.title;
            return {
              ...item,
              url,
              title,
            };
          });
          setData(list);
        });
    };
    fetchData();
  }, [type]);

  const columns: TableProps<TableDataItem>["columns"] = [
    {
      title: "标题",
      dataIndex: "file",
      width: 450,
      render: (value, record) => {
        const { url, title } = record;
        return (
          <Link href={url} className={styles.item}>
            {title || url}
          </Link>
        );
      },
    },
    {
      title: "更新次数",
      dataIndex: "update_count",
      width: 200,
    },
    {
      title: "更新时间",
      dataIndex: "last_modified",
      width: 200,
    },
  ];

  return (
    <Wrap>
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
      <Table
        columns={columns}
        size="large"
        pagination={false}
        rowKey="file"
        dataSource={data}
        sticky
      />
    </Wrap>
  );
};
