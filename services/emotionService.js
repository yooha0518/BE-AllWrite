const { Emotion } = require("../models");

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

const emotionService = {
	//감정 전체 조회
	async getAllEmotion(email) {
		const allEmotion = await Emotion.find({ email });
		return allEmotion;
	},
	//감정 전체 조회
	async getTodayUserEmotion(email) {
		const allEmotion = await Emotion.find({ email, date: currentDate });
		return allEmotion;
	},
	//감정 생성
	async createEmotion(email, emotion, date) {
		const createResult = await Emotion.create({ email, emotion, date });
		return createResult;
	},
	//감정 수정
	async updateEmotion(email, emotion) {
		console.log("currentDate:", currentDate);
		const updateResult = await Emotion.updateOne(
			{ email, date: currentDate },
			{
				emotion,
			}
		);
		return updateResult;
	},
	//감정 삭제
	async deleteEmotion(email) {
		const deleteResult = await Emotion.deleteOne({ email, date: currentDate });
		return deleteResult;
	},
};

module.exports = emotionService;
