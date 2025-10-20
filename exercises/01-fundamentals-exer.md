## 🏋️ Hands-On Exercises

### Exercise 1.1: Installation Verification

**Objective:** Verify your NPM installation and understand version information.

**Steps:**
1. Open your terminal
2. Check Node.js version: `node --version`
3. Check NPM version: `npm --version`
4. Update NPM to the latest: `npm install -g npm@latest`
5. Verify the update: `npm --version`

**Expected Outcome:** You should see version numbers for both Node and NPM, and NPM should be updated to the latest version.

**Verification:**
```bash
$ node --version
v18.17.0 (or similar)

$ npm --version
10.x.x (or latest)
```

### Exercise 1.2: Configuration Setup

**Objective:** Configure NPM with your personal information.

**Steps:**
1. Set your author name: `npm config set init-author-name "Your Name"`
2. Set your email: `npm config set init-author-email "your@email.com"`
3. Set default license: `npm config set init-license "MIT"`
4. View your configuration: `npm config list`
5. Check specific value: `npm config get init-author-name`

**Expected Outcome:** Your configuration should be saved and visible when you list it.

### Exercise 1.3: First Project

**Objective:** Create your first NPM project with proper configuration.

**Steps:**
1. Create a directory: `mkdir npm-learning`
2. Navigate into it: `cd npm-learning`
3. Initialize NPM: `npm init`
4. Answer the prompts (or use `npm init -y` for defaults)
5. View the created `package.json`
6. Try modifying package.json manually
7. Reinitialize if needed

**Expected Outcome:** A working NPM project with a proper package.json file.

### Exercise 1.4: Exploring Packages

**Objective:** Learn to research packages before installing them.

**Tasks:**
1. Search for "express" on NPM: `npm search express`
2. View express package info: `npm view express`
3. Check express versions: `npm view express versions`
4. Open express docs: `npm docs express`
5. Check express repository: `npm repo express`

**Questions to answer:**
- What is the latest version of Express?
- When was it last updated?
- How many dependencies does it have?
- What's its weekly download count? (check on npmjs.com)

---