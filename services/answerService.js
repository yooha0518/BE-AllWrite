const { Answer } = require('../models');


const AnswerService = {
	// 답변 생성
	async createAnswer({  content,userId,createdAt }) {
		const createdAnswer = await Answer.create({ content,userId,createdAt });
		return createdAnswer;
	},
	// 답변 조회
	async getAnswer(answerId) {
		const answer = await Answer.findOne( answerId );
		return answer;
	},
  // 전체 답변 조회
	async getAnswerAll() {
    const answer = await Answer.find({}).populate("userId");
    return answer;
	},
  //answerId를 사용해 답변 수정
  async updateAnswer(answerId, updateData) {
    const option = { new: true };

    const updateAnswer = await Answer.findByIdAndUpdate(answerId, updateData, option);
    return updateAnswer;
  }
	// 질문 삭제
	async deleteAnswer(answerId) {
		const deleteResult = await Answer.deleteOne({ answerId });
		console.log(deleteResult);
		return {message: '질문이 삭제 되었습니다.', answer:deleteResult };
	},
};

module.exports = AnswerService;
