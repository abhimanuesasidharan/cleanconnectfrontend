import React, { useEffect, useState } from "react";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNavBar from '../../components/AdminNavBar';
import NavBar from '../../components/NavBar';
import WorkerNavBar from '../../components/WorkerNavBar'; 
import moment from "moment";

const Profile = () => {
    const { user } = useSelector((state) => state.user);
    const [worker, setWorker] = useState(null);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams();

     //UPDATE WORKER

     const handleFinish = async (values) => {
      try {
        dispatch(showLoading());
        console.log("Form values:", values);
        //Changed values of timing 
        //original const timings = values.timings.map(time => moment(time).format("HH:mm"));
        const timings = values.timings ? values.timings.map(time => moment(time).format("HH:mm")) : [];
        
        const res = await axios.post(
          "http://localhost:5000/v1/worker/updateProfile",
          { ...values, userId: user?._id,timings: values.timings.map(time => time.format("HH:mm")) },
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
    
    const ShowNav = user
      ? user.isAdmin
        ? <AdminNavBar />
        : user.isWorker
          ? <WorkerNavBar />
          : <NavBar />
      : <NavBar />;



      const getWorkerInfo = async () => {
        try {
          const res = await axios.post(
            "http://localhost:5000/v1/worker/getWorkerInfo",
            { userId: params.id },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (res.data.success) {
            setWorker(res.data.data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        getWorkerInfo();
      }, []);
    return (
      <>
        {ShowNav}
        
        {
          worker&& (
            <div>
            <h1 className="text-center">Update Worker</h1>
            <Form layout="vertical" onFinish={handleFinish} className="m-3 flex flex-col justify-center items-center" initialValues={{
              ...worker,
              timings:[
                moment(worker.timings[0], 'HH:mm'),
                moment(worker.timings[1], 'HH:mm'),
              ]
            }}>
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
                    Update
                  </button>
                </Col>
            </Form>
            </div>
          )
        }
      </>
    );
  };
  
  export default Profile;
