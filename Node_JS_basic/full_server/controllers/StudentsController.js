const { readDatabase } = require('../utils');

class StudentsController {
  static async getAllStudents(request, response) {
    response.type('text/plain');
    
    try {
      const databasePath = process.argv[2];
      if (!databasePath) throw new Error('No database path');

      const data = await readDatabase(databasePath);
      
      let result = 'This is the list of our students\n';
      
      // Sort fields alphabetically
      const fields = Object.keys(data).sort();
      
      fields.forEach((field) => {
        result += `Number of students in ${field}: ${data[field].length}. List: ${data[field].join(', ')}\n`;
      });

      response.send(result.trimEnd());
      
    } catch (error) {
      response.status(500).send('Cannot load the database');
    }
  }
  
  static async getAllStudentsByMajor(request, response) {
    response.type('text/plain');
    
    const { major } = request.params;
    
    if (major !== 'CS' && major !== 'SWE') {
      return response.status(500).send('Major parameter must be CS or SWE');
    }
    
    try {
      const databasePath = process.argv[2];
      if (!databasePath) throw new Error('No database path');
      
      const data = await readDatabase(databasePath);
      const students = data[major] || [];
      
      response.send(`List: ${students.join(', ')}`);
      
    } catch (error) {
      response.status(500).send('Cannot load the database');
    }
  }
}

module.exports = StudentsController;
