const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let QuestionSchema = new Schema({
    question_text: {type: String, required: true},
	type: {type: String, required: true, default: 'None'},
	difficulty: {type: String, required: true, default: 'Easy'},
	status: {type: String, required: true, default: 'Private'},
	options_required: {type: Boolean, required: true, default: false},
	explanation: {type: String, required: true},
	created_by: {type: String, required: true, default: 'Anonymous'},
	created_at: {type: Date, required: true, default: Date.now()},
	options: [{
		option_text: {type: String, required: true},
		is_correct: {type: Boolean, required: true, default: false}
	}],
	group_id: {type: Schema.Types.ObjectId, ref: 'QuestionGroupSchema'}
});


// Export the model
module.exports = mongoose.model('Question', QuestionSchema);