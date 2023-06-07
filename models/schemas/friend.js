const { Schema } = require("mongoose");
const FriendSchema = new Schema(
	{
		email: {
					type: String,
			unique: true,
				},
		friends: [],
		req_friends: [
			{
				friendNickName: {
					type: String,
					default: null,
				},
				friendProfileImage: {
					type: String,
					default: "http://allwrite.kro.kr:5000/defaultImage.png",
				},
			},
		],
		res_friends: [
			{
				friendNickName: {
					type: String,
					default: null,
				},
				friendProfileImage: {
					type: String,
					default: "http://allwrite.kro.kr:5000/defaultImage.png",
				},
			},
		],
	},
	{ timestamps: false }
);

module.exports = FriendSchema;
