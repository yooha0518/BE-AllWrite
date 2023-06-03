const { Friend } = require("../models");
const { User } = require("../models");

const friendService = {
	// 친구 테이블 생성
	async createFriend(email) {
		const createdFriend = await Friend.create({ email });
		return createdFriend;
	},
	// 친구 요청 했었는지 확인
	async getRequest(email, friendNickName) {
		const user = await Friend.findOne({ email });
		for (const item of user.req_friends) {
			if (friendNickName === item.friendNickName) {
				return true;
			}
		}
	},
	// 친구 요청 받았었는지 확인
	async getResponse(email, friendNickName) {
		const user = await Friend.findOne({ email });

		for (const item of user.res_friends) {
			if (friendNickName === item.friendNickName) {
				return true;
			}
		}
	},
	// 친구 닉네임으로 요청 보내기
	async createFriendReq(email, friendNickName) {
		const user = await User.findOne({ email });
		const friend = await User.findOne({ nickName: friendNickName });
		console.log("user: ", user);
		const myNickName = user.nickName;
		console.log("myNickName", myNickName);
		const userResult = await Friend.updateOne(
			{ email },
			{
				$push: { req_friends: { friendNickName } },
			}
		);
		const friendResult = await Friend.updateOne(
			{ email: friend.email },
			{
				$push: { res_friends: { friendNickName: myNickName } },
			}
		);

		return { userResult, friendResult };
	},
	// 받은 친구 요청 조회
	async getFriendReq(email) {
		const result = await Friend.findOne({ email }, "res_friends");
		console.log(result);
		return result.res_friends;
	},
	//보낸 요청 조회
	async getFriendSendReq(email) {
		const result = await Friend.findOne({ email }, "req_friends");
		return result.req_friends;
	},
	// 친구 요청 수락
	async acceptFriend(email, friendNickName) {
		const user = await User.findOne({ email });
		const friend = await User.findOne({ nickName: friendNickName });

		const userResult1 = await Friend.updateOne(
			{ email },
			{
				$pull: { res_friends: { friendNickName } },
			}
		);
		const userResult2 = await Friend.updateOne(
			{ email },
			{
				$push: { friends: { friendNickName } },
			}
		);
		const friendResult1 = await Friend.updateOne(
			{ email: friend.email },
			{
				$pull: { req_friends: { friendNickName: user.nickName } },
			}
		);
		const friendResult2 = await Friend.updateOne(
			{ email: friend.email },
			{
				$push: { friends: { friendNickName: user.nickName } },
			}
		);

		return { userResult1, userResult2, friendResult1, friendResult2 };
	},
	// 친구 테이블 전체 정보 조회
	async getFriendTable(email) {
		const friend = await Friend.findOne({ email });
		return friend;
	},
	// 친구 전체 조회
	async getAllFriend(email) {
		const friend = await Friend.findOne({ email }, "friends");
		return friend.friends;
	},

	// // 친구 삭제
	// async DeleteFriend(email) {
	// 	const deleteResult = await Friend.deleteOne({ email });
	// 	return { message: '계정이 영구삭제 되었습니다.' };
	// },

	//특정 친구 조회
	async getOneFriend(nickName) {
		const friend = await Friend.findOne({ nickName });
		console.log(friend);
		return friend;
	},
};

module.exports = friendService;
