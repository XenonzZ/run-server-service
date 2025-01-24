const sequelize = require("sequelize");
const db = require("./../db/db.js");

//สร้าง instance เพื่อแมปกับตารางในฐานข้อมูล
const runner = db.define(
  "runner_tb",
  {
    runnerId: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: "runnerId",
    },
    runnerName: {
      type: sequelize.STRING(100),
      allowNull: false,
      field: "runnerName",
    },
    runnerusername: {
      type: sequelize.STRING(50),
      allowNull: false,
      field: "runnerUsername",
    },
    runnerpassword: {
      type: sequelize.STRING(50),
      allowNull: false,
      field: "runnerPassword",
    },
    runnerimage: {
      type: sequelize.STRING(150),
      allowNull: false,
      field: "runnerImage",
    },
  },
  {
    db,
    tableName: "runner_tb",
    timestamps: false,
    freezeTableName: true,
  }
);

//export ออกไปเพื่อนำไปใช้งาน
module.exports = runner;
