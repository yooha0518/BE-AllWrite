const passport = require('passport');

module.exports = (req, res, next) => {
	//토큰검증 미들웨어
	passport.authenticate('access', { session: false })(req, res, (err) => {
		if (err) {
			console.log('access authenticate 에러');
			res
				.status(500)
				.send({ message: `토큰검증 미들웨어 에러: ${err.message}` });
		} else {
			console.log('access Authorized');
			next();
		}
	});
};
