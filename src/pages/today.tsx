import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import isLeapYear from "dayjs/plugin/isLeapYear";
import "dayjs/locale/zh-cn";
import weekOfYear from "dayjs/plugin/weekOfYear";
import duration from "dayjs/plugin/duration";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Layout from "@theme/Layout";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
} from "chart.js";
import styles from "./Today.module.scss";

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
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>今天</h1>
        <div>
          Made By <a href="https://sharegpt.com/c/7YDyeuM">GPT-4</a>, For 猫猫
        </div>
        <p className={styles.time}>{time}</p>
        <p className={styles.date}>{date}</p>
        <p className={styles.info}>
          第 {dayOfYear} 天, 第 {weekOfYear} 周
        </p>

        <div className={styles.graphsContainer}>
          <div className={styles.graphWrapper}>
            <Pie data={pieChartData("今天进度百分比", todayProgress)} />
          </div>
          <div className={styles.graphWrapper}>
            <Pie data={pieChartData("本周进度百分比", weekProgress)} />
          </div>
          <div className={styles.graphWrapper}>
            <Pie data={pieChartData("当年进度百分比", yearProgress)} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Today;
