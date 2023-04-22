import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
  BackSide,
  TextureLoader,
  Mesh,
  MutableRefObject,
  sRGBEncoding,
  LinearFilter,
} from "three";
import { Button, Upload } from "antd";
import {
  FullscreenExitOutlined,
  FullscreenOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import Layout from "@theme/Layout";
import styles from "./PanoramaViewer.module.scss";

const Panorama = ({ url, autoRotate }) => {
  const meshRef = useRef() as MutableRefObject<Mesh | undefined>;
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

  useFrame((state, delta) => {
    if (autoRotate) {
      state.camera.rotation.y += delta * 0.1;
      state.camera.updateProjectionMatrix();
    }
  });

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
        }}
      >
        <Panorama url={url} autoRotate={autoRotate} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.2}
          rotateSpeed={0.5}
          onPointerDown={() => autoRotate(false)}
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

  const handleImagePreview = (file, files: File[]) => {
    const blobUrls = files.map((file) => URL.createObjectURL(file));
    setUploadedImages(blobUrls);
    setSelectedImageIndex(0);
    return false;
  };

  const handleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  useEffect(() => {
    if (selectedImageIndex !== -1) {
      const timer = setTimeout(() => {
        setAutoRotate(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [selectedImageIndex]);

  return (
    <Layout>
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
          {/* 修改 UploadOutlined 的样式，使其根据主题颜色改变 */}
          <Upload
            accept="image/*"
            multiple
            showUploadList={false}
            beforeUpload={handleImagePreview}
            style={{ marginRight: "8px" }}
          >
            <UploadOutlined className={styles.uploadIcon} />
          </Upload>
          {uploadedImages[selectedImageIndex] && (
            <Button
              type="text"
              size="large"
              onClick={handleFullscreen}
              icon={
                fullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />
              }
              className={styles.fullscreenButton}
            />
          )}
          {fullscreen && (
            <div className={styles.exitFullscreenButton}>
              <Button
                type="text"
                size="large"
                onClick={handleFullscreen}
                icon={<FullscreenExitOutlined />}
                className={styles.fullscreenButton}
              />
            </div>
          )}
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
    </Layout>
  );
};

export default PanoramaViewer;
