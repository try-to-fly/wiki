import React from "react";
import { useColorMode } from "@docusaurus/theme-common";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github";

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
  const { colorMode } = useColorMode();
  const CodeMirror =
    typeof window !== "undefined"
      ? require("@uiw/react-codemirror").default
      : null;
  if (!CodeMirror) return null;
  return (
    <CodeMirror
      value={value}
      theme={colorMode === "dark" ? githubDark : githubLight}
      height="100%"
      extensions={[getMode(mode)]}
      onChange={(value) => {
        onChange(value);
      }}
    />
  );
};
