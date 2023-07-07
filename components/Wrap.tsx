import { ConfigProvider, theme } from "antd";
import { useTheme } from "nextra-theme-docs";
import React from "react";

export const Content = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const Wrap = ({
  children,
  gptUrl,
  ...props
}: {
  children: React.ReactNode;
  gptUrl?: string;
  title?: string;
}) => {
  const { theme: currentTheme } = useTheme();
  return (
    <ConfigProvider
      theme={{
        algorithm:
          currentTheme === "dark"
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
      }}
    >
      <Content>{children}</Content>
    </ConfigProvider>
  );
};
