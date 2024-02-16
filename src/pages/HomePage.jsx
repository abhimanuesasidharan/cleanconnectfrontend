import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux'; 
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import AdminNavBar from "../components/AdminNavBar";
import WorkerNavBar from "../components/WorkerNavBar";
import WorkersList from "../components/WorkersList";
import LandingPage from "./LandinPage";

const HomePage = () => {
  const [workers, setWorkers] = useState([]);
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/v1/user/getAllWorkers",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setWorkers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  const { user } = useSelector((state) => state.user);
  const redirectToWorkers = () => {
    const workersSection = document.getElementById("workersSection");
    workersSection.scrollIntoView({ behavior: "smooth" });
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
            <header>
            {ShowNav}
            </header>
            <main>
        <LandingPage redirectToWorkers={redirectToWorkers} />
        <h2 id="workersSection" className="text-2xl font-bold mb-4 text-center m-2 text-green-600">Workers Online 🟢</h2>
        {workers && workers.map((worker) => (
          <WorkersList key={worker._id} worker={worker} />
        ))}
      </main>
            <footer>
            <Footer/>
            </footer>
    </>
  )
}

export default HomePage