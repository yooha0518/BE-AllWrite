const { Router } = require("express");
const likeRouter = Router();
const { likeController } = require("../controller");
const getUserFromJwt = require("../middlewares/getUserFromJwt");


// POST /like
likeRouter.post("/:answerId", getUserFromJwt, likeController.postLike);

// DELETE /like/:id
likeRouter.delete("/:answerId", getUserFromJwt, likeController.deleteLike);

module.exports = likeRouter;
