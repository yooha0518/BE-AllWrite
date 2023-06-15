const { Answer,Like,Comment,User } = require('../models');


const MypageService = {
	

	async getProfileImage () {
		const user = await User.findById(this.nickName);
		return user ? user.profileImage : null;
	},

		// 전체 공개 게시글을 조회하는 함수
		async  getPublicAnswers(questionId) {
			// const answers = await Answer.find({ stateCode: false })
			const answers = await Answer.find({ questionId, stateCode: true });
			console.log(`질문 ID(${questionId})에 대한 전체공개 답변을 가져왔습니다.`);
			return answers;


			// .populate('nickName'); // stateCode가 false인 글을 조회하고, 작성자 정보를 가져옵니다.
			return answers;
  },

	// 친구 공개 게시글을 조회하는 함수
	async  getFriendAnswers(questionId) {
			// const answers = await Answer.find({ stateCode: false })
			const answers = await Answer.find({ questionId, stateCode: false });
			console.log(`질문 ID(${questionId})에 대한 친구공개 답변을 가져왔습니다.`);
			return answers;


			// .populate('nickName'); // stateCode가 false인 글을 조회하고, 작성자 정보를 가져옵니다.
			return answers;
  },


};

module.exports = MypageService;
