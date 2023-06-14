import React from "react";
import {
  Card,
  Row,
  Col,
  Rate,
  Tag,
  Typography,
  Carousel,
  Image,
  Space,
} from "antd";
import { PanoramaCanvas } from "../Panorama";
import styles from "./ScenicSpotDisplay.module.scss";
import { ScenicSpot } from "./type";
const { Title, Paragraph } = Typography;

export * from "./type";

export const ScenicSpotDisplay = ({
  scenicSpot,
}: {
  scenicSpot: ScenicSpot;
}) => (
  <div className={styles.scenicSpotDisplay}>
    <Row gutter={[16, 16]} justify="start">
      <Col xs={24} sm={12} md={8} lg={12}>
        <Card
          size="small"
          title="图片"
          cover={
            <Carousel autoplay>
              {scenicSpot.imageTextList.map((item, index) => (
                <div key={index} className={styles.imageTextItem}>
                  <img src={item.imageUrl} alt={item.text} />
                  <p>{item.text}</p>
                </div>
              ))}
            </Carousel>
          }
        >
          <Title level={3}>{scenicSpot.name}</Title>
          <Paragraph>{scenicSpot.summary}</Paragraph>
          <Rate disabled value={scenicSpot.rating} />
          <Tag>{scenicSpot.bestSeason}</Tag>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={12}>
        <Card title="全景图" size="small">
          <Space direction="vertical" style={{ width: "100%" }}>
            {scenicSpot.panoramaList.map((item) => (
              <PanoramaCanvas key={item.imageUrl} url={item.imageUrl} />
            ))}
          </Space>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card title="Videos" size="small">
          {scenicSpot.videoList.map((video, index) => (
            <video controls key={index} src={video.videoUrl} />
          ))}
        </Card>
      </Col>
    </Row>
  </div>
);
