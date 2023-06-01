const { Router } = require("express");
const router = Router();
const userRouter = require("./user");
const authRouter = require("./auth");
const answerRouter = require("./answer");
const adminUserRouter = require("./adminUser");
const getUserFromJwt = require("../middlewares/getUserFromJwt");

router.get("/", (req, res) => {
  console.log("api 라우터 테스트");
  res.send("this is homepage");
});
router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/adminUser", getUserFromJwt, adminUserRouter);
router.use("/answer", answerRouter);
module.exports = router;
