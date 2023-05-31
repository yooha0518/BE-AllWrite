const jwt = require('jsonwebtoken');
const env = require('../.env');
const { User } = require('../models/index');

exports.setUserToken = (user, isOnlyAccess) => {
	const accessPayload = {
		shortId: user.shortId,
		name: user.name,
		email: user.email,
		profileImage: user.profileImage,
		isAdmin: user.isAdmin,
		isTempPassword: user.isTempPassword,
	};
	const accessOptions = { algorithm: 'HS256', expiresIn: '1h' };
	const accessToken = jwt.sign(accessPayload, env.ACCESSSECRET, accessOptions);

	if (!isOnlyAccess) {
		const refreshPayload = {
			shortId: user.shortId,
		};
		const refreshOptions = { algorithm: 'HS256', expiresIn: '7d' };
		const refreshToken = jwt.sign(
			refreshPayload,
			env.REFRESHSECRET,
			refreshOptions
		);
		User.updateOne(
			{ shortId: refreshPayload.shortId },
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
