const { Router } = require('express');
const adminFunctionRouter = Router();
const { userController,adminController } = require('../controller/index');
const getUserFromJwt = require('../middlewares/getUserFromJwt');
const { authAdmin } = require('../middlewares/index');

//ADNIM 신고된 답변 조회
adminFunctionRouter.get('/complaint', getUserFromJwt,adminController.adminGetComplaint);

module.exports = adminFunctionRouter;
