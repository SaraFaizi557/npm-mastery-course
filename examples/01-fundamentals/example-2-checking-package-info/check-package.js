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

    console.log(`${colors.yellow}  Checking information for popular packages...${colors.reset}\n`);

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

    console.log(`${colors.bright}${colors.yellow} Next Steps:${colors.reset}`);
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