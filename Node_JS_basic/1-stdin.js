console.log('Welcome to Holberton School, what is your name?');

let name = '';

process.stdin.on('data', (data) => {
  name = data.toString().trim();
  console.log(`Your name is: ${name}`);

});

process.on('SIGINT', () => {
  console.log('This important software is now closing');
  process.exit();
});

process.stdin.on('end', () => {
  console.log('This important software is now closing');
});
