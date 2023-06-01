const mongoose = require('mongoose');
const UserSchema = require('../models/schemas/user');
const FriendSchema = require('../models/schemas/friend');
const QuestionSchema = require('../models/schemas/question');

exports.User = mongoose.model('User', UserSchema);
exports.Friend = mongoose.model('Friend', FriendSchema);
exports.Question = mongoose.model('Question', QuestionSchema);
