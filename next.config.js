const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  defaultShowCopyCode: true,
});

module.exports = withNextra({
  transpilePackages: ["react-tweet"],
  redirects: () => {
    return [
      {
        source: "/",
        destination: "/docs",
        statusCode: 302,
      },
    ];
  },
});
