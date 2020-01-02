#!/usr/bin/env node

import path from 'path';
import program from 'commander';
import chalk from 'chalk';
import * as fs from 'fs';

import { patterns } from './patterns';

const pkg = require(path.join(__dirname, '../package.json'));

program.version(pkg.version).description(chalk.blue('is ignored'));

program
  .command('is-ignored <file> [dir]')
  .alias('ii')
  .description('')
  .option('-d --show-default-ignored', '')
  .option('-g --show-default-not-ignored', '')
  .option('-s --should-be-ignored', '')
  .option('-x --should-not-be-ignored', '')
  .option('-i --show-igonred', '')
  .option('-n --show-not-igonred', '')
  .option('-m --list-node-modules', '')
  .action((...cmd: string[]) => {
    let file: string;

    if (!Object.keys(patterns).includes(cmd[0])) {
      if (!fs.existsSync(cmd[0])) {
        return console.log(`File ${cmd[0]} not exists`);
      }

      if (cmd[0].indexOf('ignore') === -1) {
        return console.log(`${cmd[0]} is not an ignore file`);
      }

      file = cmd[0];
    } else {
      if (!fs.existsSync(patterns[cmd[0]].file)) {
        return console.log(`Config file for ${cmd[0]} not found`);
      } else {
        file = patterns[cmd[0]].file;
      }
    }

    if (cmd[1] === undefined) {
      return console.log('Directory is not specified');
    } else if (!fs.existsSync(cmd[1])) {
      return console.log(`Directory ${cmd[1]} not exists`);
    }

    const dir = fs.readdirSync(cmd[1]);

    const showIgnored = undefined;

    const lines = fs
      .readFileSync(file, 'utf-8')
      .split('\n')
      .filter(line => line !== '' && line !== '#');

    dir.map(file => {
      if (lines.includes(file)) {
        if (showIgnored || showIgnored === undefined) {
          console.log(chalk.red(file));
        }
      } else {
        if (!showIgnored || showIgnored === undefined) {
          console.log(chalk.green(file));
        }
      }
    });
  });

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
