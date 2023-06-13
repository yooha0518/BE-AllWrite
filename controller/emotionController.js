const { emotionService } = require("../services");

const emotionController = {
	//감정 전체 조회
	async getAllemotion(req, res) {
		try {
			const { email } = req.user;
			console.log(email);
			const emotionList = await emotionService.getAllEmotion(email);
			res.status(200).json(emotionList);
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 emotionContrller에서 에러가 났습니다." });
		}
	},
	//감정 생성
	async createEmotion(req, res) {
		try {
			const { email } = req.user;
			const { emotion } = req.body;
			console.log("생성: ", email);
			const result = await emotionService.createEmotion(email, emotion);
			res.status(200).json({ message: "생성결과:", result: result });
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 emotionContrller에서 에러가 났습니다." });
		}
	},
	//감정 수정
	async updateEmotion(req, res) {
		try {
			const { email } = req.user;
			const { emotion } = req.body;
			const result = await emotionService.updateEmotion(email, emotion);
			res.status(200).json({ message: "수정 결과:", result: result });
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 emotionContrller에서 에러가 났습니다." });
		}
	},
	//감정 삭제
	async deleteEmotion(req, res) {
		try {
			const { email } = req.user;
			const result = await emotionService.deleteEmotion(email);
			res.status(200).json({ message: "", result: result });
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 emotionContrller에서 에러가 났습니다." });
		}
	},
};

module.exports = emotionController;
