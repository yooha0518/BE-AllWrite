const { Answer,Like,Comment,User } = require('../models');


const MypageService = {
  async getProfileImage () {
		const user = await User.findById(this.nickName);
		return user ? user.profileImage : null;
	},

  async getAnswers(nickName) {
    const answers = await Answer.find({ nickName:nickName });
    await console.log(`(${nickName})에 대한 답변을 가져왔습니다.`);
    return answers;
  },
  
  async  getOhterAnswers(nickName) {
    const answers = await Answer.find({ nickName:nickName, stateCode:true });
    await console.log(`(${nickName})에 대한 답변을 가져왔습니다.`);
    return answers;
  },
};

module.exports = MypageService;
