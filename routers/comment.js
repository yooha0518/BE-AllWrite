const { Router } = require('express');
const { commentController } = require('../controller');
const commentRouter = Router();
const getUserFromJwt = require('../middlewares/getUserFromJwt');
const upload = require('../utils/upload.js');

//댓글 등록
commentRouter.post('/:answerId',getUserFromJwt, commentController.createComment);

//댓글 전체 조회
commentRouter.get('/:answerId', getUserFromJwt, commentController.getCommentAll);

//댓글 조회
commentRouter.get('/:answerId/:commentId', getUserFromJwt,  commentController.getComment);

//댓글 수정
commentRouter.put('/:answerId/:commentId', getUserFromJwt, commentController.putComment);

//댓글 삭제
commentRouter.delete('/:answerId/:commentId',getUserFromJwt, commentController.deleteComment);


module.exports = commentRouter;
