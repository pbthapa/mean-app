const subjectAreaController = require('../controllers/SubjectAreaController');

module.exports = (app) => {

  app.get('/api/subject-area', subjectAreaController.list);
  app.post('/api/subject-area/create', subjectAreaController.save);
  app.post('/api/subject-area', subjectAreaController.findById);
  app.put('/api/subject-area', subjectAreaController.update);
  app.delete('/api/subject-area', subjectAreaController.remove);
  app.get('/api/subject-area/active', subjectAreaController.findAllActiveSubjectArea);
  
};