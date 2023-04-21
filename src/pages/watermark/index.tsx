import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Input, Upload, Button, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./WatermarkTool.module.scss";
import Layout from "@theme/Layout";

const WatermarkTool: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [watermarkText, setWatermarkText] = useState("");
  const [watermarkColor, setWatermarkColor] = useState("rgba(0, 0, 0, 0.5)");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    const newImages: File[] = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith("image/")) {
        const file = items[i].getAsFile();
        if (file) {
          newImages.push(file);
        }
      }
    }
    setImages(newImages);
    updatePreviewImages(newImages);
  };

  const handleFileChange = (file: any, fileList: File[]) => {
    setImages(fileList);
    updatePreviewImages(fileList);
    return false;
  };

  const updatePreviewImages = async (files: File[]) => {
    const loadFile = (file: File): Promise<string | undefined> => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            resolve(reader.result);
          } else {
            resolve(undefined);
          }
        };
        reader.readAsDataURL(file);
      });
    };

    const newPreviewImages = await Promise.all(files.map(loadFile));
    const filteredPreviewImages = newPreviewImages.filter(
      (image) => !!image
    ) as string[];
    setPreviewImages(filteredPreviewImages);
  };

  const applyWatermark = async () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fontSize = 60;
    const rotation = (45 * Math.PI) / 180;
    const ySpacing = 80;

    const promises = images.map((image, index) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = URL.createObjectURL(image);
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);

          ctx.font = `bold ${fontSize}px sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = watermarkColor;
          ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
          ctx.lineWidth = 2;

          ctx.save();
          ctx.rotate(rotation);

          const diagonal = Math.sqrt(
            Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2)
          );
          const startX = -diagonal / 2;
          const textWidth = ctx.measureText(watermarkText).width;
          const xSpacing = textWidth + 100;

          for (let x = startX; x < diagonal; x += xSpacing) {
            for (
              let y = -canvas.height;
              y < canvas.height;
              y += fontSize + ySpacing
            ) {
              ctx.strokeText(watermarkText, x, y);
              ctx.fillText(watermarkText, x, y);
            }
          }

          ctx.restore();

          const dataUrl = canvas.toDataURL();
          setPreviewImages((prev) => {
            const newPreviewImages = [...prev];
            newPreviewImages[index] = dataUrl;
            return newPreviewImages;
          });

          resolve();
        };
      });
    });

    Promise.all(promises).then(() => {});
  };

  const downloadImages = () => {
    previewImages.forEach((url, index) => {
      const link = document.createElement("a");
      link.href = url;
      link.download = `watermarked-image-${index + 1}.png`;
      link.click();
    });
  };

  // 绑定粘贴事件
  useEffect(() => {
    const listener = (e: ClipboardEvent) =>
      handlePaste(e as React.ClipboardEvent<HTMLDivElement>);
    window.addEventListener("paste", listener);
    return () => {
      window.removeEventListener("paste", listener);
    };
  }, [handlePaste]);

  // 自动应用水印
  useEffect(() => {
    if (watermarkText.length > 0) {
      applyWatermark();
    } else {
      updatePreviewImages(images);
    }
  }, [watermarkText, images, watermarkColor]);

  return (
    <Layout>
      <div className={styles.container}>
        <Row gutter={[16, 16]} className={styles.controls}>
          <Col xs={24} sm={6}>
            <Upload
              multiple
              accept="image/*"
              showUploadList={false}
              beforeUpload={handleFileChange}
            >
              <Button icon={<UploadOutlined />}>选择图片</Button>
            </Upload>
          </Col>
          <Col xs={24} sm={6}>
            <Input
              placeholder="水印文本"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
            />
          </Col>
          <Col xs={24} sm={6}>
            <Space>
              {/* 添加更多颜色 */}
              <div
                className={styles.color}
                style={{ background: "rgba(0, 0, 0, 0.5)" }}
                onClick={() => setWatermarkColor("rgba(0, 0, 0, 0.5)")}
              />
              <div
                className={styles.color}
                style={{ background: "rgba(255, 0, 0, 0.5)" }}
                onClick={() => setWatermarkColor("rgba(255, 0, 0, 0.5)")}
              />
            </Space>
          </Col>
          <Col xs={24} sm={6}>
            <Button onClick={downloadImages}>批量下载图片</Button>
          </Col>
        </Row>
        <div className={styles.preview}>
          {previewImages.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`preview-${index}`}
              className={styles.previewImage}
            />
          ))}
        </div>
      </div>
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
    </Layout>
  );
};

export default WatermarkTool;
