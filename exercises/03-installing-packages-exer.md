## 🏋️ Hands-On Exercises

### Exercise 3.1: Basic Package Installation

**Objective:** Practice installing packages as dependencies and devDependencies.

**Steps:**
1. Create a new directory: `mkdir npm-install-practice`
2. Navigate into it: `cd npm-install-practice`
3. Initialize npm: `npm init -y`
4. Install Express as a dependency: `npm install express`
5. Install Nodemon as a dev dependency: `npm install --save-dev nodemon`
6. Install multiple packages at once: `npm i mongoose dotenv`
7. Open package.json and examine the dependencies sections

**Expected Outcome:**
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "dotenv": "^16.0.3"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
```

**Questions to answer:**
- How many packages are in node_modules? (Hint: It's more than 4!)
- Why are there so many packages when you only installed 4?
- What do the ^ symbols mean in the version numbers?

### Exercise 3.2: Global vs Local Installation

**Objective:** Understand the difference between global and local installations.

**Steps:**
1. Check your current global packages: `npm list -g --depth=0`
2. Install a package globally: `npm install -g nodemon`
3. Verify it's installed: `which nodemon` (Mac/Linux) or `where nodemon` (Windows)
4. Try running it: `nodemon --version`
5. Now create a new project and install nodemon locally
6. Compare: Can you run `nodemon` from anywhere? What about the local one?

**Expected Outcome:**
- Global nodemon works from any directory
- Local nodemon only works in the project directory (via npm scripts)

### Exercise 3.3: Installing Specific Versions

**Objective:** Learn to install specific versions and understand version ranges.

**Steps:**
1. Create a new project: `npm init -y`
2. Install an older version of Express: `npm install express@4.17.1`
3. Check what was installed: `npm list express`
4. Install the latest version: `npm install express@latest`
5. Install with exact version (no ^): `npm install --save-exact lodash`
6. Examine package.json to see the differences

**Expected Outcome:**
```json
{
  "dependencies": {
    "express": "^4.18.2",    // Updated to latest
    "lodash": "4.17.21"      // Exact version (no ^)
  }
}
```

### Exercise 3.4: Complete Project Setup

**Objective:** Set up a complete project with proper dependencies.

**Requirements:**
Create a REST API project with:
- Express (dependency)
- Mongoose (dependency)
- Dotenv (dependency)
- Nodemon (devDependency)
- Jest (devDependency)
- ESLint (devDependency)

**Steps:**
1. Create project directory
2. Initialize npm
3. Install all dependencies with appropriate flags
4. Create .gitignore to exclude node_modules
5. Verify package.json has correct dependency sections

**Bonus:** Count how many total packages are in node_modules!

### Exercise 3.5: npm ci Practice

**Objective:** Understand the difference between npm install and npm ci.

**Steps:**
1. In an existing project with package-lock.json
2. Delete node_modules: `rm -rf node_modules`
3. Time a regular install: `time npm install`
4. Delete node_modules again: `rm -rf node_modules`
5. Time a clean install: `time npm ci`
6. Compare the times and results

**Expected Outcome:**
- npm ci should be faster
- Both should produce identical node_modules
- npm ci should fail if package.json and package-lock.json don't match