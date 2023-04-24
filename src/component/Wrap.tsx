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
      {/* {gptUrl && (
        <a href={gptUrl}>
          <img
            style={{ width: 16, height: 16 }}
            alt="By GPT-4"
            src="https://chat.openai.com/favicon-32x32.png"
          />
        </a>
      )} */}
      {children}
    </Layout>
  );
};
