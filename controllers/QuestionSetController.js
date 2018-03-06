const QuestionSetDetail = require('../models').QuestionSetDetail;
const Question = require('../models').Question;

module.exports = {
    // Show list of question set
    list(req, res) {
        return QuestionSetDetail.findAll({})
            .then(data => res.status(200).send(data))
            .catch(error => res.status(400).send({ "error_message": "Unable to find the list" }));
    },
    // Save question set
    save(req, res) {
        return QuestionSetDetail.create({
            question_set_name: req.body.question_set_name,
            total_mark: req.body.total_mark,
            total_time: req.body.total_time,
            active: req.body.active,
            created_at: new Date(),
            updated_at: new Date()
        })
            .then(result => {
                return result.addQuestions(req.body.selectedQuestionIds)
                    .then(data => res.status(200).send(data))
                    .catch(error => {
                        res.status(400).send({ "error_message": "Unable to save record" });
                    })
            })
            .catch(error => {
                res.status(400).send({ "error_message": "Unable to save record" });
            });
    },
    findSetDetailsById(req, res) {
        console.log(req.body.id);
        return QuestionSetDetail.find({
            where: {
                id: req.body.id
            }
        })
        .then(result => {
            return result.getQuestions()
                .then(data => {res.status(200).send(data); console.log(data)})
                .catch(error => {
                    res.status(400).send({ "error_message": "Unable to save record" });
                })
        })
        .catch(error => {
            res.status(400).send({ "error_message": "Unable to save record" });
        });
    }
};