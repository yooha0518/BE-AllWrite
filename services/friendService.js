const { Friend } = require("../models");
const { User } = require("../models");

const friendService = {
	// 친구 전체 조회
	async getAllFriend(email) {
		const friendtable = await Friend.findOne({ email });
		const friends = friendtable.friends;
		const friendArr = [];
		for (let i = 0; i < friends.length; i++) {
			friendArr.push(
				await User.findOne(
					{ nickName: friends[i].nickName },
					{ profileImage: 1, nickName: 1 }
				)
			);
		}
		return friendArr;
	},
	// 친구 테이블 생성
	async createFriend(email) {
		const createdFriend = await Friend.create({ email });
		return createdFriend;
	},
	// 친구 요청 했었는지 확인
	async getRequest(email, friendNickName) {
		const user = await Friend.findOne({ email });
		for (const item of user.req_friends) {
			if (friendNickName === item.nickName) {
				return true;
			}
		}
	},
	// 친구 요청 받았었는지 확인
	async getResponse(email, friendNickName) {
		const user = await Friend.findOne({ email });

		for (const item of user.res_friends) {
			if (friendNickName === item.nickName) {
				return true;
			}
		}
	},
	//친구 여부 확인
	async getFriendCheck(email, friendNickName) {
		const userFriend = await Friend.findOne({ email }, "friends");

		for (const item of userFriend.friends) {
			if (friendNickName === item.nickName) {
				return true;
			}
		}
		return false;
	},
	//친구 관계 확인
	async getRelationFriend(email, friendNickName) {
		const userFriend = await Friend.findOne({ email }, "friends");
		const userReqFriend = await Friend.findOne({ email }, "req_friends");
		const userResFriend = await Friend.findOne({ email }, "res_friends");

		let isFriend = false;
		let isReqFriend = false;
		let isResFriend = false;

		for (const item of userFriend.friends) {
			if (friendNickName === item.nickName) {
				isFriend = true;
			}
		}
		for (const item of userReqFriend.req_friends) {
			if (friendNickName === item.nickName) {
				isReqFriend = true;
			}
		}
		for (const item of userResFriend.res_friends) {
			if (friendNickName === item.nickName) {
				isResFriend = true;
			}
		}
		return { isFriend, isReqFriend, isResFriend };
	},
	// 친구 닉네임으로 요청 보내기
	async createFriendReq(email, friendNickName) {
		const user = await User.findOne({ email });
		const friend = await User.findOne({ nickName: friendNickName });
		const friendProfileImage = friend.profileImage;
		const myNickName = user.nickName;

		const userResult = await Friend.updateOne(
			{ email },
			{
				$push: {
					req_friends: { nickName: friendNickName },
				},
			}
		);

		const friendResult = await Friend.updateOne(
			{ email: friend.email },
			{
				$push: { res_friends: { nickName: myNickName } },
			}
		);

		return { userResult, friendResult };
	},
	// 받은 친구 요청 조회
	async getFriendReq(email) {
		const result = await Friend.findOne({ email }, "res_friends");
		const resFriends = result.res_friends;
		const friendArr = [];
		for (let i = 0; i < resFriends.length; i++) {
			friendArr.push(
				await User.findOne(
					{ nickName: resFriends[i].nickName },
					{ profileImage: 1, nickName: 1 }
				)
			);
		}
		return friendArr;
	},
	//보낸 요청 조회
	async getFriendSendReq(email) {
		const result = await Friend.findOne({ email }, "req_friends");
		const reqFriends = result.req_friends;
		const friendArr = [];
		for (let i = 0; i < reqFriends.length; i++) {
			friendArr.push(
				await User.findOne(
					{ nickName: reqFriends[i].nickName },
					{ profileImage: 1, nickName: 1 }
				)
			);
		}
		return friendArr;
	},
	//특정 유저에게 받은 요청 조회
	async findReq(email, friendNickName) {
		const resFriendsTable = await Friend.findOne({ email }, "res_friends");
		const resFriends = resFriendsTable.res_friends;
		console.log("resFriends", resFriendsTable);
		let result = 0;
		if (!resFriends) {
			return result;
		}
		for (let i = 0; i < resFriends.length; i++) {
			if (resFriends[i].nickName === friendNickName) {
				result = 1;
			}
		}
		return result;
	},
	// 친구 요청 수락
	async acceptFriend(email, friendNickName) {
		const user = await User.findOne({ email });
		const friend = await User.findOne({ nickName: friendNickName });

		console.log("friend", friend);

		const userResult1 = await Friend.updateOne(
			{ email },
			{
				$pull: { res_friends: { nickName: friendNickName } },
			}
		);
		const userResult2 = await Friend.updateOne(
			{ email },
			{
				$push: { friends: { nickName: friend.nickName } },
			}
		);

		const friendResult1 = await Friend.updateOne(
			{ email: friend.email },
			{
				$pull: { req_friends: { nickName: user.nickName } },
			}
		);
		const friendResult2 = await Friend.updateOne(
			{ email: friend.email },
			{
				$push: { friends: { nickName: user.nickName } },
			}
		);

		return { userResult1, userResult2, friendResult1, friendResult2 };
	},
	// 친구 요청 거절
	async rejectFriendReq(email, friendNickName) {
		const user = await User.findOne({ email });
		const friend = await User.findOne({ nickName: friendNickName });
		const userResult = await Friend.updateOne(
			{ email },
			{
				$pull: { res_friends: { nickName: friendNickName } },
			}
		);
		const friendResult = await Friend.updateOne(
			{ email: friend.email },
			{
				$pull: { req_friends: { nickName: user.nickName } },
			}
		);
		return { userResult, friendResult };
	},
	// 친구 테이블 전체 정보 조회
	async getFriendTable(email) {
		const friend = await Friend.findOne({ email });
		return friend;
	},

	// 친구 삭제
	async deleteFriend(email, nickName, friendEmail, friendNickName) {
		console.log("all: ", email, nickName, friendEmail, friendNickName);
		const result1 = await Friend.updateOne(
			{ email },
			{
				$pull: { friends: { nickName: friendNickName } },
			}
		);
		const result2 = await Friend.updateOne(
			{ email: friendEmail },
			{
				$pull: { friends: { nickName: nickName } },
			}
		);
		return { result1, result2 };
	},
};

module.exports = friendService;
