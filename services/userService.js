const { User } = require('../models');
const hashPassword = require('../utils/hash-password');

const userService = {
	// 사용자 생성 (회원가입)
	async createUser({ email, password, name, nickName }) {
		const hashedPassword = hashPassword(password); // 비밀번호 해쉬값 만들기
		const createdUser = await User.create({
			email,
			password: hashedPassword,
			name,
			nickName,
		});
		return createdUser;
	},
	// 사용자 정보 조회
	async getUser(email) {
		const user = await User.findOne({ email });
		return user;
	},
	async getUserpassword(shortId) {
		const user = await User.findOne({ shortId }, 'password');
		return user;
	},
	async getUserFromEmail(email) {
		const user = await User.findOne({ email });
		return user;
	},
	async getUserForToken(shortId) {
		const user = await User.findOne(
			{ shortId },
			{
				nickName: 1,
				name: 1,
				email: 1,
				profileImage: 1,
				isAdmin: 1,
				isTempPassword: 1,
			}
		);
		return user;
	},
	async getUserRefreshToken(shortId) {
		const user = await User.findOne({ shortId }, 'refreshToken');
		return user;
	},
	// 사용자 정보 수정
	async updateUser(shortId, { name, nickName, intro,mbti,job,state }) {
		//성공여부, 조건에 맞는 문서의 수, 새로 생성된 문서의 수, 새로 생성된 문서의 id값이 들어있음
		const result = await User.updateOne(
			{ shortId },
			{
				name,
				nickName,
				intro,
				mbti,
				job,
				state
			}
		);
		if (result.modifiedCount === 0) {
			console.log('변경사항이 없습니다.');
		}
		console.log(result);
		return {
			message: `요청: ${result.acknowledged}, 요청된 문서의 수: ${result.modifiedCount}`,
		};
	},
	async updateProfileImage(email, profileImage) {
		const result = await User.updateOne(
			{ email },
			{
				profileImage,
			}
		);
		return {
			message: `요청: ${result.acknowledged}, 요청된 문서의 수: ${result.modifiedCount}`,
		};
	},
	async updatePasswordFromEmail(email, tempPassword) {
		const result = await User.updateOne(
			{ email },
			{
				password: hashPassword(tempPassword),
				isTempPassword: true,
			}
		);
		return {
			message: `요청: ${result.acknowledged}, 요청된 문서의 수: ${result.modifiedCount}`,
		};
	},
	async updatePasswordFromShortId(shortId, password) {
		const result = await User.updateOne(
			{ shortId },
			{
				password: hashPassword(password),
				isTempPassword: false,
			}
		);
		return {
			message: `요청: ${result.acknowledged}, 요청된 문서의 수: ${result.modifiedCount}`,
		};
	},
	// 사용자 삭제 (회원탈퇴)
	async deleteUser(shortId) {
		await User.updateOne({ shortId }, { $set: { state: false } });
		return { message: '계정이 탈퇴 되었습니다.' };
	},
	async realDeleteUser(shortId) {
		const deleteResult = await User.deleteOne({ shortId });
		console.log(deleteResult);
		return { message: '계정이 영구삭제 되었습니다.' };
	},

	//관리자 - 사용자 검색
	async adminReadSearchUser(name) {
		const userlist = await User.find({ name });
		return userlist;
	},
	//관리자 - 사용자 전체 정보 조회
	async adminReadUser(page) {
		const total = await User.countDocuments({});
		const userlist = await User.find({ isAdmin: false })
			.sort({ name: 1 })
			.skip(7 * (page - 1))
			.limit(7);
		return [userlist, { total: total }];
	},
};

module.exports = userService;
