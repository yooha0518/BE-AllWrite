const { Question } = require("../models");

let today = Date.now;

const questionService = {
	//질문 전체 조회
	async getAllQuestion() {
		const allQuestion = await Question.find({});
		return allQuestion;
	},
	//오늘의 질문 5개 조회
	async getTodayQuestion() {
		const question = await Question.findOne({ date: today });
		if (!question) {
			const todayQuestion = await Question.findOneAndUpdate({ date: null },)

		}
		return question;
	},
	//질문 생성
	async createQuestion(content) {
		const result = await Question.create({ content });
		return result;
	},
	//질문 수정
	async updateQuestion(questionId, content) {
		const updateResult = await Question.updateOne(
			{ _id: questionId },
			{
				content,
			}
		);
		return updateResult;
	},
	//질문 삭제
	async deleteQuestion(questionId) {
		const deleteResult = await Question.deleteOne({ _id: questionId });
		return deleteResult;
	},
};

module.exports = questionService;
