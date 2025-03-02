import React, { useEffect } from "react";
import "./edit.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Edit = () => {
  const navigate = useNavigate();
  const users = {
    fname: "",
    lname: "",
    email: "",
  };
  const { id } = useParams();
  const [user, setUser] = useState(users);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/getOne/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:8000/api/update/${id}`, user)
      .then((response) => {
        console.log(response);
        toast.success("User Updated Successfully", { position: "top-right" });
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="addUser">
      <Link to={"/"}>Back</Link>
      <h3>Update User</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">First name</label>
          <input
            type="text"
            onChange={inputChangeHandler}
            value={user.fname}
            id="fname"
            name="fname"
            autoComplete="off"
            placeholder="First name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Last name</label>
          <input
            type="text"
            onChange={inputChangeHandler}
            value={user.lname}
            id="lname"
            name="lname"
            autoComplete="off"
            placeholder="Last name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={inputChangeHandler}
            value={user.email}
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Email"
          />
        </div>
        <div className="inputGroup">
          <button type="submit">Update User</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
