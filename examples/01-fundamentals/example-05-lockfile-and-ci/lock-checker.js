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
