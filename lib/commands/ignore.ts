import program from 'commander';
import fs from 'fs';

const ignore = (configFile: string) => {
  const config = fs.readFileSync(configFile, 'utf-8');

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
