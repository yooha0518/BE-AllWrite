const {Like} = require('../models');


// Create a new like
const likeService = {
  //조항요
  async createLike  (answerId, nickName) {
        const newLike = new Like({
          answerId,
          like: [{ nickName }],
        });
        
  
        const savedLike = await newLike.save();
  
        return savedLike;
    },
  
  // Delete a like
  async deleteLike (likeId) {
      const like = await Like.deleteOne({_id:likeId});
  
      if (!like) {
        throw new Error('Like not found');
      }
  
    return like;
  },
  
}
module.exports = likeService;