import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [idfordelete, setIdfordelete] = useState();
  useEffect(() => {
    axios.get("http://localhost:3003/posts").then((res) => {
      setData(res.data);
    });
  }, []);

  const deleteUser = (id) => {
    console.log("--->", id);
    let deletedthedata = axios.delete(`http://localhost:3003/posts/${id}`);
    if (deletedthedata) {
      setTimeout(function () {
        window.location.reload(1);
      }, 3000);
    }
  };

  return (
    <>
      <Paper sx={{ bgcolor: "none" }}>
        <Paper className="" sx={{ background: "none", width: "50%" }} mr={10}>
          <Link to="/AddUser">
            <Button variant="contained">Add Employee</Button>
          </Link>
        </Paper>

        <table align="center" border="1" cellPadding="20px">
          <thead>
            <tr className="bg-danger">
              <th scope="col">sr.no.</th>
              <th scope="col">Name</th>
              <th scope="col">Salary </th>
              <th scope="col">Age </th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((user, index) => (
              <tr className="">
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{user.name}</td>
                <td>{user.salary}</td>
                <td>{user.age}</td>
                <td>
                  <Link
                    to={`/edit/${user.id.toString()}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button variant="contained">Edit</Button>
                  </Link>

                  <Button
                    variant="outlined"
                    sx={{ bgcolor: "maroon", color: "#fff", ml: 2 }}
                    onClick={() => {
                      deleteUser(user.id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>
    </>
  );
};

export default Home;
