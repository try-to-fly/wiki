import React from "react";
import styles from "./JsonView.module.scss";

export const PreviewJson = ({ json }: { json: Object }) => {
  const ReactJson =
    typeof window !== "undefined" ? require("react-json-view").default : null;
  return (
    <div className={styles.preview}>
      {ReactJson && <ReactJson src={json} theme={"rjv-default"} />}
    </div>
  );
};
