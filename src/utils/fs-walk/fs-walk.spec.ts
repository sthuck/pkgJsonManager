import * as mockFs from 'mock-fs';
import {FsWalker} from './fs-walk';
import * as sinon from 'sinon';
import {expect} from 'chai';
import {cloneDeep} from 'lodash';
const {FILE, DIR} = FsWalker.entryTypes;

describe.only('FsWalker', () => {
  let fsWalker: FsWalker;
  const baseFs = {
    '/dir1': {
      file1: '11111',
      dir2: {
        file2: '22222',
        file3: '33333'
      }
    }
  };
  describe('simple usage', () => {
    before(() => {
      mockFs(baseFs, {createCwd: false, createTmp: false});
    });

    beforeEach(() => fsWalker = new FsWalker('/'));

    after(mockFs.restore);

    it('should walk all files, by filename order', () => {
      const spy = sinon.spy();
      fsWalker.on(FILE, file => spy(file));
      return fsWalker.walk().then(() => {
        const allCallsFirstarg = spy.getCalls().map(call => call.args[0]);
        expect(allCallsFirstarg).to.eql(['/dir1/dir2/file2', '/dir1/dir2/file3', '/dir1/file1']);
      });
    });

    it('should emit directory event before file events in the directory', () => {
      const calls: string[] = [];
      const handler = (fileOrDir: string) => calls.push(fileOrDir);
      fsWalker.on(FILE, handler);
      fsWalker.on(DIR, handler);
      return fsWalker.walk().then(() => {
        expect(calls).to.eql(['/dir1', '/dir1/dir2', '/dir1/dir2/file2', '/dir1/dir2/file3', '/dir1/file1']);
      });
    });

    it('should stop at requested depth', () => {
      fsWalker = new FsWalker('/', {maxdepth: 2});

      const calls: string[] = [];
      const handler = (fileOrDir: string) => calls.push(fileOrDir);
      fsWalker.on(FILE, handler);
      fsWalker.on(DIR, handler);
      return fsWalker.walk().then(() => {
        expect(calls).to.eql(['/dir1', '/dir1/dir2', '/dir1/file1']);
      });
    });
  });
});
