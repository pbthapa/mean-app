const subjectAreaController = require('../controllers/SubjectAreaController');
const questionController = require('../controllers/QuestionController');

module.exports = (app) => {

  /**
   * START: Subject Area Routes
   **/
  app.get('/api/subject-area', subjectAreaController.list);
  app.post('/api/subject-area/create', subjectAreaController.save);
  app.post('/api/subject-area', subjectAreaController.findById);
  app.put('/api/subject-area', subjectAreaController.update);
  app.delete('/api/subject-area', subjectAreaController.remove);
  app.get('/api/subject-area/active', subjectAreaController.findAllActiveSubjectArea);
  /**
   * END: Subject Area Routes
  **/

  /**
   * START: Question Routes
  **/
  app.get('/api/questions', questionController.list);
  app.post('/api/question/create', questionController.save);
  app.post('/api/question', questionController.findById);
  app.put('/api/question', questionController.update);
  app.delete('/api/question', questionController.remove);
  app.get('/api/questions/active', questionController.findAllActiveQuestions);
  /**
   * END: Question Routes
  **/
};