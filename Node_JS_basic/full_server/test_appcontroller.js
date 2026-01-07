const StudentsController = require('./controllers/StudentsController');

console.log('=== Test 1: getAllStudents ===');
const res1 = {
  _msg: '',
  type: () => res1,
  send: (msg) => { res1._msg = msg; console.log('Réponse:', `${msg.substring(0, 50)}...`); },
  status: () => res1,
};
process.argv[2] = '../database.csv';
StudentsController.getAllStudents(null, res1);

console.log('\n=== Test 2: getAllStudentsByMajor (CS) ===');
const req2 = { params: { major: 'CS' } };
const res2 = {
  _msg: '',
  type: () => res2,
  send: (msg) => { res2._msg = msg; console.log('Réponse:', msg); },
  status: () => res2,
};
StudentsController.getAllStudentsByMajor(req2, res2);

console.log('\n=== Test 3: getAllStudentsByMajor (invalid) ===');
const req3 = { params: { major: 'MATH' } };
const res3 = {
  _msg: '',
  type: () => res3,
  send: (msg) => { res3._msg = msg; console.log('Erreur:', msg); },
  status: (code) => { console.log('Status:', code); return res3; },
};
StudentsController.getAllStudentsByMajor(req3, res3);
