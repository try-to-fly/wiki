import React from "react";
import Layout from "@theme/Layout";

export const Wrap = ({
  children,
  gptUrl,
}: {
  children: React.ReactNode;
  gptUrl?: string;
}) => {
  return (
    <Layout>
      {gptUrl && <a href={gptUrl}>By GPT-4</a>}
      {children}
    </Layout>
  );
};
