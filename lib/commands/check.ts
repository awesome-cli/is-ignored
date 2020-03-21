import program from 'commander';
import chalk from 'chalk';
import fs from 'fs';

import { patterns } from '../patterns';

program
  .command('check <config> <dir>')
  .description('display ignored & not ignored files')
  .alias('ch')
  .action((config: string, dir: string) => {
    let file: string;

    if (!Object.keys(patterns).includes(config)) {
      if (!fs.existsSync(config)) {
        console.log(`File ${config} not exists`);

        process.exit(1);
      }

      if (config.indexOf('ignore') === -1) {
        console.log(`${config} is not an ignore file`);

        process.exit(1);
      }

      file = config;
    } else if (!fs.existsSync(patterns[config].file)) {
      console.log(`Config file for ${config} not found`);

      process.exit(1);
    } else {
      file = patterns[config].file;
    }

    if (dir === undefined) {
      console.log('Directory is not specified');

      process.exit(1);
    } else if (!fs.existsSync(dir)) {
      console.log(`Directory ${dir} not exists`);

      process.exit(1);
    }

    const lines = fs
      .readFileSync(file, 'utf-8')
      .split('\n')
      .filter((line) => line !== '' && line !== '#');

    fs.readdirSync(dir).map((file) => {
      if (lines.includes(file)) {
        console.log(chalk.red(file));
      } else {
        console.log(chalk.green(file));
      }
    });
  });
