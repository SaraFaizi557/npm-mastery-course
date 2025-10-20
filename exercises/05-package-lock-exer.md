## 🏋️ Hands-On Exercises

### Exercise 5.1: Understanding Lock Files

**Objective:** See how package-lock.json is created and used.

**Steps:**
1. Create a new project:
   ```bash
   mkdir lock-demo
   cd lock-demo
   npm init -y
   ```

2. Install a package:
   ```bash
   npm install express
   ```

3. Examine the files:
   - Open package.json - note the version range
   - Open package-lock.json - note the exact version
   - Count how many packages are in node_modules

4. Delete node_modules and reinstall:
   ```bash
   rm -rf node_modules
   npm install
   ```

5. Check if you got the same versions

**Questions:**
- What version of express is in package.json?
- What version is in package-lock.json?
- How many total packages were installed?
- Did reinstalling give you the same versions?

### Exercise 5.2: npm install vs npm ci

**Objective:** Compare the behavior of npm install and npm ci.

**Steps:**
1. Create a project with dependencies:
   ```bash
   mkdir install-vs-ci
   cd install-vs-ci
   npm init -y
   npm install express mongoose
   ```

2. Test npm install:
   ```bash
   rm -rf node_modules
   time npm install
   # Note the time
   ```

3. Test npm ci:
   ```bash
   rm -rf node_modules
   time npm ci
   # Note the time
   ```

4. Modify package.json (change express version):
   ```json
   "express": "^5.0.0"
   ```

5. Try both commands again:
   ```bash
   npm install  # Works, updates lock
   npm ci       # Should fail!
   ```

**Expected outcome:**
- npm ci is faster
- npm ci fails when package.json doesn't match lock file
- npm install updates the lock file

### Exercise 5.3: Resolving Lock File Conflicts

**Objective:** Practice handling lock file merge conflicts.

**Simulation:**
1. Create a project:
   ```bash
   mkdir conflict-demo
   cd conflict-demo
   npm init -y
   npm install express@4.18.0
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a branch and update:
   ```bash
   git checkout -b feature
   npm install express@4.18.2
   git add .
   git commit -m "Update express"
   ```

3. Go back and make different update:
   ```bash
   git checkout main
   npm install express@4.18.1
   git add .
   git commit -m "Update express differently"
   ```

4. Try to merge:
   ```bash
   git merge feature
   # Conflict in package-lock.json!
   ```

5. Resolve:
   ```bash
   rm package-lock.json
   npm install
   git add .
   git commit -m "Resolve conflict"
   ```

**Learning:** Never manually edit package-lock.json conflicts!

### Exercise 5.4: Lock File Verification

**Objective:** Understand integrity checking.

**Steps:**
1. Create a project with dependencies
2. Look at integrity hash in package-lock.json:
   ```json
   "integrity": "sha512-5/PsL6iGPdfQ..."
   ```

3. Clear cache and install:
   ```bash
   npm cache clean --force
   npm install
   ```

4. Verify packages are checked against these hashes

**Understanding:** Integrity hashes protect against:
- Tampered packages
- Network corruption
- Registry compromises