"use strict";

const Controller = require("egg").Controller;
const dayjs = require("dayjs");

class ViewController extends Controller {
  async render404() {
    const { ctx } = this;
    await ctx.render("404.html");
  }

  async renderRate() {
    const { ctx, service } = this;
    const today = dayjs().format("YYYY-MM-DD");
    const entity = {
      today,
      cookbook: [
        "西红柿炒蛋",
        "肉末茄子",
        "凉拌黄瓜",
        "酸辣土豆丝",
        "😝想吃肉",
        "酸辣白菜",
        "豆角炒豆角",
        "丝瓜炒丝瓜",
        "水果套餐",
        "蒜薹炒鸡蛋",
        "白菜丸子",
        "想吃紫薯~",
        "你自由发挥吧🤪",
      ],
      lunch: null,
    };
    try {
      const lunch = await service.lunch.findOne({ where: { date: today } });
      lunch.tomorrow = lunch.tomorrow ? JSON.parse(lunch.tomorrow) : [];
      lunch.score = lunch.color + lunch.smell + lunch.quantity + lunch.comfort;
      entity.lunch = lunch;
    } catch (e) {
      console.log(e);
      // ignore
    }
    if (entity.lunch && entity.lunch.isRate === 0) {
      await ctx.render("rate.html", entity);
    } else {
      await ctx.render("rate-info.html", entity);
    }
  }

  async renderPublish() {
    const { ctx } = this;
    const tomorrow = dayjs().add(1, "day").format("YYYY年MM月DD日");
    const entity = {
      tomorrow,
    };
    await ctx.render("publish.html", entity);
  }

  async publish() {
    const { ctx, service, config } = this;
    const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");
    const { code, name, banner, hasOnion, hasGarlic, hasGinger, hasPepper, saltLevel, tips } = ctx.request.body;
    if (config.publishSecret !== code) {
      ctx.body = { success: false, message: "授权码错误, 你无权提交~" };
      return;
    }
    try {
      const existed = await service.lunch.findOne({ where: { date: tomorrow } });
      if (existed) {
        ctx.body = { success: false, message: "不能重复提交~" };
        return;
      }
      const created = await service.lunch.create({
        date: tomorrow,
        name,
        banner,
        hasOnion: hasOnion === "on" ? 1 : 0,
        hasGarlic: hasGarlic === "on" ? 1 : 0,
        hasGinger: hasGinger === "on" ? 1 : 0,
        hasPepper: hasPepper === "on" ? 1 : 0,
        saltLevel,
        tips,
      });
      ctx.body = { success: true, message: "OK" };
    } catch (e) {
      console.log(e);
      ctx.body = { success: false, message: "程序出故障了, 快点修复~" };
    }
  }

  async rate() {
    const { ctx, service, config } = this;
    const { code, color, smell, quantity, comfort, tomorrow, remark } = ctx.request.body;
    const today = dayjs().format("YYYY-MM-DD");
    const hour = dayjs().hour();
    if (config.rateSecret !== code) {
      ctx.body = { success: false, message: "授权码错误, 你无权提交~" };
      return;
    }
    // 11 点到 13 点可以提交
    if (!(hour >= 11 && hour <= 18)) {
      ctx.body = { success: false, message: "老婆, 还没到评价时间哦~" };
      return;
    }
    try {
      const existed = await service.lunch.findOne({ where: { date: today } });
      if (!existed) {
        ctx.body = { success: false, message: "他还没有开始做饭~" };
        return;
      }
      if (existed.isRate) {
        ctx.body = { success: false, message: "已经评价过了哦~" };
        return;
      }
      const updated = await service.lunch.update(
        {
          date: today,
          isRate: 1,
          color: Number(color),
          smell: Number(smell),
          quantity: Number(quantity),
          comfort: Number(comfort),
          tomorrow: JSON.stringify(tomorrow),
          remark,
        },
        { where: { date: today } }
      );
      ctx.body = { success: true, message: "OK" };
    } catch (e) {
      ctx.body = { success: false, message: "程序出故障了, 我这就去修复~" };
    }
  }
}

module.exports = ViewController;
