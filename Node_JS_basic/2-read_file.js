const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');
    const students = lines.slice(1);
    
    if (students.length === 0) {
      throw new Error('Cannot load the database');
    }
    
    console.log(`Number of students: ${students.length}`);
    
    const fields = {};
    
    students.forEach((student) => {
      const [firstname, , , field] = student.split(',');
      if (!fields[field]) fields[field] = [];
      fields[field].push(firstname);
    });
    
    // TRI ALPHABÉTIQUE des fields pour garantir CS avant SWE
    const sortedFields = Object.keys(fields).sort();
    
    sortedFields.forEach((field) => {
      console.log(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
    });
    
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
