const { Router } = require("express");
const likeRouter = Router();
const { likeController } = require("../controller");
const getUserFromJwt = require("../middlewares/getUserFromJwt");


// POST /like
likeRouter.post("/:answerId", getUserFromJwt, likeController.postLike);


likeRouter.get("/:answerId", getUserFromJwt, likeController.getLike);

// DELETE /like/:id
likeRouter.delete("/:answerId", getUserFromJwt, likeController.deleteLike);

module.exports = likeRouter;
