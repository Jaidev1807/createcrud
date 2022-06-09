import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditUser(props) {
  const [gotdataforedit, setGotdaatforedit] = useState();
  const { id } = useParams();
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

  useEffect(() => {
    axios.get(`http://localhost:3003/posts/${id}`).then((res) => {
      console.log(res.data);
      setGotdaatforedit(res.data);
    });
  });

  const onSubmit = async (e) => {
    console.log(user, "vuggv");
    e.preventDefault();
    await axios.put("http://localhost:3003/posts/" + id, user);
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
          placeholder={gotdataforedit?.name}
          onChange={(e) => onInputChange(e)}
        />
        <br></br>
        <label>Salary</label>
        <input
          type="text"
          name="salary"
          value={salary}
          placeholder={gotdataforedit?.salary}
          onChange={(e) => onInputChange(e)}
        />
        <br></br>
        <label>Age</label>
        <input
          type="text"
          name="age"
          value={age}
          placeholder={gotdataforedit?.age}
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

export default EditUser;
