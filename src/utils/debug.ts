import {Console} from 'console';
import * as net from 'net';
import * as os from 'os';
import {Writable} from 'stream';

const connections: net.Socket[] = [];

const server = net.createServer(c => {
  connections.push(c);
  myConsole = new Console(c);
  c.on('end', () => {
    const index = connections.indexOf(c);
    connections.splice(index, 1);
  });
});

server.listen('/tmp/pkgJsonDebug');

// class SocketWriteable extends Writable {
//   public _write(str: string) {
//     connections.forEach(c => c.write(str));
//   }
// }

let myConsole: Console;

export const debug = {
  log: (...args: any[]) => {
    if (myConsole) {
      myConsole.log(...args);
    }
  }
};

export const cleanDebug = () => server.close();
