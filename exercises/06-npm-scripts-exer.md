## 🏋️ Hands-On Exercises

### Exercise 6.1: Basic Scripts

**Objective:** Create and run basic NPM scripts.

**Steps:**
1. Create a new project:
   ```bash
   mkdir npm-scripts-practice
   cd npm-scripts-practice
   npm init -y
   ```

2. Create a simple server file:
   ```javascript
   // server.js
   console.log('Server starting...');
   console.log('Server running on port 3000');
   ```

3. Add scripts to package.json:
   ```json
   {
     "scripts": {
       "start": "node server.js",
       "hello": "echo 'Hello from NPM scripts!'",
       "info": "echo 'Project: my-project, Version: 1.0.0'"
     }
   }
   ```

4. Run the scripts:
   ```bash
   npm start
   npm run hello
   npm run info
   ```

**Expected Outcome:** Each script runs successfully and displays the expected output.

### Exercise 6.2: Pre and Post Hooks

**Objective:** Use pre and post hooks to create a workflow.

**Steps:**
1. Add the following scripts:
   ```json
   {
     "scripts": {
       "prebuild": "echo '🧹 Cleaning...'",
       "build": "echo '🔨 Building...'",
       "postbuild": "echo '✅ Build complete!'",
       
       "pretest": "echo '🔍 Linting...'",
       "test": "echo '🧪 Testing...'",
       "posttest": "echo '✅ Tests passed!'"
     }
   }
   ```

2. Run the scripts:
   ```bash
   npm run build
   npm test
   ```

3. Observe the order of execution

**Questions:**
- What order did the build hooks run in?
- Did you need to call prebuild and postbuild separately?
- How could this be useful in real projects?

### Exercise 6.3: Chaining Scripts

**Objective:** Create complex workflows by chaining scripts.

**Steps:**
1. Create multiple script files:
   ```javascript
   // clean.js
   console.log('Cleaning dist folder...');
   
   // lint.js
   console.log('Linting code...');
   
   // compile.js
   console.log('Compiling code...');
   ```

2. Add chained scripts:
   ```json
   {
     "scripts": {
       "clean": "node clean.js",
       "lint": "node lint.js",
       "compile": "node compile.js",
       "build": "npm run clean && npm run lint && npm run compile"
     }
   }
   ```

3. Run the build script:
   ```bash
   npm run build
   ```

4. Try making one script fail:
   ```javascript
   // lint.js
   console.log('Linting code...');
   process.exit(1);  // Simulate failure
   ```

5. Run build again and see what happens

**Expected Outcome:** Chained scripts run in order, stopping if any fail.

### Exercise 6.4: Environment Variables

**Objective:** Use environment variables in scripts.

**Steps:**
1. Install cross-env:
   ```bash
   npm install --save-dev cross-env
   ```

2. Create a server file that uses env vars:
   ```javascript
   // server.js
   const env = process.env.NODE_ENV || 'development';
   const port = process.env.PORT || 3000;
   
   console.log(`Environment: ${env}`);
   console.log(`Port: ${port}`);
   ```

3. Add scripts:
   ```json
   {
     "scripts": {
       "start": "node server.js",
       "start:dev": "cross-env NODE_ENV=development PORT=3000 node server.js",
       "start:prod": "cross-env NODE_ENV=production PORT=8080 node server.js"
     }
   }
   ```

4. Run different environments:
   ```bash
   npm start
   npm run start:dev
   npm run start:prod
   ```

**Expected Outcome:** Different environment variables are set for each script.

### Exercise 6.5: Real-World Project

**Objective:** Create a complete script workflow for a project.

**Requirements:**
Set up scripts for a Node.js/Express project that includes:
- Development server with auto-restart
- Production server
- Testing with coverage
- Linting with auto-fix
- Build process
- Clean script

**Suggested structure:**
```json
{
  "scripts": {
    "start": "...",
    "dev": "...",
    "build": "...",
    "test": "...",
    "test:coverage": "...",
    "lint": "...",
    "lint:fix": "...",
    "clean": "...",
    "deploy": "..."
  }
}
```

**Bonus:** Add pre and post hooks to create an automated workflow.