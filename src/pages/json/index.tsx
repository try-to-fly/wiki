import React, { useState, useCallback } from "react";
import { Button, message, Popover, Space } from "antd";
import { Wrap } from "@site/src/component/Wrap";
import { CodeMirrorWrapper } from "@site/src/component/CodeEditor";
import styles from "./JsonTool.module.scss";
import JsonToTS from "json-to-ts";
import copy from "copy-to-clipboard";
import { PreviewJson } from "./_JsonView";

const JsonTool: React.FC = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState({});
  const [tsOutput, setTsOutput] = useState("");

  const handleReadClipboard = useCallback(async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setJsonInput(clipboardText);
    } catch (err) {
      message.error("无法读取剪切板内容");
    }
  }, []);

  const handleJsonInputChange = useCallback((value: string) => {
    setJsonInput(value);
    try {
      const parsedJson = JSON.parse(value, (key, value) => {
        if (typeof value === "string" && value.includes("\\")) {
          try {
            return JSON.parse(`"${value}"`);
          } catch (error) {
            return value;
          }
        }
        return value;
      });
      setJsonOutput(parsedJson);
    } catch (error) {
      try {
        const parsedJson = JSON.parse(JSON.stringify(eval(`(${value})`)));
        setJsonOutput(parsedJson);
      } catch (err) {
        setJsonOutput({});
      }
    }
  }, []);

  const handleSerializeClick = useCallback(() => {
    copy(JSON.stringify(jsonOutput));
    message.success("已复制到剪贴板");
  }, [jsonOutput]);

  const handleFormat = useCallback(() => {
    setJsonInput(JSON.stringify(jsonOutput, null, 2));
    message.success("已格式化");
  }, [jsonOutput]);

  const handleConvertToTs = useCallback(() => {
    const tsInterfaces = JsonToTS(jsonOutput);
    const tsOutput = tsInterfaces
      .map((interfaceObj) => interfaceObj)
      .join("\n\n");
    setTsOutput(tsOutput);
  }, [jsonOutput]);

  const handleTsPopoverCopy = useCallback(() => {
    copy(tsOutput);
    message.success("已复制到剪贴板");
  }, [tsOutput]);

  const gotoJsonHero = useCallback(() => {
    // json转换为base64
    const base64 = btoa(JSON.stringify(jsonOutput));
    window.open(`https://jsonhero.io/new?j=${base64}`);
  }, [jsonOutput]);

  return (
    <Wrap>
      <div className={styles.JsonTool}>
        <div className={styles.header}>
          <Space>
            <Button size="small" onClick={handleReadClipboard}>
              读取剪切板
            </Button>
            <Button size="small" onClick={handleFormat}>
              格式化
            </Button>
            <Button size="small" onClick={handleSerializeClick}>
              序列化
            </Button>
            <Popover
              content={
                <div className={styles.tsPopover}>
                  <div className={styles.tsEditor}>
                    <CodeMirrorWrapper
                      value={tsOutput}
                      onChange={setTsOutput}
                      mode="typescript"
                    />
                  </div>
                  <div className={styles.tsPopoverFooter}>
                    <Button size="small" onClick={handleTsPopoverCopy}>
                      复制
                    </Button>
                  </div>
                </div>
              }
              title="TS 类型定义"
              trigger="click"
              destroyTooltipOnHide
              placement="bottom"
              overlayStyle={{
                width: "600px",
                height: "400px",
              }}
              overlayClassName={styles.tsPopoverOverlay}
              getPopupContainer={(triggerNode) => triggerNode.parentElement}
            >
              <Button size="small" onClick={handleConvertToTs}>
                转换为 TS 类型
              </Button>
            </Popover>{" "}
            <Button size="small" onClick={gotoJsonHero}>
              高级预览模式
            </Button>
          </Space>
        </div>
        <div className={styles.main}>
          <div className={styles.editor}>
            <CodeMirrorWrapper
              value={jsonInput}
              onChange={handleJsonInputChange}
              mode="javascript"
            />
          </div>
          <PreviewJson json={jsonOutput} />
        </div>
      </div>
    </Wrap>
  );
};

export default JsonTool;
