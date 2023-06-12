const { adminService } = require('../services');
const { Admin } = require('../models/index');

const adminController = {
//ADMIN 답변 삭제
async adminDeleteAnswer(req, res) {
  try {
    console.log('adminAnserDelete 실행');
    const { answerId } = req.body;
    const result = await adminService.adminDeleteAnswer(answerId);
    res.send(result);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: '서버의 adminContrller에서 에러가 났습니다.' });
  }
},
  //ADMIN 신고 답변 조회
  async adminGetComplaint(req, res) {
    try {
      console.log('adminGetComplaint 실행');
      const { answerId } = req.body;
      const result = await adminService.adminGetComplaintAnswer();
      res.send(result);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: '서버의 adminContrller에서 에러가 났습니다.' });
    }
  },

}

module.exports = adminController;
