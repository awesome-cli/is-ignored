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

    const config = getFileContent(configFile);

    const files = process.argv.slice(4);

    files.map(file => {
      if (config.includes(file)) {
        fs.writeFileSync(
          configFile,
          config
            .split('\n')
            .filter(line => line !== file)
            .join('\n'),
          'utf-8'
        );
      } else {
        console.log(`${file} is not ignored`);
      }
    });
  });
