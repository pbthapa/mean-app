const Question = require('../models').Question;
const SubjectArea = require('../models').SubjectArea;

module.exports = {
    // Show list of questions
    list(req, res) {
        return Question.findAll({
            include: [
                { model: SubjectArea, required: true }
            ]
        })
            .then((data) => res.status(200).send(data))
            .catch((error) => res.status(400).send(error));
    },
    // Save question
    save(req, res) {
        return Question.create(req.body)
            .then(data => res.status(200).send(data))
            .catch(error => res.status(400).send(error));
    },
    //find question by id
    findById(req, res) {
        return Question.find({
            where: {
                id: req.body.id
            }
        })
            .then(data => res.status(200).send(data))
            .catch(error => res.status(400).send(error));
    },
    //update question
    update(req, res) {
        return Question.update({
            question: req.body.question
        }, {
            where: {
                id: req.body.id
            }
        })
            .then(data => res.status(200).send(data))
            .catch(error => res.status(400).send(error));
    },
    //remove question
    //technically not removing from DB but just updating the active flag to false
    remove(req, res) {
        console.log(req.body.id);
        Question.find({
            where: {
                id: req.body.id
            }
        }).then((data) => {
            if (data != null) {
                data.updateAttributes({
                    active: false
                })
                    .then(data => res.status(200).send(data))
                    .catch(error => res.status(400).send(error));
            } else {
                res.json({ "message": "Data does not exist in the database"});
            }
        })
            .catch(error => res.status(400).send(error));
    },
    //find all question with only active status
    findAllActiveQuestions(req, res) {
        return Question.findAll({
            include: [
                { model: SubjectArea, required: true }
            ],
            where: {
                active: true
            }
        })
            .then(data => res.status(200).send(data))
            .catch(error => res.status(400).send(error));
    },
    findBySubjectId(req, res) {
        return Question.findAll({
            where: {
                subject_id: req.body.subjectId,
                active: true
            }
        })
            .then(data => res.status(200).send(data))
            .catch(error => res.status(400).send(error));
    },
    findBySearchCriteria(req, res) {
        return Question.findAll({
            include: [
                { model: SubjectArea, required: true }
            ],
            where: {
                subject_id: req.body.subjectIds,
                level: req.body.levels,
                active: true
            }
        })
            .then(data => res.status(200).send(data))
            .catch(error => res.status(400).send(error));
    }
};