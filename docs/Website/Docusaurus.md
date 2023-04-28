### 介绍

Facebook 团队开发的内容网站，用于文档、博客。<Badge github="https://github.com/facebook/docusaurus" />

### 如何构建博客

1. [一键在 Vercel 上部署](https://vercel.com/new/templates/react/docusaurus-2)
2. 配置自定义域名、修改 docusaurus 配置。

### 配置

具体参考[docusaurus.config.js](https://github.com/try-to-fly/wiki/blob/main/docusaurus.config.js)

1. 修改 logo: logo.src。
2. 修改 i18n：zh-Hans。
3. 显示文档更新时间：showLastUpdateTime
4. MDX 添加自定义组件: [MDXComponents.js](https://github.com/try-to-fly/wiki/blob/main/src/theme/MDXComponents.js)
5. 使用 Reat 渲染页面：[src/pages](https://github.com/try-to-fly/wiki/tree/main/src/pages)
6. 等博客有一定内容后，可以申请免费的[Algolia DocSearch](https://docsearch.algolia.com/apply)
   - 定制 Raycast 插件，[参考](https://github.com/try-to-fly/raycast-wiki-extension)

### 注意事项

1. 目前还不支持 ESmodule，可以用下面方案解决
   - 推荐：安装模块的时候，需要选择 Commonjs 的版本。
   - 使用 import()导入模块。
2. 不支持 React18：使用第三方模块的时候需要选择 React17 版本。
3. 项目要发布之前，最好在本地 build 下
   - 用于提前排查一下构建错误，不然代码提交部署后，遇到错误还需要重新 push。

### 遇到的问题

1. 客户端代码无法 SSR 报错：`ReferenceError: document is not defined`
   - 解决办法：由于目前版本是 react17，使用 lazy 加载组件会有错误：https://legacy.reactjs.org/docs/error-decoder.html/?invariant=294

```js
const CodeMirror =
  typeof window !== "undefined"
    ? require("@uiw/react-codemirror").default
    : null;
```
