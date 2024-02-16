import React from "react";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(" http://localhost:5000/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  return (
    <>
      <div className="form-container">
        <Form layout="vertical" onFinish={onfinishHandler} className="flex flex-col justify-center items-center mt-52">
          <h3 className="text-center">Register Form</h3>

          <Form.Item label="Name" name="name">
            <Input type="text" required className="w-full" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required className="w-full" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required className="w-full" />
          </Form.Item>
          <Link to="/login" className="block mt-2">
            Already a user? Login here
          </Link>
          <button className="bg-green-400 p-2 m-2 rounded-md text-white" type="submit">
          Register
        </button>
        </Form>
      </div>
    </>
  );
};

export default Register;
