import React from "react";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import moment from "moment";

const ApplyWorker = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //handle form
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      console.log("Form values:", values);
      const res = await axios.post(
        "http://localhost:5000/v1/user/apply-worker",
        { ...values, userId: user?._id,timings: values.timings.map(time => time.format("HH:mm"))
       },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Server response:", res.data);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong ");
    }
  };
  return (
    <>
        <NavBar/>
      <h1 className="text-center">Apply Worker</h1>
      <Form layout="vertical" onFinish={handleFinish} className="m-3 flex flex-col justify-center items-center">
        <h4 className="">Personal Details : </h4>
        <Row gutter={20}>
          <Col className="w-77 flex flex-col items-center justify-center">
            <Form.Item
              label="First Name"
              name="firstName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your first name" />
            </Form.Item>
          </Col>
          <Col className="w-77 flex flex-col items-center justify-center">
            <Form.Item
              label="Last Name"
              name="lastName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your last name" />
            </Form.Item>
          </Col>
          <Col className="w-77 flex flex-col items-center justify-center">
            <Form.Item
              label="Phone No"
              name="phone"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your contact no" />
            </Form.Item>
          </Col>
          <Col className="w-77 flex flex-col items-center justify-center">
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input type="email" placeholder="your email address" />
            </Form.Item>
          </Col>
          <Col className="w-77 flex flex-col items-center justify-center">
            <Form.Item label="Website" name="website">
              <Input type="text" placeholder="your website" />
            </Form.Item>
          </Col>
          <Col className="w-77 flex flex-col items-center justify-center">
            <Form.Item
              label="Address"
              name="address"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your clinic address" />
            </Form.Item>
          </Col>
        </Row>
        <h4>Professional Details :</h4>
        <Row gutter={20}>
          <Col className="w-77 flex flex-col items-center justify-center">
            <Form.Item
              label="Skills"
              name="skills"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your specialization" />
            </Form.Item>
          </Col>
          <Col className="w-77 flex flex-col items-center justify-center">
            <Form.Item
              label="Experience"
              name="experience"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your experience" />
            </Form.Item>
          </Col>
          <Col className="w-77 flex flex-col items-center justify-center">
            <Form.Item
              label="Price"
              name="price"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your contact no" />
            </Form.Item>
          </Col>
          <Col className="w-77 flex flex-col items-center justify-center">
            <Form.Item label="Timings" name="timings" required>
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
        </Row>
          <Col className="w-77 flex flex-col items-center justify-center">
            <button className="bg-green-400 p-2 rounded-xl font-bold" type="submit">
              Submit
            </button>
          </Col>
      </Form>
      <Footer/>
    </>
  );
};

export default ApplyWorker;