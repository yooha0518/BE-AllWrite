const { emotionService } = require("../services");

const emotionController = {
	//감정 전체 조회
	async getAllEmotion(req, res) {
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
	//해당 날짜 감정 조회
	async getDateEmotion(req, res) {
		try {
			const { email } = req.user;
			const { date } = req.params;
			console.log(email);
			const emotion = await emotionService.getUserEmotion(email, date);
			res.status(200).json(emotion);
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 emotionContrller에서 에러가 났습니다." });
		}
	},
	//감정 생성
	async postEmotion(req, res) {
		try {
			const { email } = req.user;
			const { emotion } = req.body;
			const { date } = req.params;

			const userEmotion = await emotionService.getUserEmotion(email, date);
			if (userEmotion) {
				console.log("userEmotion이 있습니다 :", userEmotion);
				const createTodayEmotion = await emotionService.updateEmotion(
					email,
					emotion,
					date
				);
				res.status(200).json({
					message: "업데이트 되었습니다.",
					result: createTodayEmotion,
				});
			} else {
				const result = await emotionService.createEmotion(email, emotion, date);
				res.status(200).json({ message: "생성되었습니다. :", result: result });
			}
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
			const { date } = req.params;
			const result = await emotionService.deleteEmotion(email, date);
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
