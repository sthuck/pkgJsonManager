import * as React from 'react';

interface MenuProps {
  items: string[];
  onItemSelect: (item: string) => any;
  style: object;
}

export function Menu(props: MenuProps) {
  return (
    <box top="center"
      left="center"
      width="90%"
      height="90%"
      label="Some Label"
      border={{type: 'line'}}
      style={{border: {fg: 'blue'}}}>
      <list items={['abc', 'def', 'sss']} interactive={true} keys={true} mouse={true} style={{item: {fg: 'blue'}, selected: {fg: 'red'}}}></list>
    </box>
  );
}