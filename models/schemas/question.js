const { Schema } = require("mongoose");
const QuestionSchema = new Schema(
	{
		answerId: [],
		content: {
			type: String,
			required: true,
		},
		date: {
			type: String,
			default: null,
		},
	},
	{ timestamps: false }
);

module.exports = QuestionSchema;
