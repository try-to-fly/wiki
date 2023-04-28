import React, { useState, useEffect } from "react";
import { Button, Card, Image, message, Row, Col, Typography } from "antd";
import { Wrap } from "@site/src/component/Wrap";
import styles from "./ClipboardReader.module.scss";

const { Text } = Typography;

const RenderItem: React.FC<{ item: ClipboardItem }> = ({ item }) => {
  const [firstType] = item.types;
  const [content, setContent] = useState<React.ReactNode>();

  useEffect(() => {
    const fetchData = async () => {
      const blob = await item.getType(firstType);

      if (firstType.startsWith("text")) {
        setContent(<Text>{await blob.text()}</Text>);
      } else if (firstType.startsWith("image")) {
        setContent(
          <Image className={styles.image} src={URL.createObjectURL(blob)} />
        );
      } else {
        setContent(
          <a
            href={URL.createObjectURL(blob)}
            download={`file.${firstType.split("/")[1]}`}
          >
            下载文件
          </a>
        );
      }
    };

    fetchData();
  }, [item, firstType]);

  const handleClick = async () => {
    if (firstType.startsWith("text") || firstType.startsWith("image")) {
      try {
        await navigator.clipboard.write([item]);
        message.success("内容已复制到剪贴板");
      } catch (err) {
        message.error("无法复制内容到剪贴板");
      }
    }
  };

  return <div onClick={handleClick}>{content}</div>;
};

const ClipboardReader: React.FC = () => {
  const [clipboardData, setClipboardData] = useState<any[]>([]);

  const readClipboardData = async () => {
    if (!navigator.clipboard) {
      message.error("您的浏览器不支持剪切板API");
      return;
    }
    try {
      const items = await navigator.clipboard.read();
      console.log({ items });
      setClipboardData(items);
    } catch (err) {
      message.error("无法读取剪切板数据");
    }
  };

  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      readClipboardData();
    };
    document.addEventListener("paste", onPaste);
    return () => document.removeEventListener("paste", onPaste);
  }, []);

  return (
    <Wrap>
      <div className={styles.container}>
        <Button
          size="small"
          onClick={readClipboardData}
          className={styles.button}
        >
          读取剪切板数据
        </Button>
        {clipboardData.length > 0 && (
          <Row gutter={[16, 16]} className={styles.dataRow}>
            {clipboardData.map((item, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                  size="small"
                  title={`类型: ${item.types[0]}`}
                  className={styles.card}
                >
                  <RenderItem item={item} />
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Wrap>
  );
};

export default ClipboardReader;
