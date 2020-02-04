import program from 'commander';
import fs from 'fs';

import { patterns } from '../patterns';

const ignore = (configFile: string) => {
  const config = fs.readFileSync(
    patterns?.[configFile]?.file || configFile,
    'utf-8'
  );

  if (!config) {
    return console.log(`${config} not found`);
  }

  process.argv.slice(4).map(file => {
    if (!config.includes(file)) {
      fs.appendFileSync(configFile, `\n${file}`);
    } else {
      console.log(`${file} is already ignored`);
    }
  });
};

program
  .command('ignore <config> <files>')
  .description('ignore files and directories in config')
  .alias('i')
  .action(config => ignore(config));
