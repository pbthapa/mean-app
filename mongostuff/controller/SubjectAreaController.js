var mongoose = require("mongoose");
var SubjectArea = require("../model/SubjectArea");

var subjectAreaController = {};

// Show list of subject areas
subjectAreaController.list = (req, res) => {
    SubjectArea.find({}).exec((err, subjects) => {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.json(subjects);
        }
    });
};

// save subject area and return json response of saved data
subjectAreaController.save = (req, res) => {
    var subject = new SubjectArea(req.body);
    subject.save((err) => {
        if (err) {
            console.log("error: " + err);
        } else {
            console.log("Subject Area Successfully Created.");
            res.json(subject);
        }
    });
};

// update subject area
subjectAreaController.update = (req, res) => {
    SubjectArea.findByIdAndUpdate(req.params.id, {
        $set:
            { name: req.body.name, active: req.body.active }
    },
        { new: true }, (err, subject) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Subject Area is Updated.");
                res.json(subject);
            }
        });
};

// remove subject area
subjectAreaController.delete = (req, res) => {
    SubjectArea.remove({ _id: req.params.id }, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Subject Area deleted.");
            res.json(req.params.id);
        }
    });
};

// find subject area
subjectAreaController.findById = (req, res) => {
    SubjectArea.findOne({ _id: req.params.id }).exec((err, subject) => {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.json(subject);
        }
    });
};

module.exports = subjectAreaController;