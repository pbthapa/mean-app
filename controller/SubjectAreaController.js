var mongoose = require("mongoose");
var SubjectArea = require("../model/SubjectArea");

var subjectAreaController = {};

// Show list of subject areas
subjectAreaController.list = function (req, res) {
    SubjectArea.find({}).exec((err, subjects) => {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.json(subjects);
        }
    });
};

subjectAreaController.save = function (req, res) {
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

module.exports = subjectAreaController;