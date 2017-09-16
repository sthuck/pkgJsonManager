import * as blessed from 'blessed';
import * as React from 'react';

interface MenuProps {
  items: string[];
  onItemSelect: (item: string) => any;
  style: object;
  autoFocus?: boolean;
}

export class Menu extends React.Component<MenuProps, {}> {
  private list: blessed.Widgets.ListElement;
  public componentDidMount() {
    this.props.autoFocus && this.list.focus();
  }

  public render() {
    return (
      <list
        items={this.props.items}
        interactive={true}
        ref={(list: blessed.Widgets.ListElement) => this.list = list}
        keys={true}
        mouse={true}
        style={{bold: true, ...this.props.style}}
        onSelect={this.onItemSelect}
      />
    );
  }

  private onItemSelect = (item: any) => {
    this.props.onItemSelect(item.content);
  }
}
