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
  return <Content>{children}</Content>;
};
