const Service = require("egg").Service;

class LunchService extends Service {
  async findAll(condition) {
    const { ctx } = this;
    return ctx.model.Lunch.findAll(condition);
  }

  async findOne(condition) {
    const { ctx } = this;
    return ctx.model.Lunch.findOne(condition);
  }

  async create(row, condition) {
    const { ctx } = this;
    return ctx.model.Lunch.create(row, condition);
  }

  async update(row, condition) {
    const { ctx } = this;
    return ctx.model.Lunch.update(row, condition);
  }

  async bulkCreate(row, condition) {
    const { ctx } = this;
    return ctx.model.Lunch.bulkCreate(row, condition);
  }

  async destroy(condition) {
    const { ctx } = this;
    return ctx.model.Lunch.destroy(condition);
  }
}

module.exports = LunchService;
