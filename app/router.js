"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;

  // 页面
  router.get("/", controller.lunch.renderRate);
  router.get('/404.html', controller.lunch.render404);
  router.get("/publish.html", controller.lunch.renderPublish);

  router.post("/api/rate", controller.lunch.rate);
  router.post("/api/publish", controller.lunch.publish);

};
