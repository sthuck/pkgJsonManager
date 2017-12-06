import {FsWalker} from './fs-walk/fs-walk';
import * as path from 'path';

export const collectDirs = async (baseDir: string) => {
  const allDirs: string[] = [];
  const walker = new FsWalker(baseDir,
    {maxdepth: 2, ignore: ['**/.git'], criteria: [{containsFilename: '*package.json'}]});

  walker.on(FsWalker.entryTypes.DIR, (name, parent) => {
    allDirs.push(name);
  });

  await walker.walk();
  return allDirs.map(dir => dir.replace(baseDir, ''))
    .map(dir => ({name: dir, id: dir, checked: false}));
};

// collectDirs('/Users/aviadh/git/bi/').then(console.log).catch(console.log);
