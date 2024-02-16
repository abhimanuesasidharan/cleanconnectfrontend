# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



import React from 'react'
import { useSelector } from 'react-redux';
import AdminNavBar from '../components/AdminNavBar';
import NavBar from '../components/NavBar';

function NotificationPage() {

    const { user } = useSelector(state => state.user);
    const isAdmin = user && user.isAdmin === true; // Check if user is defined and isAdmin is true
    const ShowNav = isAdmin ? <AdminNavBar /> : <NavBar />;
  return (
    <>
    {ShowNav}
    <h1>this is notification</h1>
    </>
  )
}

export default NotificationPage



//userspage 

import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'; 
import AdminNavBar from '../../components/AdminNavBar';
import NavBar from '../../components/NavBar';
import axios from "axios";
import { Table } from "antd";

const Users = () => {
    const [users, setUsers] = useState([]);
    const { user } = useSelector(state => state.user);
    const isAdmin = user && user.isAdmin === true; 
    const ShowNav = isAdmin ? <AdminNavBar /> : <NavBar />;

    const getUsers = async () => {
        try {
          const res = await axios.get("http://localhost:5000/v1/admin/getAllUsers", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          if (res.data.success) {
            setUsers(res.data.data);
          }
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getUsers();
      }, []);
      const columns = [
        {
          title: "Name",
          dataIndex: "name",
        },
        {
          title: "Email",
          dataIndex: "email",
        },
        {
          title: "Worker",
          dataIndex: "isDWorker",
          render: (text, record) => <span>{record.isWorker ? "Yes" : "No"}</span>,
        },
        {
          title: "Actions",
          dataIndex: "actions",
          render: (text, record) => (
            <div className="d-flex">
              <button className="p-2 rounded-md bg-red-500 text-white">Block</button>
            </div>
          ),
        },
      ];
  return (
    <>
    {ShowNav}
    <h1 className="text-center m-2">Users List</h1>
      <Table columns={columns} dataSource={users.map((user, index) => ({ ...user, key: index }))}
/>
    </>
  )
}

export default Users



//workerspage 

import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'; 
import AdminNavBar from '../../components/AdminNavBar';
import NavBar from '../../components/NavBar';
import axios from "axios";
import { Table } from "antd";

const Workers = () => {
    const [workers, setWorkers] = useState([]);
    const { user } = useSelector(state => state.user);
    const isAdmin = user && user.isAdmin === true; 
    const ShowNav = isAdmin ? <AdminNavBar /> : <NavBar />;

    const getWorkers = async () => {
        try {
          const res = await axios.get("http://localhost:5000/v1/admin/getAllWorkers", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          if (res.data.success) {
            setWorkers(res.data.data);
          }
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getWorkers();
      }, []);
      const columns = [
        {
          title: "Name",
          dataIndex: "name",
          render: (text, record) => (
            <span>
              {record.firstName} {record.lastName}
            </span>
          ),
        },
        {
          title: "Status",
          dataIndex: "status",
        },
        {
          title: "phone",
          dataIndex: "phone",
        },
        {
          title: "Actions",
          dataIndex: "actions",
          render: (text, record) => (
            <div className="d-flex">
              {record.status === "pending" ? (
                <button
                  className="bg-green-500 rounded-lg p-2 text-white"
                  onClick={() => handleAccountStatus(record, "approved")}
                >
                  Approve
                </button>
              ) : (
                <button className="bg-red-500">Reject</button>
              )}
            </div>
          ),
        },
      ];
    
  return (
    <>
    {ShowNav}
    <h1 className="text-center m-2">Users List</h1>
      <Table columns={columns} dataSource={workers.map((worker, index) => ({ ...worker, key: index }))}
/>
    </>
  )
}

export default Workers




//working login 



import React from "react";
import { Form, Input, message } from "antd"; // Import the message component
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("http://localhost:5000/v1/user/login", values);
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <div className="form-container">
      <Form
        layout="vertical"
        onFinish={onfinishHandler}
        className="flex flex-col justify-center items-center mt-52"
      >
        <h3 className="text-center">Login Form</h3>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email!' }]}>
          <Input type="email" className="w-80" />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password!' }]}>
          <Input type="password" className="w-80" />
        </Form.Item>
        <Link to="/register" className="block mt-2">
          Not a user? Register here
        </Link>
        <button className="btn btn-primary mt-4" type="submit">
          Login
        </button>
      </Form>
    </div>
  );
};

////

removed from loginpage 

required: true,

///////

export default Login;
