const {Like} = require('../models');


// Create a new like
const likeService = {
  //조항요
  async createLike  (answerId, nickName) {
    let like = await Like.findOne({ answerId });

    if (!like) {
      like = await Like.create({
        answerId,
        like: [{ nickName }],
      });
      console.log(`[${answerId}]에 대한 좋아요가 생성되었습니다.`);
    } else {
      const isLiked = like.like.some((item) => item.nickName === nickName);
      if (isLiked) {
        console.log(`[${answerId}]에 대한 좋아요는 이미 존재합니다.`);
        return like;
      }

      like = await Like.findOneAndUpdate(
        { answerId },
        { $push: { like: { nickName } } },
        { new: true }
      );
      console.log(`[${answerId}]에 대한 좋아요가 추가되었습니다.`);
    }
    return like;
    },

    	// like 조회
	async getLike(answerId) {
		const like = await Like.find( { answerId} );
		return like;
	},
  
  // Delete a like
  async deleteLike (answerId) {
      const like = await Like.deleteOne({answerId:answerId});
  
      if (!like) {
        throw new Error('Like not found');
      }
  
    return like;
  },
  
}
module.exports = likeService;