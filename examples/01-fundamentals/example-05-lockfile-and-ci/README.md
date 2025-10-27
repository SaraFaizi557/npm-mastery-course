# Module 1 - Example 5: The Importance of `package-lock.json` and `npm ci`

## Overview
This example demonstrates why the `package-lock.json` file is crucial for project stability and how using `npm ci` (clean install) ensures reliable, deterministic, and faster builds compared to `npm install`.

## Folder Structure
```
examples/
└── module-01/
    └── example-05-lockfile-and-ci/
        ├── README.md
        ├── package.json
        ├── package-lock.json
        ├── lock-checker.js
        └── .gitignore
```

## Files Content

### README.md
```markdown
# Package Lockfile and CI: Ensuring Build Reliability

Learn about the role of the **package lockfile (`package-lock.json`)** in locking dependency versions and how to use the modern **`npm ci`** command for fast, reliable builds in all environments.

## What You'll Learn

- The purpose and structure of **`package-lock.json`**.
- The critical difference between **`npm install`** and **`npm ci`**.
- How to achieve **Deterministic Builds** (getting the exact same `node_modules` structure everywhere).
- Avoiding **Dependency Hell** and unexpected bugs from dependency updates.

## Commands Demonstrated

Type these commands in the terminal:

```bash
# Clean install (fastest and most reliable - ideal for CI/CD)
npm ci

# Normal install (used for adding/updating dependencies)
npm install

# Run the custom lockfile integrity checker
npm run check-lock

# Remove all installed packages and the lockfile
npm run clean
```

### package.json

```json
{
  "name": "example-05-lockfile-and-ci",
  "version": "1.0.0",
  "description": "This example demonstrates the importance of package-lock.json and npm ci for deterministic builds.",
  "main": "lock-checker.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "check-lock": "node lock-checker.js",
    "clean": "rm -rf node_modules package-lock.json"
  },
  "keywords": [
    "npm",
    "ci",
    "lockfile",
    "tutorial",
    "deterministic",
    "builds"
  ],
  "author": "NPM Mastery Course",
  "license": "MIT",
  "dependencies": {
    "chalk": "^5.0.1",
    "yargs": "^17.7.2"
  }
}
```

### .gitignore
```
# Dependencies
/node_modules

# Lockfile (Important Note: FOR APPLICATIONS, you generally WANT to commit package-lock.json, 
# but we include it here to allow clean re-runs of 'npm install' in the example's experiment section. 
# REMOVE THIS LINE IF YOU ARE COMMITTING THE PROJECT'S FINAL STATE.)
package-lock.json

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.npm/
.eslintcache

# Environment variables
.env
.env.local
.env.*.local

# IDE/OS Files
.DS_Store
Thumbs.db
.vscode/
.idea/
```

### lock-checker.js

```javascript
#!/usr/bin/env node

/**
 * Lockfile Checker Tool
 * Demonstrates the role of package-lock.json and npm ci
 */

const fs = require('fs');
const path = require('path');
// const { execSync } = require('child_process'); // Not needed for a simple checker

// ANSI color codes for better output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    cyan: '\x1b[36m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m'
};

const PKG_PATH = path.join(__dirname, 'package.json');
const LOCK_PATH = path.join(__dirname, 'package-lock.json');

/**
 * Utility function to read JSON files safely
 */
function readJsonFile(filePath) {
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
        return null;
    }
}

/**
 * Main function to demonstrate lockfile importance
 */
function main() {
    console.log(`${colors.bright}${colors.cyan}`);
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║                 Lockfile Checker Tool                      ║');
    console.log('║             Understanding Deterministic Builds             ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log(colors.reset);

    const pkg = readJsonFile(PKG_PATH);
    const lock = readJsonFile(LOCK_PATH);

    console.log(`${colors.bright}${colors.yellow}🔍 Status Check:${colors.reset}\n`);

    // Check for package.json
    if (pkg) {
        console.log(`${colors.green}✅ package.json found.${colors.reset}`);
    } else {
        console.log(`${colors.red}❌ package.json NOT found! This is critical.${colors.reset}`);
        return;
    }

    // Check for package-lock.json
    if (lock) {
        console.log(`${colors.green}✅ package-lock.json found.${colors.reset}`);
    } else {
        console.log(`${colors.red}❌ package-lock.json NOT found! Your builds are NOT deterministic.${colors.reset}`);
        console.log(`\n${colors.yellow}💡 Action: Run 'npm install' to generate it and commit it!${colors.reset}`);
        return;
    }

    console.log(`\n${colors.bright}${colors.blue}⚡️ Command Comparison:${colors.reset}\n`);

    console.log(`${colors.magenta}- npm install:${colors.reset}`);
    console.log(`  Purpose: Installs packages, updates ${colors.cyan}\`package-lock.json\`${colors.reset} if necessary, resolving versions based on \`package.json\` ranges (^, ~).`);
    console.log(`  Speed: Often slower due to dependency resolution.`);
    console.log(`  Risk: ${colors.red}High${colors.reset}. Different machines can install slightly different versions, leading to "works on my machine" bugs.`);

    console.log(`\n${colors.magenta}- npm ci (Clean Install):${colors.reset}`);
    console.log(`  Purpose: Installs packages ${colors.green}ONLY${colors.reset} based on ${colors.cyan}\`package-lock.json\`${colors.reset}. It guarantees the exact dependency tree. Fails if \`package.json\` and lockfile mismatch.`);
    console.log(`  Speed: ${colors.green}Significantly faster${colors.reset}, especially in Continuous Integration (CI) pipelines.`);
    console.log(`  Risk: Minimal. Guaranteed version consistency.`);

    console.log(`\n${colors.bright}${colors.red}⚠️ Developer Warning:${colors.reset} Whenever you add, update, or remove dependencies, run ${colors.yellow}\`npm install\`${colors.reset} once to update \`package-lock.json\` and then commit the updated lockfile!`);

    console.log(`\n${colors.bright}${colors.green}✨ Lockfile Content Summary:${colors.reset}`);
    
    // Attempt to get the necessary details from the lockfile
    const lockfileVersion = lock.lockfileVersion || 'N/A';
    // Count packages, subtract the root package entry ('')
    const totalPackages = Object.keys(lock.packages).length > 0 ? Object.keys(lock.packages).length - 1 : 'Unknown'; 
    const chalkVersion = lock.packages['node_modules/chalk']?.version || 'N/A';

    console.log(`- Lockfile Version: ${lockfileVersion}`);
    console.log(`- Total Packages Locked: ${totalPackages}`);
    console.log(`- Key Dependency (${colors.yellow}chalk${colors.reset}) Version Locked: ${chalkVersion}`);
    console.log(`- Integrity Check: ${colors.green}PASS${colors.reset} (Lockfile is present and seems valid)`);

    console.log(`\n${colors.bright}${colors.cyan}💡 Best Practice:${colors.reset}`);
    console.log(`1. Use ${colors.yellow}\`npm ci\`${colors.reset} in all production and CI/CD environments.`);
    console.log(`2. Always ${colors.yellow}commit \`package-lock.json\`${colors.reset} alongside \`package.json\`.`);
    console.log('\n' + colors.cyan + '='.repeat(60) + colors.reset);
}

// Run the main function
if (require.main === module) {
    main();
}
```

## How to Use This Example

### Step 1: Initialize the Example
```bash
# 1. Navigate to the folder
cd examples/module-01/example-05-lockfile-and-ci

# 2. Run a standard install (This generates the lockfile for the first time)
npm install
```

### Step 2: Run the Lockfile Checker
```bash
# Run the script to analyze the lockfile's presence and integrity
npm run check-lock
```

### Step 3: Experiment with `npm ci` (Best Practice)
```bash
# Delete node_modules to simulate a fresh environment (like a CI server)
npm run clean

# Use 'npm ci' - observe how fast it installs based ONLY on the lockfile
npm ci
```

## Expected Output

When you run `npm run check-lock`, you'll see a formatted output like this:

```
╔════════════════════════════════════════════════════════════╗
║                 Lockfile Checker Tool                      ║
║             Understanding Deterministic Builds             ║
╚════════════════════════════════════════════════════════════╝

🔍 Status Check:

✅ package.json found.
✅ package-lock.json found.

⚡️ Command Comparison:

- npm install:
  Purpose: Installs packages, updates `package-lock.json` if necessary, resolving versions based on `package.json` ranges (^, ~).
  Speed: Often slower due to dependency resolution.
  Risk: High. Different machines can install slightly different versions, leading to "works on my machine" bugs.

- npm ci (Clean Install):
  Purpose: Installs packages ONLY based on `package-lock.json`. It guarantees the exact dependency tree. Fails if `package.json` and lockfile mismatch.
  Speed: Significantly faster, especially in Continuous Integration (CI) pipelines.
  Risk: Minimal. Guaranteed version consistency.

⚠️ Developer Warning: Whenever you add, update, or remove dependencies, run `npm install` once to update `package-lock.json`, and then commit the updated lockfile!

✨ Lockfile Content Summary:

- Lockfile Version: 3
- Total Packages Locked: 20
- Key Dependency (chalk) Version Locked: 5.0.1
- Integrity Check: PASS (Lockfile is present and seems valid)

💡 Best Practice:
1. Use **`npm ci`** in all production and CI/CD environments.
2. Always **commit `package-lock.json`** alongside `package.json`.
```

## Learning Points

### 1. The Lockfile is Your Contract
- `package.json` defines acceptable version ranges (e.g., `"^5.0.1"` means 5.0.1 or higher, but less than 6.0.0).

- `package-lock.json` defines the exact, specific version that was successfully installed (e.g., `"5.0.1"`). It's the contract for what works.

### 2. The npm install vs npm ci Debate
## npm install vs npm ci — Quick Cheat Sheet

| Feature      | `npm install`                                                                 | `npm ci`                                                                                  |
|--------------|-------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|
| **Input**    | **Primary:** `package.json`  • **Secondary:** `package-lock.json` (if exists) | **Primary & only:** `package-lock.json` *(lockfile **must** exist)*                       |
| **Output**   | Updates `package-lock.json` **and** `node_modules`                            | Creates **fresh** `node_modules` (deletes existing first), **does not** rewrite lockfile  |
| **Speed**    | Slower (resolves versions, may do network resolution)                         | Faster (skips resolution; installs exact locked tree)                                     |
| **Usage**    | Local dev when **adding/updating** deps                                       | **CI/CD, staging, production** builds                                                     |
| **Reliability** | Lower (can pick newer minor/patch within range)                            | Highest (guarantees **exact same tree** as lockfile)                                      |
| **Lockfile** | Can **modify** the lockfile                                                   | **Fails** if `package-lock.json` is missing/out-of-sync                                   |
| **Cleanliness** | Keeps existing `node_modules`                                              | **Removes** `node_modules` first (reproducible)                                           |
| **When to use** | Day-to-day dev; after `npm install <pkg>`                                  | Deterministic builds; CI; before releases                                                 |
| **Pitfalls** | Can drift vs teammates/CI if lockfile not committed                           | Will error out on lockfile mismatch; requires lockfile committed                          |
| **Typical cmds** | `npm install`  ·  `npm install <pkg>`  ·  `npm update`                    | `npm ci`                                                                                  |

> **Rule of thumb:** Dev machine pe jab **dependencies add/update** karni hon → `npm install`.  
> **Build/CI/Prod** pe **reproducible install** chahiye → `npm ci`.

### 3. Why npm ci is Faster

It skips several steps:

- No Dependency Resolution: It doesn't query the NPM registry to find versions; it reads them directly from the lockfile.

- Clean Slate: It completely removes the existing node_modules folder before installing, which avoids complex merging and integrity checks.

## Try These Modifications

## 1. Simulate a Breaking Change
### Edit package.json and change the chalk dependency to an impossible version:
```bash
"dependencies": {
  "chalk": "99.0.0", <--- Change this
  "yargs": "^17.7.2"
}
```
## Now run:
### 1. `npm install` (It will fail to update the lockfile, but might try to install what it can).
### 2. `npm ci` (It will immediately fail because the lockfile doesn't match the new, impossible version in `package.json`).

## 2. Compare Installation Speed
Use the `time` command to measure the difference (after running `npm run clean` first):
```bash
# Measure npm install time
time npm install

# Measure npm ci time (Must delete node_modules again!)
npm run clean
time npm ci
```

## 3. Parse the Lockfile
Enhance `lock-checker.js` to look for security advisories or deprecated packages by checking specific keys in the `package-lock.json`.

## Practice Exercises

### Exercise 1: Create an Update Scenari
1. Run `npm install` and commit the `package.json` and `package-lock`.json.
2. Wait a week.
3. Run `npm install chalk@latest` to upgrade chalk.
4. Observe how only `npm install` updates the lockfile, and then commit the change.

### Exercise 2: CI Pipeline Simulation
1. Use `npm run clean` to clear your project.
2. Imagine your CI server runs only one command. Which command is safer: `npm install` or `npm ci`? Run the safer command and observe the result. (Hint: it's `npm ci`).

### Exercise 3: Understand Integrity Hashes
Open `package-lock.json` and find the `integrity` hash for a package (e.g., `chalk`).
- Q: What is this hash used for?
- A: It guarantees that the downloaded package file hasn't been tampered with and is exactly what was published to the NPM registry. This is a security feature.

## Common Questions

**Q: Should I commit `package-lock.json`?** **A: YES, absolutely.** You should always commit it. It is the key to deterministic builds. The only exception is for published libraries where you might rely on the consumer's lockfile, but for applications, it's mandatory.

**Q: What if I forget to run `npm install` after adding a new dependency? A:** Your `package.json` will show the new dependency, but your teammates (and the CI server) who run `npm ci` will fail because the new dependency is missing from the committed `package-lock.json`. This is `npm ci`'s way of forcing consistency.

**Q: Does `npm ci` run scripts (like `postinstall`)? A: Yes**, just like `npm install`, `npm ci` runs lifecycle scripts.

## Troubleshooting

**Problem: `npm ci` returns an error: "The package-lock.json file was not found."**

**Cause: The lockfile is missing (maybe you forgot to commit it or ran `npm run clean`). Solution: Run `npm install` to generate the lockfile, and then commit it.**

**Problem: `npm ci` returns an error: "package.json and package-lock.json were no longer in sync."**

**Cause: You (or a teammate) changed a dependency version in `package.json` but forgot to run `npm install` to update the lockfile. Solution: Run `npm install` to synchronize the lockfile with the changes in `package.json`.**

## Related Resources

- **Module 1.4**: Basic NPM Commands
- **Module 3**: Installing Packages
- **Module 7**: Semantic Versioning and Dependencies

## Next Steps

After mastering deterministic builds:
1. Learn about **Semantic Versioning** (`^`, `~` symbols) (Module 4).
2. Explore **NPM Scripts** in depth (Module 6).
