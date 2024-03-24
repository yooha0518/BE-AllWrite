const { Schema } = require("mongoose");
const UserSchema = new Schema(
	{
		nickName: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
		mbti: {
			type: String,
			default: null,
		},
		intro: {
			type: String,
			default: null,
		},
		profileImage: {
			type: String,
			default: "allwrite.tplinkdns.com:5000/image/defaultImage.png",
		},
		experience: {
			type: Number,
			default: 0,
		},
		refreshToken: {
			type: String,
			select: false,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		isTempPassword: {
			type: Boolean,
			default: false,
		},
		state: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: false }
);

module.exports = UserSchema;
