import React from "react";
import { Link } from "react-router-dom";
import "./user.css";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const User = () => {
  const [users, setUsers] = useState([]);

  const deleteUser = async (userId) => {
    await axios
      .delete(`http://localhost:8000/api/delete/${userId}`)
      .then((response) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
        toast.success("User deleted successfully", { position: "top-right" });
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/api/getAll");
      setUsers(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="userTable">
      <Link to={"/add"} className="addButton">
        Add User
      </Link>
      <table border={1} cellPadding={10} cellSpacing={1}>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>User name</th>
            <th>User Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  {user.fname} {user.lname}
                </td>
                <td>{user.email}</td>
                <td className="actionButton">
                  <button
                    title="Delete User"
                    onClick={() => deleteUser(user._id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <Link to={`/edit/` + user._id} title="Edit User">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default User;
