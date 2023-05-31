const mongoose = require('mongoose');
const UserSchema = require('../models/schemas/user');
const FriendSchema = require('../models/schemas/friend');

exports.User = mongoose.model('User', UserSchema);
exports.Friend = mongoose.model('Friend', FriendSchema);
