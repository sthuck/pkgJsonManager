import blessed = require('blessed');
import * as React from 'react';
import {render} from 'react-blessed';

import {FolderPicker} from './componenets/folder-picker';
import {Menu} from './componenets/menu';

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
        border={{type: 'line'}}
        style={{border: {fg: 'green'}}}
      >
        <FolderPicker
          items={['abc', 'def', 'sss']}
          style={{
            border: {fg: 'blue'}
          }}
          autoFocus={true}
        />
      </box>
    );
  }
}

// Creating our screen
const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'react-blessed hello world'
});

// Adding a way to quit the program
screen.key(['escape', 'q', 'C-c'], (ch: any, key: any) => {
  return process.exit(0);
});

// Rendering the React app using our screen
const component = render(<App />, screen);
