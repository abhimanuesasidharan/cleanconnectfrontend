import React from "react";
import { message, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNavBar from '../components/AdminNavBar';
import NavBar from '../components/NavBar';
import WorkerNavBar from "../components/WorkerNavBar";

const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  //   handle read notification
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:5000/v1/user/get-all-notification",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        window.location.reload();
        message.success('All notifications marked as read',3);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("somthing went wrong");
    }
  };

  // delete notifications
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:5000/v1/user/delete-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        window.location.reload();
        message.success('All notifications Deleted',3);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing Went Wrong In Ntifications");
    }
  };

  const ShowNav = user
  ? user.isAdmin
      ? <AdminNavBar />
      : user.isWorker
          ? <WorkerNavBar />
          : <NavBar />
  : <NavBar />;
  return (
    <>
    {ShowNav}
      <h4 className="p-3 text-center">Notification Page</h4>
      <Tabs>
        <Tabs.TabPane tab="unRead" key={0}>
          <div className="flex justify-end p-5">
            <button className="p-2 bg-blue-400 rounded-sm text-white" onClick={handleMarkAllRead}>
              Mark As Read
            </button>
          </div>
          {user?.notifcation.map((notificationMgs, index) => (
            <div className="card" style={{ cursor: "pointer" }} key={index}>
              <div
                className="card-text"
                onClick={() => navigate(notificationMgs.onClickPath)}
              >
                {notificationMgs.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div className="flex justify-end">
            <button
              className="p-2 mr-4 text-white bg-red-500 rounded-sm"
              style={{ cursor: "pointer" }}
              onClick={handleDeleteAllRead}
            >
              Delete All Read
            </button>
          </div>
          {user?.seennotification.map((notificationMgs,index) => (
            <div className="card" style={{ cursor: "pointer" }} key={index}>
              <div
                className="card-text"
                onClick={() => navigate(notificationMgs.onClickPath)} key={index}
              >
                {notificationMgs.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default NotificationPage;