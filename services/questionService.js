const { Question } = require("../models");

const questionService = {
	//질문 전체 조회
	async getAllQuestion() {
		const allQuestion = await Question.find({});
		return allQuestion;
	},
	//오늘의 질문 3개 조회
	async getTodayQuestion() {
		let today = new Date();
		let year = today.getFullYear();
		let month = today.getMonth() + 1;
		let day = today.getDate();

		if (month < 10) {
			month = "0" + month;
		}
		if (day < 10) {
			day = "0" + day;
		}

		let currentDate = year + "-" + month + "-" + day;
		let question = await Question.find({ date: currentDate });
		console.log("question", question);
		console.log("오늘 날짜 :", currentDate);
		if (question.length < 3) {
			for (let i = 0; i < 3; i++) {
				const result = await Question.findOneAndUpdate(
					{ date: null },
					{
						date: currentDate,
					}
				);
				question = await Question.find({ date: currentDate });
				console.log("오늘의 질문 생성 :", result);
			}
		}
		return { question };
	},
	//해당 날짜 질문 3개 조회
	async getDateQuestion(date) {
		let question = await Question.find({ date: date });
		console.log("오늘의 질문 :", question);

		const questionLength = question.length;
		if (questionLength < 3) {
			console.log("이 날짜의 질문이 등록되지 않았습니다. 질문을 등록합니다.");
			for (let i = 0; i < 3 - questionLength; i++) {
				await Question.findOneAndUpdate(
					{ date: null },
					{
						date: date,
					}
				);
				question = await Question.find({ date: date });
			}
			console.log("등록후 오늘의 질문 :", question);
		}
		return question;
	},
	//질문 날짜 초기화
	async resetQuestionDate() {
		let question = await Question.find({ date: currentDate });
		console.log("question", question);
		for (let i = 0; i < question.length; i++) {
			const result = await Question.findOneAndUpdate({ date: null });
			console.log("오늘 날짜 :", currentDate);
			console.log("오늘 질문 날짜 초기화 :", result);
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
