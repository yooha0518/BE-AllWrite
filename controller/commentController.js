const { commentService } = require('../services');
const { Comment } = require('../models/index');


const CommentController = {
  //댓글 생성
	async createComment(req, res) {
		try {
			console.log('댓글 생성!');
      const {  nickName, profileImage } = req.user;
			const { answerId } = req.params;
      const { content, reportCount } = req.body;
			
			console.log(answerId, nickName,profileImage);

      const savedComment = await commentService.createComment({answerId, nickName,profileImage, content,reportCount});

      res.status(201).json({message:"댓글을 생성했습니다.", savedComment:savedComment});
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 commentContrller에서 에러가 났습니다.' });
		}
	},

	async getCommentByAnswerId(req, res) {
		try {
			const { answerId } = req.params;
			console.log('answerId로 답변 조회');
			console.log(answerId)
      // db에서 모든 게시글 조회
      const result = await commentService.getCommentByAnswerId(answerId);
      res.status(200).json(result);
    } catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 answerContrller에서 에러가 났습니다.' });
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
      res.status(200).json(comment);
    } catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 commentContrller에서 에러가 났습니다.' });
    }
	},
  //댓글 수정
	async putComment(req, res) {
    try {
      const commentId = req.params.commentId;
      const { content } = req.body;
			console.log(commentId);
      const comment = await commentService.getComment(commentId);
      if (!comment) {
        throw new Error("댓글을 찾을 수 없습니다.");
      }
      const updatedComment = await commentService.updateComment(
        commentId,
        {
          content,
        },
        { new: true }
      );

      res
        .status(200)
        .json({ message: "댓글이 수정되었습니다." ,comment:comment});
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
		const {answerId, commentId} = req.params;
		const comment = await commentService.getComment(commentId);

			console.log(answerId, commentId);

		// 해당 id의 게시글 db에서 삭제
		const deletedComment = await commentService.deleteComment(commentId);
			console.log("댓글 삭제")
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
