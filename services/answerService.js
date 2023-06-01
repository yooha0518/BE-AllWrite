const { Answer } = require('../models');


const AnswerService = {
	// 답변 생성
	async createAnswer({  content,reportCount,stateCode,  createdAt }) {
		const createdAnswer = await Answer.create({ content,reportCount,stateCode,  createdAt });
		return createdAnswer;
	},
	// 답변 조회
	async getAnswer(answerId) {
		const answer = await Answer.findOne( {_id: answerId} );
		return answer;
	},
  // 전체 답변 조회
	async getAnswerAll() {
    const answer = await Answer.find({});
    return answer;
	},
  //answerId를 사용해 답변 수정
  async updateAnswer(answerId, updateData) {
    const option = { new: true };

    const updateAnswer = await Answer.updateOne(
			{_id: answerId}, updateData, option);
    return updateAnswer;
  },
	// 질문 삭제
	async deleteAnswer(answerId) {
		const deleteResult = await Answer.deleteOne({_id: answerId});
		console.log(deleteResult);
		return {message: '질문이 삭제 되었습니다.', answer:deleteResult };
	},
};

module.exports = AnswerService;
