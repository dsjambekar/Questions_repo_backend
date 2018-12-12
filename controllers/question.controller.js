var Question = require('../models/question.model');
var QuestionGroup = require('../models/questionGroup.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

//create
exports.question_create = function (req, res, next) {
	var opt = [{"option_text": "333333","is_correct": "true"},{"option_text": "4444444","is_correct": "true"}];
    let question = new Question(
        {
            question_text: req.body.question_text,
			// subtext: req.body.subtext,
			explanation: req.body.explanation,
			type: req.body.type,
			status: req.body.status,
			created_by: req.body.created_by,
			options_required: req.body.options_required,
			options: opt
        }
    );

    question.save(function (err,q) {
        if (err) {
            return next(err);
        }
        res.send(q._id)
    })
};

exports.question_create_group = function (req, res, next) {
	
	let questionGroup = new QuestionGroup({
		question_sub_text: req.body.question_sub_text,
		questionIds: []
	});

	var groupId = questionGroup.id;

	req.body.questions.forEach(function(q){
		var opt = [{"option_text": "333333","is_correct": "true"},{"option_text": "4444444","is_correct": "true"}];
		let question = new Question(
			{
				question_text: q.question_text,
				explanation: q.explanation,
				type: q.type,
				status: q.status,
				created_by:q.created_by,
				options_required: q.options_required,
				options: opt,
				group_id: groupId
			}
		);
		questionGroup.questionIds.push(question._id);
		question.save(function (err, q) {
			if (err) {
				return next(err);
			}
		})
		
	});

	questionGroup.save(function (err, group) {
		if (err) {
            return next(err);
		}
	});

	res.send("Group created successfully!");
	console.log("Group created successfully!");

};


// read
exports.question_details = function (req, res, next) {
    Question.findById(req.params.id, function (err, question) {
        if (err) return next(err);
        res.send(question);
    })
};


// list
exports.question_list = function (req, res, next) {
    // Question.find(function (err, questions) {
    //     if (err) return next(err);
    //     res.send(questions);
	// })


	// Question.find({}).populate('group_id').exec(function(err, question){
    //       console.log(question);
    //  })
	
	Question.aggregate([
		{
			$lookup:
				{
					from: "questiongroups",
					localField: "group_id",
					foreignField: "_id",
					as: "group_details"
				}
		}
	], function(err,questions){
		if (err) return next(err);
        res.send(questions);
	})
};

// update
exports.question_update = function (req, res, next) {
    Question.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, question) {
        if (err) return next(err);
        res.send('Question udpated.');
    });
};

// delete
exports.question_delete = function (req, res, next) {
    Question.findByIdAndDelete(req.params.id, {$set: req.body}, function (err, question) {
        if (err) return next(err);
        res.send('Question deleted.');
    });
};