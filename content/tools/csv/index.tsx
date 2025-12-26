"use client";

import React, { useState } from "react";
import { Layout, Table } from "antd";
import Papa from "papaparse";
import dynamic from "next/dynamic";
import { useDropzone } from "react-dropzone";
import { Wrap } from "@components/Wrap";

import styles from "./CSVPreviewer.module.scss";
import type { CodeMirrorWrapperProps } from "@components/CodeEditor";

const CodeMirrorWrapper = dynamic<CodeMirrorWrapperProps>(
  () => import("@components/CodeEditor").then((mod) => mod.CodeMirrorWrapper),
  { ssr: false }
);

export default function CSVPreviewer() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [originalText, setOriginalText] = useState("");

  const handleOriginalTextChange = (value) => {
    setOriginalText(value);
    const parsedData = Papa.parse(value, { header: true });
    setData(parsedData.data);

    // Create columns for Table
    const cols = Object.keys(parsedData.data[0]).map((key) => ({
      title: key,
      dataIndex: key,
    }));
    setColumns(cols);
  };

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        const fileAsBinaryString = reader.result;
        handleOriginalTextChange(fileAsBinaryString);
      };
      reader.readAsText(file);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Wrap>
      <div className={styles.container}>
        <div className={styles.sider}>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop CSV files here, or click to select files</p>
          </div>
          <CodeMirrorWrapper
            value={originalText}
            onChange={handleOriginalTextChange}
            mode="text/plain"
          />
        </div>
        <div className={styles.content}>
          <Table dataSource={data} columns={columns} pagination={false} />
        </div>
      </div>
    </Wrap>
  );
}
