import React, { useState, useEffect } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddUser(props) {
  let navigate = useNavigate();
  // let history = useHistory();
  const [user, setUser] = useState({
    name: "",
    salary: "",
    age: "",
  });
  console.log(user);

  const { name, salary, age } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    console.log(user, "vuggv");
    e.preventDefault();
    await axios.post("http://localhost:3003/posts", user);
    navigate("/");
  };

  return (
    <div className="app">
      <Link to="/">
        <button style={{ float: "center" }}>Back</button>
      </Link>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => onInputChange(e)}
        />
        <br></br>
        <label>Salary</label>
        <input
          type="text"
          name="salary"
          value={salary}
          onChange={(e) => onInputChange(e)}
        />
        <br></br>
        <label>Age</label>
        <input
          type="text"
          name="age"
          value={age}
          onChange={(e) => onInputChange(e)}
        />
        <br></br>
        <Link to="/">
          <button onClick={onSubmit}>Submit</button>
        </Link>
      </form>
    </div>
  );
}

export default AddUser;
