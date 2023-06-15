const { mypageService } = require('../services');
const { Comment } = require('../models/index');


const mypageController = {
  // 친구 공개 게시글을 조회하는 컨트롤러 함수
	async getAnswers(req, res) {
		try {
			console.log("마이페이지에서 답변 요청! mypageController")
			const {nickName} = req.params; // 프론트에서 요청한 닉네임
			const {currentNickName} = req.user;// 현재 로그인 된 닉네임
      const myPage = await mypageService.getAnswers(currentNickName);
      const otherPage = await mypageService.getAnswers(nickName);
      const isMe = (nickName === currentNickName) ? myPage : otherPage;

			const answers = await answerService.getFriendAnswers(questionId); // 친구 공개 게시글을 서비스에서 조회합니다.

			res.json(answers); // 조회된 글을 JSON 형태로 응답합니다.
		} catch (error) {
			res.status(500).json({ error: error.message }); // 에러 발생 시 500 상태코드와 에러 메시지를 응답합니다.
		}
	},
};

module.exports = mypageController;
