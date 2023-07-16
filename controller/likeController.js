const {likeService} = require('../services');
const { Like } = require('../models/index');

// POST /like
const LikeController = {
  async postLike (req, res){
    try {
      console.log("좋아요 만들기")
      const { answerId } = req.params;
      const { nickName } = req.user;

      console.log("닉네임 : ",nickName);
      console.log("answerId = ", answerId);

      const like = await likeService.createLike( answerId , nickName );

      // 좋아요 상태를 기반으로 응답
    if (like) {
      res.status(201).json({ likeStatus: true , like:like}); // 좋아요를 이미 누른 상태
    } else {
      res.status(201).json({ likeStatus: false ,like:like}); // 좋아요를 누르지 않은 상태
    }

      }  catch (err) {
      console.error(err);
      return res
      .status(500)
      .json({ error: 'likeController 서버에서 오류가 발생했습니다.' });
    }
  },
  async getLike(req, res) {
		try {
      console.log('좋아요 조회');
      const answerId = req.params.answerId;
      // db에서 모든 좋아요 조회
      console.log(answerId);
      const result = await likeService.getLike(answerId);
      res.status(200).json(result);
    } catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: '서버의 likeContrller에서 에러가 났습니다.' });
    }
	},
  
  // DELETE /like/:answerId
  async deleteLike(req, res){
    try {
      
      const { answerId } = req.params;

      const like = await likeService.deleteLike( answerId );

      console.log("좋아요 취소",like)
      if (!like) {
        return res.status(404).json({ error: '게시글을 찾지 못했습니다.' });
      }
  
      return res.status(200).json({ message: `${answerId}좋아요 취소!` , like:like});
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'likeController 서버에서 오류가 발생했습니다.' });
    }
  },
  
}

module.exports = LikeController;