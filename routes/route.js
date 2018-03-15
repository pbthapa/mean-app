const subjectAreaController = require('../controllers/SubjectAreaController');
const questionController = require('../controllers/QuestionController');
const questionSetController = require('../controllers/QuestionSetController');

module.exports = (app) => {

  /**
   * START: Subject Area Routes
   **/
  app.get('/api/admin/all-subject-area', subjectAreaController.list);
  app.post('/api/admin/create-subject-area', subjectAreaController.save);
  app.post('/api/subject-area', subjectAreaController.findById);
  app.put('/api/admin/update-subject-area', subjectAreaController.update);
  app.put('/api/admin/remove-subject-area', subjectAreaController.remove);
  app.get('/api/subject-area/active', subjectAreaController.findAllActiveSubjectArea);
  app.get('/api/admin/select-subjects', subjectAreaController.findAllActiveSubjectAreaForSelectControl);
  app.post('/api/admin/list-subject-area', subjectAreaController.findPagedSubjectAreaList);
  /**
   * END: Subject Area Routes
  **/

  /**
   * START: Question Routes
  **/
  app.get('/api/admin/questions', questionController.list);
  app.post('/api/admin/create-question', questionController.save);
  app.post('/api/admin/question', questionController.findById);
  app.put('/api/question', questionController.update);
  app.delete('/api/question', questionController.remove);
  app.get('/api/questions/active', questionController.findAllActiveQuestions);
  app.post('/api/admin/questions-per-subject', questionController.findBySubjectId);
  app.post('/api/admin/questions-per-criteria', questionController.findBySearchCriteria);
  /**
   * END: Question Routes
  **/

  /**
   * START: Question Set Routes
  **/
  app.get('/api/admin/list-question-set', questionSetController.list);
  app.post('/api/admin/create-question-set', questionSetController.save);
  app.post('/api/admin/edit-question-set', questionSetController.findSetDetailsById);
  app.post('/api/admin/update-question-set', questionSetController.updateQuestionSet);
  app.post('/api/admin/remove-question-set', questionSetController.removeQuestionSet);
  /**
   * END: Question Set Routes
  **/
};