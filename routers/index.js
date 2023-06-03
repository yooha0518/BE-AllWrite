const { Router } = require("express");
const router = Router();
const userRouter = require("./user");
const authRouter = require("./auth");
const answerRouter = require("./answer");
const adminUserRouter = require("./adminUser");
const friendRouter = require("./friend.js");
const getUserFromJwt = require("../middlewares/getUserFromJwt");

router.get("/", (req, res) => {
	console.log("api 라우터 테스트");
	res.send("this is homepage");
});
router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/adminUser", adminUserRouter);
router.use("/friend", friendRouter);
router.use("/answer", answerRouter);
module.exports = router;
