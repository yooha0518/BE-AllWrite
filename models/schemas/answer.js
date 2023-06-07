const { Schema } = require('mongoose');
const AnswerSchema = new Schema(
	{
    nickName: {
			type: String,
			ref: 'user',
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
