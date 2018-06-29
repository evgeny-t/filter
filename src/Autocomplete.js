import React from "react";
import { AutocompleteMenu } from "./AutocompleteMenu";

export class Autocomplete extends React.Component {
  render() {
    return this.props.children({
      renderInput: this.renderInput,
      renderMenu: this.renderMenu
    });
  }

  renderMenu = () => {
    return (
      <AutocompleteMenu
        items={[1, 2, 3, 4, 5, 10, 11, 12, 13, 14, 15]}
        ref={that => (this.menu = that)}
      />
    );
  };

  renderInput = props => {
    return (
      <input
        type="text"
        placeholder="Filter..."
        onBlur={this.handleInputBlur}
        onKeyDown={this.handleKeyDown}
        {...props}
      />
    );
  };

  handleKeyDown = e => {
    e.persist();
    console.log(e.keyCode);
    if (e.keyCode === 40) {
      this.menu.selectNext();
    } else if (e.keyCode === 38) {
      this.menu.selectPrevious();
    } else if (e.keyCode === 13) {
      this.menu;
    }
  };
}
