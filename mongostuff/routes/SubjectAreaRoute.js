var express = require('express');
var router = express.Router();
var subjectAreaController = require("../controller/SubjectAreaController");

// Get all subject areas
router.get('/', function (req, res) {
    subjectAreaController.list(req, res);
});

//save subject area
router.post('/create', function (req, res) {
    subjectAreaController.save(req, res);
});

// Find subject area by id
router.get('/:id', function (req, res) {
    subjectAreaController.findById(req, res);
});

// Update subject area
router.post('/update/:id', function (req, res) {
    subjectAreaController.update(req, res);
});

// Delete subject area
router.post('/remove/:id', function (req, res, next) {
    subjectAreaController.delete(req, res);
});

module.exports = router;