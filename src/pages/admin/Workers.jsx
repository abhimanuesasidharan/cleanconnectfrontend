import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'; 
import { message } from 'antd'; // Import message from Ant Design
import AdminNavBar from '../../components/AdminNavBar';
import NavBar from '../../components/NavBar';
import axios from "axios";

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

    const handleAccountStatus = async (record, status) => {
        try {
            const res = await axios.post(
                "http://localhost:5000/v1/admin/changeAccountStatus",
                { workerId: record._id, userId: record.userId, status: status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (res.data.success) {
                message.success(res.data.message);
                // Update the worker's status in the local state
                const updatedWorkers = workers.map(worker => {
                    if (worker._id === record._id) {
                        return { ...worker, status: status };
                    } else {
                        return worker;
                    }
                });
                setWorkers(updatedWorkers);
            }
        } catch (error) {
            message.error("Something Went Wrong");
        }
    };
    
    useEffect(() => {
        getWorkers();
    }, []);

    return (
        <>
            {ShowNav}
            <h1 className="text-center m-2">Workers List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {workers.map((worker, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <h3 className="text-xl font-bold capitalize">{worker.firstName} {worker.lastName}</h3>
                        <p className="text-gray-600">Status: {worker.status}</p>
                        <p className="text-gray-600">Phone: {worker.phone}</p>
                        <div className="mt-4">
                            <button
                                className={`rounded-lg px-4 py-2 text-white ${worker.status === "pending" ? "bg-green-500" : "bg-red-500"}`}
                                onClick={() => handleAccountStatus(worker, worker.status === "pending" ? "approved" : "rejected")}
                            >
                                {worker.status === "pending" ? "Approve" : "Reject"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Workers;
