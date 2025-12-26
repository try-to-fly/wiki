"use client";

import React, { useState, useEffect } from "react";
import { Button, Row, Col, Image, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Wrap } from "@components/Wrap";
import isBase64 from "is-base64";
import styles from "./Base64.module.scss";
import dynamic from "next/dynamic";
import type { CodeMirrorWrapperProps } from "@components/CodeEditor";

const CodeMirrorWrapper = dynamic<CodeMirrorWrapperProps>(
  () => import("@components/CodeEditor"),
  {
    ssr: false,
  }
);

const Base64Tool: React.FC = () => {
  const [originalText, setOriginalText] = useState("");
  const [resultText, setResultText] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const encodeBase64 = (input: string) => {
    if (typeof btoa === "function") {
      return btoa(
        encodeURIComponent(input).replace(/%([0-9A-F]{2})/g, (match, p1) => {
          return String.fromCharCode(Number("0x" + p1));
        })
      );
    } else if (typeof Buffer === "function") {
      return Buffer.from(input).toString("base64");
    }
    throw new Error("No compatible base64 encoding function found");
  };

  const decodeBase64 = (input: string) => {
    if (typeof atob === "function") {
      return decodeURIComponent(
        Array.prototype.map
          .call(atob(input), (c: string) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
    } else if (typeof Buffer === "function") {
      return Buffer.from(input, "base64").toString();
    }
    throw new Error("No compatible base64 decoding function found");
  };

  useEffect(() => {
    if (
      isBase64(originalText, { allowMime: true }) &&
      originalText.startsWith("data:image")
    ) {
      setPreviewImage(originalText);
    } else if (isBase64(originalText)) {
      setPreviewImage("");
      setResultText(decodeBase64(originalText));
    } else {
      setResultText(encodeBase64(originalText));
      setPreviewImage("");
    }
  }, [originalText]);

  const handleOriginalTextChange = (value: string) => {
    setOriginalText(value);
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result as string;
      setOriginalText(base64Image);
      setResultText("");
      setPreviewImage(base64Image);
    };
    reader.onerror = (error) => {
      message.error("上传图片失败，请重试");
    };
    return false;
  };

  return (
    <Wrap>
      <Row justify="center">
        <Col className={styles.btns}>
          <Upload
            accept="image/*"
            showUploadList={false}
            beforeUpload={handleImageUpload}
          >
            <Button size="small" icon={<UploadOutlined />}>
              获取图片base64
            </Button>
          </Upload>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
        <Col xs={24} md={12} className={styles.editor}>
          <CodeMirrorWrapper
            value={originalText}
            onChange={handleOriginalTextChange}
            mode="text/plain"
          />
        </Col>
        <Col xs={24} md={12} className={styles.editor}>
          {previewImage ? (
            <Image src={previewImage} />
          ) : (
            <CodeMirrorWrapper
              value={resultText}
              mode="javascript"
              onChange={setResultText}
            />
          )}
        </Col>
      </Row>
    </Wrap>
  );
};

export default Base64Tool;
