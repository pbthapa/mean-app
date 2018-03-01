const SubjectArea = require('../models').SubjectArea;

module.exports = {
    // Show list of subject areas
    list(req, res) {
        return SubjectArea.findAll({})
            .then((data) => res.status(200).send(data))
            .catch((error) => res.status(400).send(error));
    },
    // Save subject area
    save(req, res) {
        console.log(req.body);
        return SubjectArea.create(req.body)
            .then(data => res.status(200).send(data))
            .catch(error => res.status(400).send(error));
    },
    //find subject area by id
    findById(req, res) {
        console.log(req.body.id);
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
        return SubjectArea.update(req.body)
            .then(data => res.status(200).send(data))
            .catch(error => res.status(400).send(error));
    },
    //remove subject area
    remove(req, res) {
        console.log("Not Implemented")
    }
};