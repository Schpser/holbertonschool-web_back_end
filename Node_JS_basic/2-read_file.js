const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.trim().split('\n').filter(line => line.trim() !== '');
    
    if (lines.length <= 1) {
      process.stdout.write('Number of students: 0\n');
      return;
    }
    
    const students = lines.slice(1);
    process.stdout.write(`Number of students: ${students.length}\n`);
    
    const fields = {};
    
    students.forEach(student => {
      const [firstname, , , field] = student.split(',');
      if (field) {
        if (!fields[field]) fields[field] = [];
        fields[field].push(firstname);
      }
    });

    const sortedFields = Object.keys(fields).sort();
    
    sortedFields.forEach(field => {
      const count = fields[field].length;
      const list = fields[field].join(', ');
      process.stdout.write(`Number of students in ${field}: ${count}. List: ${list}\n`);
    });
    
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
