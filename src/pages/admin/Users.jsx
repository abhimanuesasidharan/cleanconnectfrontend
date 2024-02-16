import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'; 
import AdminNavBar from '../../components/AdminNavBar';
import NavBar from '../../components/NavBar';
import axios from "axios";

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

    return (
        <>
            {ShowNav}
            <h1 className="text-center m-2">Workers List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                {users.map((user, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg ">
                        <h3 className="text-xl font-bold">{user.name}</h3>
                        <p className="text-gray-600">{user.email}</p>
                        <p className="text-gray-600">Worker: {user.isWorker ? "Yes" : "No"}</p>
                        <div className="mt-4">
                            <button className="rounded-md px-4 py-2 bg-red-500 text-white">Block</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Users;
