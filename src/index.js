import React from "react";
import ReactDOM from "react-dom";
import { Scrollbars } from "react-custom-scrollbars";

import "./styles.css";

class Chip extends React.Component {
  render() {
    return <span className="chip">Size: 10000000000</span>;
  }
}

class Menu extends React.Component {
  lis = [];
  state = {
    activeIndex: 0
  };
  componentDidUpdate() {
    const { activeIndex } = this.state;
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
    this.setState(state => ({ activeIndex: state.activeIndex + 1 }));
  }
  selectPrevious() {
    this.setState(state => ({ activeIndex: state.activeIndex - 1 }));
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

class Filter extends React.Component {
  state = {
    dropdownOffset: 0,
    active: false,
    open: false
  };
  render() {
    return (
      <div
        className="filter__root"
        ref={that => (this._rootRef = that)}
      >
        <div className="filter__filter-icon">
          <svg className="filter__filter-svg" viewBox="0 0 18 18">
            <path d="M2 4 h14v2H2V4z m2 4 h10v2H4V8z m2 4 h6v2H6v-2z" />
          </svg>
        </div>

        <Chip />
        <Chip />
        <Chip />
        <Chip />
        <Chip />
        <input
          type="text"
          placeholder="Filter..."
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
          onKeyDown={this.handleKeyDown}
        />
        {this.state.active && (
          <div
            className="filter__menu-positioner"
            style={{
              left: this.state.dropdownOffset
            }}
          >
            <Menu
              items={[1, 2, 3, 4, 5, 10, 11, 12, 13, 14, 15]}
              ref={that => (this.menu = that)}
            />
          </div>
        )}
      </div>
    );
  }

  handleInputFocus = e => {
    const x = this._rootRef.getBoundingClientRect().x;
    this.setState({
      dropdownOffset: e.target.getBoundingClientRect().x - x,
      active: true
    });
  };
  handleInputBlur = e => {
    // this.setState({ active: false });
  };
  handleKeyDown = e => {
    e.persist();
    console.log(e.keyCode);
    if (e.keyCode === 40) {
      this.menu.selectNext();
    } else if (e.keyCode === 38) {
      this.menu.selectPrevious();
    }
  };
}

function App() {
  return (
    <div>
      <Filter />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
