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

module.exports = router;