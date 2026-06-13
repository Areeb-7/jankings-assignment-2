import React from 'react';
import BookingForm from './components2/BookingForm';
import { Toaster } from 'react-hot-toast';

function Booking() {
  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8">Book Your Service</h1>
          <BookingForm />
        </div>
      </div>
    </>
  );
}

export default Booking;