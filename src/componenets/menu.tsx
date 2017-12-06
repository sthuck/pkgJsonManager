import * as blessed from 'blessed';
import * as React from 'react';

interface MenuProps {
  items: string[];
  onItemSelect: (item: string) => any;
  style: object;
  autoFocus?: boolean;
  top: number | string;
  left: number | string;
  height: number | string;
  width: number | string;
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
        border={{type: 'line'}}
        style={{bold: true, ...this.props.style}}
        onSelect={this.onItemSelect}
        top={this.props.top}
        left={this.props.left}
        height={this.props.height}
        width={this.props.width}
      />
    );
  }

  private onItemSelect = (item: any) => {
    this.props.onItemSelect(item.content);
  }
}
