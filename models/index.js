const mongoose = require('mongoose');
const UserSchema = require('../models/schemas/user');
const FriendSchema = require('../models/schemas/friend');
const AdminSchema = require('../models/schemas/admin');

exports.User = mongoose.model('User', UserSchema);
exports.Friend = mongoose.model('Friend', FriendSchema);
exports.Admin = mongoose.model('Admin', AdminSchema);
