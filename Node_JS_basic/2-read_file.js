const fs = require('fs');

function countStudents(path) {
  if (!fs.existsSync(path)) {
    throw new Error('Cannot load the database');
  }
  
  const content = fs.readFileSync(path, 'utf8');
  const lines = content.split('\n').filter((line) => line !== '');

  const students = lines.slice(1);
  
  if (students.length === 0) {
    throw new Error('Cannot load the database');
  }
  
  console.log(`Number of students: ${students.length}`);

  const csStudents = [];
  const sweStudents = [];
  
  for (let i = 0; i < students.length; i++) {
    const parts = students[i].split(',');
    if (parts[3] === 'CS') {
      csStudents.push(parts[0]);
    } else if (parts[3] === 'SWE') {
      sweStudents.push(parts[0]);
    }
  }

  console.log(`Number of students in CS: ${csStudents.length}. List: ${csStudents.join(', ')}`);
  console.log(`Number of students in SWE: ${sweStudents.length}. List: ${sweStudents.join(', ')}`);
}

module.exports = countStudents;
