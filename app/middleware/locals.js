"use strict";

module.exports = () => {
  return async function (ctx, next) {
    ctx.locals.version = ctx.app.config.version;
    ctx.locals.title = ctx.app.config.title;
    ctx.locals.description = ctx.app.config.description;
    await next();
  };
};
