import React, { Component } from "react";
import Search from "./Search";
import Sort from "./Sort";

export class Control extends Component {
  render() {
    return (
      <div className="row mb-4">
        {/* tìm kiếm */}
        <Search onSearch={this.props.onSearch} />
        {/* sắp xếp */}
        <Sort
          onSortItem={this.props.onSortItem}
          sortBy={this.props.sortBy}
          sortValue={this.props.sortValue}
        />
      </div>
    );
  }
}

export default Control;
