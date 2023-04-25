import React, { useEffect, useRef, useState } from "react";
import { Button, Space, Upload, Slider } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./ImageColorProcessor.module.scss";
import { RcFile } from "antd/lib/upload";
import FloodFill from "q-floodfill";
import { Wrap } from "@site/src/component/Wrap";

/**
 * 更强大的擦除工具参考: https://github.com/advimman/lama
 */

const ImageColorProcessor: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(
    null
  );
  const [processedImage, setProcessedImage] = useState<HTMLImageElement | null>(
    null
  );
  const [tolerance, setTolerance] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [position, setPosition] = useState<[number, number]>([0, 0]);

  const beforeUpload = (file: RcFile) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        setOriginalImage(img);
        setProcessedImage(img);
      };
    };
    reader.readAsDataURL(file);

    return false;
  };

  const pickColor = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !originalImage) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setPosition([x, y]);
  };

  const processImage = (x: number, y: number) => {
    if (!originalImage) return;

    const canvas = document.createElement("canvas");
    canvas.width = originalImage.width;
    canvas.height = originalImage.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(originalImage, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const floodFill = new FloodFill(imageData);
    floodFill.fill("rgba(255, 255, 255, 0)", x, y, tolerance);

    ctx.putImageData(imageData, 0, 0);
    const processedImg = new Image();
    processedImg.src = canvas.toDataURL();
    setProcessedImage(processedImg);
  };

  useEffect(() => {
    if (canvasRef.current && originalImage) {
      canvasRef.current.width = originalImage.width;
      canvasRef.current.height = originalImage.height;
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.drawImage(originalImage, 0, 0);
      }
    }
  }, [originalImage]);

  useEffect(() => {
    processImage(position[0], position[1]);
    console.log("position", position);
  }, [position, tolerance]);

  return (
    <Wrap gptUrl="https://sharegpt.com/c/WtKNnHn">
      <div className={styles.container}>
        <Space size="large">
          <Upload
            accept="image/*"
            showUploadList={false}
            beforeUpload={beforeUpload}
          >
            <Button icon={<UploadOutlined />}>选择图片</Button>
          </Upload>
          <span>颜色容差范围: {tolerance}</span>
          <Slider
            min={0}
            value={tolerance}
            style={{ width: 200 }}
            onChange={(value: number) => setTolerance(value)}
          />
        </Space>
        <div className={styles.canvasWrapper}>
          {originalImage && (
            <div>
              <h3>原始图片 (点击选择颜色)</h3>
              <canvas
                ref={canvasRef}
                onClick={pickColor}
                className={styles.image}
              ></canvas>
            </div>
          )}
          {processedImage && (
            <div>
              <h3>处理后的图片</h3>
              <img
                src={processedImage.src}
                alt="Processed"
                className={styles.image}
              />
            </div>
          )}
        </div>
      </div>
    </Wrap>
  );
};

export default ImageColorProcessor;
