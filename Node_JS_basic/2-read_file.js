const fs = require('fs');

function countStudents(path) {
  try {
    const content = fs.readFileSync(path, 'utf-8');
    const lines = content.split('\n').filter(line => line !== '');

    const students = lines.slice(1);

    console.log(`Number of students: ${students.length}`);

    const cs = [];
    const swe = [];
    
    students.forEach(student => {
      const [firstname, , , field] = student.split(',');
      if (field === 'CS') cs.push(firstname);
      if (field === 'SWE') swe.push(firstname);
    });
    
    console.log(`Number of students in CS: ${cs.length}. List: ${cs.join(', ')}`);
    console.log(`Number of students in SWE: ${swe.length}. List: ${swe.join(', ')}`);
    
  } catch {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
