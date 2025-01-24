// ไฟล์ประเภท controller เป็นไฟล์ที่จะทำงานกับตารางในฐานข้อมูล
//C(create/insert) เพิ่ม
// R(Read/Select) ค้นหา,ตรวจสอบ
// U(Update) แก้ไข
// D(Delete) ลบ
const runner = require("./../models/runner.model.js");

const multer = require("multer");
const path = require("path");

//สร้างส่วนของการอัปโหลดไฟล์ด้วย multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/runner");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Math.floor(Math.random() * Date.now()) + path.extname(file.originalname)
    );
  },
});

const uploadrunner = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpg|png|gif||JPG|PNG|/; //กําหนดชนิดไฟล์ที่อนุญาตให้ upload
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error:ไฟล์ไม่ถูกต้อง");
  },
}).single("runnerimage");

//ฟังก์ชั่นเพิ่มข้อมูลนักวิ่ง
//const addRunner = async (req, res) => {
//  try {
//    const result = await runner.create(req.body);
//    res.status(201).json({
//      message: "Insert runner successfully",
//      data: result,
//    });
//  } catch (err) {
//   res.status(500).json({ message: `Error: ${err}` });
// }
//};
const addRunner = async (req, res) => {
  try {
    let data = {
      ...req.body,
      runnerimage: req.file
        ? req.file.path.replace("images\\runner\\", "")
        : "",
    };
    const result = await runner.create(data);
    res.status(201).json({
      message: "Insert runner successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` });
  }
};

//ฟังก์ชั่น Login เพื่อเข้าใช้งานบันทึกข้อมูลการวิ่ง
const checkLoginRunner = async (req, res) => {
  try {
    const result = await runner.findOne({
      where: {
        runnerUsername: req.body.runnerUsername,
        runnerPassword: req.body.runnerPassword,
      },
    });
    if (result) {
      res.status(200).json({
        message: "Login successfully",
        data: result,
      });
    } else {
      res.status(404).json({
        message: "Login username or password incorrect",
        data: result,
      });
    }
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` });
  }
};
//ฟังก์ชั่นแก้ไขข้อมูลส่วนตัวของนักวิ่ง
const editRunner = async (req, res) => {
  try {
    let data = {
      ...req.body,
    };
    if (req.file) {
      data.runimage = req.file.path.replace("images\\run\\", "");
    } else {
      delete data.runimage;
    }
    const result = await runner.update(req.body, {
      where: {
        runnerId: req.params.runnerId,
      },
    });
    res.status(200).json({
      message: "Update runner successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` });
  }
};

module.exports = {
  addRunner,
  checkLoginRunner,
  editRunner,
  uploadrunner,
};
