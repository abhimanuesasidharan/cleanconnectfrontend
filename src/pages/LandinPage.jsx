import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage({redirectToWorkers}) {
  return (
    <div>
    {/* Hero Section */}
    <div className="relative text-white py-16 h-96">
  <img src='https://images.unsplash.com/photo-1603712725038-e9334ae8f39f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="Background" className="absolute inset-0 w-full h-full object-cover" />
  <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
  <div className="absolute inset-0 flex flex-col justify-center items-center">
    <div className="container mx-auto text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">Cleanconnect</h1>
      <p className="text-lg md:text-xl lg:text-2xl mb-8">Your go-to platform for home services.</p>
      <button className="bg-green-400 text-white py-2 px-6 rounded-full hover:bg-white hover:text-green-400" onClick={redirectToWorkers}>
        Get Started
      </button>
    </div>
  </div>
</div>



    {/* How It Works Section */}
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-8">How It Works</h2>
        <div className="flex flex-wrap justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
          {/* Step 1 */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 hover:scale-110 transition-transform duration-300 ease-in-out">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center bg-green-500 text-white rounded-full w-12 h-12 mb-4">
                1
              </div>
            <Link to={'/login'}>  <button className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4">Sign Up</button></Link>
              <p className="text-gray-600">Create an account to get started with Cleanconnect.</p>
            </div>
          </div>
          {/* Step 2 */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 hover:scale-110 transition-transform duration-300 ease-in-out">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center bg-green-500 text-white rounded-full w-12 h-12 mb-4">
                2
              </div>
              <Link to="#workers" className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4">Book Services</Link>
              <p className="text-gray-600">Browse services and book professionals for your needs.</p>
            </div>
          </div>
          {/* Step 3 */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 hover:scale-110 transition-transform duration-300 ease-in-out">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center bg-green-500 text-white rounded-full w-12 h-12 mb-4">
                3
              </div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4">Get it Done</h3>
              <p className="text-gray-600">Relax as professionals take care of your home services.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Testimonials Section */}
    <div className="bg-white py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-8">What Our Customers Say</h2>
        <div className="flex flex-wrap justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
          {/* Testimonial 1 */}
          <div className="w-full sm:w-1/2 lg:w-2/3 mb-8">
            <div className="bg-gray-200 p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">"Cleanconnect made it easy for me to find reliable professionals for all my home needs. Highly recommended!"</p>
              <p className="text-green-500 font-semibold">- John Doe</p>
            </div>
          </div>
          {/* Testimonial 2 */}
          <div className="w-full sm:w-1/2 lg:w-1/3 mb-8">
            <div className="bg-gray-200 p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">"The service quality on Cleanconnect exceeded my expectations. I'll definitely use it again!"</p>
              <p className="text-green-500 font-semibold">- Jane Smith</p>
            </div>
          </div>
          {/* Testimonial 3 */}
          <div className="w-full sm:w-1/2 lg:w-1/3 mb-8">
            <div className="bg-gray-200 p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">"Booking home services has never been this convenient. Cleanconnect is a game-changer!"</p>
              <p className="text-green-500 font-semibold">- Alex Johnson</p>
            </div>
          </div>
        </div>
      </div>
    </div>

<section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 sm:items-center pb-5">
  <div className="p-8 md:p-12 lg:px-16 lg:py-24">
    <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
      <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
        CleanConnect
      </h2>

      <p className="hidden text-gray-500 md:mt-4 md:block">
      Where pristine homes are just a tap away. Our platform seamlessly connects you to top-tier cleaning services, ensuring sparkling results, unmatched convenience, and a touch of excellence every time you entrust us with your space
      </p>

      <div className="mt-4 md:mt-8">
        <a
          href="#"
          className="inline-block rounded bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400"
        >
          Get Started Today
        </a>
      </div>
    </div>
  </div>

  <img
    alt="Violin"
    src="https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    className="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-ss-[30px] md:h-[calc(100%_-_4rem)] md:rounded-ss-[60px]"
  />
</section>

    {/* CTA Section */}
    <div className="bg-green-500 text-white py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">Ready to Get Started?</h2>
        <p className="text-lg md:text-xl lg:text-2xl mb-8">Join Cleanconnect today for hassle-free home services.</p>
        <button className="bg-white text-green-500 py-2 px-6 rounded-full hover:bg-green-400 hover:text-white">Sign Up Now</button>
      </div>
    </div>
  </div>
  );
}

export default LandingPage;
