const { Friend } = require('../models');

const friendService = {
	// 친구 요청
	async createFriend(email) {
		const createdFriend = await Friend.create({email});
		return createdFriend;
	},
	// 친구 테이블 전체 정보 조회
	async getFriend(email) {
		const friend = await Friend.findOne({ email });
		return friend;
	},
	// 친구 전체 조회
	async getAllFriend(email) {
		const friend = await Friend.findOne({ email }, 'friends');
		return friend.friends;
	},

	// 친구 삭제
	async DeleteFriend(email) {
		const deleteResult = await Friend.deleteOne({ email });
		return { message: '계정이 영구삭제 되었습니다.' };
	},

	//특정 친구 조회
	async adminReadSearchFriend(email) {
		const friend = await Friend.findOne({ email });
		return friend;
	},
	//친구 전체 조회
	async adminReadFriend(page) {
		const total = await Friend.countDocuments({});
		const friendList = await friend
			.find({ isAdmin: false })
			.sort({ name: 1 })
			.skip(7 * (page - 1))
			.limit(7);
		return [friendList, { total: total }];
	},
};

module.exports = friendService;
