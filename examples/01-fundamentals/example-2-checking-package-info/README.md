# Module 1 - Example 2: Checking Package Info

## Overview
This example demonstrates how to research and explore NPM packages before installing them, using various NPM commands and creating a comparison script.

## Folder Structure
```
examples/
└── module-01/
    └── example-02-checking-package-info/
        ├── README.md
        ├── package.json
        ├── .gitignore
        ├── check-package.js
        └── package-comparison.txt
```

## Files Content

### README.md
```markdown
# Checking Package Information

Learn how to research NPM packages before installing them.

## What You'll Learn

- Using `npm view` to get package information
- Checking package versions and metadata
- Comparing different packages
- Making informed decisions about dependencies

## Commands Demonstrated

Type these commands in the terminal:

```bash
# View basic package info
npm view express

# View specific fields
npm view express version
npm view express description
npm view express dependencies

# View all versions
npm view express versions

# Open package documentation
npm docs express

# Open package repository
npm repo express
```

## Running the Example

```bash
# Run the package checker script
node check-package.js
```

### package.json

```json
{
  "name": "checking-package-info",
  "version": "1.0.0",
  "description": "Example demonstrating how to research NPM packages",
  "main": "check-package.js",
  "scripts": {
    "check": "node check-package.js",
    "view-express": "npm view express",
    "view-axios": "npm view axios",
    "compare": "npm view express version && npm view axios version"
  },
  "keywords": [
    "npm",
    "package",
    "research",
    "tutorial"
  ],
  "author": "NPM Mastery Course",
  "license": "MIT"
}
```

### .gitignore
```
# Dependencies
node_modules/

# Environment variables
.env
.env.local

# Logs
*.log
npm-debug.log*

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
```

### check-package.js
```javascript
#!/usr/bin/env node

/**
 * NPM Package Information Checker
 * Demonstrates how to research packages before installing
 */

const { execSync } = require('child_process');

// ANSI color codes for better output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m'
};

/**
 * Execute npm view command and return output
 */
function getNpmView(packageName, field = '') {
  try {
    const command = field 
      ? `npm view ${packageName} ${field}` 
      : `npm view ${packageName}`;
    return execSync(command, { encoding: 'utf8' }).trim();
  } catch (error) {
    return `Error: Package not found or network issue`;
  }
}

/**
 * Display package information in a formatted way
 */
function displayPackageInfo(packageName) {
  console.log(`\n${colors.bright}${colors.cyan}${'='.repeat(60)}${colors.reset}`);
  console.log(`${colors.bright}${colors.green} Package: ${packageName}${colors.reset}`);
  console.log(`${colors.cyan}${'='.repeat(60)}${colors.reset}\n`);

  // Get various package details
  const info = {
    'Latest Version': getNpmView(packageName, 'version'),
    'Description': getNpmView(packageName, 'description'),
    'License': getNpmView(packageName, 'license'),
    'Author': getNpmView(packageName, 'author.name'),
    'Homepage': getNpmView(packageName, 'homepage'),
    'Repository': getNpmView(packageName, 'repository.url'),
    'Main File': getNpmView(packageName, 'main'),
    'Keywords': getNpmView(packageName, 'keywords'),
  };

  // Display each piece of information
  for (const [label, value] of Object.entries(info)) {
    if (value && value !== 'Error: Package not found or network issue') {
      console.log(`${colors.yellow}${label}:${colors.reset} ${value}`);
    }
  }

  console.log(`\n${colors.cyan}${'='.repeat(60)}${colors.reset}\n`);
}

/**
 * Display version history
 */
function displayVersionHistory(packageName, limit = 5) {
  console.log(`${colors.bright}${colors.magenta}Recent Versions (last ${limit}):${colors.reset}`);
  
  try {
    const versions = getNpmView(packageName, 'versions');
    const versionArray = JSON.parse(versions.replace(/'/g, '"'));
    const recentVersions = versionArray.slice(-limit);
    
    recentVersions.forEach((version, index) => {
      const arrow = index === recentVersions.length - 1 ? '→' : ' ';
      console.log(`  ${arrow} ${version}`);
    });
    console.log();
  } catch (error) {
    console.log('  Could not retrieve version history\n');
  }
}

/**
 * Display package size information
 */
function displayPackageSize(packageName) {
  console.log(`${colors.bright}${colors.blue}Package Size:${colors.reset}`);
  
  try {
    const unpackedSize = getNpmView(packageName, 'dist.unpackedSize');
    if (unpackedSize && unpackedSize !== 'Error: Package not found or network issue') {
      const sizeInKB = (parseInt(unpackedSize) / 1024).toFixed(2);
      console.log(`  Unpacked Size: ${sizeInKB} KB\n`);
    }
  } catch (error) {
    console.log('  Size information not available\n');
  }
}

/**
 * Display dependencies count
 */
function displayDependencies(packageName) {
  console.log(`${colors.bright}${colors.green}Dependencies:${colors.reset}`);
  
  try {
    const deps = getNpmView(packageName, 'dependencies');
    if (deps && deps !== 'undefined' && deps !== 'Error: Package not found or network issue') {
      const depsObj = JSON.parse(deps.replace(/'/g, '"').replace(/(\w+):/g, '"$1":'));
      const depCount = Object.keys(depsObj).length;
      console.log(`  Total Dependencies: ${depCount}`);
      
      if (depCount > 0 && depCount <= 10) {
        console.log(`  Packages:`);
        Object.keys(depsObj).forEach(dep => {
          console.log(`    - ${dep}`);
        });
      }
    } else {
      console.log('  No dependencies');
    }
    console.log();
  } catch (error) {
    console.log('  Dependency information not available\n');
  }
}

/**
 * Main function to demonstrate package checking
 */
function main() {
  console.log(`${colors.bright}${colors.cyan}`);
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║         NPM Package Information Checker Tool              ║');
  console.log('║         Learning to Research Packages                     ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log(colors.reset);

  // Example packages to check
  const packages = ['express', 'axios', 'lodash'];

  console.log(`${colors.yellow}ℹ️  Checking information for popular packages...${colors.reset}\n`);

  packages.forEach(pkg => {
    displayPackageInfo(pkg);
    displayVersionHistory(pkg, 3);
    displayPackageSize(pkg);
    displayDependencies(pkg);
    console.log(`${colors.cyan}${'-'.repeat(60)}${colors.reset}\n`);
  });

  // Display helpful commands
  console.log(`${colors.bright}${colors.green}💡 Useful Commands to Try:${colors.reset}\n`);
  console.log(`${colors.cyan}# View package details${colors.reset}`);
  console.log(`npm view <package-name>\n`);
  
  console.log(`${colors.cyan}# View specific field${colors.reset}`);
  console.log(`npm view <package-name> version`);
  console.log(`npm view <package-name> description`);
  console.log(`npm view <package-name> dependencies\n`);
  
  console.log(`${colors.cyan}# View all versions${colors.reset}`);
  console.log(`npm view <package-name> versions\n`);
  
  console.log(`${colors.cyan}# Open documentation in browser${colors.reset}`);
  console.log(`npm docs <package-name>\n`);
  
  console.log(`${colors.cyan}# Open repository in browser${colors.reset}`);
  console.log(`npm repo <package-name>\n`);
  
  console.log(`${colors.cyan}# Search for packages${colors.reset}`);
  console.log(`npm search <search-term>\n`);

  console.log(`${colors.bright}${colors.yellow}🎯 Next Steps:${colors.reset}`);
  console.log(`1. Try these commands with different packages`);
  console.log(`2. Visit npmjs.com to see visual package information`);
  console.log(`3. Check weekly downloads and GitHub stars`);
  console.log(`4. Read package documentation before installing\n`);
}

// Run the main function
if (require.main === module) {
  main();
}

module.exports = {
  getNpmView,
  displayPackageInfo,
  displayVersionHistory
};
```

### package-comparison.txt
```
PACKAGE COMPARISON CHECKLIST
============================

When evaluating NPM packages, consider these factors:

1. POPULARITY & MAINTENANCE
   □ Weekly downloads (check npmjs.com)
   □ GitHub stars
   □ Last update date
   □ Active maintenance
   □ Open/closed issues ratio

2. VERSION STABILITY
   □ Current version number
   □ Is it stable (>= 1.0.0)?
   □ Frequent updates?
   □ Breaking changes history

3. DEPENDENCIES
   □ Number of dependencies
   □ Are dependencies well-maintained?
   □ Security vulnerabilities?
   □ Bundle size impact

4. DOCUMENTATION
   □ README quality
   □ API documentation
   □ Examples provided
   □ Active community/discussions

5. LICENSE
   □ Compatible with your project?
   □ MIT/Apache/ISC are common
   □ Commercial use allowed?

6. SECURITY
   □ Known vulnerabilities (npm audit)
   □ Security score on npmjs.com
   □ Trusted maintainers

EXAMPLE COMPARISON: Express vs Koa vs Fastify
==============================================

Express:
✓ Most popular (23M+ weekly downloads)
✓ Mature and stable (v4.x)
✓ Huge ecosystem
✓ Extensive documentation
- Older codebase
- Not the fastest

Koa:
✓ Modern, cleaner syntax
✓ Created by Express team
✓ Smaller core
- Smaller ecosystem
- Less documentation
○ Moderate popularity (1M+ weekly)

Fastify:
✓ Very fast performance
✓ Built-in schema validation
✓ Modern features
✓ Growing ecosystem
- Newer (less mature)
○ Good popularity (800K+ weekly)

DECISION FACTORS:
- Need stability & ecosystem? → Express
- Want modern syntax? → Koa
- Performance critical? → Fastify

COMMANDS FOR COMPARISON:
========================

# Compare versions
npm view express version
npm view koa version
npm view fastify version

# Compare sizes
npm view express dist.unpackedSize
npm view koa dist.unpackedSize
npm view fastify dist.unpackedSize

# Compare dependencies
npm view express dependencies
npm view koa dependencies
npm view fastify dependencies

# Check last update
npm view express time.modified
npm view koa time.modified
npm view fastify time.modified
```

## How to Use This Example

### Step 1: Navigate to the example
```bash
cd examples/module-01/example-02-checking-package-info
```

### Step 2: Run the checker script
```bash
npm run check
# or
node check-package.js
```

### Step 3: Try the NPM commands directly
```bash
# View Express package info
npm view express

# View specific fields
npm view express version
npm view express description
npm view express homepage

# Open in browser
npm docs express
npm repo express
```

### Step 4: Compare packages
```bash
# Compare versions
npm run compare

# Or manually compare
npm view express version && npm view axios version
```

## Expected Output

When you run `node check-package.js`, you'll see:

```
╔════════════════════════════════════════════════════════════╗
║         NPM Package Information Checker Tool              ║
║         Learning to Research Packages                     ║
╚════════════════════════════════════════════════════════════╝

ℹ️  Checking information for popular packages...

============================================================
📦 Package: express
============================================================

Latest Version: 4.18.2
Description: Fast, unopinionated, minimalist web framework
License: MIT
Author: TJ Holowaychuk
Homepage: http://expressjs.com/
Repository: git+https://github.com/expressjs/express.git
Main File: index.js
Keywords: express, framework, sinatra, web, http, rest, restful, router, app, api

============================================================

Recent Versions (last 3):
   4.18.0
   4.18.1
 → 4.18.2

Package Size:
  Unpacked Size: 208.45 KB

Dependencies:
  Total Dependencies: 31
  [... list of dependencies ...]
```

## Learning Points

### 1. Research Before Installing
- **Always check** package information before installing
- **Compare alternatives** using npm view
- **Read documentation** with npm docs
- **Check repository** with npm repo

### 2. Key Information to Check
- ✅ Latest version number
- ✅ Description and purpose
- ✅ License compatibility
- ✅ Dependencies count
- ✅ Package size
- ✅ Last update date

### 3. Command Usage
```bash
# Basic syntax
npm view <package-name> [field]

# Examples
npm view express                    # All info
npm view express version           # Just version
npm view express dependencies      # Dependencies
npm view express dist.unpackedSize # Size
```

### 4. Package Evaluation Criteria
- **Popularity**: Weekly downloads
- **Maintenance**: Recent updates
- **Dependencies**: Fewer is often better
- **Documentation**: Quality and completeness
- **License**: Compatible with your project
- **Security**: No known vulnerabilities

## Try These Modifications

### 1. Check Different Packages
Edit check-package.js and change the packages array:
```javascript
const packages = ['react', 'vue', 'svelte'];
```

### 2. Add More Fields
Add additional information to display:
```javascript
'Download Count': getNpmView(packageName, 'dist.shasum'),
'Engines': getNpmView(packageName, 'engines.node'),
```

### 3. Create a Comparison Function
```javascript
function comparePackages(pkg1, pkg2) {
  console.log(`\nComparing ${pkg1} vs ${pkg2}:`);
  console.log(`${pkg1} version: ${getNpmView(pkg1, 'version')}`);
  console.log(`${pkg2} version: ${getNpmView(pkg2, 'version')}`);
}

comparePackages('express', 'koa');
```

### 4. Save to File
```javascript
const fs = require('fs');

function savePackageInfo(packageName) {
  const info = getNpmView(packageName);
  fs.writeFileSync(`${packageName}-info.txt`, info);
  console.log(`Saved to ${packageName}-info.txt`);
}
```

## Practice Exercises

### Exercise 1: Research a Package
Pick a package you're curious about and answer:
1. What is its current version?
2. When was it last updated?
3. How many dependencies does it have?
4. What's its license?
5. Where is its documentation?

### Exercise 2: Compare Alternatives
Compare three similar packages:
```bash
# Example: HTTP clients
npm view axios version
npm view node-fetch version
npm view got version
```

Which would you choose and why?

### Exercise 3: Check Package History
```bash
# View all versions
npm view lodash versions

# View version release dates
npm view lodash time
```

What patterns do you notice?

## Common Questions

**Q: How do I know if a package is trustworthy?**
A: Check:
- Weekly downloads (higher = more trusted)
- GitHub stars and contributors
- Recent updates
- Official maintainers
- Security audit results

**Q: What's a "good" number of dependencies?**
A: Fewer is generally better. Packages with 0-10 dependencies are lean. 50+ dependencies increase bundle size and security risks.

**Q: Should I always use the latest version?**
A: Not always. Consider:
- Stability (1.x.x or higher)
- Your project needs
- Breaking changes in major versions
- Team familiarity

**Q: How often should I check for updates?**
A: Weekly or monthly for active projects. Always before starting new features.

## Troubleshooting

### Problem: "npm view" returns nothing
**Cause**: Package doesn't exist or typo in name
**Solution**: 
```bash
npm search <similar-name>
```

### Problem: Network error
**Cause**: Internet connection or registry issues
**Solution**:
```bash
npm config get registry  # Verify registry
ping registry.npmjs.org  # Check connectivity
```

### Problem: Script doesn't show colors
**Cause**: Terminal doesn't support ANSI colors
**Solution**: Remove color codes or use different terminal

## Related Resources

- **Module 1.4**: Basic NPM Commands
- **Module 1.6**: Practical Examples
- **Exercise 1.4**: Exploring Packages
- **Module 3**: Installing Packages

## Next Steps

After mastering package research:
1. Learn to install packages (Module 3)
2. Understand semantic versioning (Module 4)
3. Manage dependencies effectively (Module 7)

## Additional Commands Reference

```bash
# Search NPM registry
npm search <keyword>

# Show package details in browser
npm docs <package>

# Open repository in browser
npm repo <package>

# Show bugs page
npm bugs <package>

# List package versions
npm view <package> versions --json

# Check deprecation status
npm view <package> deprecated
```