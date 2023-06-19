const { User, Answer,Comment } = require('../models');


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
  // 관리자 - 답변 신고 조회
  async adminGetComplaintAnswer() {
    const answers = await Answer.find({ reportCount: { $gte: 1 } });
    console.log(answers);
    return { message: '신고된 답변을 가져왔습니다.',answer:answers };
  },

  // 관리자 - 모든 댓글 조회
  async adminGetComment() {
    // const comments = await Comment.find().sort({ createdAt: 'desc' });
    const comments = await Comment.find().sort({ createdAt: -1 });
    console.log(comments);
    return { message: '댓글을 최신순으로 가져왔습니다.',comment:comments };
  },

  // 관리자 - 댓글 삭제
  async adminDeleteComment(commentId) {
    // 댓글을 삭제합니다.
     // commentId를 기반으로 댓글을 찾습니다.
    const comment = await Comment.findOneAndUpdate(
      { 'comment._id': commentId },
      { $pull: { comment: { _id: commentId } } },
      { new: true }
    );
    return comment;
  },



  // 관리자 - 댓글 신고 조회
  async adminGetComplaintComment() {
    // 댓글을 삭제합니다.
    // commentId를 기반으로 댓글을 찾습니다.
    // const comments = await Comment.find({
    //   'comment.reportCount': { $gte: 1 },
    // });
    const comments = await Comment.aggregate([
      { $unwind: '$comment' },
      { $match: { 'comment.reportCount': { $gte: 1 } } },
      {
        $group: {
          _id: '$_id',
          answerId: { $first: '$answerId' },
          comment: { $push: '$comment' },
          __v: { $first: '$__v' },
        },
      },
    ]);
    return comments;
  },

  // 관리자 - 답변 삭제
  async adminDeleteAnswer(answerId) {
    const deleteResult = await User.deleteOne({ answerId });
    console.log(deleteResult);
    return { message: '답변이 삭제 되었습니다.' };
  },
}
module.exports = AdminService;