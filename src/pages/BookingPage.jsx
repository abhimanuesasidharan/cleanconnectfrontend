import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import Footer from "../components/Footer";
import AdminNavBar from "../components/AdminNavBar";
import WorkerNavBar from "../components/WorkerNavBar";
import NavBar from '../components/NavBar';
import axios from "axios";
import moment from "moment";
import DatePicker from "react-datepicker"; // Import react-datepicker
import TimePicker from "react-time-picker"; // Import react-time-picker
import "react-datepicker/dist/react-datepicker.css"; // Import react-datepicker styles
import "react-time-picker/dist/TimePicker.css"; // Import react-time-picker styles


const BookingPage = () => {
    const { user } = useSelector((state) => state.user);
    const params = useParams();
    const [worker, setWorker] = useState(null);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState("12:00"); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAvailable, setIsAvailable] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const getWorkerData = async () => {
            try {
                const res = await axios.post(
                    "http://localhost:5000/v1/worker/getWokerById",
                    { workerId: params.workerId },
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    }
                );
                if (res.data.success) {
                    setWorker(res.data.data);
                } else {
                    setError("Failed to fetch worker data");
                }
            } catch (error) {
                console.log(error);
                setError("Failed to fetch worker data");
            } finally {
                setLoading(false);
            }
        };

        getWorkerData();
    }, [params.workerId]);

    const handleBooking = async () => {
        try {
            if (!date || !time) {
                return alert("Date & Time Required");
            }
            setLoading(true); // Set loading to true while making the request
            const res = await axios.post(
                "http://localhost:5000/v1/user/book-appointment",
                {
                    workerId: params.workerId,
                    userId: user._id,
                    workerInfo: worker,
                    userInfo: user,
                    date: moment(date).format("DD-MM-YYYY"),
                    time: moment(time, "HH:mm").format("HH:mm"),
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setLoading(false); // Set loading to false after the request is completed
            if (res.data.success) {
                message.success(res.data.message);
                navigate('/payment')
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            setLoading(false); // Set loading to false in case of error
            message.error("Failed to book appointment");
        }
    };

    const handleAvailability = async () => {
        try {
            console.log("Date:", date);
            console.log("Time:", time);
            dispatch(showLoading());
            const res = await axios.post(
                "http://localhost:5000/v1/user/booking-availbility",
                { workerId: params.workerId, date, time },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(hideLoading());
            if (res.data.success) {
                console.log(isAvailable);
                setIsAvailable(true);
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
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
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-4">Booking Page</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    worker && (
                        <div className="bg-white shadow-md rounded-md p-4">
                            <h2 className="text-xl font-semibold mb-2">{worker.firstName} {worker.lastName}</h2>
                            <p className="text-gray-600">Contact: {worker.phone}</p>
                            <p className="text-gray-600">Fees: {worker.price}</p>
                            <p className="text-gray-600">Skills: {worker.skills}</p>
                            <p className="text-gray-600">Experience: {worker.experience}</p>
                            <p className="text-gray-600">Email: {worker.email}</p>
                            <p className="text-gray-600">Timings:{worker.timings && worker.timings[0]} -{" "}
                                {worker.timings && worker.timings[1]}{" "}</p>
                                
                                <p className="text-gray-600" >Selected Date: {date && moment(date).format("DD-MM-YYYY")}</p>
                                
                            <p className="text-gray-600">Selected Time: {time}</p>
                            <div>
                                <h3>Select Date</h3>
                                <DatePicker
                                placeholder="Select Date"
                                selected={date}
                                onChange={(date) => setDate(date)}
                                dateFormat="dd/MM/yyyy"
                                minDate={new Date()}
                                className="border p-1 text-black"
                                />
                                {/* Time Picker */}
                                <TimePicker
                                    onChange={(time) => setTime(time)}
                                    value={time}
                                    format="HH:mm"
                                    className="m-2"
                                />
                                {/* Button to check availability */}
                                <button className="bg-blue-500 text-white m-2 rounded-lg p-2" onClick={handleAvailability}>Check Availability</button>
                                {/* Button to handle booking */}
                                <button className="bg-green-500 text-white m-2 rounded-lg p-2" onClick={handleBooking}>Book Now</button>
                            </div>
                        </div>
                    )
                )}
            </div>
            <Footer />
        </>
    );
};

export default BookingPage;
