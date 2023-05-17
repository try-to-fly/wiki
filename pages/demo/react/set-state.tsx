import dynamic from "next/dynamic";

const Sandpack = dynamic(
  () => import("@codesandbox/sandpack-react").then((mod) => mod.Sandpack),
  {
    ssr: false,
  }
) as any;

const reactCode = `
import React, { useState } from 'react';

export default function App() {
  const [number, setNumber] = useState(0);

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>
        +3
      </button>
    </div>
  );
}
`;

export default function MyApp() {
  return (
    <div style={{ padding: 10 }}>
      <h1>测试一下React不同版本下的setState是否是异步更新</h1>
      <h2>React 16</h2>
      <Sandpack
        template="react"
        customSetup={{
          entry: "/index.js",
          dependencies: {
            react: "16.14.0",
            "react-dom": "16.14.0",
          },
        }}
        files={{
          "/App.js": reactCode,
          "/index.js": `import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));`,
        }}
      />
      <h2>React 17</h2>
      <Sandpack
        template="react"
        customSetup={{
          entry: "/index.js",
          dependencies: {
            react: "17.0.2",
            "react-dom": "17.0.2",
          },
        }}
        files={{
          "/App.js": reactCode,
          "/index.js": `import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
ReactDOM.render(<App />, document.getElementById('root'));`,
        }}
      />
      <h2>React 18</h2>
      <Sandpack
        template="react"
        customSetup={{
          entry: "/index.js",
          dependencies: {
            react: "18.2.0",
            "react-dom": "18.2.0",
          },
        }}
        files={{
          "/App.js": reactCode,
          "/index.js": `import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
const root = createRoot(document.getElementById('root'));
root.render(<App />);
`,
        }}
      />
    </div>
  );
}
