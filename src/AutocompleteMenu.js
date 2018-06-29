import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

export class AutocompleteMenu extends React.Component {
  lis = [];
  state = {
    activeIndex: undefined
  };
  componentDidUpdate(prevProps, prevState) {
    const { activeIndex } = this.state;
    if (!(0 <= activeIndex && activeIndex < this.lis.length)) {
      return;
    }

    if (activeIndex !== prevState.activeIndex) {
      console.log(
        "componentDidUpdate",
        activeIndex,
        prevState.activeIndex
      );
      this.props.onSelect(this.props.items[activeIndex]);
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
    this.setState(state => {
      const nextIndex =
        state.activeIndex === undefined ? 0 : state.activeIndex + 1;
      return {
        activeIndex: nextIndex
      };
    });
  }
  selectPrevious() {
    this.setState(state => {
      const nextIndex = state.activeIndex
        ? state.activeIndex - 1
        : state.activeIndex;
      return {
        activeIndex: nextIndex
      };
    });
  }
  selectCurrent() {
    // this.props.onSelect(this.props.items[this.state.activeIndex]);
  }
  render() {
    console.log("render", this.state.activeIndex);
    return (
      <Scrollbars
        style={{ width: 200, height: 100 }}
        ref={that => (this.sb = that)}
      >
        <ul
          className="menu"
          ref={that => (this.ul = that)}
          onClick={this.handleClick}
        >
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

  handleClick = e => {
    const activeIndex = +e.target.dataset.index;
    this.setState({ activeIndex });
  };
}
