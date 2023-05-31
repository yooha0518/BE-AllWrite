const { Router } = require('express');
const adminUserRouter = Router();
const { userController } = require('../controller/index');
const { authAdmin } = require('../middlewares/index');

//ADNIM 유저 전체 조회
adminUserRouter.get('/', authAdmin, userController.adminGetUserlist);

//ADNIM 경고 메일 발송
adminUserRouter.post('/warning', authAdmin, userController.adminsendEmail);

//ADNIM 유저 정보 수정
adminUserRouter.put('/:email', authAdmin, userController.adminUpdateUser);

//ADNIM 유저 정보 삭제
adminUserRouter.delete('/:email', authAdmin, userController.adminDeleteUser);


module.exports = adminUserRouter;
