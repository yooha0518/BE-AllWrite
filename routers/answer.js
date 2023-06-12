const { Router } = require('express');
const { answerController } = require('../controller');
const answerRouter = Router();
const getUserFromJwt = require('../middlewares/getUserFromJwt');
const upload = require('../utils/upload.js');

//답변 등록
answerRouter.post('/:questionId',getUserFromJwt, answerController.createAnswer);

//답변 전체 조회
answerRouter.get('/all/:questionId', getUserFromJwt, answerController.getAnswerAll);

//questionId로 답변 가져오기
answerRouter.get('/:questionId', getUserFromJwt, answerController.getAnswersByQuestionId);

//친구 공개 글 조회
answerRouter.get('/friend/:questionId', getUserFromJwt, answerController.getFriendAnswers);

//답변 상세 조회
answerRouter.get('/detail/:questionId/:answerId', getUserFromJwt, answerController.getDetailAnswers);

// //답변 신고
// answerRouter.post()


//답변 수정
answerRouter.put('/:questionId/:answerId', getUserFromJwt, answerController.putAnswer);

//답변 삭제
answerRouter.delete('/:questionId/:answerId',getUserFromJwt, answerController.deleteAnswer);


module.exports = answerRouter;
