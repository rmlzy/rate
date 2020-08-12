"use strict";

module.exports = (appInfo) => {
  const config = (exports = {});

  config.keys = "lunch-rate";

  config.middleware = ["locals"];

  config.title = "午餐评价";

  config.description = "";

  // 静态文件版本
  config.version = "2020-08-02";

  // 模板引擎配置
  // https://mozilla.github.io/nunjucks/
  config.view = {
    defaultViewEngine: "nunjucks",
    mapping: {
      ".html": "nunjucks",
    },
  };

  config.notfound = {
    pageUrl: "/404.html",
  };

  // 程序运行错误
  config.onerror = {
    errorPageUrl: "/500.html",
  };

  // 安全配置
  config.security = {
    // 关闭 csrf 防范
    csrf: false,
  };

  return config;
};
