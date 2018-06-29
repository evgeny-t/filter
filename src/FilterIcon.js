import React from "react";

export class FilterIcon extends React.Component {
  render() {
    return (
      <div className="filter__filter-icon">
        <svg className="filter__filter-svg" viewBox="0 0 18 18">
          <path d="M2 4 h14v2H2V4z m2 4 h10v2H4V8z m2 4 h6v2H6v-2z" />
        </svg>
      </div>
    );
  }
}
