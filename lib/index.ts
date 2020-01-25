#!/usr/bin/env node

import path from 'path';
import program from 'commander';
import figlet from 'figlet';
import chalk from 'chalk';

import './commands/check';
import './commands/ignore';
import './commands/unignore';

const pkg = require(path.join(__dirname, '../package.json'));

program
  .version(pkg.version)
  .description('Check which files and directories in project are ignored')
  .usage('<cmd> [options]');

program.on('command:*', (commands?: string[]) => {
  if (commands) {
    console.error(`error: unknown command: ${commands[0]}`);

    process.exit(1);
  }
});

program.on('--help', () => {
  console.log(
    chalk.greenBright(
      figlet.textSync('Is Ignored?', { horizontalLayout: 'full' })
    )
  );
});

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.help();
}
