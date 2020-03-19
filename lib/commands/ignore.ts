import program from 'commander';
import fs from 'fs';

import { getConfigFile } from '../helpers/getConfigFile';
import { getFileContent } from '../helpers/getFileContent';

program
  .command('ignore <config> <files>')
  .description('ignore files and directories in config')
  .alias('i')
  .action((configFile: string) => {
    configFile = getConfigFile(configFile);

    const config = getFileContent(configFile);

    const files = process.argv.slice(4);

    files.map(file => {
      if (!config.includes(file)) {
        fs.appendFileSync(
          configFile,
          `${config[config.length - 1] === '\n' ? '' : '\n'}${file}\n`
        );
      } else {
        console.log(`${file} is already ignored`);
      }
    });
  });
