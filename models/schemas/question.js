const { Schema } = require('mongoose');
const QuestionSchema = new Schema(
	{
    //answerId = answer참조
		answerId: {
			type: Schema.Types.ObjectId,
			ref: 'answer',
		},
		content:	{
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
	},
	{ timestamps: true }
);

module.exports = QuestionSchema;
