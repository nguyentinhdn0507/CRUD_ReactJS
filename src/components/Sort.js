import React, { Component } from "react";

export class Sort extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }
  onSort = (sortBy, sortValue) => {
    console.log(sortBy,sortValue);
    this.props.onSortItem(sortBy, sortValue);
  };
  render() {
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="btn-group">
          <button
            className="btn btn-primary dropdown-toggle "
            type="button"
            data-toggle="dropdown"
            aria-expanded="true"
          >
            Sắp Xếp
          </button>
          <ul className="dropdown-menu p-3">
            <li onClick={() => this.onSort("name", 1)}>
              <a
                className={`dropdown-item ${
                  this.props.sortBy === "name" && this.props.sortValue === 1
                    ? "fas fa-check"
                    : ""
                }`}
                role="button"
              >
                <span className="fa fa-sort-alpha-down">Tên A-Z</span>
              </a>
            </li>
            <li onClick={() => this.onSort("name", -1)}>
              <a
                className={`dropdown-item ${
                  this.props.sortBy === "name" && this.props.sortValue === -1
                    ? "fas fa-check"
                    : ""
                }`}
                role="button"
              >
                <span className="fa fa-sort-alpha-up ">Tên Z-A</span>
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li onClick={() => this.onSort("status", 1)}>
              <a
                className={`dropdown-item ${
                  this.props.sortBy === "status" && this.props.sortValue === 1
                    ? "fas fa-check"
                    : ""
                }`}
                role="button"
              >
                Trạng Thái Kích Hoạt
              </a>
            </li>
            <li onClick={() => this.onSort("status", -1)}>
              <a
                className={`dropdown-item ${
                  this.props.sortBy === "status" && this.props.sortValue === -1
                    ? "fas fa-check"
                    : ""
                }`}
                role="button"
              >
                Trạng Thái Ẩn
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sort;
