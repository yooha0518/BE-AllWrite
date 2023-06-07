const { Schema } = require("mongoose");
const FriendSchema = new Schema(
	{
		email: {
			type: String,
			unique: true,
		},
		friends: [],
		req_friends: [],
		res_friends: [],
	},
	{ timestamps: false }
);

module.exports = FriendSchema;
