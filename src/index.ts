#!/usr/bin/env node

import path from 'path';
import program from 'commander';
import chalk from 'chalk';

const pkg = require(path.join(__dirname, '../package.json'));

program.version(pkg.version).description(chalk.blue('is ignored'));

program
  .command('is-ignored <file> [dir]')
  .alias('ii')
  .description('')
  .option('-i --show-igonred', '')
  .option('-n --show-not-igonred', '')
  .option('-m --list-node-modules', '')
  .action(cmd => {});

program.on('command:*', () => {
  console.error(chalk.red('Invalid command'));

  process.exit(1);
});

if (!process.argv.slice(2).length) {
  console.warn('No command specified');

  process.exit(1);
}

if (!process.argv.slice(3).length) {
  program.command('is-ignored').outputHelp();

  process.exit(1);
}

program.parse(process.argv);
