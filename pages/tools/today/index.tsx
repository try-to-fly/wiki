import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import isLeapYear from "dayjs/plugin/isLeapYear";
import "dayjs/locale/zh-cn";
import weekOfYear from "dayjs/plugin/weekOfYear";
import duration from "dayjs/plugin/duration";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
} from "chart.js";
import styles from "./Today.module.scss";
import { Card, Row, Col, Typography, Space } from "antd";
import { Wrap } from "@components/Wrap";

const { Title, Text } = Typography;

dayjs.locale("zh-cn");
dayjs.extend(weekOfYear);
dayjs.extend(duration);
dayjs.extend(advancedFormat);
dayjs.extend(isLeapYear);

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale);
const progressColor = "#36A2EB";
const remainingColor = "#E0E0E0";

const Today: React.FC = () => {
  const [time, setTime] = useState(dayjs().format("HH:mm:ss"));
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));

  const now = dayjs();
  const startOfYear = dayjs().startOf("year");
  const dayOfYear = now.diff(startOfYear, "day") + 1;
  const weekOfYear = now.week();

  const todayProgress = (now.hour() * 60 + now.minute()) / (24 * 60);
  const weekProgress = now.day() / 7;
  const yearProgress = dayOfYear / (dayjs().isLeapYear() ? 366 : 365);
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(dayjs().format("HH:mm:ss"));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const pieChartData = (label: string, progress: number) => {
    return {
      labels: ["剩余", label],
      datasets: [
        {
          data: [100 - progress * 100, progress * 100],
          backgroundColor: [progressColor, remainingColor],
          borderColor: [progressColor, remainingColor],
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <Wrap gptUrl="https://sharegpt.com/c/lZB0UvD">
      <div className={styles.container}>
        <Space direction="vertical">
          <Title level={1}>今天</Title>
          <Text className={styles.time}>{time}</Text>
          <Text className={styles.date}>{date}</Text>
          <Text className={styles.info}>
            第 {dayOfYear} 天, 第 {weekOfYear} 周
          </Text>
        </Space>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Card title="今天进度百分比">
              <Pie data={pieChartData("今天进度百分比", todayProgress)} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card title="本周进度百分比">
              <Pie data={pieChartData("本周进度百分比", weekProgress)} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card title="当年进度百分比">
              <Pie data={pieChartData("当年进度百分比", yearProgress)} />
            </Card>
          </Col>
        </Row>
      </div>
    </Wrap>
  );
};

export default Today;
