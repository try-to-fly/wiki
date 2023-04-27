import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";

interface CodeMirrorWrapperProps {
  value: string;
  onChange: (value: string) => void;
  mode?: string;
}

const getMode = (mode: string) => {
  switch (mode) {
    case "json":
      return json();
    case "javascript":
    default:
      return javascript({ jsx: true });
  }
};

export const CodeMirrorWrapper: React.FC<CodeMirrorWrapperProps> = ({
  value,
  onChange,
  mode = "javascript",
}) => {
  return (
    <CodeMirror
      value={value}
      height="100%"
      extensions={[getMode(mode)]}
      onChange={(value) => {
        onChange(value);
      }}
    />
  );
};
