const { friendService, userService } = require('../services');

const friendController = {
	//친구 테이블 전체 조회
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
	//내친구 전체 조회
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
	// //친구 정보 조회
	// async getOnefriend(req, res, next) {
	// 	try {
	// 		const { email } = req.params;
	// 	} catch (error) {
	// 		console.log(error);
	// 		return res
	// 			.status(500)
	// 			.json({ message: '서버의 friendContrller에서 에러가 났습니다.' });
	// 	}
	// },
	//친구 요청 보내기
	async sendFriend(req, res) {
		try {
			const { email } = req.user;
			const { friendNickName } = req.body;

			const alreadyRequest = await friendService.getRequest(friendNickName);

			if (alreadyRequest) {
				return res.status(400).json({ message: '이미 요청한 유저입니다.' });
			}

			const alreadyresponse = await friendService.getResponse(friendNickName);
			if (alreadyresponse) {
				return res
					.status(400)
					.json({ message: '이미 요청을 받은 유저입니다.' });
			}

			const friend = await userService.getUserFromNickName(friendNickName);
			if (!friend) {
				return res.status(400).json({ message: '해당 유저는 없습니다.' });
			}

			const result = await friendService.createFriendReq(email, friendNickName);

			return res
				.status(200)
				.json({ message: '친구 요청을 보냈습니다. ', result });
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 friendContrller에서 에러가 났습니다.' });
		}
	},
	//친구 요청 수락
	async acceptFriend(req, res) {
		try {
			
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 friendContrller에서 에러가 났습니다.' });
		}
	},
	//받은 친구요청 조회
	async getReqfriend(req, res) {
		try {
			const { email } = req.user;
			const friendReq = await friendService.getFriendReq(email);
			return res.status(200).json(friendReq);
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 friendContrller에서 에러가 났습니다.' });
		}
	},
	//보낸 친구 요청 조회
	async sendReqfriend(req, res) {
		try {
			const { email } = req.user;
			const SendFriendReq = await friendService.getFriendSendReq(email);
			return res.status(200).json(SendFriendReq);
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 friendContrller에서 에러가 났습니다.' });
		}
	},
	// //친구 삭제
	// async deleteFriend(req, res) {
	// 	try {
	// 		const { email } = req.params;
	// 	} catch (error) {
	// 		console.log(error);
	// 		return res
	// 			.status(500)
	// 			.json({ message: '서버의 friendContrller에서 에러가 났습니다.' });
	// 	}
	// },
};

module.exports = friendController;
