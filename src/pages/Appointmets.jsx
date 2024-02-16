import React, { useEffect, useState } from "react";
import AdminNavBar from "../components/AdminNavBar";
import WorkerNavBar from "../components/WorkerNavBar";
import NavBar from '../components/NavBar';
import { useSelector } from "react-redux";
import axios from "axios";
import moment from 'moment'
import { Table } from 'antd';

const Appointments = () => {
    const { user } = useSelector((state) => state.user);
    const [appointments, setAppointments] = useState([]);

    const getAppointments = async () => {
        try {
            const res = await axios.get("http://localhost:5000/v1/user/user-appointments", {
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

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id'  
        },
        {
            title: 'Name',
            dataIndex: 'workerInfo',
            render: (text, record) => (
                <span>
                    {record.workerInfo.firstName} {record.workerInfo.lastName}
                </span>
            )  
        },
        {
            title: 'Phone',
            dataIndex: 'workerInfo',
            render: (text, record) => (
                <span>
                    {record.workerInfo.phone}
                </span>
            )  
        },
        {
            title: 'Date & Time',
            dataIndex: 'date',
            render: (text, record) => (
                <span>
                    {moment(record.date).format('DD-MM-YYYY')} {moment(record.time).format('HH:mm')}
                </span>
            )  
        },
        {
            title: 'Status',
            dataIndex: 'status',  
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
            <h1>Appointments List</h1>
            <Table columns={columns} dataSource={appointments.map(appointment => ({ ...appointment, key: appointment._id }))} />
        </>
    );
};

export default Appointments;

