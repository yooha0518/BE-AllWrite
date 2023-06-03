const jwt = require('jsonwebtoken');
const env = require('../.env');

exports.setAuthCodeToken = (authCode) => {
	const payload = {
		authCode: authCode,
	};
	const options = { algorithm: 'HS256', expiresIn: '3m' }; //토큰 만료시간(1시간)
	return jwt.sign(payload, env.AUTHCODEKEY, options); // 유저 jwt 토큰생성
};
