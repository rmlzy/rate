module.exports = (app) => {
  app.beforeStart(async function () {
    await app.model.sync({ alter: false });
  });
};
