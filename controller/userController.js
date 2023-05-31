const { userService } = require('../services');
const { setUserToken } = require('../utils/createjwt');
const { User } = require('../models/index');
const hashPassword = require('../utils/hash-password');
const generateRandomPassword = require('../utils/generateRandomPassword.js');
const sendMail = require('../utils/sendMail');
const { setAuthCodeToken } = require('../utils/setAuthcodeToken');

const userController = {
	async postUser(req, res, next) {
		try {
			console.log('회원가입(postUser) 시작');
			const { email, password, name, nickName } = req.body;
			let alreadyUser = await userService.getUserFromEmail(email);
			if (alreadyUser) {
				if (!alreadyUser.state) {
					return res.status(400).json({ message: '탈퇴한 계정입니다.' });
				}
				return res
					.status(400)
					.json({ message: '계정이 이미 가입되어있습니다.' });
			}
			alreadyUser = await userService.getUserFromEmail(nickName);
			if (alreadyUser) {
				return res.status(400).json({ message: '이미 사용중인 닉네임입니다.' });
			}

			const user = await userService.createUser({
				email,
				password,
				name,
				nickName,
			});
			req.user = user;
			next();
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 userContrller에서 에러가 났습니다.' });
		}
	},
	async getUser(req, res) {
		try {
			console.log('getUser 실행');
			const { email } = req.body;
			let user = '';

			//회원가입시, 이메일 본인인증
			if (email) {
				user = await userService.getUserFromEmail(email);
				if (user) {
					if (!user.state) {
						res.status(400).json({ message: '탈퇴한 계정입니다.' });
					}
					return res
						.status(400)
						.json({ message: '해당 메일은 이미 가입되어 있습니다.' });
				} else {
					//회원가입 성공 및 토큰 발급
					const authCode = generateRandomPassword();
					await sendMail(
						email,
						`All Write 인증번호`,
						'All Write 임시 비밀번호',
						`${authCode}`,
						7
					);
					console.log('토큰 만들기 실행');
					res.send(setAuthCodeToken(authCode));
				}
			} else {
				//일반 정보 조회
				const { email } = req.user;
				user = await userService.getUser(email);

				//답변 불러오는 api 사용추가해야함!
				// const answer = answerService.getTwoAnswer(nickName);
				//const result = {user, ...answer}

				return res.json(user);
			}
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 userContrller에서 에러가 났습니다.' });
		}
	},
	async putUser(req, res) {
		try {
			const { email } = req.user;
			const { name, nickName, intro, mbti, job, state } = req.body;
			const result = await userService.updateUser(email, {
				name,
				nickName,
				intro,
				mbti,
				job,
				state,
			});
			res.status(200).json(result);
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 userContrller에서 에러가 났습니다.' });
		}
	},
	async putProfileImage(req, res) {
		try {
			console.log('프로필사진 수정 시작');
			const { email } = req.user;
			const profileImage = `http://localhost:5000/${req.file.filename}`;
			const result = await userService.updateProfileImage(email, profileImage);
			res.send(result);
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 userContrller에서 에러가 났습니다.' });
		}
	},
	async deleteProfileImate(req, res) {
		try {
			const { email } = req.user;
			const profileImage = `http://localhost:5000/defaultImage.png`;
			const result = await userService.updateProfileImage(email, profileImage);
			res.send(result);
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 userContrller에서 에러가 났습니다.' });
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
					.json({ message: '해당 메일로 가입된 사용자가 없습니다.' });
			}

			await userService.updatePasswordFromEmail(email, tempPassword);
			await sendMail(
				email,
				'All Write 임시 비밀번호',
				`${tempPassword}`,
				`로그인후 비밀번호를 변경해 주세요.`,
				7
			);

			res
				.status(200)
				.json({ message: `${email}으로 임시비밀번호를 전송했습니다.` });
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 userContrller에서 에러가 났습니다.' });
		}
	},
	async putPassword(req, res) {
		try {
			const { email } = req.user;
			const { currentPassword, password } = req.body;
			const user = await userService.getUserpassword(email);

			console.log('user', user);
			console.log('currentPassword', currentPassword);
			console.log('currentPassword', hashPassword(currentPassword));
			if (user.password !== hashPassword(currentPassword)) {
				return res
					.status(400)
					.json({ message: '비밀번호가 일치하지 않습니다.' });
			} else {
				await userService.updatePasswordFromEmail(email, password);

				res.status(200).json({ message: '비밀번호가 변경되었습니다.' });
			}
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 userContrller에서 에러가 났습니다.' });
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
				.json({ message: '서버의 userContrller에서 에러가 났습니다.' });
		}
	},
	async realDeleteUser(req, res) {
		try {
			const email = req.params.email;
			const user = await userService.realDeleteUser(nickName);
			res.json(user);
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 userContrller에서 에러가 났습니다.' });
		}
	},
	async authUser(req, res) {
		try {
			const { email, password } = req.body;
			const user = await userService.getUserFromEmail(email);
			const userPassword = await User.findOne({ email }, 'password');

			if (user === null) {
				return res.status(400).json({ message: '계정이 존재하지 않습니다.' });
			}
			if (!user.state) {
				return res.status(400).json({ message: '탈퇴한 계정입니다.' });
			}
			if (userPassword.password !== hashPassword(password)) {
				return res.status(400).json({ message: '비밀번호가 틀렸습니다.' });
			}

			console.log('authUser-> user: ', user);
			res.send(setUserToken(user, 0));
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 userContrller에서 에러가 났습니다.' });
		}
	},
	async createAccessToken(req, res) {
		const { email } = req.user;

		const userForToken = await userService.getUserForToken(email);
		res.send(setUserToken(userForToken, 1));
	},
	async getOneUser(req, res) {
		try {
			const { email } = req.params;
			const user = await userService.adminReadSearchUser(email);
			if (!user) {
				return res.status(400).json({ message: '해당 유저가 없습니다.' });
			}
			res.json(user);
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 userContrller에서 에러가 났습니다.' });
		}
	},
	async adminGetUserlist(req, res) {
		try {
			const page = Number(req.query.page || 1);
			const userlist = await userService.adminReadUser(page);
			res.json(userlist);
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 userContrller에서 에러가 났습니다.' });
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
				.json({ message: '서버의 userContrller에서 에러가 났습니다.' });
		}
	},
	async adminDeleteUser(req, res) {
		try {
			const { email } = req.params;
			const result = await userService.deleteUser(email);
			res.send(result);
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 userContrller에서 에러가 났습니다.' });
		}
	},
	async adminsendEmail(req, res) {
		try {
			const { email } = req.body;
			const user = await userService.getUserNickname(email);
			await sendMail(
				email,
				`All Write 경고`,
				`${user.nickName}님이 작성하신 글이 신고접수 되었습니다. `,
				`신고 접수가 누적될경우, 예고없이 강제 탈퇴될 수 있습니다.`,
				4
			);
			res
				.status(200)
				.json({ message: `${email}으로 경고메일을 전송했습니다.` });
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 userContrller에서 에러가 났습니다.' });
		}
	},
};

module.exports = userController;
