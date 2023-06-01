const { answerService } = require('../services');
const { Answer } = require('../models/index');


const AnswerController = {
  //답변 생성
	async createAnswer(req, res, next) {
		try {
			console.log('답변 만들기!');
			const { content } = req.body;
			const userId = req.currentUserId;
			const createdAt = new Date();
			if(!content){
				throw new Error("내용을 작성해주세요.");
			}
			const answer = await answerService.createAnswer({	content, userId, createdAt });
			res
        .status(201)
        .json({ message: "답변이 작성되었습니다.", answer: answer });
		} catch (error) {
			console.log(error);
			next(error)
			return res
				.status(500)
				.json({ message: '서버의 answerContrller에서 에러가 났습니다.' });
		}
	},
  //전체 답변 조회
	async getAnswerAll(req, res) {
		try {
      // db에서 모든 게시글 조회
      const result = await Answer.getAnswerAll();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
	},

	//답변 조회
	async getAnswer(req, res) {
		try {
      // req.parmas에서 답변id 가져옴
      const answerId = req.params.answerId;

      // db에서 해당 id의 답변 조회
      const answer = await postModel.getAnswer(answerId);

      // 해당 답변이 없을 경우 에러 메세지
      if (!answer) {
        throw new Error("답변을 찾을 수 없습니다.");
      }
      res.status(200).json(answer);
    } catch (error) {
      next(error);
    }
	},
	async putAnswer(req, res) {
		try {
			const answerId = req.params.answerId;
      // req에서 userId랑 내용 가져옴
      const { content } = req.body;
      const userId = req.currentUserId;

      const answer = await Answer.getAnswer(answerId);

			if (!answer) {
        throw new Error("답변을 찾을 수 없습니다.");
      }

      if (answer.userId.toString() !== userId) {
        throw new Error("답변을 수정할 권한이 없습니다.");
      }
			// 해당 id의 게시글에서 내용 수정하고 수정된 게시글 반환 (new: true)
			const updatedAnswer = await Answer.updateAnswer(
				answerId,
				{
					content,
				},
				{ new: true }
			);
			res.status(200).json({ message: "답변이 수정되었습니다.", answer: updatedAnswer });
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 answerContrller에서 에러가 났습니다.' });
		}
	},
	// 답변 삭제
	async deleteAnswer(req, res) {
		try {
		// req.params에서 게시글id 가져옴
		const answerId = req.params.answerId;
		const userId = req.currentUserId;

		const answer = await Answer.getAnswer(answerId);

		if (!answer) {
			throw new Error("답변을 찾을 수 없습니다.");
		}

		if (answer.userId.toString() !== userId) {
			throw new Error("답변을 삭제할 권한이 없습니다.");
		}

		// 해당 id의 게시글 db에서 삭제
		const deletedAnswer = await Answer.deleteAnswer(answerId);

		// 삭제
		res.send(deletedAnswer);			
		}	catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 answerContrller에서 에러가 났습니다.' });
		}
	},
};

module.exports = AnswerController;
