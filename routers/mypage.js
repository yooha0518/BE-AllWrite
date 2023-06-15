const { Router } = require('express');
const { mypageController } = require('../controller');
const mypageRouter = Router();
const getUserFromJwt = require('../middlewares/getUserFromJwt');

//답변 등록
mypageRouter.get('/:nickName',getUserFromJwt, mypageController.getAnswers);


module.exports = mypageRouter;
