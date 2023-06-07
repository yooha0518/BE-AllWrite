const likeService = require('../services/likeService');

// POST /like
exports.createLike = async (req, res) => {
  try {
    const { answerId, nickName } = req.body;

    const like = await likeService.findOne({ answerId });

    if (!like) {
      // If no like exists for the answerId, create a new like
      const newLike = new Like({
        answerId,
        like: [{ nickName }],
      });

      await newLike.save();

      return res.status(201).json(newLike);
    } else {
      // If like exists for the answerId, add the new nickname to the like array
      like.like.push({ nickName });
      await like.save();

      return res.status(200).json(like);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// DELETE /like/:id
exports.deleteLike = async (req, res) => {
  try {
    const { id } = req.params;

    const like = await likeService.findById(id);

    if (!like) {
      return res.status(404).json({ error: 'Like not found' });
    }

    await like.remove();

    return res.status(200).json({ message: 'Like deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
