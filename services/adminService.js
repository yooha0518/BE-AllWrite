const { User } = require('../models');


const AdminService = {
  //관리자 - 사용자 전체 정보 조회
async adminReadUser(page) {
  const total = await User.countDocuments({});
  const userlist = await User.find({ isAdmin: false })
    .sort({ name: 1 })
    .skip(7 * (page - 1))
    .limit(7);
  return [userlist, { total: total }];
},
// 관리자 - 답변 삭제
async adminDeleteAnswer(answerId) {
  const deleteResult = await User.deleteOne({ answerId });
  console.log(deleteResult);
  return { message: '답변이 삭제 되었습니다.' };
},
}
module.exports = AdminService;