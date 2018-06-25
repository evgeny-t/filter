import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class Chip extends React.Component {
  render() {
    return <span className="chip">Size: 10000000000</span>;
  }
}

class Menu extends React.Component {
  render() {
    console.log("---", this.props);
    return (
      <ul className="menu">
        {this.props.items.map(item => <li>{item}</li>)}
      </ul>
    );
  }
}

class Filter extends React.Component {
  state = {
    dropdownOffset: 0,
    active: false,
    open: false,
    activeIndex: null
  };
  render() {
    return (
      <div
        className="filter__root"
        ref={that => (this._rootRef = that)}
      >
        <div className="filter__filter-icon">
          <svg
            className="filter__filter-svg"
            viewBox="0 0 18 18"
          >
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
              activeIndex={this.state.activeIndex}
              q={[1, 2, 3, 4, 5]}
            />
          </div>
        )}
      </div>
    );
  }

  handleInputFocus = e => {
    const x = this._rootRef.getBoundingClientRect().x;
    this.setState({
      dropdownOffset:
        e.target.getBoundingClientRect().x - x,
      active: true
    });
  };
  handleInputBlur = e => {
    // this.setState({ active: false });
  };
  handleKeyDown = e => {
    if (e.keyCode === 40) {
      this.setState(state =>
        Object.assign(
          {},
          state,
          (state.activeIndex || 0) + 1
        )
      );
    }
    e.persist();
    console.log(e);
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
