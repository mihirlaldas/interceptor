import React, { useState } from "react";
import axios from "axios";
const URL = "https://jsonplaceholder.typicode.com/users";
const Users = () => {
  const [users, setUser] = useState([]);
  const fetchUsers = () => {
    console.log("fetching users");
    axios(URL)
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("users", JSON.stringify(res.data));
      })
      .catch((e) => {
        console.log("error", e);
        setUser(JSON.parse(localStorage.getItem("users")));
      });
  };

  console.log("state users", users);
  return (
    <div>
      <button onClick={fetchUsers}>Fetch users</button>
      {users.length > 0
        ? users.map((ele) => <li key={ele["id"]}>{ele["email"]}</li>)
        : ""}
    </div>
  );
};

export default Users;

// caching;
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (config.url === URL && localStorage.getItem("users")) {
      console.log("get from localstorage");
      return Promise.reject("fetch from localstorage");
    }
    console.log("fetch from url");
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
