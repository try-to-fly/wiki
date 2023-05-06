import React, { useState, useRef, useEffect } from "react";
import { Button, Input, Select, Spin, notification } from "antd";
import { Wrap } from "@site/src/component/Wrap";
import styles from "./VideoConverter.module.scss";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { Helmet } from "react-helmet";

const { Option } = Select;

const VideoConverter: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File>();
  const [outputFormat, setOutputFormat] = useState<string>();
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [convertedVideoUrl, setConvertedVideoUrl] = useState<string>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ffmpeg, setFfmpeg] = useState(createFFmpeg({ log: true }));

  useEffect(() => {
    const loadFFmpeg = async () => {
      await ffmpeg.load();
      console.log("ffmpeg loaded");
    };

    if (!ffmpeg.isLoaded()) {
      console.log("load ffmpeg");
      loadFFmpeg();
    }
  }, [ffmpeg]);

  const convertVideo = async () => {
    setIsConverting(true);
    ffmpeg.setProgress(({ ratio }) => {
      setProgress(Math.round(ratio * 100));
    });

    ffmpeg.FS("writeFile", videoFile.name, await fetchFile(videoFile));

    await ffmpeg.run(
      "-i",
      videoFile.name,
      "-c:v",
      "libx264",
      "-preset",
      "ultrafast",
      "-crf",
      "25",
      `-c:a`,
      "aac",
      "-b:a",
      "128k",
      `output.${outputFormat}`
    );

    const data = ffmpeg.FS("readFile", `output.${outputFormat}`);
    const convertedVideo = new Blob([data.buffer], {
      type: `video/${outputFormat}`,
    });
    setConvertedVideoUrl(URL.createObjectURL(convertedVideo));
    setIsConverting(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) setVideoFile(file);
  };

  const handleDownload = () => {
    if (convertedVideoUrl) {
      const link = document.createElement("a");
      link.href = convertedVideoUrl;
      link.download = `converted.${outputFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handlePreview = () => {
    if (videoRef.current && videoFile) {
      videoRef.current.src = URL.createObjectURL(videoFile);
    }
  };
  useEffect(() => {
    handlePreview();
  }, [videoFile]);

  return (
    <Wrap>
      <Helmet>
        <meta
          http-equiv="Content-Security-Policy"
          content="worker-src 'self' blob:;"
        />
      </Helmet>
      <div className={styles.container}>
        <h1>视频转码工具</h1>
        <Input type="file" onChange={handleFileChange} />
        <Select
          size="small"
          onChange={(value: string) => setOutputFormat(value)}
          placeholder="选择视频格式"
        >
          <Option value="mp4">MP4</Option>
          <Option value="webm">WebM</Option>
          <Option value="mkv">MKV</Option>
        </Select>
        <Button
          size="small"
          onClick={convertVideo}
          disabled={!videoFile || !outputFormat || isConverting}
        >
          转码
        </Button>
        <Spin spinning={isConverting} tip={`转码进度: ${progress}%`} />
        {convertedVideoUrl && (
          <>
            <video
              className={styles.videoPreview}
              ref={videoRef}
              controls
              src={convertedVideoUrl}
            />
            <Button size="small" onClick={handleDownload}>
              下载转码后的视频
            </Button>
          </>
        )}
      </div>
    </Wrap>
  );
};

export default VideoConverter;
