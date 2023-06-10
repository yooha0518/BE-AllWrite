const { Answer } = require('../models');


const AnswerService = {
	// 답변 생성
	// async createAnswer(nickName,{  content,reportCount,stateCode,  createdAt }) {
	// 	const createdAnswer = await Answer.create(,{ content,reportCount,stateCode,  createdAt });
	// 	return createdAnswer;
	// },
	async createAnswer( { nickName,questionId, content,reportCount,stateCode,  createdAt }) {
    const newAnswer = new Answer({
			questionId,
        nickName,
        content,
				stateCode,
        createdAt: new Date(),
        updatedAt: new Date(),
        reportCount: 0,
    });

    const savedAsnwer = await newAnswer.save();
    return savedAsnwer;
	},

	async getAnswersByQuestionId  (questionId) {
		try {
			const answers = await Answer.find({ questionId,stateCode: true });
			console.log(`질문 ID(${questionId})에 대한 전체 공개 답변을 가져왔습니다.`);
			return answers;
		} catch (error) {
			console.error('답변 가져오기 중 오류 발생:', error);
			throw error;
		}
	},

	async getAnswersByQuestionIdAll  (questionId) {
		try {
			const answers = await Answer.find({ questionId});
			console.log(`질문 ID(${questionId})에 대한 모든 답변을 가져왔습니다.`);
			return answers;
		} catch (error) {
			console.error('답변 가져오기 중 오류 발생:', error);
			throw error;
		}
	},


	// 친구 공개 게시글을 조회하는 함수
	async  getFriendAnswers(questionId) {
			// const answers = await Answer.find({ stateCode: false })
			const answers = await Answer.find({ questionId, stateCode: false });
			console.log(`질문 ID(${questionId})에 대한 친구공개 답변을 가져왔습니다.`);
			return answers;


			// .populate('nickName'); // stateCode가 false인 글을 조회하고, 작성자 정보를 가져옵니다.
			return answers;
},

  //answerId를 사용해 답변 수정
  async updateAnswer(answerId, updateData) {
    const option = { new: true };

    const updateAnswer = await Answer.updateOne(
			{_id: answerId}, updateData, option);
    return {message: '답변이 수정 되었습니다.', answer:updateAnswer };
  },
	// 답변 삭제
	async deleteAnswer(answerId) {
		const deleteResult = await Answer.deleteOne({_id: answerId});
		console.log(deleteResult);
		return {message: '답변이 삭제 되었습니다.', answer:deleteResult };
	},
};

module.exports = AnswerService;
