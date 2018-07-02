import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

const clamp = (val, lb, ub) =>
  val < lb ? lb : val >= ub ? ub - 1 : val;

export class AutocompleteMenu extends React.Component {
  static defaultProps = {
    filterItems: items => items,
    items: []
  };

  lis = [];
  state = {
    activeIndex: undefined
  };

  componentDidUpdate(prevProps, prevState) {
    const { activeIndex } = this.state;
    if (
      !(
        this.lis.length &&
        0 <= activeIndex &&
        activeIndex < this.lis.length
      )
    ) {
      return;
    }

    if (activeIndex !== prevState.activeIndex) {
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
        state.activeIndex == null
          ? 0
          : clamp(state.activeIndex + 1, 0, this.lis.length);
      return {
        activeIndex: nextIndex
      };
    });
  }

  selectPrevious() {
    this.setState(state => {
      const nextIndex = state.activeIndex
        ? clamp(state.activeIndex - 1, 0, this.lis.length)
        : state.activeIndex;
      return {
        activeIndex: nextIndex
      };
    });
  }

  selectCurrent() {
    console.warn("selectCurrent is not implemented");
    // this.props.onSelect(this.props.items[this.state.activeIndex]);
  }

  render() {
    this.lis = [];
    return (
      <Scrollbars
        style={{ width: 200 }}
        ref={that => (this.sb = that)}
        autoHeight
        autoHeightMin={0}
        autoHeightMax={100}
      >
        <ul
          className="menu"
          ref={that => (this.ul = that)}
          onClick={this.handleClick}
        >
          {this.props.filterItems(this.props.items).map((item, i) => (
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
