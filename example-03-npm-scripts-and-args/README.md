# Module 1 - Example 3: NPM Scripts & CLI Arguments

## Overview
This example shows how to:
- Create **npm scripts** for repeatable commands
- **Forward arguments** to Node using `--`
- Read **npm-provided environment variables** (`npm_lifecycle_event`, `npm_package_*`)
- Build a tiny **CLI** with colorful output

## Folder Structure
```
examples/
└── 01-fundamentals/
└── example-03-npm-scripts-and-args/
├── README.md
├── package.json
└── cli.js
```

## Files Content

# Exploring NPM Scripts and CLI Arguments

Learn how to create custom NPM scripts, pass command-line arguments, and access npm-provided environment variables.

## What You'll Learn

- Writing and running scripts with `npm run`
- Forwarding arguments to Node using `--`
- Building simple command-line utilities
- Reading npm environment variables (`npm_lifecycle_event`, `npm_package_*`)
- Structuring colorful CLI output for better UX

## Commands Demonstrated

Type these commands in the terminal:

```bash
# Default greeting
npm start

# Pass custom name to greeting
npm start -- --name=Mohid
npm run hello

# Calculate sum of numbers
npm run sum
# or
node cli.js --sum 2 4 8

# Multiply numbers
npm run mul
# or
node cli.js --mul 3 4 5

# Display npm environment info
npm run lifecycle
# or
node cli.js --env

# Show system info
npm run who
# or
node cli.js --whoami

# Show help menu
npm run help
# or
node cli.js --help
```

## Running the Example

```bash
# Run the package checker script
node cli.js
```

### package.json

```json
{
  "name": "example-03-npm-scripts-and-args",
  "version": "1.0.0",
  "description": "Demonstrates npm scripts, argument forwarding, and npm_* environment variables.",
  "main": "cli.js",
  "type": "commonjs",
  "scripts": {
    "start": "node cli.js",
    "hello": "node cli.js --name=Sara",
    "sum": "node cli.js --sum 3 9 12",
    "mul": "node cli.js --mul 3 4 5",
    "help": "node cli.js --help",
    "who": "node cli.js --whoami",
    "lifecycle": "echo lifecycle=$npm_lifecycle_event && node cli.js --env"
  },
  "keywords": ["npm", "scripts", "arguments", "env", "cli"],
  "author": "Your Name",
  "license": "MIT"
}
```

### cli.js
```javascript
#!/usr/bin/env node

/**
 * Example 03: NPM Scripts + CLI Arguments + npm env
 * - npm run hello
 * - npm run sum
 * - npm run mul
 * - npm start -- --name=Sara
 * - npm run lifecycle
 */

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  red: '\x1b[31m'
};

function line(c = colors.cyan) {
  console.log(`${c}${'='.repeat(64)}${colors.reset}`);
}

function banner(title) {
  console.log(colors.cyan + colors.bright);
  console.log('╔' + '═'.repeat(62) + '╗');
  console.log('║ ' + title.padEnd(62, ' ') + '║');
  console.log('╚' + '═'.repeat(62) + '╝' + colors.reset);
}

function help() {
  banner('NPM Scripts & Arguments — Help');
  console.log(`${colors.yellow}Usage:${colors.reset}`);
  console.log(`  node cli.js [--name=<NAME>]`);
  console.log(`  node cli.js --sum <numbers...>`);
  console.log(`  node cli.js --mul <numbers...>`);
  console.log(`  node cli.js --env`);
  console.log(`  node cli.js --whoami`);
  console.log(`  node cli.js --help`);
  line();
  console.log(`${colors.yellow}NPM shortcuts:${colors.reset}`);
  console.log(`  npm run hello         ${colors.dim}# runs: node cli.js --name=Sara${colors.reset}`);
  console.log(`  npm run sum           ${colors.dim}# runs: node cli.js --sum 3 9 12${colors.reset}`);
  console.log(`  npm run mul           ${colors.dim}# runs: node cli.js --mul 3 4 5${colors.reset}`);
  console.log(`  npm start -- --name=Mohid`);
  console.log(`  npm run lifecycle     ${colors.dim}# shows npm_lifecycle_event & npm_package_* vars${colors.reset}`);
  line();
}

function parseArgs(argv) {
  const raw = argv.slice(2);
  const flags = {};
  const positionals = [];
  for (const a of raw) {
    if (a.startsWith('--') && a.includes('=')) {
      const [k, v] = a.slice(2).split('=');
      flags[k] = v;
    } else if (a.startsWith('--')) {
      flags[a.slice(2)] = true; // boolean flag like --sum, --mul, --env
    } else {
      positionals.push(a);
    }
  }
  return { raw, flags, positionals };
}

function asNumbers(arr) {
  const nums = arr.map(Number);
  const ok = nums.length > 0 && nums.every(Number.isFinite);
  return ok ? nums : null;
}

function showEnv() {
  banner('npm environment snapshot');
  const out = {
    npm_lifecycle_event: process.env.npm_lifecycle_event,
    npm_package_name: process.env.npm_package_name,
    npm_package_version: process.env.npm_package_version,
    node: process.version
  };
  console.log(out);
  line();
}

function whoAmI() {
  banner('Who Am I');
  console.log(`${colors.green}Platform:${colors.reset} ${process.platform}`);
  console.log(`${colors.green}Node:${colors.reset} ${process.version}`);
  console.log(`${colors.green}CWD:${colors.reset} ${process.cwd()}`);
  line();
}

function greet(name) {
  banner('Greeter');
  console.log(`${colors.green}Hello, ${name}!${colors.reset} 👋`);
  console.log(`${colors.dim}(Tip: try "npm start -- --name=YourName")${colors.reset}`);
  line();
}

function doSum(nums) {
  banner('Sum Calculator');
  const total = nums.reduce((a, b) => a + b, 0);
  console.log(`${colors.blue}Numbers:${colors.reset} ${nums.join(', ')}`);
  console.log(`${colors.yellow}Total: ${colors.reset}${total}`);
  line();
}

function doMul(nums) {
  banner('Multiply Calculator');
  const product = nums.reduce((a, b) => a * b, 1);
  console.log(`${colors.blue}Numbers:${colors.reset} ${nums.join(', ')}`);
  console.log(`${colors.yellow}Product: ${colors.reset}${product}`);
  line();
}

(function main() {
  banner('NPM Scripts + CLI Arguments Demo');
  const { raw, flags, positionals } = parseArgs(process.argv);

  console.log(`${colors.magenta}Raw args: ${colors.reset}`, raw);
  line();

  if (flags.help) return help();
  if (flags.env) return showEnv();
  if (flags.whoami) return whoAmI();

  if (flags.sum) {
    const nums = asNumbers(positionals);
    if (!nums) {
      console.log(`${colors.red}Error:${colors.reset} Usage: node cli.js --sum <numbers...>`);
      return;
    }
    return doSum(nums);
  }

  if (flags.mul) {
    const nums = asNumbers(positionals);
    if (!nums) {
      console.log(`${colors.red}Error:${colors.reset} Usage: node cli.js --mul <numbers...>`);
      return;
    }
    return doMul(nums);
  }

  // default: greeting
  const name = flags.name || 'World';
  return greet(name);
})();
```

### package-comparison.txt
```
NPM SCRIPTS & CLI ARGUMENTS CHECKLIST
=====================================

When experimenting with NPM scripts and Node CLI programs, remember these core areas:

1. SCRIPT CREATION & EXECUTION
   □ Define custom scripts inside package.json under "scripts"
   □ Use short names like "start", "hello", "sum", etc.
   □ Run with "npm run <script>"
   □ Forward extra arguments with "--"

2. ARGUMENT HANDLING
   □ Access raw arguments using process.argv
   □ Parse flags (e.g. --name=Sara, --sum)
   □ Separate boolean flags from values
   □ Validate numeric inputs

3. CLI USER EXPERIENCE
   □ Add colorful output for readability
   □ Show help and usage examples
   □ Include separators or banners for clarity
   □ Display errors clearly

4. ENVIRONMENT VARIABLES
   □ Read npm-provided vars: npm_package_name, npm_package_version
   □ Read npm_lifecycle_event to detect which script was run
   □ Use "npm run lifecycle" to test these values
   □ Combine CLI args and env vars for richer info

5. BEST PRACTICES
   □ Keep commands short & self-descriptive
   □ Use "npm start" for default actions
   □ Include "help" script for discoverability
   □ Avoid hardcoding personal info
   □ Keep scripts cross-platform (avoid OS-specific commands)

EXAMPLE ACTIONS: GREETING, SUM, MULTIPLY, ENV CHECK
===================================================

Greeting:
✓ Default run prints "Hello, World!"
✓ Accepts --name flag (e.g., --name=Sara)
✓ Demonstrates argument forwarding via npm start -- --name=<NAME>

Sum:
✓ Triggered with --sum flag or npm run sum
✓ Accepts multiple numeric arguments
✓ Returns total using reduce()

Multiply:
✓ Triggered with --mul flag or npm run mul
✓ Multiplies all provided numbers
✓ Useful to verify positional arguments

Environment Info:
✓ Triggered with --env or npm run lifecycle
✓ Prints npm_lifecycle_event and npm_package_* vars
✓ Great for understanding npm runtime context

Help:
✓ Shows all supported flags and usage examples
✓ Access via npm run help or node cli.js --help

DECISION FACTORS:
- Need argument parsing demo? → Run --sum or --mul
- Need npm environment demo? → Run --env or lifecycle script
- Want to test argument forwarding? → npm start -- --name=Sara

COMMANDS FOR PRACTICE
=====================

# Default greeting
npm start

# Greeting with custom name
npm start -- --name=Sara
npm run hello

# Calculate sum of numbers
npm run sum
node cli.js --sum 3 4 9

# Multiply numbers
npm run mul
node cli.js --mul 2 5 10

# Show npm environment variables
npm run lifecycle
node cli.js --env

# Display system info
npm run who
node cli.js --whoami

# Show help menu
npm run help
node cli.js --help
```

## How to Use This Example

### Step 1: Navigate to the example
```bash
cd examples/module-01/example-03-npm-scripts-and-args
```

## Step 2: Run the main script
```bash
npm start
# or
node cli.js
```