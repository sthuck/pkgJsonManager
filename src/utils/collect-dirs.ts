import {FsWalker} from './fs-walk/fs-walk';
import * as path from 'path';

export const collectDirs = async (baseDir: string): Promise<string[]> => {
  const allDirs: string[] = [];
  const walker = new FsWalker(baseDir, {maxdepth: 3, criteria: [{name: '*/package.json'}]});

  walker.on(FsWalker.entryTypes.FILE, (name, parent) => {
    allDirs.push(name);
  });

  await walker.walk();
  return allDirs;
};

collectDirs('/Users/aviadh/git/bi/').then(console.log).catch(console.log);
