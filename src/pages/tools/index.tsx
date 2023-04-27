import React from "react";
import { Col, Row } from "antd";
import styles from "./Navigation.module.scss";
import Link from "@docusaurus/Link";
import {
  SmileOutlined,
  FileImageOutlined,
  EyeOutlined,
  ThunderboltOutlined,
  IeOutlined,
  BulbOutlined,
  CoffeeOutlined,
} from "@ant-design/icons";
import { Wrap } from "@site/src/component/Wrap";

interface NavItem {
  name: string;
  url: string;
  gradient: string;
  icon: React.ReactNode;
}
const navigationData = [
  {
    name: "时间进度",
    url: "/today",
    gradient: "linear-gradient(135deg, #6EE7B7 0%, #3FA7D6 100%)",
    icon: <SmileOutlined />,
  },
  {
    name: "图片水印",
    url: "/watermark",
    gradient: "linear-gradient(135deg, #FDD819 0%, #FF8F00 100%)",
    icon: <FileImageOutlined />,
  },
  {
    name: "全景图",
    url: "/PanoramaViewer",
    gradient: "linear-gradient(135deg, #F86D77 0%, #F88D50 50%, #FFBF00 100%)",
    icon: <EyeOutlined />,
  },
  {
    name: "图片去背景",
    url: "/pureImage",
    gradient: "linear-gradient(135deg, #F97794 0%, #623AA2 100%)",
    icon: <ThunderboltOutlined />,
  },
  {
    name: "URL 解析",
    url: "/url-parse",
    gradient: "linear-gradient(135deg, #36D1DC 0%, #5B86E5 100%)",
    icon: <IeOutlined />,
  },
  {
    name: "json工具",
    url: "/json",
    gradient: "linear-gradient(135deg, #FFC107 0%, #FF9800 50%, #FF5722 100%)",
    icon: <BulbOutlined />,
  },
  {
    name: "时间戳",
    url: "/timestamp",
    gradient: "linear-gradient(135deg, #9C27B0 0%, #E91E63 50%, #F44336 100%)",
    icon: <CoffeeOutlined />,
  },
];

const Navigation: React.FC = () => {
  return (
    <Wrap gptUrl="https://sharegpt.com/c/rkKOVvF">
      <div className={styles.navigationWrapper}>
        <Row gutter={[24, 24]} justify="center">
          {navigationData.map((item: NavItem) => (
            <Col
              key={item.name}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              xl={4}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Link
                to={item.url}
                className={styles.navigationItem}
                style={{ backgroundImage: item.gradient }}
              >
                <div className={styles.cardIcon}>{item.icon}</div>
                <div className={styles.cardContent}>
                  <div className={styles.cardTitle}>{item.name}</div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </Wrap>
  );
};

export default Navigation;
