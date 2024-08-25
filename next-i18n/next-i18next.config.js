//next-i18next.config.js
module.exports = {
  i18n: {
    locales: ["default", "en", "ko"],
    defaultLocale: "default",
    localeDetection: false,
    // vercel배포 시 필요
    localePath: path.resolve("./public/locales"),
  },
};
