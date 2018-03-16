const QuestionSetDetail = require('../models').QuestionSetDetail;

module.exports = {
    startExam(req, res) {
        console.log("printed-----> " + req.body);
        return QuestionSetDetail.findAll({
            where: {
                id: 3
            }
        })
            .then((data) => {
                console.log(data)
                res.status(200).send({ 'data': data })
            })
            .catch((error) => res.status(400).send(error));
    }
}