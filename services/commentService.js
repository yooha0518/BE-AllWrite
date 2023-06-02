const { Comment, Answer } = require('../models');


const CommentService = {
	// 댓글 생성
	async createComment(answerId,{  content, reportCount, createdAt }) {
		const createComment = await Comment.create(answerId, [{ content, reportCount, createdAt }]);
    const answer = await Answer.findById(answerId);
    // answer.comment.push(createComment._id);
    // await answer.save();
    
    return {
      answer,
      createComment,
    };
	},
	// 댓글 조회
	async getComment(commentId) {
		const comment = await Comment.findOne( {_id: commentId} );
		return comment;
	},
  // 전체 댓글 조회
	async getCommentAll() {
    const comment = await Comment.find();
    return comment;
	},
  //commentId를 사용해 댓글 수정
  async updateComment(commentId, updateData) {
    const option = { new: true };

    const updateComment = await Comment.findByIdAndUpdate(
			{_id: commentId}, updateData, option);
    return updateComment;
  },
	// 댓글 삭제
	async deleteComment(commentId) {
		const deleteResult = await Comment.deleteOne({_id: commentId});
		console.log(deleteResult);
		return {message: '질문이 삭제 되었습니다.', Comment:deleteResult };
	},
};

module.exports = CommentService;
