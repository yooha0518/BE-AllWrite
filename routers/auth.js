const { Router } = require('express');
const refreshToken = require('../middlewares/getUserFromRefreshJwt');
const authRouter = Router();
const { userController } = require('../controller');


//access토큰 발급
authRouter.get('/', refreshToken, userController.createAccessToken);

// 로그인
authRouter.post('/', userController.authUser);

//이메일 본인인증
authRouter.post('/emailAuth', userController.getUser);

module.exports = authRouter;
