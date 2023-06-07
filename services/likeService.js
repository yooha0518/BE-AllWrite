const Like = require('../models/Like');

// Create a new like
exports.createLike = async (answerId, nickName) => {
  try {
    const like = await Like.findOne({ answerId });

    if (!like) {
      // If no like exists for the answerId, create a new like
      const newLike = new Like({
        answerId,
        like: [{ nickName }],
      });

      await newLgiike.save();

      return newLike;
    } else {
      // If like exists for the answerId, add the new nickname to the like array
      like.like.push({ nickName });
      await like.save();

      return like;
    }
  } catch (err) {
    throw err;
  }
};

// Delete a like
exports.deleteLike = async (likeId) => {
  try {
    const like = await Like.findById(likeId);

    if (!like) {
      throw new Error('Like not found');
    }

    await like.remove();
  } catch (err) {
    throw err;
  }
};
