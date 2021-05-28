import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./User.css";

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

let USERS = [];
export default function User() {
  const [data, updatedata] = React.useState([
    {
      userId: "",
      id: "",
      title: "",
      completed: "",
    },
  ]);
  const [isLoading, setLoading] = useState(true);
  const classes = useStyles();
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((response) => {
      updatedata(response.data);
      setLoading(false);
    });
  }, []);
  console.log(data);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  for (let i = 0; i < 200; i++) {
    let status;
    if (data[i].completed === true) {
      status = "Complete";
    } else {
      status = "Incomplete";
    }
    USERS[i] = {
      id: data[i].id,
      UserId: data[i].userId, //this will be constant for 20pepl
      Title: data[i].title,
      Completed: status,
    };
  }
  return (
    
      <TableContainer component={Paper} className="Table">
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>To Do Id</TableCell>

              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {USERS.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.Title}</TableCell>
                <TableCell>{row.Completed}</TableCell>
                <button
                  onClick={() => {
                    console.log("clicked");
                  }}
                >
                  View User
                </button>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    
  );
}
