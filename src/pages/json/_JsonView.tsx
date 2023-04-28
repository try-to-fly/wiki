import React from "react";
import styles from "./JsonTool.module.scss";
import { useColorMode } from "@docusaurus/theme-common";

export const PreviewJson = ({ json }: { json: Object }) => {
  const { colorMode } = useColorMode();
  const ReactJson =
    typeof window !== "undefined" ? require("react-json-view").default : null;
  return (
    <div className={styles.preview}>
      {ReactJson && (
        <ReactJson
          src={json}
          theme={colorMode === "dark" ? "chalk" : "rjv-default"}
        />
      )}
    </div>
  );
};
