const { Schema } = require('mongoose');
const FriendSchema = new Schema(
	{
		nickName: {
			type: Schema.Types.ObjectId,
            unique:true,
			ref: 'User',
		},
		friends: [
			{
				nickName: {
					type: String,
					required: true,
				},
			},
		],
		req_friends: [
			{
				nickName: {
					type: String,
					required: true,
				},
			},
		],
		res_friends: [
			{
				nickName: {
					type: String,
					required: true,
				},
			},
		],
	},
	{ timestamps: false }
);

module.exports = FriendSchema;
