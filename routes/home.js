const express = require("express");

const router = express.Router();

const homeController = require("../controller/home");

const isAuth = require('../middleware/isAuth')

router.get("/",isAuth,homeController.getHome);
router.get("/home",isAuth, homeController.getHome);
router.get("/video",isAuth, homeController.getVideo);
router.get("/friends",isAuth, homeController.getFriend);
router.get("/login", homeController.getLogin);
router.post("/login", homeController.postLogin);
router.get("/logout", homeController.logout);
router.get("/signup", homeController.getSign);
router.post("/signup", homeController.postSign);
router.get("/profile",isAuth,homeController.getProfile);
router.post('/addfriend/:fid',isAuth,homeController.postAddFriend);
router.post('/removefriend/:fid',isAuth,homeController.postRemoveFriend);
router.get("/", homeController.get404);

module.exports = router;
