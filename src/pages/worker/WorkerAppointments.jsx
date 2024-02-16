import React, { useEffect, useState } from "react";
import AdminNavBar from '../../components/AdminNavBar';
import WorkerNavBar from '../../components/WorkerNavBar';
import NavBar from '../../components/NavBar';
import { useSelector } from "react-redux";
import axios from "axios";
import moment from 'moment';
import { Table, message } from 'antd'; // Import message from 'antd'

const WorkerAppointments = () => {
    const { user } = useSelector((state) => state.user);
    const [appointments, setAppointments] = useState([]);

    const getAppointments = async () => {
        try {
            const res = await axios.get("http://localhost:5000/v1/worker/worker-appointments", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (res.data.success) {
                setAppointments(res.data.data);
            }
        } catch(error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAppointments();
    }, []);

    const handleStatus = async (record, status) => {
        try {
            const res = await axios.post('http://localhost:5000/v1/worker/update-status', { appointmentsId: record._id, status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                }
            );
            if (res.data.success) {
                message.success(res.data.message);
                getAppointments();
                window.location.reload(); // Reload the page after successfully updating the status
            }
        } catch (error) {
            console.log(error);
            message.error('Something went wrong');
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id'
        },
        {
            title: 'Date & Time',
            dataIndex: 'date',
            render: (text, record) => (
                <span>
                    {moment(record.date).format('DD-MM-YYYY')}
                    <span style={{ margin: '0 4px' }}> </span>
                    {moment(record.time).format('HH:mm')}
                </span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <span>
                    {record.status === "pending" && (
                        <div className="flex justify-between">
                            <button className="bg-green-500 p-2 rounded-lg text-white" onClick={() => handleStatus(record, 'approved')}>Approve</button>
                            <button className="bg-red-500 p-2 rounded-lg text-white" onClick={() => handleStatus(record, 'reject')}>Reject</button>
                        </div>
                    )}
                </span>
            )
        }
    ];

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
            <h1>Worker appointments</h1>
            <Table columns={columns} dataSource={appointments.map(appointment => ({ ...appointment, key: appointment._id }))} />
        </>
    );
};

export default WorkerAppointments;
