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
  .description(pkg.description)
  .usage('<cmd>');

program.on('--help', () => {
  console.log(
    chalk.greenBright(
      figlet.textSync('Is Ignored?', { horizontalLayout: 'full' })
    )
  );
});

program.parse(process.argv);
