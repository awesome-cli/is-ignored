import program from 'commander';
import chalk from 'chalk';
import fs from 'fs';

import { patterns } from '../patterns';

program
  .command('check <config> <dir>')
  .description('display ignored & not ignored files')
  .alias('ch')
  .action((config, dir) => {
    let file: string;

    if (!Object.keys(patterns).includes(config)) {
      if (!fs.existsSync(config)) {
        return console.log(`File ${config} not exists`);
      }

      if (config.indexOf('ignore') === -1) {
        return console.log(`${config} is not an ignore file`);
      }

      file = config;
    } else if (!fs.existsSync(patterns[config].file)) {
      return console.log(`Config file for ${config} not found`);
    } else {
      file = patterns[config].file;
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

    fs.readdirSync(dir).map(file => {
      if (lines.includes(file)) {
        console.log(chalk.red(file));
      } else {
        console.log(chalk.green(file));
      }
    });
  });
