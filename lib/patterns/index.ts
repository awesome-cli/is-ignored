import git from './git.json';
import npm from './npm.json';

interface Pattern {
  file: string;
  alwaysIgnored: string[];
  neverIgnored: string[];
}

interface Schema {
  [key: string]: Pattern;
}

export const patterns: Schema & any = {
  git,
  npm,
};
