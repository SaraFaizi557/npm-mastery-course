# Module 1 - Example 1: First NPM Project

## Overview
Hi there! This example demonstrates creating your first NPM project with proper initialization and configuration.

## Folder Structure
```
examples/
└── module-01/
    └── example-01-first-npm-project/
        ├── README.md
        ├── package.json
        ├── .gitignore
        └── index.js
```

## Files Content

### README.md
```markdown
# My First NPM Project

This is a basic NPM project demonstrating proper initialization and structure.

## Setup

1. This project was initialized with:
   ```bash
   npm init -y
   ```

2. Configuration was customized by editing package.json manually.

## What This Example Demonstrates

- Basic NPM project structure
- Proper package.json configuration
- Simple Node.js entry point

## Running the Project

```bash
node index.js
```

Expected output: "Hello from my first NPM project!"
```

### package.json
```json
{
  "name": "first-npm-project",
  "version": "1.0.0",
  "description": "My first NPM project demonstrating proper initialization",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "npm",
    "tutorial",
    "beginner",
    "example"
  ],
  "author": "Your Name <your@email.com>",
  "license": "MIT"
}
```

### index.js
```javascript
/**
 * First NPM Project
 * A simple demonstration of a basic Node.js/NPM project
 */

console.log('Hello from my first NPM project!');
console.log('This project demonstrates:');
console.log('- NPM initialization');
console.log('- Basic project structure');
console.log('- Proper configuration');

// Display package information
setTimeout(() => {
const packageInfo = require('./package.json');
console.log(`\nProject: ${packageInfo.name}`);
console.log(`Version: ${packageInfo.version}`);
console.log(`Description: ${packageInfo.description}`);
}, 2000)
```

## How to Use This Example

### Step 1: Navigate to the example
```bash
cd examples/module-01/example-01-first-npm-project
```

### Step 2: Run the project
```bash
npm start
```

Or directly:
```bash
node index.js
```

## Expected Output
```
Hello from my first NPM project!
This project demonstrates:
- NPM initialization
- Basic project structure
- Proper configuration

Project: first-npm-project
Version: 1.0.0
Description: My first NPM project demonstrating proper initialization
```


## Try These Modifications

### 1. Add Your Information
Edit package.json:
```json
{
  "author": "Your Actual Name <yourreal@email.com>",
  "license": "MIT"
}
```

### 2. Add More Scripts
```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "node index.js",
    "info": "node -p \"require('./package.json').description\""
  }
}
```

### 3. Enhance index.js
```javascript
const packageInfo = require('./package.json');

function displayProjectInfo() {
  console.log('='.repeat(50));
  console.log(`📦 ${packageInfo.name.toUpperCase()}`);
  console.log('='.repeat(50));
  console.log(`Version: ${packageInfo.version}`);
  console.log(`Description: ${packageInfo.description}`);
  console.log(`Author: ${packageInfo.author}`);
  console.log(`License: ${packageInfo.license}`);
  console.log('='.repeat(50));
}

displayProjectInfo();
```

## Related Exercises

This example corresponds to:
- **Exercise 1.1**: Installation Verification
- **Exercise 1.3**: First Project
- **Exercise 2.1**: Create a Basic Package.json

## Questions to Consider

1. Why is node_modules in .gitignore?
2. What happens if you change the "main" field to a different file?
3. How would you add a homepage URL to package.json?
4. What's the difference between running `node index.js` and `npm start`?


## Additional Resources

- [NPM Init Documentation](https://docs.npmjs.com/cli/v9/commands/npm-init)
- [package.json Specification](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)
- [Git Ignore Patterns](https://git-scm.com/docs/gitignore)