const { Router } = require('express');
const adminFunctionRouter = Router();
const { userController,adminController } = require('../controller/index');
const getUserFromJwt = require('../middlewares/getUserFromJwt');
const { authAdmin } = require('../middlewares/index');

//ADMIN 신고된 답변 조회
adminFunctionRouter.get('/complaint', getUserFromJwt,adminController.adminGetComplaint);

//AdMIN 모든 댓글 조회
adminFunctionRouter.get('/comment', getUserFromJwt,adminController.adminGetComment);

//AdMIN 신고된 모든 댓글 조회
adminFunctionRouter.get('/comment/complaint', getUserFromJwt,adminController.adminGetComplaintComment);

// ADMIN 댓글 삭제
adminFunctionRouter.delete('/comment/:commentId', getUserFromJwt,adminController.adminDeleteComment);

module.exports = adminFunctionRouter;
