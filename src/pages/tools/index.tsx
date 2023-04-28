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
  BookOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Wrap } from "@site/src/component/Wrap";

interface NavItem {
  name: string;
  url: string;
  gradient: string;
  icon: React.ReactNode;
}

/**
linear-gradient(135deg, #F2BAC9, #F5D5D7)
linear-gradient(135deg, #F3D3BD, #F5E2D5)
linear-gradient(135deg, #C2D4E8, #E3EFF9)
linear-gradient(135deg, #E4D4C2, #F9ECE1)
linear-gradient(135deg, #FBE7CB, #F9F9F9)
linear-gradient(135deg, #FCD2C2, #FFE7E7)
linear-gradient(135deg, #B5EAD7, #E1F8F7)
linear-gradient(135deg, #D9B9E8, #F3E4F9)
linear-gradient(135deg, #FBE5C8, #F9F9F9)
linear-gradient(135deg, #B5E5AB, #E1F9E2)
linear-gradient(135deg, #E8D2B2, #F9EFE5)
linear-gradient(135deg, #D6C7F9, #F0E7FF)
linear-gradient(135deg, #FAC8B8, #FEE3D3)
linear-gradient(135deg, #FBECC8, #F9F9F9)
linear-gradient(135deg, #B5D5E5, #E1F1F9)
linear-gradient(135deg, #F9E9C8, #FFF9F9)
*/
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
  {
    name: "剪切板",
    url: "/clipboard",
    gradient: "linear-gradient(135deg, #F0E0A4, #F9F5E3)",
    icon: <BookOutlined />,
  },
  {
    name: "二维码",
    url: "/qrcode",
    gradient: "linear-gradient(135deg, #D8B1E8, #F3DCEC)",
    icon: <AppstoreOutlined />,
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
