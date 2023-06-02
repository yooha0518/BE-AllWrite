const { Friend } = require("../models");
const { User } = require("../models");

const friendService = {
	// 친구 테이블 생성
	async createFriend(email) {
		const createdFriend = await Friend.create({ email });
		return createdFriend;
	},
	// 친구 요청 했었는지 확인
	async getRequest(friendNickName) {
		const alreadyRequest = await Friend.findOne({
			"req_friends.friendNickName": friendNickName,
		});
		return alreadyRequest;
	},
	// 친구 요청 받았는지 확인
	async getResponse(friendNickName) {
		const alreadyRequest = await Friend.findOne({
			"res_friends.friendNickName": friendNickName,
		});
		return alreadyRequest;
	},
	// 친구 닉네임으로 요청 보내기
	async createFriendReq(email, friendNickName) {
		const user = await User.findOne({ email });
		console.log("user: ", user);
		const myNickName = user.nickName;

		const firstResult = await Friend.updateOne(
			{ email },
			{
				$push: { req_friends: { friendNickName } },
			}
		);
		const SecondResult = await Friend.updateOne(
			{ nickname: friendNickName },
			{
				$push: { res_friends: { friendNickName: myNickName } },
			}
		);

		return { firstResult, SecondResult };
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
	async acceptFriend(email) {
		const result = await Friend.updateOne({ email });

		return result;
	},
	// 친구 테이블 전체 정보 조회
	async getFriend(email) {
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

	// //특정 친구 조회
	// async adminReadSearchFriend(email) {
	// 	const friend = await Friend.findOne({ email });
	// 	return friend;
	// },
};

module.exports = friendService;
