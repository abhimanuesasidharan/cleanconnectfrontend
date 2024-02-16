import React from "react";
import { Form, Input, message } from "antd"; 
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
        <h1 className="text-center text-2xl">Login Form</h1>
        <Form.Item label="Email" name="email" rules={[{ message: 'Please enter your email!' }]}>
          <Input type="email" className="w-80" />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{  message: 'Please enter your password!' }]} >
          <Input type="password" className="w-80" />
        </Form.Item>
        <Link to="/register" className="block mt-2">
          Not a user? Register here
        </Link>
        <button className="bg-green-400 p-2 m-2 rounded-md text-white" type="submit">
          Login
        </button>
      </Form>
    </div>
  );
};

export default Login;
