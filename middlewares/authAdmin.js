const { User } = require('../models/index');

module.exports = async (req, res, next) => {
	console.log('req.user : ', req.user);
	const { email } = req.user;
	const user = await User.findOne({ email });
	console.log('user: ', user);
	if (!user.isAdmin) {
		console.log('user.isAdmin:', user.isAdmin);
		return res.status(400).json({
			message: '관리자 권한이 없습니다. 관리자 계정으로 로그인해주세요',
		});
	}
	next();
};
