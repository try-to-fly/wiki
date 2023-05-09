// 导入依赖库
import React, { useState, useCallback, useEffect } from "react";
import {
  Upload,
  Button,
  message,
  Input,
  Select,
  Space,
  Typography,
  List,
  Row,
  Col,
  Form,
} from "antd";
import QRCode from "qrcode.react";
import { Wrap } from "@components/Wrap";
import styles from "./QRCodeTool.module.scss";
import jsQR from "jsqr";
import copy from "copy-to-clipboard";

// 二维码工具组件
const QRCodeTool: React.FC = () => {
  const [qrUrls, setQrUrls] = useState<string[]>([]);
  const [inputText, setInputText] = useState("");
  const [qrSize, setQrSize] = useState(128);
  const [qrLevel, setQrLevel] = useState("L");

  const handleBeforeUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const image = new Image();
      image.src = e.target.result as string;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0);
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const decodedQR = jsQR(
          imageData.data,
          imageData.width,
          imageData.height,
          {
            inversionAttempts: "dontInvert",
          }
        );

        if (decodedQR) {
          setQrUrls([decodedQR.data]);
        } else {
          message.error("未检测到二维码");
        }
      };
    };
    reader.readAsDataURL(file);

    return false;
  }, []);
  const handlePaste = useCallback(
    (event: ClipboardEvent) => {
      const items = event.clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file = items[i].getAsFile();
          handleBeforeUpload(file);
        }
      }
    },
    [handleBeforeUpload]
  );

  useEffect(() => {
    window.addEventListener("paste", handlePaste);
    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, [handlePaste]);

  const handleQRCodeClick = useCallback(() => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvas.toBlob(async (blob) => {
        try {
          const clipboardItem = new ClipboardItem({ "image/png": blob });
          await (navigator.clipboard as any).write([clipboardItem]);
          message.success("已复制到剪贴板");
        } catch (error) {
          message.error("复制失败");
        }
      });
    }
  }, []);
  return (
    <Wrap title="二维码工具">
      <Space direction="vertical" className={styles.qrCodeTool}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Typography.Title level={4}>识别</Typography.Title>
            <Upload beforeUpload={handleBeforeUpload} showUploadList={false}>
              <Button size="small" type="primary">
                选择图片
              </Button>
            </Upload>
            {qrUrls.length > 0 && (
              <List
                dataSource={qrUrls}
                renderItem={(item) => {
                  const isUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(item);
                  return (
                    <List.Item>
                      {isUrl ? (
                        <a
                          href={item}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item}
                        </a>
                      ) : (
                        <Typography.Paragraph copyable={{ text: item }}>
                          {item}
                        </Typography.Paragraph>
                      )}
                    </List.Item>
                  );
                }}
              />
            )}
          </Col>
          <Col xs={24} sm={12}>
            <Typography.Title level={4}>转码</Typography.Title>
            <Form layout="vertical">
              <Form.Item label="文本">
                <Input.TextArea
                  size="small"
                  autoSize
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="尺寸">
                <Select
                  size="small"
                  value={qrSize}
                  onChange={setQrSize}
                  style={{ width: 120 }}
                >
                  <Select.Option value={128}>128x128</Select.Option>
                  <Select.Option value={256}>256x256</Select.Option>
                  <Select.Option value={512}>512x512</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="纠错等级">
                <Select
                  size="small"
                  value={qrLevel}
                  onChange={setQrLevel}
                  style={{ width: 120 }}
                >
                  <Select.Option value="L">L</Select.Option>
                  <Select.Option value="M">M</Select.Option>
                  <Select.Option value="Q">Q</Select.Option>
                  <Select.Option value="H">H</Select.Option>
                </Select>
              </Form.Item>
            </Form>
            <Typography.Title level={4}>生成的二维码</Typography.Title>
            <QRCode
              size={qrSize}
              level={qrLevel as any}
              value={inputText}
              onClick={handleQRCodeClick}
            />
          </Col>
        </Row>
      </Space>
    </Wrap>
  );
};

export default QRCodeTool;
