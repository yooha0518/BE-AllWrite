const { Router } = require("express");
const { emotionController } = require("../controller");
const emotionRouter = Router();
const getUserFromJwt = require("../middlewares/getUserFromJwt");

//감정 전체 조회
emotionRouter.get("/", getUserFromJwt, emotionController.getAllEmotion);

//해당 날짜 감정  조회
emotionRouter.get("/:date", getUserFromJwt, emotionController.getDateEmotion);

//해당 날짜 감정 생성
emotionRouter.post("/:date", getUserFromJwt, emotionController.postEmotion);

//감정 삭제
emotionRouter.delete("/:date", getUserFromJwt, emotionController.deleteEmotion);

module.exports = emotionRouter;
