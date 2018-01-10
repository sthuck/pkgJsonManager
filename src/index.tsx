import {collectDirs} from './utils/collect-dirs';
import {FolderList} from './componenets/folder-list';
import {cleanDebug, debug} from './utils/debug';
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
        style={{border: {fg: 'green'}}}
      >
        <box
          top="4"
          left="4"
          width="50%"
          height="100%"
          border={{type: 'line'}}
          style={{border: {fg: 'white'}}}
        >
          <FolderList
            style={{
              focus: {
                bg: 'red'
              }
            }}
            autoFocus={true}
          />
        </box>
        <Menu
          items={['foo', 'bla', 'bar']}
          style={{selected: {fg: 'blue'}, item: {fg: 'red'}, focus: {border: {fg: 'red'}}}}
          onItemSelect={noop}
          top="0"
          left="50%"
          width="50%"
          height="100%"
        />
      </box>
    );
  }
}

const p = new (blessed as any).program();
// Creating our screen
const screen = blessed.screen({
  program: p,
  autoPadding: false,
  smartCSR: true,
  dockBorders: true,
  title: 'react-blessed hello world'
});

// Adding a way to quit the program
screen.key(['q', 'C-c'], (ch: any, key: any) => {
  cleanDebug();
  return process.exit(0);
});

screen.key('tab', () => {
  debug.log('calling screen.focusNext');
  screen.focusNext();
});

setInterval(() => {
  debug.log('focus on', screen.focused.type);
}, 1000);

collectDirs('/Users/aviadh/git/bi/').then(dirs => {
  store.dispatch({
    type: 'SetFolders', folders: dirs
  });
});

// Rendering the React app using our screen
const component = render(<Provider store={store}><App /></Provider>, screen);
