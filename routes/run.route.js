const express = require('express');
const runCtrl = require("./../controllers/run.controller.js");

const router = express.Router();

router.post('/', runCtrl.uploadrun, runCtrl.addRun);//เพิ่มข้อมูลการวิ่ง
router.put('/:runId', runCtrl.editRun);//แก้ไขข้อมูลการวิ่ง
router.delete('/:runId', runCtrl.delRun);//ลบข้อมูลการวิ่ง
router.get('/', runCtrl.getAllRun);//ดึงข้อมูลการวิ่งทั้งหมดของนักวิ่งคนนั้นๆ

module.exports = router;