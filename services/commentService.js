const { Comment, Answer } = require('../models');


const CommentService = {
	// 댓글 생성
	async createComment(answerId, nickName,profileImage, content) {
    const newComment = await Comment.create({
      answerId,
      comment: {
        nickName,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
        reportCount: 0,
      },
    });
    return newComment;
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
  async updateComment(commentId, {content}) {
    const option = { new: true };
    // const {comment, reportCount} = content;
    console.log(content)
    
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      {content,},
      option
    );
    return updatedComment;
  },
	// 댓글 삭제
	async deleteComment(commentId) {
		const deleteResult = await Comment.deleteOne({_id: commentId});
		console.log(deleteResult);
		return {message: '댓글이 삭제 되었습니다.', Comment:deleteResult };
	},
};

module.exports = CommentService;
