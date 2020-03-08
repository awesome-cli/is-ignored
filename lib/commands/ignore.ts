import program from 'commander';
import fs from 'fs';

import { patterns } from '../patterns';

program
  .command('ignore <config> <files>')
  .description('ignore files and directories in config')
  .alias('i')
  .action(configFile => {
    configFile = patterns?.[configFile]?.file || configFile;

    const config = fs.readFileSync(configFile, 'utf-8');

    if (!config) {
      return console.log(`${config} not found`);
    }

    process.argv.slice(4).map(file => {
      if (!config.includes(file)) {
        fs.appendFileSync(
          configFile,
          `${config[config.length - 1] === '\n' ? '' : '\n'}${file}`
        );
      } else {
        console.log(`${file} is already ignored`);
      }
    });
  });
