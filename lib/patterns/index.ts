import git from './git.json';
import npm from './npm.json';

interface Pattern {
  file: string;
}

interface Schema {
  [key: string]: Pattern;
}

export const patterns: Schema = {
  git,
  npm,
};
