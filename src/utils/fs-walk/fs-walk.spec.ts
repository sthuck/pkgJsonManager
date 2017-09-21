// import {afterEachMockFs, beforeEachMockFs, afterAllMockFs} from '../../test/fs-testkit';
// import {FsWalker} from './fs-walk';
// import * as sinon from 'sinon';
// import {expect} from 'chai';

// describe.only('FsWalker', () => {
//   let fsWalker: FsWalker;
//   beforeEach(() => {
//     beforeEachMockFs({
//       '/fake/dir': {
//         'file1.txt': 'foo',
//         'file2.txt': 'bar'
//       }
//     });
//     fsWalker = new FsWalker('/fake/dir');
//   });

//   afterEach(afterEachMockFs);
//   after(afterAllMockFs);

//   it('should walk all files', (done) => {
//     const spy = sinon.spy();
//     fsWalker.on('file', file => spy(file));
//     fsWalker.walk().then(() => {
//       console.log(spy.firstCall.args);
//       console.log(spy.secondCall.args);
//       expect(true).to.eql(true);
//       done();
//     });
//   });
// });
