import git from './git.json';
import npm from './npm.json';

interface Pattern {
  file: string;
  alwaysIgnored: string[];
  neverIgnored: string[];
}

export const patterns: Record<string, Pattern> = {
  git,
  npm,
};
