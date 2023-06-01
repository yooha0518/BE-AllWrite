const { Router } = require('express');
const { answerController } = require('../controller');
const answerRouter = Router();
const upload = require('../utils/upload.js');

//답변 등록
answerRouter.post('/', answerController.createAnswer);

//답변 전체 조회
answerRouter.get('/',  answerController.getAnswerAll);

//답변 조회
answerRouter.get('/:answerId',  answerController.getAnswer);

//답변 수정
answerRouter.put('/:answerId',  answerController.putAnswer);

//답변 삭제
answerRouter.delete('/:answerId', answerController.deleteAnswer);


module.exports = userRouter;
