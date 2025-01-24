const run = require("./../models/run.model.js");
const multer = require("multer");
const path = require("path");

//สร้างส่วนของการอัปโหลดไฟล์ด้วย multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/run");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      "run_" +
        Math.floor(Math.random() * Date.now()) +
        path.extname(file.originalname)
    );
  },
});

const uploadrun = multer({
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
}).single("runimage");
//ฟังก์ชั่นเพิ่มข้อมูลการวิ่ง
//const addRun = async (req, res) => {
//  try {
//    const result = await run.create(req.body);
//   res.status(201).json({
//      message: "Insert run successfully",
//      data: result,
//    });
//  } catch (err) {
//    res.status(500).json({ message: `Error: ${err}` });
//  }
//};
const addRun = async (req, res) => {
  try {
    let data = {
      ...req.body,
      runimage: req.file ? req.file.path.replace("images\\run\\", "") : "",
    };
    const result = await run.create(data);
    res.status(201).json({
      message: "Insert run successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` });
  }
};

//ฟังก์ชั้นแก้ไขข้อมูลการวิ่ง
const editRun = async (req, res) => {
  try {
    let data = {
      ...req.body,
    };
    if (req.file) {
      data.runimage = req.file.path.replace("images\\run\\", "");
    } else {
      delete data.runimage;
    }
    const result = await run.findAll({
      where: {
        runnerId: req.params.runnerId,
      },
    });
    res.status(200).json({
      message: "Update run successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` });
  }
};
//ฟังก์ชั่นลบข้อมูลการวิ่ง

const delRun = async (req, res) => {
  try {
    const result = await run.update(req.body, {
      where: {
        runnerId: req.params.runnerId,
      },
    });
    res.status(200).json({
      message: "Delete run successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` });
  }
};
//ฟังก์ชั่นดึงข้อมูลการวิ่งทั้งหมดของนักวิ่งคนนั้นๆ
const getAllRun = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` });
  }
};

module.exports = {
  addRun,
  editRun,
  delRun,
  getAllRun,
  uploadrun,
};
