import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import Image from "next/image";
import dayjs from "dayjs";
import { DocSearch } from "@docsearch/react";
import { Steps } from "nextra-theme-docs";
import { components } from "mdx-elements";
import { Vercel } from "./components/Vercel";

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
    component: () => null,
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
    text: () => {
      return (
        <a
          href={`https://vercel.com`}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center no-underline text-current font-semibold"
        >
          <span className="mr-2">Powered by</span>
          <span>
            <Vercel />
          </span>
        </a>
      );
    },
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
