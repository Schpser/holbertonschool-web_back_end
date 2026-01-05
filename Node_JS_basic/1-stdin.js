process.stdout.write('Welcome to Holberton School, what is your name?\n');

let input = '';

if (!process.stdin.isTTY) {
  process.stdin.on('data', (chunk) => {
    input += chunk;
  });
  
  process.stdin.on('end', () => {
    const name = input.trim();
    console.log(`Your name is: ${name}`);
    console.log('This important software is now closing');
  });
}
else {
  process.stdin.once('data', (data) => {
    const name = data.toString().trim();
    console.log(`Your name is: ${name}`);
    process.exit(0);
  });
}
