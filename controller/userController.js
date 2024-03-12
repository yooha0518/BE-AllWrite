const { userService } = require("../services");
const { friendService } = require("../services");
const { setUserToken } = require("../utils/createjwt");
const { User, Friend } = require("../models/index");
const hashPassword = require("../utils/hash-password");
const generateRandomPassword = require("../utils/generateRandomPassword.js");
const sendMail = require("../utils/sendMail");
const { setAuthCodeToken } = require("../utils/setAuthcodeToken");

const userController = {
	async postUser(req, res, next) {
		try {
			console.log("회원가입(postUser) 시작");
			const { email, password, name, nickName } = req.body;
			let alreadyUser = await userService.getUserFromEmail(email);
			if (alreadyUser) {
				if (!alreadyUser.state) {
					return res.status(400).json({ message: "탈퇴한 계정입니다." });
				}
				return res
					.status(400)
					.json({ message: "계정이 이미 가입되어있습니다." });
			}
			alreadyUser = await userService.getUserFromNickName(nickName);
			if (alreadyUser) {
				return res.status(400).json({ message: "이미 사용중인 닉네임입니다." });
			}

			const user = await userService.createUser({
				email,
				password,
				name,
				nickName,
			});

			// //friend 테이블 만들기
			await friendService.createFriend(email);

			req.user = user;
			next();
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 userContrller에서 에러가 났습니다." });
		}
	},
	async getUser(req, res) {
		try {
			console.log("getUser 실행");
			const { email } = req.body;
			let user = "";

			//회원가입시, 이메일 본인인증
			if (email) {
				user = await userService.getUserFromEmail(email);
				if (user) {
					if (!user.state) {
						res.status(400).json({ message: "탈퇴한 계정입니다." });
					}
					return res
						.status(400)
						.json({ message: "해당 메일은 이미 가입되어 있습니다." });
				} else {
					//회원가입 성공 및 토큰 발급
					const authCode = generateRandomPassword();
					await sendMail(
						email,
						`All Write 인증번호`,
						"이메일 인증번호",
						`${authCode}`,
						7
					);
					console.log("토큰 만들기 실행");
					res.send({
						message: "인증번호가 전송되었습니다.",
						token: setAuthCodeToken(authCode),
					});
				}
			} else {
				//일반 정보 조회
				const { email } = req.user;
				console.log(`${email}의 정보를 조회합니다.`)
				user = await userService.getUser(email);
				return res.json(user);
			}
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 userContrller에서 에러가 났습니다." });
		}
	},
	async getOneUser(req, res) {
		try {
			const { nickName } = req.params;
			const user = await userService.SearchUser(nickName);
			if (!user) {
				return res.status(400).json({ message: "해당 유저가 없습니다." });
			}
			res.json(user);
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 userContrller에서 에러가 났습니다." });
		}
	},
	async putUser(req, res) {
		try {
			const { email } = req.user;
			const result = await userService.updateUser(email, req.body);
			res.status(200).json({
				message: "정보가 수정되었습니다.",
				result: result,
			});
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 userContrller에서 에러가 났습니다." });
		}
	},
	async putProfileImage(req, res) {
		try {
			const { email } = req.user;
			const profileImage = `https://allwrite.kro.kr/image/${req.file.filename}`;
			const result = await userService.updateProfileImage(email, profileImage);
			res.status(200).json({
				message: "이미지가 수정되었습니다.",
				result: result,
			});
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 userContrller에서 에러가 났습니다." });
		}
	},
	async adminPutProfileImage(req, res) {
		try {
			const { email } = req.params;
			const profileImage = `https://allwrite.kro.kr/image/defaultImage.png`;
			const result = await userService.updateProfileImage(email, profileImage);
			res.status(200).json({
				message: "이미지가 수정되었습니다.",
				result: result,
			});
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 userContrller에서 에러가 났습니다." });
		}
	},
	async addUserExp(req, res) {
		try {
			const { email } = req.user;
			const result = await userService.updateUserExp(email);
			res.status(200).json({
				message: "경험치가 올랐습니다.",
				result: result,
			});
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 userContrller에서 에러가 났습니다." });
		}
	},
	async deleteProfileImate(req, res) {
		try {
			console.log("프로필사진 수정 시작");
			const { email } = req.user;
			const profileImage = `https://allwrite.kro.kr/image/defaultImage.png`;
			const result = await userService.updateProfileImage(email, profileImage);
			res.status(200).json({
				message: "이미지가 삭제되었습니다.",
				result: result,
			});
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 userContrller에서 에러가 났습니다." });
		}
	},
	async resetPassword(req, res) {
		try {
			const { email } = req.body;
			const tempPassword = generateRandomPassword();
			const user = await userService.getUserFromEmail(email);

			if (user === null) {
				return res
					.status(400)
					.json({ message: "해당 메일로 가입된 사용자가 없습니다." });
			}

			await userService.updatePasswordFromEmail(email, tempPassword);
			await sendMail(
				email,
				"All Write 임시 비밀번호",
				"임시 비밀번호",
				`${tempPassword}`,
				7
			);

			res
				.status(200)
				.json({ message: `${email}으로 임시비밀번호를 전송했습니다.` });
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 userContrller에서 에러가 났습니다." });
		}
	},
	async putPassword(req, res) {
		try {
			const { email } = req.user;
			const { currentPassword, password } = req.body;
			const user = await userService.getUserpassword(email);

			if (user.password !== hashPassword(currentPassword)) {
				return res
					.status(400)
					.json({ message: "비밀번호가 일치하지 않습니다." });
			} else {
				await userService.updatePasswordFromEmail(email, password);

				res.status(200).json({ message: "비밀번호가 변경되었습니다." });
			}
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 userContrller에서 에러가 났습니다." });
		}
	},
	async deleteUser(req, res) {
		try {
			const email = req.user.email;
			const user = await userService.deleteUser(email);
			res.json(user);
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 userContrller에서 에러가 났습니다." });
		}
	},
	async authUser(req, res) {
		try {
			const { email, password } = req.body;
			const user = await userService.getUserFromEmail(email);
			const userPassword = await User.findOne({ email }, "password");

			if (user === null) {
				return res.status(400).json({ message: "계정이 존재하지 않습니다." });
			}
			if (!user.state) {
				return res.status(400).json({ message: "탈퇴한 계정입니다." });
			}
			if (userPassword.password !== hashPassword(password)) {
				return res.status(400).json({ message: "비밀번호가 틀렸습니다." });
			}

			res.status(200).json({
				message: "로그인 되었습니다.",
				token: setUserToken(user, 0),
			});
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 userContrller에서 에러가 났습니다." });
		}
	},
	async createAccessToken(req, res) {
		const { email } = req.user;

		const userForToken = await userService.getUserForToken(email);
		res.status(200).json({
			message: "토큰이 발급되었습니다.",
			token: setUserToken(userForToken, 1),
		});
	},
	async adminGetUserlist(req, res) {
		try {
			const page = Number(req.query.page || 1);
			const userlist = await userService.adminReadUser();
			res.json(userlist);
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 userContrller에서 에러가 났습니다." });
		}
	},
	async adminUpdateUser(req, res) {
		try {
			const { email } = req.params;

			const result = await userService.updateUser(email, req.body);
			res.status(200).json(result);
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 userContrller에서 에러가 났습니다." });
		}
	},
	async adminDeleteUser(req, res) {
		try {
			const { email } = req.params;
			const result = await userService.deleteUser(email);
			res.status(200).json({
				message: `${email}계정이 휴면처리 되었습니다.`,
				result: result,
			});
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 userContrller에서 에러가 났습니다." });
		}
	},
	async realDeleteUser(req, res) {
		try {
			const { email } = req.params;
			const deleteResult = await User.deleteOne({ email });
			const deleteFriend = await Friend.deleteOne({ email });
			console.log(deleteResult, deleteFriend);

			res.status(200).json({
				message: `${email}계정이 삭제 되었습니다.`,
			});
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 userContrller에서 에러가 났습니다." });
		}
	},
	async sendEmail(req, res) {
		try {
			console.log("adminsendEmail 실행");
			const { nickName } = req.body;
			const user = await userService.getUserFromNickName(nickName);
			await sendMail(
				user.email,
				`All Write 경고`,
				`${nickName}님이 작성하신 글이 신고접수 되었습니다. `,
				`신고 접수가 누적될경우, 예고없이 강제 탈퇴될 수 있습니다.`,
				4
			);
			res
				.status(200)
				.json({ message: `${user.email}으로 경고메일을 전송했습니다.` });
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 userContrller에서 에러가 났습니다." });
		}
	},
	//ADMIN 답변 삭제
	async adminDeleteAnswer(req, res) {
		try {
			console.log("adminAnserDelete 실행");
			const { answerId } = req.body;
			const result = await userService.adminDeleteAnswer(answerId);
			res.send(result);
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 adminContrller에서 에러가 났습니다." });
		}
	},
	//ADMIN 신고 답변 조회
	async adminGetComplaint(req, res) {
		try {
			console.log("adminGetComplaint 실행");
			const { answerId } = req.body;
			const result = await userService.adminDeleteAnswer(answerId);
			res.send(result);
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "서버의 adminContrller에서 에러가 났습니다." });
		}
	},
};

module.exports = userController;
