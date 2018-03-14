const QuestionSetDetail = require('../models').QuestionSetDetail;
const Question = require('../models').Question;
const { db } = require('../models/index');

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
            active: (req.body.active == null ? false : req.body.active),
            active_on: req.body.active_on,
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
        data = [];
        return QuestionSetDetail.find({
            where: {
                id: req.body.id
            }
        })
            .then(detail => {
                data.push(detail);
                return detail.getQuestions()
                    .then(questions => {
                        data.push(questions);
                        res.status(200).send(data);
                    })
                    .catch(error => {
                        res.status(400).send({ "error_message": "Unable to save record" });
                    })
            })
            .catch(error => {
                res.status(400).send({ "error_message": "Unable to save record" });
            });
    }, updateQuestionSet(req, res) {
        console.log(req.body);
        ids = [];
        ids.push(1);
        ids.push(2);
        db.sequelize.query("Select update_question_set("
        + req.body.id + ", '"
        + req.body.question_set_name + "', "
        + req.body.total_time + ", "
        + req.body.total_mark + ", "
        + req.body.active + ", '"
        + req.body.active_on + "', ARRAY["
        + ids + "])", { raw: true })
            .then(response => res.json(response))
            .error(err => console.log(err));
    }
};