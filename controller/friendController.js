const { friendService, userService } = require("../services");

const friendController = {
	//친구 테이블 전체 조회
	async getfriendtable(req, res) {
		try {
			const { email } = req.user;
			const friendTable = await friendService.getFriendTable(email);

			return res.status(200).json(friendTable);
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 friendContrller에서 에러가 났습니다." });
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
				.json({ message: "서버의 friendContrller에서 에러가 났습니다." });
		}
	},
	//특정 친구 관계 조회
	async getRelationFriend(req, res) {
		try {
			const { email } = req.user;
			const { friendNickName } = req.body;
			const relation = await friendService.getRelationFriend(
				email,
				friendNickName
			);
			return res.status(200).json(relation);
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 friendContrller에서 에러가 났습니다." });
		}
	},
	//친구 요청 보내기
	async sendFriend(req, res) {
		try {
			const { email, nickName } = req.user;
			const { friendNickName } = req.body;

			if (nickName === friendNickName) {
				return res.status(400).json({ message: "적절한 값을 입력하세요." });
			}

			const alreadyFriend = await friendService.getFriendCheck(
				email,
				friendNickName
			);
			console.log("alreadyFriend", alreadyFriend);
			if (alreadyFriend) {
				return res
					.status(400)
					.json({ message: `${friendNickName}님과는 이미 친구인 상태입니다.` });
			}

			const alreadyRequest = await friendService.getRequest(
				email,
				friendNickName
			);
			if (alreadyRequest) {
				return res.status(400).json({ message: "이미 요청한 유저입니다." });
			}

			const alreadyRequested = await friendService.getResponse(
				email,
				friendNickName
			);
			if (alreadyRequested) {
				return res
					.status(400)
					.json({ message: "이미 요청을 받은 유저입니다." });
			}

			const friend = await userService.getUserFromNickName(friendNickName);
			if (!friend) {
				return res.status(400).json({ message: "해당 유저는 없습니다." });
			}

			const result = await friendService.createFriendReq(email, friendNickName);

			return res.status(200).json({
				message: `${friendNickName}님께 친구 요청을 보냈습니다. `,
				result,
			});
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 friendContrller에서 에러가 났습니다." });
		}
	},
	//친구 요청 수락
	async acceptFriend(req, res) {
		try {
			const { email } = req.user;
			const { friendNickName } = req.body;

			const request = await friendService.findReq(email, friendNickName);
			if (!request) {
				return res
					.status(400)
					.json({ message: "해당 유저는 요청을 보내지 않았습니다." });
			}
			const result = await friendService.acceptFriend(email, friendNickName);
			return res.status(200).json({
				message: `${friendNickName}님과 친구가 되었습니다.`,
				result: result,
			});
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 friendContrller에서 에러가 났습니다." });
		}
	},
	//받은 친구요청 조회
	async getReqfriend(req, res) {
		try {
			const { email } = req.user;
			console.log("email", email);
			const friendReq = await friendService.getFriendReq(email);
			return res.status(200).json(friendReq);
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 friendContrller에서 에러가 났습니다." });
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
				.json({ message: "서버의 friendContrller에서 에러가 났습니다." });
		}
	},
	//받은 친구 요청 거절
	async deleteReqfriend(req, res) {
		try {
			const { email } = req.user;
			const { friendNickName } = req.body;

			//친구 요청을 받았는지 확인
			const request = await friendService.findReq(email, friendNickName);
			if (!request) {
				return res
					.status(400)
					.json({ message: "해당 유저는 요청을 보내지 않았습니다." });
			}

			const friendReq = await friendService.rejectFriendReq(
				email,
				friendNickName
			);

			return res.status(200).json(friendReq);
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 friendContrller에서 에러가 났습니다." });
		}
	},
	//친구 삭제
	async deleteFriend(req, res) {
		try {
			const { friendNickName } = req.params;
			const { email, nickName } = req.user;
			const friend = await userService.getUserFromNickName(friendNickName);
			console.log("friend: ", friend);
			if (friend === null) {
				return res.status(400).json({ message: "해당 유저는 없습니다." });
			}
			const result = await friendService.deleteFriend(
				email,
				nickName,
				friend.email,
				friend.nickName
			);
			return res.status(200).json({
				message: `친구목록에서 ${friend.nickName}님이 삭제 되었습니다.`,
				...result,
			});
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 friendContrller에서 에러가 났습니다." });
		}
	},
};

module.exports = friendController;
