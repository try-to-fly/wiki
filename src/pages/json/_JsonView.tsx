import React from "react";
import ReactJsonView from "react-json-view";
import styles from "./JsonTool.module.scss";
import { useColorMode } from "@docusaurus/theme-common";

export const PreviewJson = ({ json }: { json: Object }) => {
  const { colorMode } = useColorMode();
  return (
    <div className={styles.preview}>
      {ReactJsonView && (
        <ReactJsonView
          src={json}
          theme={colorMode === "dark" ? "chalk" : "rjv-default"}
        />
      )}
    </div>
  );
};
