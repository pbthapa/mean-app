const QuestionSetDetail = require('../models').QuestionSetDetail;
const Question = require('../models').Question;
var db = require('../models');

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
        const sql = "Select update_question_set("
                        + req.body.id + ", '"
                        + req.body.question_set_name + "', "
                        + req.body.total_time + ", "
                        + req.body.total_mark + ", "
                        + req.body.active + ", '"
                        + req.body.active_on + "', ARRAY["
                        + req.body.selectedQuestionIds + "])";
        db.sequelize.query(sql, { raw: true })
            .then(data => {
                console.log(data);
                res.status(200).send({ "success_message": "success" });
            })
            .catch(error => res.status(400).send({ "error_message": "Unable to update record" }));
    }, removeQuestionSet (req, res) {
        return QuestionSetDetail.destroy({
            where: {
                id: req.body.id
            }
        })
            .then(response => {
                const sql = "DELETE FROM question_set_detail_group where set_detail_id = " + req.body.id;
                db.sequelize.query(sql, { raw: true })
                    .then(result => res.status(200).send(result))
                    .catch(error => res.status(400).send({ "error_message": "Unable to delete record" }))
            })
            .catch(error => res.status(400).send({ "error_message": "Unable to delete record" }));
    }, findPagedQuestionSetList(req, res) {
        console.log(req.body);
        let page = req.body.page;
        let limit = req.body.limit;
        let offset = limit * (page - 1);
        return QuestionSetDetail.findAndCountAll({
            limit: limit,
            offset: offset,
            $sort: { id: 1 }
        })
            .then((data) => {
                let pages = Math.ceil(data.count / limit);
                res.status(200).json({ 'result': data.rows, 'count': data.count, 'pages': pages });
            })
            .catch(function (error) {
                res.status(400).send({ 'error_message': 'Internal Server Error' });
            }); 
    }
};