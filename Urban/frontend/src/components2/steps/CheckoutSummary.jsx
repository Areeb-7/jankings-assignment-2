import React from 'react';
import { format } from 'date-fns';
import { MapPin, Clock, Calendar, Phone, Edit2 } from 'lucide-react';
import toast from 'react-hot-toast';

const CheckoutSummary = ({ bookingData, provider, onEdit, onCheckout }) => {
  const handleCheckout = () => {
    onCheckout();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Booking Summary</h3>

      {provider && (
        <div className="flex items-start justify-between p-4 bg-indigo-50 border border-indigo-100 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 rounded-md text-indigo-700 font-semibold text-lg">
              ₹
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Service Provider</p>
              <p className="text-sm text-gray-500">
                {provider.firstName} {provider.lastName}
              </p>
              <p className="text-xs text-gray-400 capitalize">
                Service: {provider.service}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Rate</p>
            <p className="text-sm font-bold text-indigo-700">
              ₹{provider.amountPerHour}/hr
            </p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">Phone Number</p>
              <p className="text-sm text-gray-500">{bookingData.phoneNumber}</p>
            </div>
          </div>
          <button
            onClick={() => onEdit(1)}
            className="text-indigo-600 hover:text-indigo-800"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">Address</p>
              <p className="text-sm text-gray-500">
                {`${bookingData.address.area}, ${bookingData.address.city}, ${bookingData.address.state}`}
              </p>
            </div>
          </div>
          <button
            onClick={() => onEdit(2)}
            className="text-indigo-600 hover:text-indigo-800"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">Time Slot</p>
              <p className="text-sm text-gray-500">{bookingData.slot}</p>
            </div>
          </div>
          <button
            onClick={() => onEdit(3)}
            className="text-indigo-600 hover:text-indigo-800"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">Date & Time</p>
              <p className="text-sm text-gray-500">
                {bookingData.date && format(bookingData.date, 'PPP')} at {bookingData.time}
              </p>
            </div>
          </div>
          <button
            onClick={() => onEdit(4)}
            className="text-indigo-600 hover:text-indigo-800"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Pay {provider ? `₹${provider.amountPerHour}` : ''}
      </button>
    </div>
  );
};

export default CheckoutSummary;