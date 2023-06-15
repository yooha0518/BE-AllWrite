const { Router } = require('express');
const adminUserRouter = Router();
const { userController,adminController } = require('../controller/index');
const getUserFromJwt = require('../middlewares/getUserFromJwt');
const { authAdmin } = require('../middlewares/index');

//ADNIM 유저 전체 조회
adminUserRouter.get('/', getUserFromJwt, authAdmin, userController.adminGetUserlist);

//ADNIM 경고 메일 발송
adminUserRouter.post('/warning', userController.sendEmail);

// //ADNIM 유저 프로필 사진 삭제
adminUserRouter.put('/profileImage/:email', userController.adminPutProfileImage);

//ADNIM 유저 정보 수정
adminUserRouter.put('/:email',getUserFromJwt, authAdmin, userController.adminUpdateUser);

//ADNIM 유저 정보 삭제
adminUserRouter.delete('/:email', getUserFromJwt, authAdmin, userController.adminDeleteUser);

module.exports = adminUserRouter;
