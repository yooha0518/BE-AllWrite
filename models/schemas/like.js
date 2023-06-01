const { Schema } = require('mongoose');
const LikeSchema = new Schema(
	{
		answerId: {
			type: Schema.Types.ObjectId,
			ref: 'answer',
		},
		like: [
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

module.exports = LikeSchema;
