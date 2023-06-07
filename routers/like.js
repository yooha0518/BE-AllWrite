const express = require('express');
const router = express.Router();
const likeController = require('../controller/likeController');

// POST /like
router.post('/like', likeController.createLike);

// DELETE /like/:id
router.delete('/like/:id', likeController.deleteLike);

module.exports = router;
