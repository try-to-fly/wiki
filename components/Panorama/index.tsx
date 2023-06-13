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

import styles from "./PanoramaViewer.module.scss";

const Panorama = ({ url }) => {
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

export const PanoramaCanvas = ({
  url,
  autoRotate,
  fullscreen,
}: {
  url: string;
  autoRotate?: (autoRotate: boolean) => void;
  fullscreen?: boolean;
}) => {
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
        <Panorama url={url} />

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
          onPointerUp={() => autoRotate?.(false)}
          reverseOrbit={true}
        />
      </Canvas>
    </div>
  );
};
