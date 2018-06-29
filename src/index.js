import React from "react";
import ReactDOM from "react-dom";

import { Autocomplete } from "./Autocomplete";
import { FilterIcon } from "./FilterIcon";

import "./styles.css";

class Chip extends React.Component {
  render() {
    return <span className="chip">Size: 10000000000</span>;
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
      <Autocomplete>
        {({ renderInput, renderMenu }) => (
          <div
            className="filter__root"
            ref={that => (this._rootRef = that)}
          >
            <FilterIcon />

            <Chip />
            <Chip />
            <Chip />
            <Chip />
            <Chip />
            {renderInput({
              onFocus: this.handleInputFocus,
              onBlur: this.handleInputBlur
            })}
            {this.state.active && (
              <div
                className="filter__menu-positioner"
                style={{
                  left: this.state.dropdownOffset
                }}
              >
                {renderMenu()}
              </div>
            )}
          </div>
        )}
      </Autocomplete>
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
