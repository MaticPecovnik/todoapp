/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [addition, setAddition] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3000/api/todo/get/").then(response => {
      setTodos(response.data.data);
    });
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    Axios.post("http://localhost:3000/api/todo/post/", { todo: addition })
      .then(response => {
        Axios.get("http://localhost:3000/api/todo/get/").then(response => {
          setTodos(response.data.data);
        });
      })
      .catch(err => console.log(err));
    setAddition("");
  };

  const handleChange = event => {
    setAddition(event.target.value);
  };

  return (
    <div className="mainContainer">
      <div className="header">
        <h1>Remind Me!</h1>
        <h3>
          by Matic Pečovnik{" "}
          <a
            href="https://github.com/MaticPecovnik/todoapp"
            className="gitLink fa fa-github"
            alt="github"
          ></a>
        </h3>
      </div>
      <div className="formContainer">
        <h4>Today, I must not forget to: </h4>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Enter To-Do task"
            value={addition}
            onChange={handleChange}
            name="password"
            className="input"
            required
          ></input>
        </form>
      </div>
      <div className="todoContainer">
        {todos.map((a, i) => {
          return (
            <div className="todo" id={"todo-" + i} key={i}>
              {`${i + 1}. ${a}`}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
