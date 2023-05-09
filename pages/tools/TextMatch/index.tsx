import React, { useState, useEffect, useCallback } from "react";
import { Wrap } from "@components/Wrap";
import { Input, Row, Col, Space } from "antd";
import styles from "./TextExtractor.module.scss";
import dynamic from "next/dynamic";

const CodeMirrorWrapper = dynamic(
  () => import("@components/CodeEditor").then((mod) => mod.CodeMirrorWrapper),
  { ssr: false }
);

const TextExtractor: React.FC = () => {
  const [regex, setRegex] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [captures, setCaptures] = useState<Array<any>>([]);

  const handleRegexChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRegex(e.target.value);
  };

  const handleInputChange = (value: string) => {
    setInputText(value);
  };

  const handleOutputChange = useCallback(() => {
    try {
      const regexInstance = new RegExp(regex, "gm");
      const matches = regex
        ? Array.from(inputText.matchAll(regexInstance))
        : [];
      const matchText = matches.map((match) => match[0]).join("\n");
      const capturesArray = matches.map((match) => match.slice(1));
      setCaptures(capturesArray);
      const capturesText =
        capturesArray.length > 0
          ? `\n捕获数据：\n${JSON.stringify(capturesArray)}`
          : "";
      setOutputText(`匹配数据：\n${matchText}${capturesText}`);
    } catch (e) {
      setOutputText("");
      setCaptures([]);
    }
  }, [regex, inputText]);

  useEffect(() => {
    const debounceTimer = setTimeout(handleOutputChange, 500);
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [handleOutputChange]);

  return (
    <Wrap>
      <div className={styles.container}>
        <Input.TextArea
          className={styles.regexInput}
          value={regex}
          onChange={handleRegexChange}
          placeholder="请输入正则表达式"
          size="small"
          autoSize
        />
        <Row className={styles.editorRow}>
          <Col className={styles.eittorWrap} xs={24} md={12}>
            <CodeMirrorWrapper
              value={inputText}
              onChange={handleInputChange}
              mode="javascript"
            />
          </Col>
          <Col className={styles.eittorWrap} xs={24} md={12}>
            <CodeMirrorWrapper
              value={outputText}
              mode="javascript"
              onChange={setOutputText}
            />
          </Col>
        </Row>
      </div>
    </Wrap>
  );
};

export default TextExtractor;
