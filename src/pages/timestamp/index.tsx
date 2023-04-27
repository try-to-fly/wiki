// App.tsx
import React, { useState, useEffect } from "react";
import { Input, Typography, Row, Col, message, Grid, Button } from "antd";
const { Text } = Typography;
const { useBreakpoint } = Grid;
import dayjs from "dayjs";
import { Wrap } from "@site/src/component/Wrap";
import styles from "./Timestamp.module.scss";

interface AppState {
  timestamp: string;
  format: string;
}

const Timestamp: React.FC = () => {
  const [state, setState] = useState<AppState>({
    timestamp: "",
    format: "YYYY-MM-DD HH:mm:ss",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const timestamp = urlParams.get("timestamp") || Date.now().toString();
    setState((prevState) => ({ ...prevState, timestamp }));
  }, []);

  const screens = useBreakpoint();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));

    if (name === "timestamp") {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set("timestamp", value);
      window.history.replaceState(null, "", `?${urlParams.toString()}`);
    }
  };

  const parsedTimestamp = () => {
    const { timestamp } = state;
    const num = Number(timestamp);

    if (!Number.isInteger(num)) {
      return { ms: null, s: null };
    }

    const isMs = num.toString().length >= 13;
    return isMs ? { ms: num, s: num / 1000 } : { ms: num * 1000, s: num };
  };

  const formattedTime = (unit: "ms" | "s") => {
    const { format } = state;
    const { ms, s } = parsedTimestamp();

    if (unit === "ms" && ms !== null) {
      return dayjs(ms).format(format);
    }

    if (unit === "s" && s !== null) {
      return dayjs.unix(s).format(format);
    }

    return "";
  };

  const getCurrentTime = () => {
    const currentTime = dayjs().valueOf();
    setState((prevState) => ({
      ...prevState,
      timestamp: currentTime.toString(),
    }));

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("timestamp", currentTime.toString());
    window.history.replaceState(null, "", `?${urlParams.toString()}`);
  };

  const clearURLData = () => {
    setState((prevState) => ({ ...prevState, timestamp: "" }));
    window.history.replaceState(null, "", "/");
  };

  const { timestamp, format } = state;
  const { ms, s } = parsedTimestamp();

  return (
    <Wrap>
      <div className={styles.container}>
        <Row gutter={[16, 16]} justify={screens.xs ? "start" : "center"}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Row style={{ marginBottom: "1rem" }}>
              <Button
                size="small"
                onClick={getCurrentTime}
                style={{ marginRight: "1rem" }}
              >
                获取当前时间
              </Button>
              <Button size="small" onClick={clearURLData}>
                清除 URL 数据
              </Button>
            </Row>
            <div className={styles.label}>时间戳:</div>
            <Input
              name="timestamp"
              value={timestamp}
              onChange={handleInputChange}
              size="large"
              style={{ marginBottom: "1rem" }}
            />
            {ms === null && s === null && (
              <Text type="danger" style={{ marginBottom: "1rem" }}>
                错误：无效的时间戳
              </Text>
            )}
            <Row className={styles.row}>
              <Col span={4}>毫秒:</Col>
              <Col span={20}>
                <Text copyable={{ onCopy: () => message.success("复制成功") }}>
                  {ms}
                </Text>
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col span={4}>秒:</Col>
              <Col span={20}>
                <Text copyable={{ onCopy: () => message.success("复制成功") }}>
                  {s}
                </Text>
              </Col>
            </Row>
            <div className={styles.label}>格式:</div>
            <Input
              name="format"
              value={format}
              onChange={handleInputChange}
              size="large"
              style={{ marginBottom: "1rem" }}
            />
            <Row className={styles.row}>
              <Col span={8}>结果:</Col>
              <Col span={16}>
                <Text copyable={{ onCopy: () => message.success("复制成功") }}>
                  {formattedTime("ms")}
                </Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Wrap>
  );
};

export default Timestamp;
