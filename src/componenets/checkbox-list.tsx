import {debug} from '../utils/debug';
import * as blessed from 'blessed';
import * as React from 'react';
import {findIndex} from 'lodash';

export type CheckboxListItems = Array<{
  id: string | number,
  name: string,
  checked: boolean
}>;

interface CheckboxListProps {
  items: CheckboxListItems;
  autoFocus?: boolean;
  style: object;
  onCheck: (id: string | number) => any;
  onUncheck: (id: string | number) => any;
}

export class CheckboxList extends React.Component<CheckboxListProps, {}> {
  private form: blessed.Widgets.FormElement<any>;

  public componentDidMount() {
    this.form.on('click', () => this.form.focus());

    this.form.on('element check', (element: blessed.Widgets.CheckboxElement) => {
      this.props.onCheck(element.name);
    });

    this.form.on('element uncheck', (element: blessed.Widgets.CheckboxElement) => {
      this.props.onUncheck(element.name);
    });

    this.form.on('element keypress', (elem: any, ch: any, key: {full: string}) => {
      const totalItems = this.props.items.length;
      const itemIndex = findIndex(this.props.items, {id: elem.name});
      switch (key.full) {
        case 'up':
          this.form.focusPrevious();
          break;
        case 'down':
          this.form.focusNext();
          break;
        case 'tab':
          debug.log('calling screen.focusOffset');
          this.form.screen.focusOffset(totalItems - (itemIndex + 1));
          break;
        default:
      }
    });
  }

  public render() {
    const items = this.props.items;
    return (
      <form
        keys={false}
        mouse={true}
        ref={(form: blessed.Widgets.FormElement<any>) => this.form = form}
        style={this.props.style}
      >
        {/* <layout
          height="100%"
          width="100%"
          style={{focus: {bg: 'red'}}}
        > */}
        {items.map((item, index) =>
          <checkbox
            width="100%"
            top={index}
            shrink={true}
            mouse={true}
            key={item.id}
            name={item.id}
            text={item.name}
            checked={item.checked}
            style={{focus: {bg: 'red'}}}
          />)}

        {/* </layout> */}
      </form>
    );
  }

  private onItemSelect = (item: any) => {
    // this.props.onItemSelect(item.content);
  }
}
