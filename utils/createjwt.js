const jwt = require('jsonwebtoken');
// const env = require('../.env');
const { User } = require('../models/index');

exports.setUserToken = (user, isOnlyAccess) => {
	console.log('serUserToken -> user : ', user);
	const accessPayload = {
		nickName: user.nickName,
		name: user.name,
		email: user.email,
		profileImage: user.profileImage,
		isAdmin: user.isAdmin,
		isTempPassword: user.isTempPassword,
	};
	const accessOptions = { algorithm: 'HS256', expiresIn: '1h' };
	const accessToken = jwt.sign(accessPayload, process.env.ACCESSSECRET, accessOptions);

	if (!isOnlyAccess) {
		const refreshPayload = {
			email: user.email,
		};
		const refreshOptions = { algorithm: 'HS256', expiresIn: '7d' };
		const refreshToken = jwt.sign(
			refreshPayload,
			process.env.REFRESHSECRET,
			refreshOptions
		);
		User.updateOne(
			{ email: refreshPayload.email },
			{
				refreshToken: refreshToken,
			}
		)
			.then((res) => {
				console.log('res : ', res);
			})
			.catch((err) => {
				console.log('fail : ', err);
			});

		return { accessToken, refreshToken };
	} else {
		return { accessToken };
	}
};
