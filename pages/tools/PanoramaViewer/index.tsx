import React, { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
  BackSide,
  TextureLoader,
  sRGBEncoding,
  LinearFilter,
  MOUSE,
} from "three";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./PanoramaViewer.module.scss";
import { Wrap } from "@components/Wrap";

const Panorama = ({ url, autoRotate }) => {
  const meshRef = useRef() as any;
  const [loadingError, setLoadingError] = useState(null);
  const [geometryArgs, setGeometryArgs] = useState<[number, number, number]>([
    500, 60, 40,
  ]);

  useEffect(() => {
    const loader = new TextureLoader();
    loader.load(
      url,
      (texture) => {
        if (loadingError) {
          setLoadingError(null);
        }
        // 设置纹理颜色空间为 sRGB 和 LinearFilter
        texture.encoding = sRGBEncoding;
        texture.minFilter = LinearFilter;
        texture.magFilter = LinearFilter;

        // 获取图片宽度和高度
        const width = texture.image.width;
        const height = texture.image.height;

        // 计算球体几何体参数
        const args = [500, Math.ceil(width / 4), Math.ceil(height / 4)] as [
          number,
          number,
          number
        ];

        // 更新纹理和几何体参数
        setGeometryArgs(args);
        meshRef.current.material.map = texture;
        meshRef.current.material.needsUpdate = true;
      },
      undefined,
      (error) => {
        console.error(error);
        setLoadingError(error);
      }
    );
  }, [url, loadingError]);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={geometryArgs} />
      <meshBasicMaterial side={BackSide} attach="material" />
    </mesh>
  );
};

const PanoramaCanvas = ({ url, autoRotate, fullscreen }) => {
  return (
    <div
      className={`${styles.canvasContainer} ${
        fullscreen ? styles.fullscreen : ""
      }`}
    >
      <Canvas
        camera={{ position: [0, 0, 0.1], fov: 75 }}
        style={{ height: "100%", width: "100%" }}
        gl={{ alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor("white");
          gl.setPixelRatio(window.devicePixelRatio);
        }}
      >
        <Panorama url={url} autoRotate={autoRotate} />

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableDamping={true}
          dampingFactor={0.2}
          rotateSpeed={0.5}
          mouseButtons={{
            LEFT: MOUSE.ROTATE,
            MIDDLE: MOUSE.DOLLY,
            RIGHT: MOUSE.PAN,
          }}
          onPointerUp={() => autoRotate(false)}
          reverseOrbit={true}
        />
      </Canvas>
    </div>
  );
};

const PanoramaViewer = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);
  const [fullscreen, setFullscreen] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [autoRotateTimeout, setAutoRotateTimeout] = useState(null);

  const handleImagePreview = (file, files: File[]) => {
    const blobUrls = files.map((file) => URL.createObjectURL(file));
    setUploadedImages(blobUrls);
    setSelectedImageIndex(0);
    return false;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAutoRotate(true);
    }, 5000);
    setAutoRotateTimeout(timer);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!autoRotate) {
      clearTimeout(autoRotateTimeout);
      const timer = setTimeout(() => {
        setAutoRotate(true);
      }, 5000);
      setAutoRotateTimeout(timer);
    }
  }, [autoRotate]);

  return (
    <Wrap gptUrl="https://sharegpt.com/c/rleTjsb">
      <div className={styles.panoramaViewer}>
        {uploadedImages[selectedImageIndex] && (
          <PanoramaCanvas
            url={uploadedImages[selectedImageIndex]}
            autoRotate={autoRotate}
            fullscreen={fullscreen}
          />
        )}
        <div
          className={`${styles.toolbar} ${
            fullscreen ? styles.fullscreenToolbar : ""
          }`}
        >
          <Upload
            accept="image/"
            multiple
            showUploadList={false}
            beforeUpload={handleImagePreview}
            style={{ marginRight: "8px" }}
          >
            <UploadOutlined className={styles.uploadIcon} />
          </Upload>
        </div>
        <div className={styles.imageList}>
          {uploadedImages.map((url, index) => (
            <img
              key={url}
              src={url}
              alt={`Uploaded Image ${index + 1}`}
              onClick={() => setSelectedImageIndex(index)}
              className={`${styles.imageThumbnail} ${
                selectedImageIndex === index ? styles.selectedThumbnail : ""
              }`}
            />
          ))}
        </div>
      </div>
    </Wrap>
  );
};

export default PanoramaViewer;
