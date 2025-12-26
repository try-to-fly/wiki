"use client";
import React from "react";
import { JsonView, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import styles from "./JsonView.module.scss";

export type PreviewJsonProps = {
  json: object;
};

export const PreviewJson = ({ json }: PreviewJsonProps) => {
  return (
    <div className={styles.preview}>
      <JsonView data={json} style={defaultStyles} />
    </div>
  );
};
