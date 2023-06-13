const userController = require("./userController");
const adminController = require("./adminController");
const answerController = require("./answerController");
const questionController = require("./questionController");
const commentController = require("./commentController");
const likeController = require("./likeController");
const friendController = require("./friendController");
const emotionController = require("./emotionController.js");
module.exports = {
	userController,
	answerController,
	questionController,
	commentController,
	likeController,
	friendController,
	emotionController,
};
