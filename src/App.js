import React, { Component } from "react";
import Control from "./components/Control";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
// import _  form "lodash";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayFrom: false,
      taskEditing: null,
      filter: {
        name: "",
        status: -1,
      },
      keyword: "",
      sortBy: "name",
      sortValue: 1,
    };
  }
  componentWillMount() {
    if (localStorage && localStorage.getItem("todoList")) {
      var tasks = JSON.parse(localStorage.getItem("todoList"));
      // console.log(tasks);
      this.setState({
        tasks: tasks,
      });
    }
  }
  // sẽ được gọi khi component được gắn vào
  onGenerateData = () => {
    var tasks = [
      {
        id: this.generateID(),
        name: "Học Lập Trình",
        status: true,
      },
      {
        id: this.generateID(),
        name: "Học Lập  Trình ReactJS",
        status: true,
      },
      {
        id: this.generateID(),
        name: "Học Lập Trình NodeJS",
        status: false,
      },
      {
        id: this.generateID(),
        name: "Học Lập Trình HTML + CSS ",
        status: true,
      },
    ];
    // console.log(tasks);
    this.setState({
      tasks: tasks,
    });
    localStorage.setItem("todoList", JSON.stringify(tasks));
  };
  randomId() {
    return Math.floor(1 + Math.random() * 0x10000)
      .toString(16)
      .substring(1);
  }
  generateID() {
    return (
      this.randomId() +
      this.randomId() +
      "-" +
      this.randomId() +
      "-" +
      this.randomId() +
      "-" +
      this.randomId() +
      "-" +
      this.randomId() +
      this.randomId()
    );
  }
  onToggleForm = () => {
    //thêm task đổi từ thêm thành cập nhật và ngược lại
    if (this.state.isDisplayFrom && this.state.taskEditing !== null) {
      console.log("abc");
      this.setState({
        isDisplayFrom: true,
        taskEditing: null,
      });
    } else {
      this.setState({
        isDisplayFrom: !this.state.isDisplayFrom,
        taskEditing: null,
      });
    }
  };
  onCloseTaskForm = () => {
    this.setState({
      isDisplayFrom: false,
    });
  };
  onShowForm = () => {
    this.setState({
      isDisplayFrom: true,
    });
  };
  onRenderData = (data) => {
    // dùng ID đẻ phân biệt khi nào là thêm và khi nào là sữa data
    var { tasks } = this.state; // lấy từ constructor trong tasks // tasks= this.state.tasks
    if (data.id === "") {
      data.id = this.generateID(); // 1 cái task
      tasks.push(data);
      //từ task này sẽ truyền vào local storage
    } else {
      // editing
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }
    console.log(data);
    this.setState({
      tasks: tasks,
      taskEditing: null,
    });
    localStorage.setItem("todoList", JSON.stringify(tasks));
  };
  onUpdateStatus = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    console.log(index);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks,
      });
      localStorage.setItem("todoList", JSON.stringify(tasks));
    }
  };
  findIndex = (id) => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        console.log(index);
        result = index;
      }
    });
    return result;
  };
  onDelete = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    console.log(index);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks,
      });
      localStorage.setItem("todoList", JSON.stringify(tasks));
    }
    this.onCloseTaskForm();
  };
  onUpdateTask = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    var changeTask = tasks[index];
    console.log(changeTask);
    this.setState({
      taskEditing: changeTask,
    });
    this.onShowForm();
  };
  onFilter = (filterName, filterStatus) => {
    // console.log(filterName, filterStatus);
    filterStatus = parseInt(filterStatus, 10);
    // console.log(typeof filterStatus);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus,
      },
    });
  };
  onSearch = (keyword) => {
    // console.log(keyword);
    this.setState({
      keyword: keyword,
    });
  };
  onSortItem = (sortBy, sortValue) => {
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue,
    });
    console.log(this.state);
  };
  render() {
    var {
      tasks,
      isDisplayFrom,
      taskEditing,
      filter,
      keyword,
      sortBy,
      sortValue,
    } = this.state; //var task = this.state.tasks
    // console.log(filter); //filter ở đây được lấy từ trong state
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      tasks = tasks.filter((task) => {
        if (filter.status === -1) {
          return task;
        } else {
          return task.status === (filter.status === 1 ? true : false);
        }
      });
    }
    if (keyword) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }
    console.log(sortBy, sortValue);
    if (sortBy === "name") {
      tasks.sort((task1, task2) => {
        if (task1.name > task2.name) return sortValue;
        else if (task1.name < task2.name) return -sortValue;
        else return 0;
      });
    } else {
      tasks.sort((task1, task2) => {
        if (task1.status > task2.status) return -sortValue;
        else if (task1.status < task2.status) return sortValue;
        else return 0;
      });
    }
    var eleTaskForm = isDisplayFrom ? (
      <TaskForm
        onRenderData={this.onRenderData}
        onCloseTaskForm={this.onCloseTaskForm}
        task={taskEditing}
      />
    ) : (
      ""
    );

    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div
            className={
              isDisplayFrom ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""
            }
          >
            {/* form */}
            {/* <TaskForm /> */}
            {eleTaskForm}
          </div>
          <div
            className={
              isDisplayFrom
                ? "col-xs-8 col-sm-8 col-md- 8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md- 12 col-lg-12"
            }
          >
            <button
              type="button"
              onClick={this.onToggleForm}
              className="btn btn-primary text-center mb-3"
            >
              <span className="fa fa-plus mr-5"></span> Thêm Công Việc
            </button>
            <button
              type="button"
              onClick={this.onGenerateData}
              className="btn btn-danger text-center ml-1 mb-3 "
            >
              Generate Data
            </button>
            {/* Tìm Kiếm */}
            <Control
              onSearch={this.onSearch}
              onSortItem={this.onSortItem}
              sortBy={sortBy}
              sortValue={sortValue}
            />
            {/* sắp xếp */}
            <TaskList
              tasks={tasks}
              onUpdateStatus={this.onUpdateStatus}
              onDelete={this.onDelete}
              onUpdateTask={this.onUpdateTask}
              onFilter={this.onFilter}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
