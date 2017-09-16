import {debug} from '../utils/debug';
import * as blessed from 'blessed';
import * as React from 'react';

export type CheckboxListItems = Array<{
  id: string | number,
  name: string,
  checked: boolean
}>;

interface CheckboxListProps {
  items: CheckboxListItems;
  autoFocus?: boolean;
  style: object;
  onCheck: (id: string | number) => void;
  onUncheck: (id: string | number) => void;
}

export class CheckboxList extends React.Component<CheckboxListProps, {}> {
  private form: blessed.Widgets.FormElement<any>;
  public componentDidMount() {
    this.props.autoFocus && this.form.focus();
    this.form.on('click', () => this.form.focus());
    this.form.on('element check', (element: blessed.Widgets.CheckboxElement) => {
      this.props.onCheck(element.name);
    });
    this.form.on('element uncheck', (element: blessed.Widgets.CheckboxElement) => {
      this.props.onUncheck(element.name);
    });
  }

  public render() {
    const items = this.props.items;
    return (
      <form
        keys={true}
        mouse={true}
        border={{type: 'bg', bg: 2}}
        ref={(form: blessed.Widgets.FormElement<any>) => this.form = form}
        style={this.props.style}
      >
        <layout
          height="100%-4"
          width="100%-4"
        >
          {items.map((item, index) =>
            <checkbox
              width="80%"
              shrink={true}
              mouse={true}
              key={item.id}
              name={item.id}
              text={item.name}
              checked={item.checked}
            />)}

        </layout>
      </form>
    );
  }

  private onItemSelect = (item: any) => {
    // this.props.onItemSelect(item.content);
  }
}
