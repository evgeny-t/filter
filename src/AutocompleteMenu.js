import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

export class AutocompleteMenu extends React.Component {
  lis = [];
  state = {
    activeIndex: undefined
  };
  componentDidUpdate() {
    const { activeIndex } = this.state;
    if (!(0 <= activeIndex && activeIndex < this.lis.length)) {
      return;
    }

    const li = this.lis[activeIndex];
    const { top: liTop, height } = li.getBoundingClientRect();
    const { top: ulTop } = this.ul.getBoundingClientRect();
    const { scrollTop, clientHeight } = this.sb.getValues();
    const y = liTop - ulTop;
    if (y < scrollTop) {
      this.sb.scrollTop(Math.max(y - 10, 0));
    } else if (y + height > scrollTop + clientHeight) {
      this.sb.scrollTop(y + height + 10 - clientHeight);
    }
  }
  selectNext() {
    this.setState(state => ({
      activeIndex:
        state.activeIndex === undefined ? 0 : state.activeIndex + 1
    }));
  }
  selectPrevious() {
    this.setState(state => ({
      activeIndex: state.activeIndex
        ? state.activeIndex - 1
        : state.activeIndex
    }));
  }
  render() {
    return (
      <Scrollbars
        style={{ width: 200, height: 100 }}
        ref={that => (this.sb = that)}
      >
        <ul className="menu" ref={that => (this.ul = that)}>
          {this.props.items.map((item, i) => (
            <li
              key={item}
              style={{
                background:
                  i === this.state.activeIndex ? "#ddd" : null
              }}
              ref={that => (this.lis[i] = that)}
              data-index={i}
            >
              {item}
            </li>
          ))}
        </ul>
      </Scrollbars>
    );
  }
}
