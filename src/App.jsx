import React from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import {useSelector} from 'react-redux'
import Spinner from './components/spinner';
import ProtectedRoute from './components/ProctedRoute';
import PublicRoute from './components/PublicRoute';
import ApplyWorker from './pages/ApplyWorker';
import NotificationPage from './pages/NotificationPage';
import Users from './pages/admin/Users';
import Workers from './pages/admin/Workers';
import Profile from './pages/worker/Profile';
import BookingPage from './pages/BookingPage';
import Appointmets from './pages/Appointmets';
import WorkerAppointments from './pages/worker/WorkerAppointments';
import PaymentPage from './pages/PaymentPage';

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
        <BrowserRouter>
        {loading ? ( <Spinner/>) :(
        <Routes>
          <Route path="/"
           element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
           } />
          <Route path="/login" 
          element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
          } />
          <Route path="/appointments" 
          element={
          <ProtectedRoute>
            <Appointmets/>
          </ProtectedRoute>
          } />
          <Route path="/worker-appointments" 
          element={
          <ProtectedRoute>
            <WorkerAppointments/>
          </ProtectedRoute>
          } />
          <Route path="/register" 
          element={
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
          } />
           <Route path="/apply-worker"
           element={
            <ProtectedRoute>
              <ApplyWorker/>
              </ProtectedRoute>
           } />
           <Route path="/admin/users"
           element={
            <ProtectedRoute>
              <Users/>
              </ProtectedRoute>
           } />
           <Route path="/worker/profile/:id"
           element={
            <ProtectedRoute>
              <Profile/>
              </ProtectedRoute>
           } />
           <Route path="/admin/workers"
           element={
            <ProtectedRoute>
              <Workers/>
              </ProtectedRoute>
           } />
           <Route path="/worker/book-appointment/:workerId"
           element={
            <ProtectedRoute>
              <BookingPage/>
              </ProtectedRoute>
           } />
           <Route path="/payment"
           element={
            <ProtectedRoute>
              <PaymentPage/>
              </ProtectedRoute>
           } />
           <Route path="/notification"
           element={
            <ProtectedRoute>
              <NotificationPage/>
              </ProtectedRoute>
           } />
        </Routes>
        )}
      </BrowserRouter>
    </>
  )
} 

export default App
