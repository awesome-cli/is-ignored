import { patterns } from '../patterns';

export const getConfigFile = (name: string) => {
  return patterns?.[name]?.file || name;
};
