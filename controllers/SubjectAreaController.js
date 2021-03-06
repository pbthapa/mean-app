const SubjectArea = require('../models').SubjectArea;

module.exports = {
    // Show list of subject areas
    list(req, res) {
        return SubjectArea.findAll({
            order: [
                ['id', 'DESC']
            ]
        })
            .then((data) => res.status(200).send(data))
            .catch((error) => res.status(400).send(error));
    },
    // Save subject area
    save(req, res) {
        return SubjectArea.create(req.body)
            .then(data => res.status(200).send(data))
            .catch(error => res.status(400).send(error));
    },
    //find subject area by id
    findById(req, res) {
        return SubjectArea.find({
            where: {
                id: req.body.id
            }
        })
            .then(data => res.status(200).send(data))
            .catch(error => res.status(400).send(error));
    },
    //update subject area
    update(req, res) {
        console.log(req.body);
        return SubjectArea.update({
            subject: req.body.subject,
            active: req.body.active
        }, {
                where: {
                    id: req.body.id
                }
            })
            .then(data => res.status(200).send(data))
            .catch(error => res.status(400).send(error));
    },
    //remove subject area
    //technically not removing from DB but just updating the active flag to false
    remove(req, res) {
        console.log(req.body.id);
        SubjectArea.find({
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
                res.json({ "message": "Data does not exist in the database" });
            }
        })
            .catch(error => res.status(400).send(error));
    },
    //find all subject area with only active status
    findAllActiveSubjectArea(req, res) {
        return SubjectArea.findAll({
            where: {
                active: true
            }
        })
            .then(data => res.status(200).send(data))
            .catch(error => res.status(400).send(error));
    },
    findAllActiveSubjectAreaForSelectControl(req, res) {
        return SubjectArea.findAll({
            where: {
                active: true
            },
            attributes: [['id', 'value'], ['subject', 'label']]
        })
            .then(data => res.status(200).send(data))
            .catch(error => res.status(400).send(error));
    },
    findPagedSubjectAreaList(req, res) {
        console.log(res.body);
        let page = req.body.page;
        let limit = req.body.limit;
        let offset = limit * (page - 1);
        return SubjectArea.findAndCountAll({
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