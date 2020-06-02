const glob = require("glob");
const path = require("path");

module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });

    return config;
  },

  async exportPathMap() {
    // scan tutorials
    const tutorials = glob.sync(
      path.join(__dirname, "tutorials", "**", "*.md")
    );
    tutorialPages = {};
    tutorials.forEach((file) => {
      const name = path.parse(file).name;
      tutorialPages[`/tutorials/${name}`] = {
        page: `/tutorials/[name]`,
        query: { name },
      };
    });

    const pages = glob.sync(path.join(__dirname, "pages", "**", "*.tsx"));
    staticPages = {};
    pages.forEach((file) => {
      if (file.indexOf("]") >= 0) {
        return;
      }

      const name = path.parse(file).name;
      staticPages[`/${name}`] = { page: `/${name}` };
    });

    routes = Object.assign(
      { "/": { page: "/index" } },
      tutorialPages,
      staticPages
    );
    console.log(routes);
    return routes;
  },
};
