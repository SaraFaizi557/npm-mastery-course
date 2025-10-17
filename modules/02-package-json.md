# Module 2: Package.json Deep Dive

[← Previous Module](01-fundamentals.md) | [🏠 Home](../README.md) | [Next Module →](03-installing-packages.md)

---

## 📚 Module Overview

The `package.json` file is the heart of every NPM project. This module explores every aspect of package.json, from basic structure to advanced configurations.

**Learning Objectives:**
- Understand the purpose and structure of package.json
- Master all essential package.json fields
- Create professional package.json files
- Configure metadata, scripts, and dependencies correctly

**Estimated Time:** 60-75 minutes

---

## 2.1 Creating package.json

### Initializing a New Project

There are two ways to create a package.json:

**Interactive Mode:**
```bash
npm init
```

You'll be prompted for information:
```
package name: (my-project) 
version: (1.0.0) 
description: A sample NPM project
entry point: (index.js) 
test command: jest
git repository: https://github.com/username/my-project
keywords: sample, npm, demo
author: Your Name
license: (ISC) MIT
```

**Quick Mode (Skip Questions):**
```bash
npm init -y
# or
npm init --yes
```

This creates a package.json with default values instantly.

### Custom Defaults

You can set defaults to skip typing them every time:

```bash
npm config set init-author-name "Your Name"
npm config set init-author-email "your@email.com"
npm config set init-author-url "https://yoursite.com"
npm config set init-license "MIT"
npm config set init-version "0.1.0"
```

---

## 2.2 Package.json Structure

Here's a complete example with all important fields:

```json
{
  "name": "my-awesome-project",
  "version": "1.0.0",
  "description": "A comprehensive example of package.json",
  "main": "index.js",
  "type": "commonjs",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "build": "webpack --mode production"
  },
  "keywords": [
    "example",
    "npm",
    "package"
  ],
  "author": "Your Name <your@email.com> (https://yoursite.com)",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/username/my-awesome-project.git"
  },
  "bugs": {
    "url": "https://github.com/username/my-awesome-project/issues"
  },
  "homepage": "https://github.com/username/my-awesome-project#readme",
  "engines": {
    "node": ">=14.0.0",
    "npm": ">=6.0.0"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.22",
    "jest": "^29.5.0"
  },
  "peerDependencies": {
    "react": ">=16.0.0"
  },
  "optionalDependencies": {
    "fsevents": "^2.3.2"
  },
  "private": false
}
```

---

## 2.3 Key Fields Explained

### Essential Fields

#### name
The package identifier. Must be unique if publishing to NPM.

**Rules:**
- Must be lowercase
- No spaces (use hyphens)
- URL-safe characters only
- Max 214 characters

```json
{
  "name": "my-project"              // ✅ Good
  "name": "My Project"              // ❌ Bad: spaces and uppercase
  "name": "@username/my-project"    // ✅ Good: scoped package
}
```

#### version
Semantic version number (MAJOR.MINOR.PATCH)

```json
{
  "version": "1.0.0"     // First stable release
  "version": "0.1.0"     // Initial development
  "version": "2.5.3"     // Major 2, Minor 5, Patch 3
}
```

#### description
Brief description of your package (shown in NPM search)

```json
{
  "description": "A fast and lightweight web framework for Node.js"
}
```

**Tips:**
- Keep it under 150 characters
- Make it searchable
- Be specific and clear

#### main
Entry point of your package - the file that gets loaded when someone requires your package

```json
{
  "main": "index.js"           // Default
  "main": "dist/bundle.js"     // Built file
  "main": "lib/main.js"        // Source directory
}
```

**Example:**
```javascript
// When someone does:
const myPackage = require('my-package');

// Node loads the file specified in "main"
```

#### type
Specifies module system (added in Node 12+)

```json
{
  "type": "commonjs"    // Default: require/module.exports
  "type": "module"      // ES Modules: import/export
}
```

### Author & Contributors

#### author
Package author information

**Simple format:**
```json
{
  "author": "Your Name"
}
```

**Detailed format:**
```json
{
  "author": {
    "name": "Your Name",
    "email": "your@email.com",
    "url": "https://yoursite.com"
  }
}
```

**Shorthand:**
```json
{
  "author": "Your Name <your@email.com> (https://yoursite.com)"
}
```

#### contributors
Array of people who contributed

```json
{
  "contributors": [
    "Alice Johnson <alice@example.com>",
    "Bob Smith <bob@example.com>"
  ]
}
```

### Repository & Links

#### repository
Link to source code

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/username/repo.git"
  }
}
```

**Shorthand:**
```json
{
  "repository": "github:username/repo"
}
```

#### bugs
Where to report issues

```json
{
  "bugs": {
    "url": "https://github.com/username/repo/issues",
    "email": "bugs@example.com"
  }
}
```

#### homepage
Project homepage or documentation

```json
{
  "homepage": "https://github.com/username/repo#readme"
}
```

### Engine Requirements

#### engines
Specify Node/NPM version requirements

```json
{
  "engines": {
    "node": ">=14.0.0",          // Node 14 or higher
    "npm": ">=6.0.0",            // NPM 6 or higher
    "node": ">=14.0.0 <19.0.0"   // Node 14-18
  }
}
```

**Enforce engines:**
```json
{
  "engines": {
    "node": ">=18.0.0"
  },
  "engineStrict": true    // Deprecated: use .npmrc instead
}
```

In `.npmrc`:
```
engine-strict=true
```

### License

#### license
Specifies how others can use your code

```json
{
  "license": "MIT"              // Most permissive
  "license": "ISC"              // Similar to MIT
  "license": "Apache-2.0"       // More detailed
  "license": "UNLICENSED"       // Private/proprietary
  "license": "SEE LICENSE IN LICENSE.txt"  // Custom
}
```

**Multiple licenses:**
```json
{
  "license": "(MIT OR Apache-2.0)"
}
```

### Keywords

#### keywords
Array of keywords for NPM search

```json
{
  "keywords": [
    "web",
    "framework",
    "express",
    "api",
    "rest",
    "http"
  ]
}
```

**Tips:**
- Use 5-10 relevant keywords
- Think about what users would search for
- Include technology names
- Be specific

### Privacy

#### private
Prevents accidental publishing to NPM

```json
{
  "private": true    // Cannot be published
}
```

Use this for:
- Company internal packages
- Projects you don't want public
- Apps (not libraries)

---

## 2.4 Scripts Section

The `scripts` field defines commands you can run with `npm run`.

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "build": "webpack --mode production",
    "lint": "eslint src/**/*.js",
    "format": "prettier --write 'src/**/*.js'"
  }
}
```

**Special scripts** (don't need `npm run`):
- `npm start` → runs `start` script
- `npm test` → runs `test` script
- `npm stop` → runs `stop` script
- `npm restart` → runs `stop`, `restart`, and `start`

**All others need `npm run`:**
- `npm run dev`
- `npm run build`
- `npm run lint`

We'll dive deep into scripts in Module 6!

---

## 2.5 Dependencies Section

### dependencies
Packages needed in production

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "dotenv": "^16.0.3"
  }
}
```

Install with:
```bash
npm install express
# or
npm install express mongoose dotenv
```

### devDependencies
Packages needed only for development

```json
{
  "devDependencies": {
    "nodemon": "^2.0.22",
    "jest": "^29.5.0",
    "eslint": "^8.42.0",
    "webpack": "^5.85.0"
  }
}
```

Install with:
```bash
npm install --save-dev nodemon
# or shorthand
npm install -D nodemon
```

### peerDependencies
Packages that your package needs, but expects the user to install

```json
{
  "peerDependencies": {
    "react": ">=16.0.0",
    "react-dom": ">=16.0.0"
  }
}
```

**Use case:** React component libraries that work with React but don't include it.

### optionalDependencies
Packages that are optional - your app works without them

```json
{
  "optionalDependencies": {
    "fsevents": "^2.3.2"    // Mac-only file watching
  }
}
```

**Note:** If installation fails, NPM continues (no error).

### bundledDependencies
Packages bundled with your package when published

```json
{
  "bundledDependencies": [
    "package-one",
    "package-two"
  ]
}
```

**Rare use case:** When you need specific versions bundled.

---

## 2.6 Advanced Fields

### files
Whitelist of files to include when publishing

```json
{
  "files": [
    "dist/",
    "lib/",
    "index.js",
    "README.md",
    "LICENSE"
  ]
}
```

**Always included** (even if not listed):
- package.json
- README
- LICENSE
- CHANGELOG
- Main file

**Always excluded:**
- .git/
- node_modules/
- .npmrc

### bin
Define CLI commands

```json
{
  "bin": {
    "my-cli": "./bin/cli.js"
  }
}
```

After installing globally:
```bash
npm install -g my-package
my-cli --help    # runs ./bin/cli.js
```

**Single command shorthand:**
```json
{
  "name": "my-cli",
  "bin": "./bin/cli.js"    // Command name = package name
}
```

### directories
Describe package structure (mostly documentation)

```json
{
  "directories": {
    "lib": "lib/",
    "bin": "bin/",
    "doc": "docs/",
    "test": "test/",
    "example": "examples/"
  }
}
```

### config
Configuration parameters accessible in scripts

```json
{
  "config": {
    "port": "3000"
  },
  "scripts": {
    "start": "node server.js"
  }
}
```

Access in code:
```javascript
// server.js
const port = process.env.npm_package_config_port;
console.log(`Server running on port ${port}`);
```

### os
Specify which operating systems your package runs on

```json
{
  "os": ["darwin", "linux"]    // Mac and Linux only
  "os": ["!win32"]             // Everything except Windows
}
```

### cpu
Specify which CPU architectures your package supports

```json
{
  "cpu": ["x64", "arm64"]      // 64-bit Intel and ARM
  "cpu": ["!ia32"]             // Everything except 32-bit
}
```

---

## 2.7 Practical Examples

### Example 1: Simple Node.js App

```json
{
  "name": "my-node-app",
  "version": "1.0.0",
  "description": "A simple Node.js application",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "keywords": ["node", "app"],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
```

### Example 2: Library Package

```json
{
  "name": "@username/my-library",
  "version": "1.0.0",
  "description": "A reusable JavaScript library",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist/",
    "README.md"
  ],
  "scripts": {
    "build": "tsc",
    "test": "jest",
    "prepublishOnly": "npm run build && npm test"
  },
  "keywords": ["library", "utility"],
  "author": "Your Name",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/username/my-library.git"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "jest": "^29.5.0"
  }
}
```

### Example 3: CLI Tool

```json
{
  "name": "my-cli-tool",
  "version": "1.0.0",
  "description": "A command-line tool",
  "bin": {
    "mytool": "./bin/cli.js"
  },
  "scripts": {
    "test": "node test/test.js"
  },
  "keywords": ["cli", "tool"],
  "author": "Your Name",
  "license": "MIT",
  "preferGlobal": true,
  "engines": {
    "node": ">=14.0.0"
  },
  "dependencies": {
    "commander": "^10.0.0",
    "chalk": "^5.2.0"
  }
}
```

---

## 🏋️ Hands-On Exercises

### Exercise 2.1: Create a Basic Package.json

**Objective:** Create a package.json file with proper configuration.

**Steps:**
1. Create a new directory: `mkdir my-first-package`
2. Navigate into it: `cd my-first-package`
3. Initialize with prompts: `npm init`
4. Fill in the following:
   - name: `my-first-package`
   - version: `1.0.0`
   - description: `Learning NPM package.json`
   - entry point: `index.js`
   - author: Your name
   - license: `MIT`

**Expected Outcome:** A well-structured package.json file.

**Bonus:** Try `npm init -y` in a new directory and compare the results.

### Exercise 2.2: Customize Package.json

**Objective:** Manually edit and understand package.json fields.

**Starting package.json:**
```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

**Tasks:**
1. Add a meaningful description
2. Add 3-5 keywords
3. Add author information (with email)
4. Change license to MIT
5. Add a repository field pointing to a GitHub repo (real or hypothetical)
6. Add a homepage field
7. Add these scripts:
   - `start`: runs `node index.js`
   - `dev`: runs `nodemon index.js`

**Expected Result:**
```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "A project for learning package.json",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["learning", "npm", "package", "tutorial"],
  "author": "Your Name <your@email.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/my-project.git"
  },
  "homepage": "https://github.com/yourusername/my-project#readme"
}
```

### Exercise 2.3: Dependencies Practice

**Objective:** Understand different dependency types.

**Steps:**
1. Create a new project with `npm init -y`
2. Install Express as a regular dependency: `npm install express`
3. Install Nodemon as a dev dependency: `npm install --save-dev nodemon`
4. Open package.json and examine the dependencies section

**Questions:**
- Where did Express appear in package.json?
- Where did Nodemon appear?
- What's the difference between these two sections?
- What do the version numbers with `^` mean?

**Expected package.json:**
```json
{
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
```

### Exercise 2.4: Complete Package Configuration

**Objective:** Create a production-ready package.json for a REST API.

**Requirements:**
- Name: `express-api-demo`
- Version: `0.1.0` (pre-release)
- Description: A sample REST API built with Express
- Author: Your name and email
- License: MIT
- Scripts:
  - `start`: runs `node server.js`
  - `dev`: runs `nodemon server.js`
  - `test`: runs `jest`
- Dependencies:
  - express
  - dotenv
- DevDependencies:
  - nodemon
  - jest
- Engine requirements: Node >=14.0.0
- Keywords: express, api, rest, node

**Create the package.json manually or use npm init and then modify it.**

---

## ⚠️ Common Pitfalls

### Pitfall 1: Invalid Package Name

**Problem:**
```json
{
  "name": "My Package"    // ❌ Contains space and capital letters
}
```

**Solution:**
```json
{
  "name": "my-package"    // ✅ Lowercase with hyphen
}
```

### Pitfall 2: Missing Main File

**Problem:**
```json
{
  "main": "index.js"    // But index.js doesn't exist!
}
```

**Solution:** Ensure the main file exists or update the field:
```json
{
  "main": "server.js"    // File that actually exists
}
```

### Pitfall 3: Wrong Dependency Type

**Problem:**
```json
{
  "dependencies": {
    "jest": "^29.5.0"    // ❌ Testing tool in dependencies
  }
}
```

**Solution:**
```json
{
  "devDependencies": {
    "jest": "^29.5.0"    // ✅ Testing tool in devDependencies
  }
}
```

**Rule of thumb:**
- **dependencies**: Needed in production
- **devDependencies**: Only needed for development/testing

### Pitfall 4: Not Specifying Engines

**Problem:** Users install your package with incompatible Node versions.

**Solution:**
```json
{
  "engines": {
    "node": ">=14.0.0"
  }
}
```

### Pitfall 5: Publishing Private Code

**Problem:** Accidentally publishing internal company code to public NPM.

**Solution:**
```json
{
  "private": true    // Prevents npm publish
}
```

---

## ✅ Best Practices

### 1. Always Include Essential Fields

At minimum, include:
```json
{
  "name": "your-package",
  "version": "1.0.0",
  "description": "Clear description",
  "main": "index.js",
  "author": "Your Name",
  "license": "MIT"
}
```

### 2. Use Semantic Versioning

- Start with `0.1.0` for initial development
- Use `1.0.0` for first stable release
- Follow semver rules for updates

### 3. Be Descriptive

**Bad:**
```json
{
  "description": "My project"
}
```

**Good:**
```json
{
  "description": "A lightweight HTTP client for Node.js with Promise support"
}
```

### 4. Include Repository Information

Helps users find source code and report issues:
```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/username/repo.git"
  },
  "bugs": {
    "url": "https://github.com/username/repo/issues"
  }
}
```

### 5. Choose the Right License

- **MIT**: Most permissive, great for open source
- **Apache-2.0**: Includes patent protection
- **ISC**: Similar to MIT, simpler text
- **UNLICENSED**: For private packages

### 6. Use Scripts Wisely

Organize common tasks:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint .",
    "format": "prettier --write .",
    "build": "webpack"
  }
}
```

### 7. Document Your Scripts

Add comments in README.md:
```markdown
## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with hot reload
- `npm test` - Run all tests
- `npm run lint` - Check code style
```

### 8. Specify Engine Requirements

Prevent issues with incompatible versions:
```json
{
  "engines": {
    "node": ">=14.0.0",
    "npm": ">=6.0.0"
  }
}
```

### 9. Use Private Field for Apps

If you're not publishing a library:
```json
{
  "private": true
}
```

### 10. Keep It Clean

Remove unused dependencies:
```bash
npm prune
```

---

## 📝 Summary

In this module, you learned:

✅ How to create package.json (npm init)  
✅ Essential fields: name, version, description, main  
✅ Author and repository information  
✅ Different types of dependencies  
✅ Scripts configuration  
✅ Advanced fields for specific use cases  
✅ Common pitfalls and best practices  

### Key Takeaways

- **package.json is the project manifest** - it defines everything about your package
- **Name must be unique** if publishing to NPM
- **Use semantic versioning** (MAJOR.MINOR.PATCH)
- **Dependencies vs devDependencies** - choose wisely
- **Scripts automate tasks** - we'll explore this deeply in Module 6
- **Metadata helps users** - include description, keywords, repository

---

## 🎯 Next Steps

Now that you understand package.json thoroughly, you're ready to learn about installing and managing packages - the core of NPM!

**Continue to:** [Module 3: Installing Packages →](03-installing-packages.md)

---

## 📚 Additional Resources

- [NPM package.json Documentation](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)
- [Semantic Versioning (semver.org)](https://semver.org/)
- [Choose a License](https://choosealicense.com/)
- [Package.json Schema](http://json.schemastore.org/package)

---

## 💬 Discussion

Have questions about package.json? Join the discussion:
- [GitHub Discussions](https://github.com/yourusername/npm-mastery-course/discussions)
- Found an error? [Open an issue](https://github.com/yourusername/npm-mastery-course/issues)

---

[← Previous Module](01-fundamentals.md) | [🏠 Home](../README.md) | [Next Module →](03-installing-packages.md)