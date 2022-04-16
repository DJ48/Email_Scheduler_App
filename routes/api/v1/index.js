const express = require("express");
const emailController = require("../../../src/controllers/emailController");
const router = express.Router();


router.post("/emails",emailController.addEmail);
router.get("/emails",emailController.fetchEmails);
router.get("/failedEmails",emailController.fetchFailedEmails);
router.put("/emails",emailController.updateSchedule);
router.delete("/emails",emailController.deleteSchedule);

module.exports = router;