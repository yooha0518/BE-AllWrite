const passport = require('passport');
const { userService } = require('../services/index');

module.exports = (req, res, next) => {
	//토큰검증 미들웨어
	passport.authenticate('refresh', { session: false })(
		req,
		res,
		async (err) => {
			if (err) {
				console.log('refresh authenticate 에러');
				res
					.status(500)
					.send({ message: `토큰검증 미들웨어 에러: ${err.message}` });
			} else {
				const { shortId } = req.user;
				const userRefreshToken = await userService.getUserRefreshToken(shortId);
				const InputRefreshToken = req.headers.authorization.substring(7);

				if (userRefreshToken.refreshToken === InputRefreshToken) {
					console.log('refresh Authorized');
					next();
				} else {
					res.status(403).send({ message: 'refresh토큰이 만료되었습니다.' });
				}
			}
		}
	);
};
