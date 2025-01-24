const Sequelize = require("sequelize");

require("dotenv").config();

//สร้าง instact/object ของ sequelize
const connectDb = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
  }
);

//เชื่อมต่อกับ database ผ่าน instact/object ที่สร้างไว้
connectDb
  .sync()
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

//export ออกไปเพื่อนำไปใช้งาน
module.exports = connectDb;
