const fs = require('fs');

async function countStudents(path) {
  try {
    const data = await fs.promises.readFile(path, 'utf8');

    const lines = data.split('\n').filter((line) => line.trim() !== '');

    const students = lines.slice(1);

    if (students.length === 0) {
      throw new Error('Cannot load the database');
    }

    console.log(`Number of students: ${students.length}`);

    const fields = {};

    students.forEach((line) => {
      const [firstname, , , field] = line.split(',');

      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(firstname);
    });

    const sortedFields = Object.keys(fields).sort();

    sortedFields.forEach((field) => {
      const names = fields[field];
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    });
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}
module.exports = countStudents;
