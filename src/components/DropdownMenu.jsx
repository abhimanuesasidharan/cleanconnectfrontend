// DropdownMenu.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux'; 
import { FaUserCircle } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import { Avatar, Badge} from 'antd';
import { useNavigate } from 'react-router-dom';

const DropdownMenu = () => {
    const {user} = useSelector(state => state.user)
    const [menuVisible, setMenuVisible] = useState(false);
    const navigate = useNavigate()

    function logout() {
        localStorage.removeItem('token')
        window.location.href = "/login"
    }

    return (
        <div className="flex items-center justify-center ">
            <div className="relative">
                <div className="flex justify-center items-center bg-green-500 rounded-2xl focus:ring focus:border-blue-300">
                    <div className="col flex justify-center items-center">
                        <div className='ml-1 text-white flex'>
                        <FaUserCircle />
                        </div>
                        <button
                            className=" text-white uppercase text-xs p-2 focus:outline-none"
                        >
                            {user ? user.name : 'User'}
                                <Badge count={user?.notifcation.length} className='pl-1' onClick={()=>{navigate('/notification')}} >
                                 </Badge>
                        </button>
                    </div>
                    <div className="col text-white">
                        <button onClick={() => setMenuVisible(!menuVisible)}>
                            <MdArrowDropDown />
                        </button>
                    </div>
                </div>

                {menuVisible && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                        <a
                            href="#"
                            onClick={logout}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Logout
                        </a>
                        <a
                            href="#"
                            onClick={()=>{navigate('/notification')}}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Booking
                        </a>

                    </div>
                )}
            </div>
        </div>
    );
};

export default DropdownMenu;
