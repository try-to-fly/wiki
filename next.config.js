const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  defaultShowCopyCode: true,
});

module.exports = withNextra({
  transpilePackages: ["react-tweet", "mdx-elements", "cmdk"],
  redirects: () => {
    return [
      {
        source: "/",
        destination: "/docs/intro",
        statusCode: 302,
      },
      {
        source: "/docs",
        destination: "/docs/intro",
        statusCode: 302,
      },
    ];
  },
});
