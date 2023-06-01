const { Schema } = require('mongoose');
const FriendSchema = new Schema(
	{
		email: {
			type: String,
			unique: true,
		},
		friends: [
			{
				friendNickName: {
					type: String,
					default: null,
				},
			},
		],
		req_friends: [
			{
				friendNickName: {
					type: String,
					default: null,
				},
			},
		],
		res_friends: [
			{
				friendNickName: {
					type: String,
					default: null,
				},
			},
		],
	},
	{ timestamps: false }
);

module.exports = FriendSchema;
