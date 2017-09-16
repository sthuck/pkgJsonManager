import {FolderList} from './componenets/folder-list';
import {cleanDebug} from './utils/debug';
import blessed = require('blessed');
import * as React from 'react';
import {render} from 'react-blessed';
import {noop} from 'lodash';
import {CheckboxList} from './componenets/checkbox-list';
import {Menu} from './componenets/menu';
import {Provider} from 'react-redux';
import {store} from './store';

// const onItemSelect: any = (p1: any, p2: any) => {
//   console.log('=====', p1);
// };

// Rendering a simple centered box
class App extends React.Component<{}, {}> {
  public render() {
    return (
      <box
        top="center"
        left="center"
        width="100%"
        height="100%"
        label="Some Label"
        padding="0"
        style={{border: {fg: 'green'}}}
      >
        <box
          top="0"
          left="0"
          width="50%"
          height="100%"
          border={{type: 'line'}}
          style={{border: {fg: 'white'}}}
        >
          <FolderList
            style={{
            }}
            onChange={noop}
            autoFocus={true}
          />
        </box>
        <box
          top="0"
          left="50%-1"
          width="50%+1"
          height="100%"
          border={{type: 'line'}}
          style={{border: {fg: 'white'}}}
        >
          <Menu
            items={['foo', 'bla', 'bar']}
            style={{selected: {fg: 'blue'}, item: {fg: 'red'}}}
            onItemSelect={noop}
          />

        </box>
      </box>
    );
  }
}

const p = new (blessed as any).program();
// Creating our screen
const screen = blessed.screen({
  program: p,
  autoPadding: true,
  smartCSR: true,
  dockBorders: true,
  title: 'react-blessed hello world'
});

// Adding a way to quit the program
screen.key(['escape', 'q', 'C-c'], (ch: any, key: any) => {
  cleanDebug();
  return process.exit(0);
});
store.dispatch({
  type: 'SetFolders', folders: [
    {
      id: 1,
      name: 'foo',
      checked: false
    },
    {
      id: 2,
      name: 'bad',
      checked: false
    },
    {
      id: 3,
      name: 'foo3',
      checked: true
    }
  ]
});
// Rendering the React app using our screen
const component = render(<Provider store={store}><App /></Provider>, screen);
