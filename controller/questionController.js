const { questionService } = require("../services");

const questionController = {
	//질문 전체 조회
	async getAllQuestion(req, res) {
		try {
			const questionList = await questionService.getAllQuestion();
			res.status(200).json(questionList);
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 questionContrller에서 에러가 났습니다." });
		}
	},
	//오늘의 질문 5개 조회
	async getTodayQuestion(req, res) {
		try {
			const todayQuestions = await questionService.getTodayQuestion();
			res.status(200).json(todayQuestions);
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 questionContrller에서 에러가 났습니다." });
		}
	},
	//질문 생성
	async createQuestion(req, res) {
		try {
			const { content } = req.body;
			const result = await questionService.createQuestion(content);
			res
				.status(200)
				.json({ message: "질문이 생성되었습니다. ", result: result });
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 questionContrller에서 에러가 났습니다." });
		}
	},
	//질문 수정
	async updateQuestion(req, res) {
		try {
			const { questionId } = req.params;
			const { content } = req.body;
			const result = await questionService.updateQuestion(questionId, content);
			res.status(200).json({ message: "", result: result });
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 questionContrller에서 에러가 났습니다." });
		}
	},
	//질문 삭제
	async deleteQuestion(req, res) {
		try {
			const { questionId } = req.params;
			const result = await questionService.deleteQuestion(questionId);
			res.status(200).json({ message: "", result: result });
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 questionContrller에서 에러가 났습니다." });
		}
	},
};

module.exports = questionController;
