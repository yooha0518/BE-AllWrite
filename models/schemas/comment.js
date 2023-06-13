const { Schema } = require('mongoose');
const CommentSchema = new Schema(
	{
		answerId: {
			type: Schema.Types.ObjectId,
			ref: 'answer',
		},
		comment: [
			{
				nickName: {
					type: String,
					required: true,
				},
        content: {
					type: String,
					required: true,
				},
        createdAt: {
          type: Date,
          default: Date.now,
          required: true,
        },
        updatedAt: {
          type: Date,
          default: Date.now,
        },
        reportCount: {
					type: Number,
					required: false,
				},
			},
    ],
	},
	{ timestamps: false }
);

module.exports = CommentSchema;
