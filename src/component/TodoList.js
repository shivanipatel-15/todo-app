import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";

const TodoList = () => {
  const [taskData, setTaskData] = useState({});
  const [localData, setLocalData] = useState([]);
  const [status, setStatus] = useState("Pending");
  const [checkedStatus, setCheckedStatus] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    const emiData = localStorage.getItem("Task-data");
    let localData = emiData
      ? JSON.parse(localStorage.getItem("Task-data"))
      : [];
    setLocalData(localData);
  }, []);

  const onSubmit = (data, e) => {
    // console.log(data);
    if (data.id) {
      const editTaskData = localData.findIndex((todo) => todo.id === data.id);
      localData[editTaskData] = data;
      localStorage.setItem("Task-data", JSON.stringify(localData));
    } else {
      data.id = moment().unix();

      localData.push(data);
      setLocalData(localData);
      localStorage.setItem("Task-data", JSON.stringify(localData));
    }
    reset();
  };

  const onDeleteTask = (id) => (e) => {
    const restData = localData.filter((todo) => todo.id !== id);
    localStorage.setItem("Task-data", JSON.stringify(restData));
    setLocalData(restData);
    console.log(localData);
  };

  const onEditTask = (id) => (e) => {
    const editTaskData = localData.find((todo) => todo.id === id);

    setTaskData(editTaskData);

    setValue("task", editTaskData.task);
    setValue("description", editTaskData.description);
    setValue("date", editTaskData.date);
    setValue("id", editTaskData.id);
    setValue("status", editTaskData.status);
  };
  console.log(localData);
  const onCheckBox = (id) => (e) => {
    setCheckedStatus(!checkedStatus);
    console.log(checkedStatus);
    if (checkedStatus) {
      const taskStatusData = localData.indexOf(
        localData.find((todo) => todo.id === id)
      );
      if (taskStatusData !== -1) {
        localData[taskStatusData].status = "Complete";
      }
      console.log(localData);

      localStorage.setItem("Task-data", JSON.stringify(localData));
    } else {
      const taskStatusData = localData.indexOf(
        localData.find((todo) => todo.id === id)
      );
      if (taskStatusData !== -1) {
        localData[taskStatusData].status = "Pending";
      }
      console.log(localData);
    }
  };

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="container py-2">
      <div className="row d-flex justify-content-left">
        <div className="col-12 col-md-3">
          <div className="card">
            <div className="card-body p-2 text-center">
              <form className="form-inline" onSubmit={handleSubmit(onSubmit)}>
                <h4 className="mb-3">Add/Edit Task</h4>
                <hr className="m-2"></hr>

                <div className="form-outline mb-4">
                  <label className="form-label">Task</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter task"
                    {...register("task", { required: true })}
                  />

                  {errors.task && (
                    <p className="alert alert-danger alert-dismissible fade show mt-2">
                      <strong>Error! </strong>task is required
                    </p>
                  )}
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter description"
                    {...register("description", { required: true })}
                  />

                  {errors.description && (
                    <p className="alert alert-danger alert-dismissible fade show mt-2">
                      <strong>Error! </strong>description is required
                    </p>
                  )}
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label">Due</label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Enter description"
                    {...register("date", { required: true })}
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label">Status</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Pending"
                    defaultValue={status}
                    {...register("status", { required: true })}
                  />
                  {/* <br></br>
                  {status} */}
                </div>

                <button className="btn btn-primary btn-block" type="submit">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-9">
          <div className="card">
            <div className="card-body p-2 text-left">
              <h4>Todo List</h4>
              <hr className="m-2"></hr>

              <div className="row m-4">
                <div className="col-12 col-md-6">
                  <div className="card">
                    <div className="card-body p-2 text-left">
                      <b>Monday</b>
                      <hr className="m-2"></hr>
                      {localData
                        .filter(
                          (d) =>
                            days[new Date(d.date).getDay() + 1] === "Monday"
                        )
                        .map((item, index) => {
                          return (
                            <>
                              <button
                                type="button"
                                className="btn btn-primary btn-sm m-1"
                                onClick={onEditTask(item.id)}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger btn-sm m-1"
                                onClick={onDeleteTask(item.id)}
                              >
                                Delete
                              </button>
                              <input
                                className="form-check-input m-2"
                                type="checkbox"
                                id="flexCheckDefault"
                                checked={
                                  item.status === "Complete" ? true : false
                                }
                                onChange={onCheckBox(item.id)}
                              />
                              <label>{item.task}</label>
                              <br></br>
                            </>
                          );
                        })}
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="card">
                    <div className="card-body p-2 text-left">
                      <b>Tuesday</b>
                      <hr className="m-2"></hr>
                      {localData
                        .filter(
                          (d) =>
                            days[new Date(d.date).getDay() + 1] === "Tuesday"
                        )
                        .map((item, index) => {
                          return (
                            <>
                              <button
                                type="button"
                                className="btn btn-primary btn-sm m-1"
                                onClick={onEditTask(item.id)}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger btn-sm m-1"
                                onClick={onDeleteTask(item.id)}
                              >
                                Delete
                              </button>
                              <input
                                className="form-check-input m-2"
                                type="checkbox"
                                id="flexCheckDefault"
                                checked={
                                  item.status === "Complete" ? true : false
                                }
                                onChange={onCheckBox(item.id)}
                              />
                              <label>{item.task} </label>
                              <br></br>
                            </>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row m-4">
                <div className="col-12 col-md-6">
                  <div className="card">
                    <div className="card-body p-2 text-left">
                      <b>Wednesday</b>
                      <hr className="m-2"></hr>
                      {localData
                        .filter(
                          (d) =>
                            days[new Date(d.date).getDay() + 1] === "Wednesday"
                        )
                        .map((item, index) => {
                          return (
                            <>
                              <button
                                type="button"
                                className="btn btn-primary btn-sm m-1"
                                onClick={onEditTask(item.id)}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger btn-sm m-1"
                                onClick={onDeleteTask(item.id)}
                              >
                                Delete
                              </button>
                              <input
                                className="form-check-input m-2"
                                type="checkbox"
                                id="flexCheckDefault"
                                checked={
                                  item.status === "Complete" ? true : false
                                }
                                onChange={onCheckBox(item.id)}
                              />
                              <label>{item.task} </label>
                              <br></br>
                            </>
                          );
                        })}
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="card">
                    <div className="card-body p-2 text-left">
                      <b>Thursday</b>
                      <hr className="m-2"></hr>
                      {localData
                        .filter(
                          (d) =>
                            days[new Date(d.date).getDay() + 1] === "Thursday"
                        )
                        .map((item, index) => {
                          return (
                            <>
                              <button
                                type="button"
                                className="btn btn-primary btn-sm m-1"
                                onClick={onEditTask(item.id)}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger btn-sm m-1"
                                onClick={onDeleteTask(item.id)}
                              >
                                Delete
                              </button>
                              <input
                                className="form-check-input m-2"
                                type="checkbox"
                                id="flexCheckDefault"
                                checked={
                                  item.status === "Complete" ? true : false
                                }
                                onChange={onCheckBox(item.id)}
                              />
                              <label>{item.task} </label>
                              <br></br>
                            </>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row m-4">
                <div className="col-12 col-md-6">
                  <div className="card">
                    <div className="card-body p-2 text-left">
                      <b>Friday</b>
                      <hr className="m-2"></hr>
                      {localData
                        .filter(
                          (d) =>
                            days[new Date(d.date).getDay() + 1] === "Friday"
                        )
                        .map((item, index) => {
                          return (
                            <>
                              <button
                                type="button"
                                className="btn btn-primary btn-sm m-1"
                                onClick={onEditTask(item.id)}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger btn-sm m-1"
                                onClick={onDeleteTask(item.id)}
                              >
                                Delete
                              </button>
                              <input
                                className="form-check-input m-2"
                                type="checkbox"
                                id="flexCheckDefault"
                                checked={
                                  item.status === "Complete" ? true : false
                                }
                                onChange={onCheckBox(item.id)}
                              />
                              <label>{item.task} </label>
                              <br></br>
                            </>
                          );
                        })}
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="card">
                    <div className="card-body p-2 text-left">
                      <b>Saturday</b>
                      <hr className="m-2"></hr>
                      {localData
                        .filter(
                          (d) =>
                            days[new Date(d.date).getDay() + 1] === "Saturday"
                        )
                        .map((item, index) => {
                          return (
                            <>
                              <button
                                type="button"
                                className="btn btn-primary btn-sm m-1"
                                onClick={onEditTask(item.id)}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger btn-sm m-1"
                                onClick={onDeleteTask(item.id)}
                              >
                                Delete
                              </button>
                              <input
                                className="form-check-input m-2"
                                type="checkbox"
                                id="flexCheckDefault"
                                checked={
                                  item.status === "Complete" ? true : false
                                }
                                onChange={onCheckBox(item.id)}
                              />
                              <label>{item.task} </label>
                              <br></br>
                            </>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row m-4">
                <div className="col-12 col-md-6">
                  <div className="card">
                    <div className="card-body p-2 text-left">
                      <b>Sunday</b>
                      <hr className="m-2"></hr>
                      {localData
                        .filter(
                          (d) =>
                            days[new Date(d.date).getDay() + 1] === "Sunday"
                        )
                        .map((item, index) => {
                          return (
                            <>
                              <button
                                type="button"
                                className="btn btn-primary btn-sm m-1"
                                onClick={onEditTask(item.id)}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger btn-sm m-1"
                                onClick={onDeleteTask(item.id)}
                              >
                                Delete
                              </button>
                              <input
                                className="form-check-input m-2"
                                type="checkbox"
                                id="flexCheckDefault"
                                checked={
                                  item.status === "Complete" ? true : false
                                }
                                onChange={onCheckBox(item.id)}
                              />
                              <label>{item.task} </label>
                              <br></br>
                            </>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
