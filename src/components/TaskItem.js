import React, { Component } from "react";

export class TaskItem extends Component {
  onUpdateStatus = () => {
    console.log(this.props.task.id);
    this.props.onUpdateStatus(this.props.task.id);
  };
  onDelete = () => {
    this.props.onDelete(this.props.task.id)
  }
  onUpdateTask= () => {
    this.props.onUpdateTask(this.props.task.id)
  }
  render() {
    var { task, index } = this.props;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{task.name}</td>
        <td className="text-center">
          <span
            className={
              task.status === true ? "btn btn-warning" : "btn btn-success"
            }
            onClick={this.onUpdateStatus}
          >
            {task.status === true ? "Kích Hoạt" : "Ẩn"}
          </span>
        </td>
        <td className="text-center">
          <button type="button" className="btn btn-warning"
          onClick = {this.onUpdateTask}
          >
            <span className="fa fa-pencil "></span> Sửa
          </button>
          &nbsp;
          <button type="button" className="btn btn-danger"
          onClick={this.onDelete}>
            <span className="fa fa-trash "></span> Xóa
          </button>
        </td>
      </tr>
    );
  }
}

export default TaskItem;
