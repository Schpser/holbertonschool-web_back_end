const fs = require('fs').promises;
const databasePath = process.argv[2];

async function readDatabase(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');

    const lines = data.split('\n').filter(line => line.trim() !== '');
    const students = lines.slice(1);
    
    if (students.length === 0) {
      throw new Error('Cannot load the database');
    }
    
    // Order
    const result = {};
    
    students.forEach(student => {
      const [firstname, , , field] = student.split(',');
      if (field) {
        if (!result[field]) result[field] = [];
        result[field].push(firstname);
      }
    });

    return result;
    
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = { readDatabase };
