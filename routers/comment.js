const { Router } = require('express');
const { commentController } = require('../controller');
const commentRouter = Router();
const getUserFromJwt = require('../middlewares/getUserFromJwt');
const upload = require('../utils/upload.js');

//댓글 등록
commentRouter.post('/',getUserFromJwt, commentController.createComment);

//댓글 전체 조회
commentRouter.get('/', getUserFromJwt, commentController.getCommentAll);

//댓글 조회
commentRouter.get('/:commentId', getUserFromJwt,  commentController.getComment);

//댓글 수정
commentRouter.put('/:commentId', getUserFromJwt, commentController.putComment);

//댓글 삭제
commentRouter.delete('/:commentId',getUserFromJwt, commentController.deleteComment);


module.exports = commentRouter;
