"use strict";

const dayjs = require("dayjs");

module.exports = (app) => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const Lunch = app.model.define("Lunch", {
    id: {
      type: INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },

    // 日期
    date: {
      type: STRING(20),
      allowNull: false,
      unique: true,
    },

    // 午餐名称
    name: {
      type: STRING(20),
      allowNull: false,
    },

    // 效果图
    banner: {
      type: STRING(255),
      defaultValue: "",
    },

    // 是否有葱
    hasOnion: {
      type: INTEGER(1),
      defaultValue: 0
    },

    // 是否有姜
    hasGinger: {
      type: INTEGER(1),
      defaultValue: 0
    },

    // 是否有大蒜
    hasGarlic: {
      type: INTEGER(1),
      defaultValue: 0
    },

    // 是否有花椒
    hasPepper: {
      type: INTEGER(1),
      defaultValue: 0
    },

    // 盐量
    saltLevel: {
      type: STRING(10),
      values: ["一丢丢", "极少", "适中", "大量"],
      defaultValue: "一丢丢",
    },

    // 爱心提示
    tips: {
      type: STRING(255),
      defaultValue: ""
    },

    // 是否评价过
    isRate: {
      type: INTEGER(1),
      defaultValue: 0
    },

    // 色 (0-25分)
    color: {
      type: INTEGER(10),
      defaultValue: 0
    },

    // 味道 (0-25分)
    smell: {
      type: INTEGER(10),
      defaultValue: 0
    },

    // 份量 (0-25分)
    quantity: {
      type: INTEGER(10),
      defaultValue: 0
    },

    // 舒适度 (0-25分)
    comfort: {
      type: INTEGER(10),
      defaultValue: 0
    },

    // 明天吃什么
    tomorrow: {
      type: STRING(255),
      defaultValue: ""
    },

    // 备注
    remark: {
      type: STRING(255),
      defaultValue: ""
    },

    // 创建时间
    createdAt: {
      type: DATE,
      get() {
        const createdAt = this.getDataValue("createdAt");
        return dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss");
      },
    },

    // 更新时间
    updatedAt: {
      type: DATE,
      get() {
        const updatedAt = this.getDataValue("updatedAt");
        return dayjs(updatedAt).format("YYYY-MM-DD HH:mm:ss");
      },
    },
  });
  return Lunch;
};
