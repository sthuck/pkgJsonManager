import * as blessed from 'blessed';
import * as React from 'react';

interface FolderProps {
  items: string[];
  autoFocus?: boolean;
  style: object;
}

export class FolderPicker extends React.Component<FolderProps, {}> {
  private form: blessed.Widgets.FormElement<any>;
  public componentDidMount() {
    this.props.autoFocus && this.form.focus();
  }

  public render() {
    const items = this.props.items;
    return (
      <form
        keys={true}
        border={{type: 'bg', bg: 12}}
        top="0"
        left="0"
        height="100%"
        width="100%"
        padding="300"
        ref={(form: blessed.Widgets.FormElement<any>) => this.form = form}
        style={this.props.style}
      >
        <layout
          top="0"
          left="0"
          height="90%"
          width="90%"
        >

          {/* {items.map((item, index) => <checkbox key={index} text={item} />)} */}
          <checkbox text="1123" />
          <checkbox text="112223" />
          <checkbox text="122123" />
          <checkbox text="112223" />
        </layout>
      </form>
    );
  }

  private onItemSelect = (item: any) => {
    // this.props.onItemSelect(item.content);
  }
}
