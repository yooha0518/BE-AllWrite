const { Router } = require('express');
const adminUserRouter = Router();
const { userController } = require('../controller/index');
const { authAdmin } = require('../middlewares/index');

//ADMIN 유저 검색
adminUserRouter.get('/:name',authAdmin,userController.adminGetUser);

//ADNIM 유저 전체 조회
adminUserRouter.get('/', authAdmin, userController.adminGetUserlist);

// //ADNIM 유저 정보 수정
// adminUserRouter.put('/:shortId', authAdmin, userController.adminUpdateUser);

//ADNIM 유저 정보 삭제
adminUserRouter.delete('/:shortId', authAdmin, userController.adminDeleteUser);

module.exports = adminUserRouter;
