const mongoose = require('mongoose');
const UserSchema = require('../models/schemas/user');

exports.User = mongoose.model('user', UserSchema);
