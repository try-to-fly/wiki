import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import Image from "next/image";
import dayjs from "dayjs";
import { DocSearch } from "@docsearch/react";
import { Steps } from "nextra-theme-docs";
import { Col, Row, List } from "antd";
import { components } from "mdx-elements";

const config: DocsThemeConfig = {
  logo: <Image width={30} height={30} alt="" src="/img/logo.png" />,
  logoLink: "/",
  project: {
    link: "https://github.com/try-to-fly/wiki",
  },
  sidebar: {
    // 默认都折叠
    defaultMenuCollapseLevel: 1,
  },
  toc: {
    float: true,
    title: "目录",
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s – 微笑Wiki",
    };
  },
  editLink: {
    text: null,
  },
  feedback: {
    content: null,
  },
  search: {
    component: () => (
      <DocSearch
        appId="9UW5P96GU5"
        apiKey="b34e3dc2882fc21748b96a0805a34ab1"
        indexName="wiki-hub"
      />
    ),
  },
  head: () => {
    return (
      <>
        <link
          rel="icon"
          sizes="654x654"
          type="image/png"
          href="/img/logo.png"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </>
    );
  },
  footer: {
    text: (
      <Row>
        <Col span={12} style={{ width: 300 }}>
          <List
            header="友情链接"
            size="small"
            dataSource={[
              {
                title: "微笑Wiki",
                url: "https://wiki.dev-hub.top",
              },
            ]}
            renderItem={(item) => (
              <List.Item>
                <a href={item.url} target="_blank">
                  {item.title}
                </a>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    ),
  },
  components: {
    ...components,
    Steps,
  },
  gitTimestamp: ({ timestamp }) => {
    return (
      <span>
        最后更新时间：{dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss")}
      </span>
    );
  },
};

export default config;
