const express = require('express');
const countStudents = require('./3-read_file_async');

const databasePath = process.argv[2];

const app = express();

app.get('/', (request, response) => {
  response.send('Hello Holberton School!');
});

app.get('/students', async (request, response) => {
  response.type('text/plain');

  const originalLog = console.log;
  const logs = [];
  console.log = (...args) => {
    logs.push(args.join(' '));
  };

  try {
    await countStudents(databasePath);
    console.log = originalLog;
    response.send(`This is the list of our students\n${logs.join('\n')}`);
  } catch (error) {
    console.log = originalLog;
    response.send('This is the list of our students\nCannot load the database');
  }
});

app.listen(1245, () => {
  console.log('Server listening on port 1245');
});

module.exports = app;
