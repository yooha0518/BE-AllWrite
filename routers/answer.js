const { Router } = require('express');
const { answerController } = require('../controller');
const answerRouter = Router();
const getUserFromJwt = require('../middlewares/getUserFromJwt');
const upload = require('../utils/upload.js');

//답변 등록
answerRouter.post('/',getUserFromJwt, answerController.createAnswer);

//답변 전체 조회
answerRouter.get('/', getUserFromJwt, answerController.getAnswerAll);

//답변 조회
answerRouter.get('/:answerId', getUserFromJwt,  answerController.getAnswer);

//답변 수정
answerRouter.put('/:answerId', getUserFromJwt, answerController.putAnswer);

//답변 삭제
answerRouter.delete('/:answerId',getUserFromJwt, answerController.deleteAnswer);


module.exports = answerRouter;
