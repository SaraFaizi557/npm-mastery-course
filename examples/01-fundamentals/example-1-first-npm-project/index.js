console.log('Hello from my first NPM project!');
console.log('This project demonstrates:');
console.log('- NPM initialization');
console.log('- Basic project structure');
console.log('- Proper configuration');

const packageInfo = require('./package.json');

setTimeout(() => {
    console.log(`Project name: ${packageInfo.name}`);
    console.log(`Project version: ${packageInfo.version}`);
    console.log(`Project description: ${packageInfo.description}`);
}, 2000)
