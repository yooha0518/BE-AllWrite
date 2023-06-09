const {Like} = require('../models');


// Create a new like
const likeService = {
  //조항요
  async createLike  (answerId, nickName) {

        // const newLike = new Like({
        //   answerId,
        //   like: [{ nickName }],
        // });
        const answer = await Like.find({answerId:answerId})
          if(!answer){
            console.log('if문 실행')
            await Like.create(
              { answerId },
              { $push: { like: { nickName:nickName } } }
            );
          }
        const newLike = await Like.findOneAndUpdate(
          { answerId },
          { $push: { like: { nickName:nickName } } }
        );
        console.log(`[${answerId}]에 대한 좋아요가 추가되었습니다.`);
      
        // const savedLike = await newLike.save();
  
        return newLike;
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