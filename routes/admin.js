const express = require("express");

const router = express.Router();

const adminController = require("../controller/admin");

router.get("/", adminController.getAdmin);
router.post("/delete-user/:userId", adminController.postDelete);
router.get("/update-user/:userId", adminController.getUpdate);
router.post("/update/:userId", adminController.postUpdate);
router.get('/login',adminController.getLogAdmin);
router.post('/login',adminController.postLogIn);

module.exports = router;