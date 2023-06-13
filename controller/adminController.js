const { adminService } = require('../services');
const { Admin } = require('../models/index');

const adminController = {
//ADMIN 답변 삭제
async adminDeleteAnswer(req, res) {
  try {
    console.log('adminAnserDelete 실행');
    const { answerId } = req.body;
    const result = await adminService.adminDeleteAnswer(answerId);
    return res.status(200).send(result);
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
      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: '서버의 adminContrller에서 에러가 났습니다.' });
    }
  },
  //ADMIN 모든 댓글 조회
  async adminGetComment(req, res) {
    try {
      console.log('adminGetComment 실행');
      const result = await adminService.adminGetComment();
      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: '서버의 adminContrller에서 에러가 났습니다.' });
    }
  },
  async adminGetComplaintComment(req, res) {
    try {
      console.log('adminGetComplaintComment 실행');
      const result = await adminService.adminGetComplaintComment();
      return res.status(200).json(result);
    } catch (error) {
      console.error('댓글 조회 오류:', error);
      return res.status(500).json({ message: '신고 댓글 조회 중 오류가 발생했습니다.' });
    }
  },


  //댓글 삭제
  async adminDeleteComment(req, res) {
    try {
      console.log('adminDeleteComment 실행');
      const {commentId} =req.params;
      console.log(commentId);
      const result = await adminService.adminDeleteComment(commentId);
      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: '서버의 adminContrller에서 에러가 났습니다.' });
    }
  },


}

module.exports = adminController;
