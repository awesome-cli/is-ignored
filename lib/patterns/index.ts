import git from './git.json';
import npm from './npm.json';

import { Pattern } from '../interfaces/Pattern';

export const patterns: Record<string, Pattern> = {
  git,
  npm,
};
