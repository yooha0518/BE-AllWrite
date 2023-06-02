const { commentService } = require('../services');
const { Comment } = require('../models/index');


const CommentController = {
  //댓글 생성
	async createComment(req, res, next) {
		try {
			console.log('댓글 생성!');
			const answerId = req.params.answerId;
			const { comment } = req.body;
			const createdAt = new Date();
      const reportCount = 0;
			if(!comment){
				throw new Error("내용을 작성해주세요.");
			}
			const {answer, newComment} = await commentService.createComment(answerId,{
        comment,
        reportCount,
        createdAt 
      });
			res
        .status(201)
        .json({ message: "댓글이 작성되었습니다.", comment: newComment });
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 commentContrller에서 에러가 났습니다.' });
		}
	},
  //전체 댓글 조회
	async getCommentAll(req, res) {
		try {
      console.log('모든 댓글 조회');
      const answerId = req.params.answerId;
      // db에서 모든 게시글 조회
      const result = await commentService.getCommentAll(answerId);
      res.status(200).json(result);
    } catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 commentContrller에서 에러가 났습니다.' });
    }
	},

	//댓글 조회
	async getComment(req, res) {
		try {
			console.log('검색 댓글 조회');
      // req.parmas에서 댓글id 가져옴
      const answerId = req.params.answerId;
      const commentId = req.params.commentId;

      // db에서 해당 id의 댓글 조회
      const comment = await commentService.getComment(commentId);

      // 해당 댓글이 없을 경우 에러 메세지
      if (!comment) {
        throw new Error("댓글을 찾을 수 없습니다.");
      }
      res.status(200).json(answer);
    } catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 commentContrller에서 에러가 났습니다.' });
    }
	},
	async putComment(req, res) {
		try {
			console.log('검색 댓글 수정');
			const answerId = req.params.answerId;
      const commentId = req.params.commentId;
      // req에서 userId랑 내용 가져옴
      const { content } = req.body;

      const comment = await commentService.getAnswer(commentId);

			if (!comment) {
        throw new Error("댓글을 찾을 수 없습니다.");
      }
			// 해당 id의 게시글에서 내용 수정하고 수정된 게시글 반환 (new: true)
			const updatedComment = await commentService.updateComment(
				commentId,
				{
					content,
				},
				{ new: true }
			);
			res.status(200).json(updatedComment);
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 commentContrller에서 에러가 났습니다.' }); 
		}
	},
	// 댓글 삭제
	async deleteComment(req, res) {
		try {
			console.log('검색 댓글 삭제');
		// req.params에서 게시글id 가져옴
		const commentId = req.params.commentId;
		const comment = await commentService.getComment(commentId);

		// 해당 id의 게시글 db에서 삭제
		const deletedComment = await commentService.deleteAnswer(comment);

		// 삭제
		res.send(deletedComment);			
		}	catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 commentContrller에서 에러가 났습니다.' });
		}
	},
};

module.exports = CommentController;
