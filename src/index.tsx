import * as React from 'react';
import blessed = require('blessed');
import {render} from 'react-blessed';

// Rendering a simple centered box
class App extends React.Component {
  render() {
    return (
      <box top="center"
           left="center"
           width="50%"
           height="50%"
           border={{type: 'line'}}
           style={{border: {fg: 'blue'}}}>
        <list items={['abc', 'def', 'sss']} interactive={true} keys={true} mouse={true} style={{item: {fg: 'blue'}, selected: {fg: 'red'}}}></list>
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
screen.key(['escape', 'q', 'C-c'], function(ch: any, key: any) {
  return process.exit(0); 
});

// Rendering the React app using our screen
const component = render(<App />, screen);