const glob = require("glob");
const path = require("path");

module.exports = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: false,

  exportPathMap: async function (defaultPathMap) {
    const pages = glob.sync(path.join(__dirname, "pages", "**", "*.tsx"));
    const staticPages = {};
    pages.forEach((file) => {
      if (file.match("pages/index.tsx")) return;
      if (file.indexOf("]") >= 0) return;

      const name = path.parse(file).name;
      staticPages[`/${name}`] = { page: `/${name}` };
    });

    return Object.assign({ "/": { page: "/" } }, defaultPathMap, staticPages);
  },
};
