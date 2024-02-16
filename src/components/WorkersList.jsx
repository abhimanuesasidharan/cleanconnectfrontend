import React from 'react';
import { useNavigate } from "react-router-dom";

const WorkersList = ({ worker }) => {
  const navigate = useNavigate();


  return (
    <div className="container mx-auto px-4 py-8 cursor-pointer">
      <div className="bg-white shadow-md rounded-md p-4">
        <h2 className="text-xl font-semibold mb-2 capitalize">{worker.firstName} {worker.lastName}</h2>
        <p className="text-gray-600">Contact: {worker.phone}</p>
        <p className="text-gray-600">Fees: {worker.price}</p>
        <p className="text-gray-600">Skills: {worker.skills}</p>
        <p className="text-gray-600">Experience: {worker.experience}</p>
        <p className="text-gray-600">Email: {worker.email}</p>
        <p className="text-gray-600">Timings: {worker.timings[0]} - {worker.timings[1]}</p>
        <button className='bg-green-500 text-white p-2 m-2 rounded-md' onClick={() => navigate(`/worker/book-appointment/${worker._id}`)}>Book</button>
      </div>
    </div>
  );
};

export default WorkersList;
