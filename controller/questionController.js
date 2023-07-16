const { questionService } = require("../services");
// const { OPENAI_API_KEY } = require("../.env");
const { Configuration, OpenAIApi } = require("openai");

//AI 질문 생성
async function createAIQuestion() {
	const api_key = process.env.OPENAI_API_KEY;
	const prompt = "재밌는 질문 한개";
	console.log("질문을 생성합니다 ");
	try {
		const configuration = new Configuration({
			apiKey: api_key,
		});
		const openai = new OpenAIApi(configuration);

		const completion = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: prompt,
			temperature: 0.9,
			n: 3, // 생성할 질문 수
			max_tokens: 100, // 생성할 최대 토큰 수
		});
		const question = completion.data.choices.map((question) =>
			question.text.trim()
		);

		for (let i = 0; i < 3; i++) {
			await questionService.createQuestion(question[i]);
		}
		return { question: question };
	} catch (error) {
		console.error("Failed to generate questions:", error);
		return "Failed to generate questions";
	}
}

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
	//오늘의 질문 3개 조회
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
	//해당 질문 3개 조회
	async getDateQuestion(req, res) {
		try {
			const { date } = req.params;
			const dateQuestions = await questionService.getDateQuestion(date);
			if (dateQuestions.length < 3) {
				console.log("등록할 질문이 없습니다 ai로 생성합니다.");
				await createAIQuestion();
				console.log("질문을 생성했습니다 등록을 시작합니다.");
				const result = await questionService.getDateQuestion(date);
				res.status(200).json(result);
			} else {
				res.status(200).json(dateQuestions);
			}
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 questionContrller에서 에러가 났습니다." });
		}
	},
	//질문 날짜 초기화
	async resetQuestion(req, res) {
		try {
			const reset = await questionService.resetQuestionDate();
			res.status(200).json(reset);
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
