## 🏋️ Hands-On Exercises

### Exercise 7.1: Exploring Installed Packages

**Objective:** Learn to view and understand your dependencies.

**Steps:**
1. Create a project with dependencies:
   ```bash
   mkdir manage-packages
   cd manage-packages
   npm init -y
   npm install express mongoose dotenv
   npm install --save-dev jest nodemon
   ```

2. Explore the packages:
   ```bash
   npm list --depth=0
   npm list --depth=1
   npm list express
   npm view express
   ```

3. Answer these questions:
   - How many direct dependencies do you have?
   - How many total packages are installed?
   - What version of express is installed?
   - What's the latest version available?

**Expected Outcome:** Understanding of dependency structure.

### Exercise 7.2: Checking for Updates

**Objective:** Learn to identify outdated packages.

**Steps:**
1. In the same project, check for outdated packages:
   ```bash
   npm outdated
   ```

2. Install an older version of a package:
   ```bash
   npm install lodash@4.17.20
   ```

3. Check outdated again:
   ```bash
   npm outdated
   ```

4. Note the difference between Current, Wanted, and Latest

**Expected Outcome:** Understanding version update options.

### Exercise 7.3: Updating Packages

**Objective:** Practice different update methods.

**Steps:**
1. Update to wanted versions:
   ```bash
   npm update
   npm outdated
   ```

2. Update to latest version:
   ```bash
   npm install lodash@latest
   npm list lodash
   ```

3. Check package.json and package-lock.json changes

**Expected Outcome:** Understanding of update behavior.

### Exercise 7.4: Removing and Cleaning

**Objective:** Practice removing packages and cleaning up.

**Steps:**
1. Remove a package:
   ```bash
   npm uninstall lodash
   npm list --depth=0
   ```

2. Manually edit package.json to remove a dependency

3. Run prune:
   ```bash
   npm prune
   ```

4. Check what was removed

**Expected Outcome:** Understanding cleanup commands.

### Exercise 7.5: Real-World Maintenance

**Objective:** Perform a complete maintenance routine.

**Tasks:**
1. Check for outdated packages
2. Update all packages safely
3. Run tests (or create a simple test)
4. Clean up unused packages
5. Deduplicate dependencies
6. Document the before/after state

**Create a report:**
```bash
# Before
npm outdated > before.txt
npm list --depth=0 >> before.txt

# After maintenance
npm outdated > after.txt
npm list --depth=0 >> after.txt
```

**Expected Outcome:** A complete maintenance workflow.