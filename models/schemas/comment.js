const { Schema } = require('mongoose');
const CommentSchema = new Schema(
	{
		answerId: {
			type: Schema.Types.ObjectId,
			ref: 'answer',
		},
		comment: 
			{
				nickName: {
					type: Schema.Types.ObjectId,
					required: true,
				},
        comment: {
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
					type: String,
					required: true,
				},
			},
	},
	{ timestamps: true }
);

module.exports = CommentSchema;
