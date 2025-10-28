#!/usr/bin/env node

/**
 * NPM Script Runner and CLI Argument Parser (V2 - Clean Output)
 * Demonstrates how to handle arguments passed via 'npm run <script> -- ...'
 */

const chalk = require('chalk');
const minimist = require('minimist');
console.log('Booting script-runner.js...'); // temporary debug

// Custom argument parser: slice(2) removes 'node' and 'script-runner.js'
// We use 'boolean' to handle --no-debug and 'alias' for shorter arguments
const args = minimist(process.argv.slice(2), {
    alias: {
        env: 'environment', // --env will be treated as --environment
        l: 'log-level'      // -l will be treated as --log-level
    },
    boolean: ['debug'],     // Arguments like --debug, --no-debug will be treated as boolean
    default: {
        environment: 'development',
        'log-level': 'debug',
        debug: true
    }
}); 

// --- Color and Style Configuration ---
const log = console.log;
const error = chalk.bold.red;
const success = chalk.green;
const info = chalk.yellow;
const header = chalk.bgBlue.white.bold;
const divider = chalk.cyan('='.repeat(60));
const subDivider = chalk.gray('-'.repeat(60));


/**
 * Prints a clean, structured header for the output.
 */
function printHeader(taskName) {
    log(divider);
    log(header(' ⚙️  NPM SCRIPTS & ARGUMENTS MASTER 🚀 ').padEnd(65, ' '));
    log(divider);
    log(success(`\n✅ RUNNING TASK: ${taskName.toUpperCase()}\n`));
    log(subDivider);
}

/**
 * Executes a specific task based on the '--task' argument.
 */
function runTask(taskName) {
    printHeader(taskName);

    // Get the raw arguments passed after the script name for better display
    // process.argv.slice(3) contains all arguments after 'node' and 'script-runner.js' and the first argument (which is usually --task=...)
    const rawArgs = process.argv.slice(3).join(' '); 
    log(info('✨ RAW ARGUMENTS PASSED:'));
    log(chalk.white(rawArgs || chalk.italic('No custom arguments passed.')));

    log(subDivider);

    switch (taskName) {
        case 'greet':
            handleGreet();
            break;
        case 'start':
            handleStart();
            break;
        case 'configure':
            handleConfigure();
            break;
        default:
            log(error(`❌ ERROR: Unknown task '${taskName}'.`));
            break;
    }
    
    log(divider);
}

/**
 * Handles the 'greet' script (Positional Argument focus).
 */
function handleGreet() {
    // Positional arguments are in args._
    const name = args._[0] || 'NPM Master'; 
    const message = `👋 Welcome, ${chalk.magenta.bold(name)}!`;
    
    log(chalk.bold.yellow('🚀 GREETING STATUS:'));
    log(`- Message: ${success(message)}`);
    
    log(`\n${info('💡 TIP:')} Pass your name using: ${chalk.white('npm run greet -- "Your Name"')}`);
}

/**
 * Handles the 'start' script (Named Argument focus).
 */
function handleStart() {
    const port = args.port || 3000;
    const env = args.env;
    
    log(chalk.bold.yellow('🚀 SERVER START CONFIG:'));
    log(`- Environment: ${env === 'production' ? chalk.red('🔴 PRODUCTION') : chalk.cyan(env.toUpperCase())}`);
    log(`- Port:        ${chalk.magenta.bold(port)}`);
    log(`- Debug:       ${args.debug ? chalk.green('True') : chalk.red('False')}`);
    
    log(`\n${info('💡 TIP:')} Change port using: ${chalk.white('npm run start-dev -- --port=8080')}`);
}

/**
 * Handles the 'configure' script (Complex Configuration focus).
 */
function handleConfigure() {
    const env = args.env;
    const logLevel = args['log-level'].toUpperCase();
    const isDebug = args.debug;
    
    log(chalk.bold.yellow('🔍 PARSED CONFIGURATION:'));
    log(`- Environment: ${env === 'testing' ? chalk.yellow('🟡 TESTING') : env === 'production' ? chalk.red('🔴 ' + env.toUpperCase()) : chalk.cyan(env.toUpperCase())}`);
    log(`- Log Level:   ${chalk.white.bgHex('#FF8C00')(' ' + logLevel + ' ')}`);
    log(`- Debug Mode:  ${isDebug ? chalk.green('✅ Enabled') : chalk.red('❌ Disabled')}` + ' ' + chalk.gray(`(Default: ${args.debug ? 'Enabled' : 'Disabled'})`));

    log(`\n${info('💡 TIP:')} To enable production mode, use ${chalk.white('--env=production')}.`);
    log(`       To disable debug mode, use ${chalk.white('--no-debug')}.`);
}

// --- Main Execution ---
const task = args.task;

if (!task) {
    log(error(`\nFatal Error: Missing required argument '--task'.`));
    log(info(`Usage: npm run <script-name> -- --task=<task-name>`));
    log(divider);
} else {
    runTask(task);
}

// Add final footer for cleanliness
log(divider);
