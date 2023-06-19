const { mypageService } = require('../services');
const { Comment } = require('../models/index');


const mypageController = {
  // 친구 공개 게시글을 조회하는 컨트롤러 함수
	async getAnswers(req, res) {
		try {
			console.log("마이페이지에서 답변 요청! mypageController")
			const {nickName} = req.params; // 프론트에서 요청한 닉네임
			// const {nickName} = req.user;// 현재 로그인 된 닉네임
      console.log(nickName, req.user.nickName);
      const myAnswer = await mypageService.getAnswers(req.user.nickName);
      const otherAnswer = await mypageService.getOhterAnswers(nickName);
      const isMe = (nickName === req.user.nickName) ? myAnswer : otherAnswer;
      console.log(nickName === req.user.nickName);

			res.json(isMe); // 조회된 글을 JSON 형태로 응답합니다.
		} catch (error) {
			res.status(500).json({ message: "mypageController에서 오류났습니다." }); // 에러 발생 시 500 상태코드와 에러 메시지를 응답합니다.
		}
	},
};

module.exports = mypageController;
