const QuestionSetDetail = require('../models').QuestionSetDetail;

module.exports = {
    // Show list of question set
    list(req, res) {

    },
    // Save question set
    /**
     * {{ questionSetName: 'A', totalMark: '40', totalTime: '20', selectedQuestionIds: [ '1', '3' ] }}
     */
    save(req, res) {
        console.log(req.body);
        return QuestionSetDetail.create(req.body)
            .then(data => res.status(200).send(data))
            .catch(error => res.status(400).send(error));
    }
};