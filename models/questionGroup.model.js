const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let QuestionGroupSchema = new Schema({
    question_sub_text: {type: String, required: true, max: 100},
    questionIds: [{type: Schema.Types.ObjectId, ref: 'QuestionSchema'}]
});


// Export the model
module.exports = mongoose.model('QuestionGroup', QuestionGroupSchema);