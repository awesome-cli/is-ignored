import program from 'commander';
import fs from 'fs';

import { getConfigFile } from '../helpers/getConfigFile';
import { getFileContent } from '../helpers/getFileContent';

program
  .command('unignore <config> <files>')
  .description('unignore files and directories in config')
  .alias('ui')
  .action((configFile: string) => {
    configFile = getConfigFile(configFile);

    let config = getFileContent(configFile);

    const files = process.argv.slice(4);

    files.map(file => {
      if (config.includes(file)) {
        config = config
          .split('\n')
          .filter(line => line !== file)
          .join('\n');
      } else {
        console.log(`${file} is not ignored`);
      }
    });

    fs.writeFileSync(configFile, config, 'utf-8');
  });
