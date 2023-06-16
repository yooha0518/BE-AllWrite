const {
	answerService,
	userService,
	friendService,
	questionService,
} = require("../services");
const { Answer, User } = require("../models/index");

const AnswerController = {
	//답변 생성
	async createAnswer(req, res, next) {
		try {
			console.log("답변 만들기!");
			const { nickName } = req.user;
			const { questionId } = req.params;
			const { content, stateCode } = req.body;
			const reportCount = 0;

			// const userId = req.currentUserId;
			const createdAt = new Date();
			if (!content) {
				throw new Error("내용을 작성해주세요.");
			}
			const profileImage = await answerService.getProfileImage(nickName);
			console.log(nickName, profileImage);
			const answer = await answerService.createAnswer({
				nickName,
				questionId,
				content,
				reportCount,
				stateCode,
				createdAt,
				profileImage,
			});
			// res
			//   .status(201)
			//   .json({ message: "답변이 작성되었습니다.", answer: answer });
			next();
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 answerContrller에서 에러가 났습니다." });
		}
	},

	//answer post api test
	// async createAnswer(req, res, next) {
	// 	try {
	// 		console.log('답변 생성!');
	//     const { nickName } = req.user;
	//     const { content } = req.body;
	// 		console.log(nickName, content);
	//     const savedAnswer = await answerService.createAnswer( nickName, content);
	//     res.status(201).json(savedAnswer);
	// 	} catch (error) {
	// 		console.log(error);
	// 		return res
	// 			.status(500)
	// 			.json({ message: '서버의 answerContrller에서 에러가 났습니다.' });
	// 	}
	// },

	async getDetailAnswers(req, res) {
		try {
			const { questionId, answerId } = req.params;
			console.log("questionId로 답변 조회");
			console.log("questionId = ", questionId);
			console.log("answerId = ", answerId);
			const { nickName } = req.user;
			// db에서 모든 게시글 조회
			const result = await answerService.getDetailAnswers(
				questionId,
				answerId,
				nickName
			);
			res.status(200).json(result);
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 answerContrller에서 에러가 났습니다." });
		}
	},

	async getAnswersByQuestionId(req, res) {
		try {
			console.log("getAnswersByQuestionId 실행!");
			const { questionId } = req.params;
			const { nickName } = req.user;
			console.log("questionId로 답변 조회");
			console.log(questionId);

			// db에서 모든 게시글 조회
			const result = await answerService.getAnswersByQuestionId(questionId);
			const img = await answerService.getProfileImage(nickName);
			console.log("img", img);
			function checkIfContainsName(arr, nickName) {
				return arr.some(isWrite);
			}
			function isWrite(result) {
				if (result.nickName === nickName) {
					return true;
				}
				return false;
			}
			const isWriteAnswer = checkIfContainsName(result, nickName);
			console.log(isWriteAnswer);
			res.status(200).json({ isWriteAnswer, result });
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 answerContrller에서 에러가 났습니다." });
		}
	},
	//전체 답변 조회
	async getAnswerAll(req, res) {
		try {
			console.log("모든 답변 조회");
			// db에서 모든 게시글 조회

			const { questionId } = req.params;
			const { nickName } = req.user;

			const result = await answerService.getAnswersByQuestionIdAll(questionId);

			res.status(200).json(result);
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 answerContrller에서 에러가 났습니다." });
		}
	},

	// 전체 공개 글 조회
	async getPublicAnswers(req, res) {
		try {
			const { questionId } = req.params;
			const { nickName } = req.user;
			const { page } = req.query;
			const limit = 12;
			const skip = (page - 1) * limit;
			const state = 1;
			if (!page) {
				page = 1;
			}
			const answers = await answerService.getPublicAnswers(
				questionId,
				skip,
				limit
			); // 전체 공개 게시글을 서비스에서 조회합니다.
			const getPrivateAnswer = await answerService.getFriendAnswers(questionId); // 친구 공개 게시글을 서비스에서 조회합니다.
			const answerCount = answers.length;
			console.log("전체 공개 게시글 갯수 : ", answerCount);
			const isWriteAnswer = checkIfMyNicknameExists(
				answers,
				getPrivateAnswer,
				nickName
			);

			res.json({ isWriteAnswer, answers, answerCount }); // 조회된 글을 JSON 형태로 응답합니다.
		} catch (error) {
			res.status(500).json({ error: error.message }); // 에러 발생 시 500 상태코드와 에러 메시지를 응답합니다.
		}
	},
	//해당 유저의 답변 전체 조회
	async getAnswersFromNickName(req, res) {
		try {
			const { email } = req.user;
			const { nickName } = req.params;

			let answers;

			//나(email)
			const user = await userService.getUserFromEmail(email);

			//해당 유저(nickName)
			const other = await userService.getUserFromNickName(nickName);

			if (user.nickName === other.nickName) {
				// 내 답변 전체 가져오기
				console.log("자신의 답변은 모두 확인할 수 있습니다!");
				const answers = await answerService.getAllAnswerFromNickName(nickName);
				let content = [];
				for (let i = 0; i < answers.length; i++) {
					try {
						content[i] = await questionService.getQuestionfromID(
							answers[i].questionId.toString()
						);
					} catch (err) {
						console.log(err);
					}
					if (content[i]) {
						answers[i] = {
							question: content[i],
							questionId: answers[i].questionId,
							_id: answers[i]._id,
						};
						console.log(`content[${i}]:`, content[i]);
					}
				}
				return res.json(answers);
			}

			//해당 유저와 나의 관계 조회
			const friendRelation = await friendService.getRelationFriend(
				email,
				nickName
			);
			console.log("해당 유저와 나의 관계: ", friendRelation.isFriend);
			if (friendRelation.isFriend === true) {
				//해당 유저의 모든 답변 가져오기
				console.log("해당 유저의 모든 답변 가져오기!");
				const answers = await answerService.getAllAnswerFromNickName(
					other.nickName
				);
				let content = [];
				for (let i = 0; i < answers.length; i++) {
					try {
						content[i] = await questionService.getQuestionfromID(
							answers[i].questionId.toString()
						);
					} catch (err) {
						console.log(err);
					}
					if (content[i]) {
						answers[i] = {
							question: content[i],
							questionId: answers[i].questionId,
							_id: answers[i]._id,
						};
						console.log(`content[${i}]:`, content[i]);
					}
				}
				return res.json(answers);
			} else {
				//해당 유저의 전체공개답변 가져오기
				console.log("해당 유저의 전체공개답변만! 가져오기");
				const answers = await answerService.getAnyoneAnswerFromNickName(
					nickName
				);
				let content = [];
				for (let i = 0; i < answers.length; i++) {
					try {
						content[i] = await questionService.getQuestionfromID(
							answers[i].questionId.toString()
						);
					} catch (err) {
						console.log(err);
					}
					if (content[i]) {
						answers[i] = {
							question: content[i],
							questionId: answers[i].questionId,
							_id: answers[i]._id,
						};
						console.log(`content[${i}]:`, content[i]);
					}
				}
				return res.json(answers);
			}
		} catch (error) {
			res.status(500).json({ error: error.message }); // 에러 발생 시 500 상태코드와 에러 메시지를 응답합니다.
		}
	},
	// 날짜, 닉네임에 맞는 글 조회
	async getAnswersFromQuestionAndNickName(req, res) {
		try {
			const { email } = req.user;
			const { questionId, nickName } = req.params;

			const answer = await answerService.getAnswerFormQuestionAndNickaname(
				questionId,
				nickName,
				email
			);

			res.json(answer);
		} catch (error) {
			res.status(500).json({ error: error.message }); // 에러 발생 시 500 상태코드와 에러 메시지를 응답합니다.
		}
	},

	// 친구 공개 게시글을 조회하는 컨트롤러 함수
	async getFriendAnswers(req, res) {
		try {
			console.log("친구공개글");
			const { questionId } = req.params;
			const { nickName, email } = req.user;
			const { page } = req.query;
			const limit = 12;
			const skip = (page - 1) * limit;
			const state = 0;
			if (!page) {
				page = 1;
			}
			console.log("questionId : ", questionId);
			console.log("nickName : ", nickName);

			// const answers = await answerService.getFriendsFriendPublicAnswers(nickName);
			const answers = await answerService.getFriendOfFriendAnswers(
				questionId,
				nickName,
				email,
				limit,
				skip
			); // 내 친구들의 친구 공개 글 가져옴

			const getPublicAnswer = await answerService.getPublicAnswers(questionId); // 전체 공개 게시글을 서비스에서 조회합니다.
			const getPrivateanswers = await answerService.getFriendAnswers(
				questionId
			); // 친구 공개 게시글을 서비스에서 조회합니다.
			const answerCount = answers.length;
			console.log("친구 공개 게시글 갯수 : ", answerCount);
			const isWriteAnswer = checkIfMyNicknameExists(
				getPublicAnswer,
				getPrivateanswers,
				nickName
			);

			res.json({ isWriteAnswer, answers, answerCount }); // 조회된 글을 JSON 형태로 응답합니다.
		} catch (error) {
			res.status(500).json({ error: "answerController에서 에러났음" }); // 에러 발생 시 500 상태코드와 에러 메시지를 응답합니다.
		}
	},

	async putAnswer(req, res) {
		try {
			console.log("검색 답변 수정");
			const answerId = req.params.answerId;
			// req에서 userId랑 내용 가져옴
			const { content } = req.body;

			const answer = await answerService.getAnswer(answerId);

			if (!answer) {
				throw new Error("답변을 찾을 수 없습니다.");
			}
			// 해당 id의 게시글에서 내용 수정하고 수정된 게시글 반환 (new: true)
			const updatedAnswer = await answerService.updateAnswer(
				answerId,
				{
					content,
				},
				{ new: true }
			);
			res.status(200).json(updatedAnswer);
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 answerContrller에서 에러가 났습니다." });
		}
	},

	async reportAnswer(req, res) {
		try {
			const answerId = req.params.answerId;
			// 답변 조회
			const answer = await answerService.reportAnswer(answerId);
			res
				.status(200)
				.json({ message: "답변이 신고되었습니다.", answer: answer });
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "서버 에러" });
		}
	},

	// 답변 삭제
	async deleteAnswer(req, res) {
		try {
			console.log("검색 답변 삭제");
			// req.params에서 게시글id 가져옴
			const answerId = req.params.answerId;

			// 해당 id의 게시글 db에서 삭제
			const deletedAnswer = await answerService.deleteAnswer(answerId);

			// 삭제
			res.send(deletedAnswer);
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 answerContrller에서 에러가 났습니다." });
		}
	},
};
// 전체 공개 답변과 친구 공개 답변 중에서 나의 닉네임이 있는지 확인하는 함수
function checkIfMyNicknameExists(publicAnswers, friendAnswers, myNickname) {
	const hasPublicAnswer = publicAnswers.some(
		(answer) => answer.nickName === myNickname
	);
	const hasFriendAnswer = friendAnswers.some(
		(answer) => answer.nickName === myNickname
	);

	return (
		hasPublicAnswer || hasFriendAnswer || (hasPublicAnswer && hasFriendAnswer)
	);
}

module.exports = AnswerController;
