const { Schema } = require('mongoose');
const AnswerSchema = new Schema(
	{
    //작성자 참조
    nickName: {
			type: Schema.Types.ObjectId,
			ref: 'user',
		},
    //answerId = answer참조
		questionId: {
			type: Schema.Types.ObjectId,
			ref: 'question',
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
      }
	},
	{ timestamps: true }
);

module.exports = AnswerSchema;
