import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import Image from "next/image";
import { Badge } from "./components/Badge";
import dayjs from "dayjs";
import { DocSearch } from "@docsearch/react";
import { Steps } from "nextra-theme-docs";
import { Image as AntdImage } from "antd";

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
    text: "Nextra Docs Template",
  },
  components: {
    Badge,
    Steps,
    Image: AntdImage,
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
