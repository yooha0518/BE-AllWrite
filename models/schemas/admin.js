const { Schema } = require('mongoose');
const AdminSchema = new Schema(
	{
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
		refreshToken: {
			type: String,
			select: false,
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

module.exports = AdminSchema;
