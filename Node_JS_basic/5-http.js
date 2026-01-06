const http = require('http');
const countStudents = require('./3-read_file_async');

const databasePath = process.argv[2];

const app = http.createServer(async (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });

  if (request.url === '/') {
    response.end('Hello Holberton School!');
  } else if (request.url === '/students') {
    response.write('This is the list of our students\n');

    const originalLog = console.log;
    const logs = [];
    console.log = (...args) => {
      logs.push(args.join(' '));
    };

    try {
      await countStudents(databasePath);
      console.log = originalLog;
      response.end(logs.join('\n'));
    } catch (error) {
      console.log = originalLog;
      response.end('Cannot load the database');
    }
  } else {
    response.end();
  }
});

app.listen(1245);
module.exports = app;
