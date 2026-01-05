console.log('Welcome to Holberton School, what is your name?');

let userName = '';

process.stdin.on('data', (data) => {
  userName = data.toString().trim();
  console.log(`Your name is: ${userName}`);

});

process.on('SIGINT', () => {
  console.log('This important software is now closing');
  process.exit();
});

process.stdin.on('end', () => {
  console.log('This important software is now closing');
});
