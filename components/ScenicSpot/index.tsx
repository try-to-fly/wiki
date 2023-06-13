// ScenicSpotDisplay.tsx
import React from "react";
import { Card, Row, Col, Rate, Tag, Typography, Carousel, Image } from "antd";
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
    <Row gutter={[16, 16]}>
      <Col xs={24} lg={12}>
        <Card
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
      <Col xs={24} lg={12}>
        {scenicSpot.panoramaList.map((item) => (
          <PanoramaCanvas key={item.imageUrl} url={item.imageUrl} />
        ))}
      </Col>
    </Row>
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <Card title="Videos">
          {scenicSpot.videoList.map((video, index) => (
            <video controls key={index} src={video.videoUrl} />
          ))}
        </Card>
      </Col>
    </Row>
    {/* <Row gutter={[16, 16]}> */}
    {/*   <Col xs={24}> */}
    {/*     <Card title="Map"> */}
    {/*       <MapMarker coordinates={scenicSpot.coordinates} /> */}
    {/*       {scenicSpot.routeMaps.map((route, index) => ( */}
    {/*         <MapMarker key={index} coordinatesList={route.coordinatesList} /> */}
    {/*       ))} */}
    {/*       {scenicSpot.pointsOfInterest.map((point, index) => ( */}
    {/*         <MapMarker */}
    {/*           key={index} */}
    {/*           coordinates={point.coordinates} */}
    {/*           type={point.type} */}
    {/*         /> */}
    {/*       ))} */}
    {/*     </Card> */}
    {/*   </Col> */}
    {/* </Row> */}
  </div>
);
