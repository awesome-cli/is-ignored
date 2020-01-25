import program from 'commander';
// import columnify from 'columnify';
import chalk from 'chalk';
import fs from 'fs';

import { patterns } from '../patterns';

const check = (config: string, dir: string, cmd: any) => {
  let file: string;
  let defaultIgnore: any;
  let defaultNotIgnore: any;

  const {
    showIgnored,
    showNotIgnored,
    shouldNotBeIgnored,
    shouldBeIgnored,
    showDefaultNotIgnored,
    showDefaultIgnored,
  } = cmd[0];

  if (!Object.keys(patterns).includes(config)) {
    if (!fs.existsSync(config)) {
      return console.log(`File ${config} not exists`);
    }

    if (config.indexOf('ignore') === -1) {
      return console.log(`${config} is not an ignore file`);
    }

    file = config;
  } else {
    if (!fs.existsSync(patterns[config].file)) {
      return console.log(`Config file for ${config} not found`);
    } else {
      file = patterns[config].file;
      defaultIgnore = patterns[config].defaultIgnore;
      defaultNotIgnore = patterns[config].defaultNotIgnore;
    }
  }

  if (dir === undefined) {
    return console.log('Directory is not specified');
  } else if (!fs.existsSync(dir)) {
    return console.log(`Directory ${dir} not exists`);
  }

  const lines = fs
    .readFileSync(file, 'utf-8')
    .split('\n')
    .filter(line => line !== '' && line !== '#');

  fs.readdirSync(dir)
    .filter(file => !patterns[config]?.defaultIgnore?.includes(file))
    .map(file => {
      if (lines.includes(file)) {
        if (
          showIgnored ||
          (showIgnored === undefined && showNotIgnored === undefined) ||
          !showNotIgnored
        ) {
          if (shouldNotBeIgnored) {
            console.log(
              `${chalk.red(file)} ${chalk.cyanBright(
                '===> this file should not be ignored'
              )}`
            );
          } else {
            console.log(chalk.red(file));
          }
        }
      } else {
        if (
          !showIgnored ||
          (showIgnored === undefined && showNotIgnored === undefined) ||
          showNotIgnored
        ) {
          if (shouldBeIgnored) {
            console.log(
              `${chalk.green(file)} ${chalk.magentaBright(
                '===> this file should be ignored'
              )}`
            );
          } else {
            console.log(chalk.green(file));
          }
        }
      }
    });
};

program
  .command('check <config> <dir>')
  .description('display ignored & not ignored files')
  .alias('ch')
  .option('-d, --show-default-ignored', '')
  .option('-g, --show-default-not-ignored', '')
  .option('-s, --should-be-ignored', '')
  .option('-x, --should-not-be-ignored', '')
  .option('-i, --show-ignored', '')
  .option('-n, --show-not-ignored', '')
  .action((config, dir, ...cmd) => check(config, dir, cmd));
