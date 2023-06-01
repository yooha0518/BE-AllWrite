const { Schema } = require('mongoose');
const QuestionSchema = new Schema(
	{
		answerId: {
			type: Schema.Types.ObjectId,
			ref: 'Answer',
		},
		content: [
			{
        type: String,
        required: true,
			},
		],
	},
	{ timestamps: true }
);

module.exports = QuestionSchema;
