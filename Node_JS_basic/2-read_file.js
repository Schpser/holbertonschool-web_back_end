const fs = require('fs');

function countStudents(path) {
if (!fs.existsSync(path)) {
    throw new Error('Cannot load the database');
  }
  
  let data;
  try {
    data = fs.readFileSync(path, 'utf8');
  } catch {
    throw new Error('Cannot load the database');
  }

  const lines = data.replace(/\r/g, '').split('\n');
  const validLines = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed !== '' && !trimmed.startsWith('#')) {
      validLines.push(line);
    }
  }
  
  if (validLines.length <= 1) {
    throw new Error('Cannot load the database');
  }
  
  const students = validLines.slice(1);
  console.log(`Number of students: ${students.length}`);
  
  const cs = [];
  const swe = [];
  
  for (const student of students) {
    const parts = student.split(',');
    if (parts.length >= 4) {
      const field = parts[3].trim();
      if (field === 'CS') cs.push(parts[0].trim());
      else if (field === 'SWE') swe.push(parts[0].trim());
    }
  }

  console.log(`Number of students in CS: ${cs.length}. List: ${cs.join(', ')}`);
  console.log(`Number of students in SWE: ${swe.length}. List: ${swe.join(', ')}`);
}

module.exports = countStudents;
