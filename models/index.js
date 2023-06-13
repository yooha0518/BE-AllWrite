const mongoose = require('mongoose');
const UserSchema = require('../models/schemas/user');
const FriendSchema = require('../models/schemas/friend');
const QuestionSchema = require('../models/schemas/question');
const AnswerSchema = require('../models/schemas/answer');
const CommentSchema = require('../models/schemas/comment');
const LikeSchema = require('../models/schemas/like');
const EmotionSchema = require('./schemas/emotion');

exports.User = mongoose.model('User', UserSchema);
exports.Friend = mongoose.model('Friend', FriendSchema);
exports.Question = mongoose.model('Question', QuestionSchema);
exports.Answer = mongoose.model('Answer', AnswerSchema);
exports.Comment = mongoose.model('Comment', CommentSchema);
exports.Like = mongoose.model('Like', LikeSchema);
exports.Emotion = mongoose.model('Emotion', EmotionSchema);
