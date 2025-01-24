const sequelize = require("sequelize");
const db = require("./../db/db.js");
const runner = require("./runner.model.js");

//สร้าง instance เพื่อแมปกับตารางในฐานข้อมูล
const Run = db.define(
  "run_tb",
  {
    runId: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: "run_id",
    },
    dateRun: {
      type: sequelize.STRING(100),
      allowNull: false,
      field: "dateRun",
    },
    distanceRun: {
      type: sequelize.DOUBLE,
      allowNull: false,
      field: "distanceRun",
    },
    placeRun: {
      type: sequelize.STRING(150),
      allowNull: false,
      field: "placeRun",
    },
    runnerId: { type: sequelize.INTEGER, allowNull: false, field: "runnerId" },
    runimage: {
      type: sequelize.STRING(150),
      allowNull: false,
      field: "runImage",
    },
  },

  {
    db,
    tableName: "run_tb",
    timestamps: false,
    freezeTableName: true,
  }
);

//export ออกไปเพื่อนำไปใช้งาน
module.exports = Run;
