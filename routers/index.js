const { Router } = require("express");
const router = Router();
const userRouter = require("./user");
const authRouter = require("./auth");
const answerRouter = require("./answer");
const commentRouter = require("./comment");
const likeRouter = require("./like");
const adminUserRouter = require("./adminUser");
const friendRouter = require("./friend.js");
const questionRouter = require("./question.js");
const getUserFromJwt = require("../middlewares/getUserFromJwt");

router.get("/", (req, res) => {
  console.log("api 라우터 테스트");
  res.send("this is homepage");
});
router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/friend", friendRouter);
router.use("/adminUser", getUserFromJwt, adminUserRouter);
router.use("/answer", answerRouter);
router.use("/question", questionRouter);
router.use("/answer/:answerId/comment", commentRouter);
router.use("/answer/like", likeRouter);
module.exports = router;
