const { Question } = require('../models');


const QuestionService = {
	// 질문 생성
	async createQuestion({ content }) {
		const createdQuestion = await Question.create({ content });
		return createdQuestion;
	},
	// 질문 조회
	async getQuestion(QuestionId) {
		const question = await Question.findOne({ QuestionId });
		return question;
	},
	
	// 질문 수정
	async updateQuestion(QuestionId, content) {
		const result = await Question.updateOne(QuestionId ,	content);
		if (result.modifiedCount === 0) {
			console.log('변경사항이 없습니다.');
		}
		console.log(result);
		return {
			message: `요청: ${result.acknowledged}, 요청된 문서의 수: ${result.modifiedCount}`,
		};
	},
	// 질문 삭제
	async deleteQuestion(QuestionId) {
		const deleteResult = await Question.deleteOne({ QuestionId });
		console.log(deleteResult);
		return { message: '질문이 삭제 되었습니다.' };
	},
};

module.exports = QuestionService;
