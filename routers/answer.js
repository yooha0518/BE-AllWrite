const { Router } = require('express');
const { answerController,userController } = require('../controller');
const answerRouter = Router();
const getUserFromJwt = require('../middlewares/getUserFromJwt');
const upload = require('../utils/upload.js');
const { getUser } = require('../services/userService');

//답변 등록
answerRouter.post('/:questionId',getUserFromJwt, answerController.createAnswer, userController.addUserExp);

//답변 전체, 친구 모두 조회
// answerRouter.get('/all/:questionId', getUserFromJwt, answerController.getAnswerAll);

// //questionId로 전체, 친구 모든 답변 가져오기
answerRouter.get('/:questionId', getUserFromJwt, answerController.getAnswersByQuestionId);

//전체 공개 글 조회
answerRouter.get('/public/:questionId', getUserFromJwt, answerController.getPublicAnswers);

//친구 공개 글 조회
answerRouter.get('/friend/:questionId', getUserFromJwt, answerController.getFriendAnswers);

//답변 상세 조회
answerRouter.get('/detail/:questionId/:answerId', getUserFromJwt, answerController.getDetailAnswers);

//답변 날짜, 유저 검색 조회
answerRouter.get('/calendar/:questionId/:nickName', getUserFromJwt, answerController.getAnswersFromQuestionAndNickName);

// 답변 신고
answerRouter.post('/complaint/:questionId/:answerId', getUserFromJwt, answerController.reportAnswer );

//답변 수정
answerRouter.put('/:questionId/:answerId', getUserFromJwt, answerController.putAnswer);

//답변 삭제
answerRouter.delete('/:questionId/:answerId',getUserFromJwt, answerController.deleteAnswer);


module.exports = answerRouter;
