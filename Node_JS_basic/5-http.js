const http = require('http');
const fs = require('fs').promises;

const databasePath = process.argv[2];

if (!databasePath) {
  console.error('Error: Missing database path');
  console.error('Usage: node 5-http.js <database_path>');
  process.exit(1);
}

async function countStudents(path) {
  try {
    const data = await fs.promises.readFile(path, 'utf8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');
    const students = lines.slice(1);

    if (students.length === 0) {
      throw new Error('Cannot load the database');
    }

    let result = `Number of students: ${students.length}\n`;

    const fields = {};
    students.forEach((line) => {
      const [firstname, , , field] = line.split(',');
      if (!fields[field]) fields[field] = [];
      fields[field].push(firstname);
    });

    const sortedFields = Object.keys(fields).sort();
    sortedFields.forEach((field) => {
      const names = fields[field];
      result += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
    });

    return result.trim();
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

const app = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    try {
      const studentsList = await countStudents(databasePath);
      res.end(`This is the list of our students\n${studentsList}`);
    } catch (error) {
      res.end('This is the list of our students\nCannot load the database');
    }
  }
});

app.listen(1245);
module.exports = app;
