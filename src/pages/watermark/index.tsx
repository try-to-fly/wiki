import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Row,
  Col,
  Input,
  Upload,
  Button,
  Form,
  Slider,
  Popover,
  Select,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./WatermarkTool.module.scss";
import Layout from "@theme/Layout";
import { SketchPicker } from "react-color";
import prettyBytes from "pretty-bytes";

const { Option } = Select;

const PreviewImage = ({ imageUrl, imageSize, index }) => {
  return (
    <div className={styles.previewImageContainer}>
      <img
        src={imageUrl}
        alt={`preview-${index}`}
        className={styles.previewImage}
      />
      <div className={styles.imageSizeLabel}>{prettyBytes(imageSize)}</div>
    </div>
  );
};

const WatermarkTool: React.FC = () => {
  const [form] = Form.useForm();
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

    const values = form.getFieldsValue();
    const fontSize = values.fontSize;
    const rotation = (values.rotation * Math.PI) / 180;
    const ySpacing = values.ySpacing;
    console.log("values", values);

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
          const startX = -diagonal;
          const startY = -diagonal;
          const textWidth = ctx.measureText(values.watermarkText).width;
          const xSpacing = textWidth + values.xSpacing;

          for (let x = startX; x < diagonal * 2; x += xSpacing) {
            for (let y = startY; y < diagonal * 2; y += fontSize + ySpacing) {
              ctx.strokeText(values.watermarkText, x, y);
              ctx.fillText(values.watermarkText, x, y);
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

  const debouncedApplyWatermark = useCallback(() => {
    const handler = setTimeout(() => {
      applyWatermark();
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [applyWatermark]);

  const downloadImages = () => {
    const exportFormat = form.getFieldValue("exportFormat");
    previewImages.forEach((url, index) => {
      const link = document.createElement("a");
      link.href = url;
      link.download = `watermarked-image-${index + 1}.${exportFormat}`;
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

  useEffect(() => {
    const { watermarkText, fontSize, textSpacing } = form.getFieldsValue([
      "watermarkText",
      "fontSize",
      "textSpacing",
    ]);
    console.log("form changed", watermarkText, fontSize, textSpacing);
    if (watermarkText !== undefined && fontSize !== undefined) {
      debouncedApplyWatermark();
    } else {
      updatePreviewImages(images);
    }
  }, [form, images, watermarkColor]);

  return (
    <Layout>
      <div className={styles.container}>
        <Form
          form={form}
          layout="inline"
          className={styles.controls}
          onValuesChange={debouncedApplyWatermark}
        >
          <Row gutter={[16, 16]}>
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
              <Form.Item name="watermarkText" label="水印文本">
                <Input placeholder="水印文本" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={6}>
              <Form.Item name="fontSize" label="字体大小" initialValue={60}>
                <Slider min={10} max={100} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={6}>
              <Form.Item name="rotation" label="文字旋转" initialValue={0}>
                <Slider min={-180} max={180} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={6}>
              <Form.Item name="xSpacing" label="水平间距" initialValue={80}>
                <Slider min={0} max={200} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={6}>
              <Form.Item name="ySpacing" label="垂直间距" initialValue={80}>
                <Slider min={0} max={200} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={6}>
              <Form.Item
                name="color"
                label="颜色"
                initialValue={watermarkColor}
              >
                <Popover
                  content={
                    <SketchPicker
                      color={watermarkColor}
                      onChangeComplete={(color) =>
                        setWatermarkColor(
                          `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                        )
                      }
                    />
                  }
                >
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      background: watermarkColor,
                    }}
                  />
                </Popover>
              </Form.Item>
            </Col>
            <Col xs={24} sm={6}>
              <Form.Item
                name="exportFormat"
                label="导出格式"
                initialValue="jpeg"
              >
                <Select>
                  <Option value="jpeg">JPEG</Option>
                  <Option value="png">PNG</Option>
                  <Option value="webp">WebP</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={6}>
              <Button onClick={downloadImages}>下载</Button>
            </Col>
            <Col xs={24} sm={6}>
              <a
                href="https://sharegpt.com/c/lkfBg8r"
                target="_blank"
                rel="noopener noreferrer"
              >
                By GPT-4
              </a>
            </Col>
          </Row>
        </Form>
        <div className={styles.preview}>
          {previewImages.map((imageUrl, index) => (
            <PreviewImage
              key={index}
              imageUrl={imageUrl}
              imageSize={images[index].size}
              index={index}
            />
          ))}
        </div>
      </div>
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
    </Layout>
  );
};

export default WatermarkTool;
