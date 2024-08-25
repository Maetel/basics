//next-i18next.config.js
const path = require("path");
module.exports = {
  i18n: {
    locales: ["en", "ko"],
    defaultLocale: "ko",
    localeDetection: false,
    // vercel배포 시 필요
    localePath: path.resolve("./public/locales"),
  },
};
