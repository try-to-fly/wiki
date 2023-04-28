import React from "react";
import Layout, { Props as LayoutProps } from "@theme/Layout";
import { ConfigProvider, theme } from "antd";
import { useColorMode } from "@docusaurus/theme-common";

export const Content = ({ children }: { children: React.ReactNode }) => {
  const { colorMode } = useColorMode();

  return (
    <ConfigProvider
      theme={{
        algorithm:
          colorMode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export const Wrap = ({
  children,
  gptUrl,
  ...props
}: {
  children: React.ReactNode;
  gptUrl?: string;
} & LayoutProps) => {
  return (
    <Layout {...props}>
      <Content>{children}</Content>
    </Layout>
  );
};
