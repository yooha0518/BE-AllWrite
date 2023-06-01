const { friendService } = require('../services');

const friendController = {
	async getfriendtable(req, res) {
		try {
			const { email } = req.user;
			const friendTable = await friendService.getFriend(email);

			return res.status(200).json(friendTable);
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 friendContrller에서 에러가 났습니다.' });
		}
	},
	async getAllfriends(req, res) {
		try {
			const { email } = req.user;
			const friends = await friendService.getAllFriend(email);
			return res.status(200).json(friends);
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 friendContrller에서 에러가 났습니다.' });
		}
	},
	async getOnefriend(req, res, next) {
		try {
			const { email } = req.params;
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 friendContrller에서 에러가 났습니다.' });
		}
	},
	async sendFriend(req, res) {
		try {
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 friendContrller에서 에러가 났습니다.' });
		}
	},
	async acceptFriend(req, res) {
		try {
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 friendContrller에서 에러가 났습니다.' });
		}
	},
	async getReqfriends(req, res) {
		try {
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 friendContrller에서 에러가 났습니다.' });
		}
	},
	async sendReqfriends(req, res) {
		try {
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 friendContrller에서 에러가 났습니다.' });
		}
	},
	async deleteFriend(req, res) {
		try {
			const { email } = req.params;
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 friendContrller에서 에러가 났습니다.' });
		}
	},
};

module.exports = friendController;
