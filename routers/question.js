const { Router } = require("express");
const { questionController } = require("../controller");
const questionRouter = Router();
const getUserFromJwt = require("../middlewares/getUserFromJwt");
const { authAdmin } = require("../middlewares/index");


//질문 전체 조회
questionRouter.get("/all", questionController.getAllQuestion);

//오늘의 질문 3개 조회
questionRouter.get("/", questionController.getTodayQuestion);

//해당 날짜의 질문 조회
questionRouter.get("/:date", questionController.getDateQuestion);

//질문 생성
questionRouter.post("/", questionController.createQuestion);

//질문 날짜 초기화
questionRouter.delete("/reset", questionController.resetQuestion);

//질문 수정
questionRouter.put("/:questionId", questionController.updateQuestion);

//질문 삭제
questionRouter.delete("/:questionId", questionController.deleteQuestion);

module.exports = questionRouter;
