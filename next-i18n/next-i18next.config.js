//next-i18next.config.js
const path = require("path");
module.exports = {
  i18n: {
    locales: ["default", "en", "ko"],
    defaultLocale: "default",
    localeDetection: false,
    // vercel배포 시 필요
    localePath: path.resolve("./public/locales"),
  },
};
