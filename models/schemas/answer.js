const { Schema } = require('mongoose');
const AnswerSchema = new Schema(
	{
    nickName: {
			type: String,
			ref: 'user',
		},
    questionId:	{
      type: Schema.Types.ObjectId,
      required: true,
    },
		content:	{
        type: String,
        required: true,
			},
      stateCode:{
        type:Boolean,
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
      reportCount:{
        type:Number,
        required : true,
      },
      profileImage: {
        type: String,  // Assuming profileImage is of string type
        required: false,
      },
	},
	{ timestamps: false }
);

module.exports = AnswerSchema;
