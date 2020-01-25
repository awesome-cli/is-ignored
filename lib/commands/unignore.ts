import program from 'commander';
import fs from 'fs';

const unignore = (configFile: string, files: string[]) => {
  const config = fs.readFileSync(configFile, 'utf-8');

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
};

program
  .command('unignore <config> <files>')
  .description('unignore files and directories in config')
  .alias('ui')
  .action(config => {
    unignore(config, process.argv.slice(4));
  });
