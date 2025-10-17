# Module 1: NPM Fundamentals

[🏠 Home](../README.md) | [Next Module →](02-package-json.md)

---

## 📚 Module Overview

Welcome to Module 1 of the NPM Mastery Course! This module introduces you to Node Package Manager (NPM), covering what it is, why it's essential, and how to get started with installation and configuration.

**Learning Objectives:**
- Understand what NPM is and its role in JavaScript development
- Install and verify NPM on your system
- Configure NPM for your development environment
- Navigate basic NPM commands

**Estimated Time:** 45-60 minutes

---

## 1.1 Understanding NPM

### What is NPM?

NPM (Node Package Manager) is the default package manager for Node.js. It serves three main purposes:

1. **Registry**: A massive repository of JavaScript packages (over 2 million packages!)
2. **CLI Tool**: Command-line interface for managing packages
3. **Dependency Manager**: Handles project dependencies automatically

### Why is NPM Important?

NPM revolutionized JavaScript development by:
- **Code Reusability**: Don't reinvent the wheel - use existing packages
- **Version Management**: Track and manage different versions of libraries
- **Dependency Resolution**: Automatically handle complex dependency trees
- **Community**: Access to millions of packages from developers worldwide
- **Standardization**: Consistent way to manage projects across teams

### The NPM Ecosystem

```
┌─────────────────────────────────────┐
│         NPM Registry               │
│   (registry.npmjs.org)             │
│   - 2M+ packages                   │
│   - Package metadata               │
└─────────────────────────────────────┘
              ↕
┌─────────────────────────────────────┐
│         NPM CLI                     │
│   - Install packages               │
│   - Publish packages               │
│   - Manage dependencies            │
└─────────────────────────────────────┘
              ↕
┌─────────────────────────────────────┐
│      Your Project                   │
│   - package.json                    │
│   - node_modules/                   │
│   - Your application code           │
└─────────────────────────────────────┘
```

---

## 1.2 Installation & Setup

### Prerequisites

You need Node.js installed on your system. NPM comes bundled with Node.js.

### Installing Node.js and NPM

**Windows:**
1. Download the installer from [nodejs.org](https://nodejs.org/)
2. Run the installer
3. Follow the installation wizard
4. Restart your terminal

**macOS:**
```bash
# Using Homebrew (recommended)
brew install node

# Or download from nodejs.org
```

**Linux (Ubuntu/Debian):**
```bash
# Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Or using package manager
sudo apt update
sudo apt install nodejs npm
```

### Verifying Installation

Open your terminal and run:

```bash
# Check Node.js version
node --version
# Expected output: v18.x.x or similar

# Check NPM version
npm --version
# Expected output: 9.x.x or similar
```

**Example output:**
```
$ node --version
v18.17.0

$ npm --version
9.6.7
```

### Updating NPM

NPM can update itself:

```bash
# Update to latest version
npm install -g npm@latest

# Update to specific version
npm install -g npm@9.8.0

# Verify update
npm --version
```

**Note for Windows users:** You might need to run the terminal as Administrator.

---

## 1.3 NPM Configuration

NPM uses a configuration system that can be set at multiple levels.

### Configuration Levels

NPM has four levels of configuration (from lowest to highest priority):

1. **Built-in config**: NPM's default settings
2. **Global config**: System-wide settings
3. **User config**: Your user settings (~/.npmrc)
4. **Project config**: Project-specific settings (.npmrc in project)

### Viewing Configuration

```bash
# View all configuration settings
npm config list

# View configuration with defaults
npm config list -l

# View specific setting
npm config get registry

# View global settings location
npm config get prefix
```

**Example output:**
```
; "user" config from /Users/username/.npmrc

init-author-email = "you@example.com"
init-author-name = "Your Name"
init-license = "MIT"

; node bin location = /usr/local/bin/node
; node version = v18.17.0
; npm local prefix = /Users/username/projects/my-app
; npm version = 9.6.7
```

### Setting Configuration

```bash
# Set a configuration value
npm config set <key> <value>

# Delete a configuration value
npm config delete <key>

# Edit config file in your editor
npm config edit
```

### Essential Configuration Settings

**1. Set your default author information:**

```bash
# Your name
npm config set init-author-name "Your Name"

# Your email
npm config set init-author-email "your@email.com"

# Your website (optional)
npm config set init-author-url "https://yourwebsite.com"

# Default license
npm config set init-license "MIT"
```

**2. Set the default registry:**

```bash
# Default NPM registry
npm config set registry https://registry.npmjs.org/

# Verify registry
npm config get registry
```

**3. Configure package initialization defaults:**

```bash
# Default version
npm config set init-version "1.0.0"

# Skip questionnaire (use -y by default)
npm config set init.yes true
```

### The .npmrc File

The `.npmrc` file stores your NPM configuration. You can have:

**Global .npmrc** (in your home directory):
```
# ~/.npmrc
init-author-name=Your Name
init-author-email=your@email.com
init-license=MIT
```

**Project .npmrc** (in your project root):
```
# .npmrc
registry=https://registry.npmjs.org/
save-exact=true
```

**Creating a project .npmrc:**

```bash
# In your project directory
cat > .npmrc << EOF
registry=https://registry.npmjs.org/
save-exact=true
engine-strict=true
EOF
```

---

## 1.4 Basic NPM Commands

Let's explore the essential NPM commands you'll use daily.

### Getting Help

```bash
# General help
npm help

# Help for specific command
npm help install
npm help init

# Quick command reference
npm --help
npm install --help
```

### Checking Versions

```bash
# NPM version
npm --version
npm -v

# Node version
node --version
node -v
```

### Viewing Package Information

```bash
# View package info from registry
npm view express

# View specific field
npm view express version
npm view express description

# View all versions
npm view express versions

# View package in browser
npm docs express
npm home express

# View package repository
npm repo express
```

**Example:**
```bash
$ npm view express version
4.18.2

$ npm view express description
Fast, unopinionated, minimalist web framework
```

### Searching for Packages

```bash
# Search NPM registry
npm search express

# Search with specific terms
npm search "web framework"
```

### Exploring the NPM Website

You can also explore packages at:
- Main site: https://www.npmjs.com/
- Search: https://www.npmjs.com/search?q=express
- Package page: https://www.npmjs.com/package/express

---

## 1.5 Understanding the NPM Workflow

Here's a typical NPM workflow:

```
1. Initialize Project
   ↓
   npm init

2. Install Dependencies
   ↓
   npm install express

3. Write Code
   ↓
   (your development)

4. Add More Packages
   ↓
   npm install mongoose

5. Run Scripts
   ↓
   npm start

6. Update Packages
   ↓
   npm update

7. Publish (optional)
   ↓
   npm publish
```

---

## 1.6 Practical Examples

### Example 1: First NPM Project

Let's create your first NPM project:

```bash
# Create project directory
mkdir my-first-npm-project
cd my-first-npm-project

# Initialize NPM
npm init -y

# View the created package.json
cat package.json
```

**Expected output:**
```json
{
  "name": "my-first-npm-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

### Example 2: Checking Package Info

Before installing a package, check its info:

```bash
# Check Express info
npm view express

# Check when it was last published
npm view express time.modified

# Check package size
npm view express dist.unpackedSize
```

### Example 3: Configuration Practice

Set up your NPM configuration:

```bash
# Set your information
npm config set init-author-name "Your Name"
npm config set init-author-email "you@example.com"
npm config set init-license "MIT"

# Verify settings
npm config get init-author-name
npm config list
```

---

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

## ⚠️ Common Pitfalls

### Pitfall 1: Permission Errors on Global Install

**Problem:**
```bash
$ npm install -g some-package
npm ERR! Error: EACCES: permission denied
```

**Solution:**
Never use `sudo` with npm! Instead, configure npm to use a different directory:

```bash
# Create directory for global packages
mkdir ~/.npm-global

# Configure npm
npm config set prefix '~/.npm-global'

# Add to PATH (add to ~/.bashrc or ~/.zshrc)
export PATH=~/.npm-global/bin:$PATH

# Reload shell
source ~/.bashrc
```

### Pitfall 2: Outdated NPM Version

**Problem:** Using an old NPM version with newer features.

**Solution:** Regularly update NPM:
```bash
npm install -g npm@latest
```

### Pitfall 3: Wrong Registry

**Problem:** Cannot find packages or slow downloads.

**Solution:** Verify your registry:
```bash
npm config get registry
# Should be: https://registry.npmjs.org/

# Reset if wrong
npm config set registry https://registry.npmjs.org/
```

### Pitfall 4: Configuration Conflicts

**Problem:** Settings not being applied.

**Solution:** Check configuration priority:
```bash
# View all config sources
npm config list -l

# Check which config file is being used
npm config get userconfig
npm config get globalconfig
```

---

## ✅ Best Practices

1. **Keep NPM Updated:** Regularly update to get latest features and security fixes
   ```bash
   npm install -g npm@latest
   ```

2. **Configure Once:** Set up your author information globally once
   ```bash
   npm config set init-author-name "Your Name"
   npm config set init-author-email "your@email.com"
   ```

3. **Use .npmrc for Projects:** Project-specific settings should go in project .npmrc

4. **Check Before Installing:** Research packages before adding them
   ```bash
   npm view package-name
   npm docs package-name
   ```

5. **Understand Commands:** Use `--help` flag when unsure
   ```bash
   npm install --help
   ```

---

## 📝 Summary

In this module, you learned:

✅ What NPM is and why it's essential  
✅ How to install and verify NPM  
✅ How to configure NPM for your environment  
✅ Basic NPM commands for daily use  
✅ The typical NPM workflow  
✅ Common pitfalls and how to avoid them  

### Key Takeaways

- NPM is three things: registry, CLI tool, and dependency manager
- NPM comes bundled with Node.js
- Configuration can be set at multiple levels
- Always research packages before installing
- Keep NPM updated for best experience

---

## 🎯 Next Steps

Now that you understand NPM fundamentals, you're ready to dive deep into the heart of every NPM project: package.json.

**Continue to:** [Module 2: Package.json Deep Dive →](02-package-json.md)

---

## 📚 Additional Resources

- [Official NPM Documentation](https://docs.npmjs.com/)
- [NPM CLI Commands Reference](https://docs.npmjs.com/cli/v9/commands)
- [Node.js Official Site](https://nodejs.org/)
- [NPM Registry](https://www.npmjs.com/)

---

## 💬 Discussion

Have questions about this module? Start a discussion in our [GitHub Discussions](https://github.com/yourusername/npm-mastery-course/discussions).

Found an error or want to contribute? Check our [Contributing Guide](../CONTRIBUTING.md).

---

[🏠 Home](../README.md) | [Next Module →](/modules/02-package-json.md)