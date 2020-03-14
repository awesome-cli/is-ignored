import fs from 'fs';

export const getFileContent = (configFile: string) => {
  let config: string;

  try {
    config = fs.readFileSync(configFile, 'utf-8');
  } catch {
    console.log(`File ${configFile} not exists`);

    process.exit(1);
  }

  return config;
};
