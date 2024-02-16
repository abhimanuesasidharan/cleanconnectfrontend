import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import AdminNavBar from '../components/AdminNavBar';
import WorkerNavBar from '../components/WorkerNavBar';
import NavBar from '../components/NavBar';
import { message } from 'antd';

function PaymentPage() {
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const ShowNav = user
        ? user.isAdmin
            ? <AdminNavBar />
            : user.isWorker
                ? <WorkerNavBar />
                : <NavBar />
        : <NavBar />;

    function onToken(token) {
        console.log(token);
        message.success('Booking success!', 3)
        
    }

    function handlePayAtWorkplace() {
        navigate("/");
    }

    return (
        <>
            {ShowNav}
            <div className="container mx-auto mt-48">
                <h1 className="text-3xl font-semibold mb-8 text-center">Payment Checkout</h1>
                <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
                    <StripeCheckout
                        token={onToken}
                        stripeKey="pk_test_51OSwN7SGqjL0tjLVnFjStnshbqk6gTyt2tiKZhyt4cfKXwLeUQBOkQ3O0eJXEPFIUrXvSxnGA6aa1gRndhxdGxUL00JAXwnav6"
                        amount={15000}
                        currency="INR"
                        name="CleanConnect"
                        description="Safe & Secure Payment"
                        image="https://plus.unsplash.com/premium_photo-1678304224523-d25b4117558f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        billingAddress
                        shippingAddress
                    />
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition duration-300 ease-in-out" onClick={handlePayAtWorkplace}>Pay at Workplace</button>
                </div>
            </div>
        </>
    );
}

export default PaymentPage;
