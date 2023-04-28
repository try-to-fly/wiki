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
  QrcodeOutlined,
  HighlightOutlined,
  RestOutlined,
} from "@ant-design/icons";
import { Wrap } from "@site/src/component/Wrap";

interface NavItem {
  name: string;
  url: string;
  gradient: string;
  icon: React.ReactNode;
  type: NavigationType;
}

enum NavigationType {
  Time = "时间相关",
  Image = "图片相关",
  Tool = "工具相关",
}
type Category = {
  title: string;
  items: NavItem[];
};

const navigationData: NavItem[] = [
  {
    name: "时间进度",
    url: "/today",
    gradient: "linear-gradient(135deg, #6EE7B7 0%, #3FA7D6 100%)",
    icon: <SmileOutlined />,
    type: NavigationType.Time,
  },
  {
    name: "图片水印",
    url: "/watermark",
    gradient: "linear-gradient(135deg, #FDD819 0%, #FF8F00 100%)",
    icon: <FileImageOutlined />,
    type: NavigationType.Image,
  },
  {
    name: "全景图",
    url: "/PanoramaViewer",
    gradient: "linear-gradient(135deg, #F86D77 0%, #F88D50 50%, #FFBF00 100%)",
    icon: <EyeOutlined />,
    type: NavigationType.Image,
  },
  {
    name: "图片去背景",
    url: "/pureImage",
    gradient: "linear-gradient(135deg, #F97794 0%, #623AA2 100%)",
    icon: <ThunderboltOutlined />,
    type: NavigationType.Image,
  },
  {
    name: "URL 解析",
    url: "/url-parse",
    gradient: "linear-gradient(135deg, #36D1DC 0%, #5B86E5 100%)",
    icon: <IeOutlined />,
    type: NavigationType.Tool,
  },
  {
    name: "json工具",
    url: "/json",
    gradient: "linear-gradient(135deg, #FFC107 0%, #FF9800 50%, #FF5722 100%)",
    icon: <BulbOutlined />,
    type: NavigationType.Tool,
  },
  {
    name: "时间戳",
    url: "/timestamp",
    gradient: "linear-gradient(135deg, #9C27B0 0%, #E91E63 50%, #F44336 100%)",
    icon: <CoffeeOutlined />,
    type: NavigationType.Time,
  },
  {
    name: "剪切板",
    url: "/clipboard",
    gradient: "linear-gradient(135deg, #F0E0A4, #F9F5E3)",
    icon: <BookOutlined />,
    type: NavigationType.Tool,
  },
  {
    name: "二维码",
    url: "/qrcode",
    gradient: "linear-gradient(135deg, #D8B1E8, #F3DCEC)",
    icon: <QrcodeOutlined />,
    type: NavigationType.Image,
  },
  {
    name: "文本提取",
    url: "/textmatch",
    gradient: "linear-gradient(135deg, #F9E9C8, #FFF9F9)",
    icon: <HighlightOutlined />,
    type: NavigationType.Tool,
  },
  {
    name: "Base64编解码",
    url: "/base64",
    gradient: "linear-gradient(135deg, #D6C7F9, #F0E7FF)",
    icon: <RestOutlined />,
    type: NavigationType.Tool,
  },
];

function groupItemsByType(items: NavItem[]): Category[] {
  const groupedItems: { [key in NavigationType]?: NavItem[] } = {};

  items.forEach((item) => {
    if (!groupedItems[item.type]) {
      groupedItems[item.type] = [];
    }
    groupedItems[item.type].push(item);
  });

  return Object.entries(groupedItems).map(([key, items]) => ({
    title: key,
    items,
  }));
}

const groupedNavigationData: Category[] = groupItemsByType(navigationData);

const Navigation: React.FC = () => {
  return (
    <Wrap gptUrl="https://sharegpt.com/c/rkKOVvF">
      <div className={styles.navigationWrapper}>
        {groupedNavigationData.map((category: Category, index: number) => (
          <React.Fragment key={`category-${index}`}>
            <h2 className={styles.categoryTitle}>{category.title}</h2>
            <Row gutter={[24, 24]} justify="start">
              {category.items.map((item: NavItem) => (
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
          </React.Fragment>
        ))}
      </div>
    </Wrap>
  );
};

export default Navigation;
