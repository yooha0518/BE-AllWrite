const { Comment, Answer, Like } = require('../models');


const CommentService = {
	// 댓글 생성
	async createComment({answerId, nickName,profileImage, content, reportCount}) {
    let comment = await Comment.findOne({ answerId:answerId });
    const newComment = {
      nickName,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
      reportCount: 0,
    };
    // console.log(newComment, answerId, nickName);
    if (!comment) {
      await Comment.create({
        answerId ,
        comment:  newComment ,
      });
      console.log(`[${answerId}]에 대한 댓글이 생성되었습니다.`);
    } else {
      await Comment.findOneAndUpdate(
        { answerId },
        { $push: { comment: newComment } },
        { new: true }
      );
    }
	},
  
  async getCommentByAnswerId  (answerId) {
		try {
			const comments = await Comment.find({ answerId });

      const likeCount = await Like.find({ answerId }).length;

      console.log(likeCount);

			console.log(`(${answerId})에 대한 댓글을 가져왔습니다.`);
      
			return comments, likeCount;
		} catch (error) {
			console.error('답변 가져오기 중 오류 발생:', error);
			throw error;
		}
	},

	// 댓글 조회
	async getComment(commentId) {
		const comment = await Comment.findOne( {'comment._id': commentId} );
		return comment;
	},
  // 전체 댓글 조회
	async getCommentAll() {
    const comment = await Comment.find();
    return comment;
	},
  
  //commentId를 사용해 댓글 수정
  async updateComment(commentId, {content}) {
    const comment = await Comment.findOneAndUpdate(
      { 'comment._id': commentId },
      { $set: { 'comment.$.content': content } },
      { new: true }
    );
    return comment;
  },
	// 댓글 삭제
	async deleteComment(commentId) {
		// const deleteResult = await Comment.deleteOne({'comment._id':commentId});

    const comment = await Comment.findOneAndUpdate(
      { 'comment._id': commentId },
      { $pull: { comment: { _id: commentId } } },
      { new: true }
    );

		console.log(comment);
		return {message: '댓글이 삭제 되었습니다.', Comment:comment };
	},
};

module.exports = CommentService;
