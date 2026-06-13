import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MapPin, Clock, Calendar, CreditCard, Phone } from 'lucide-react';
import PhoneNumberForm from './steps/PhoneNumberForm';
import AddressForm from './steps/AddressForm';
import SlotSelection from './steps/SlotSelection';
import DateTimeSelection from './steps/DateTimeSelection';
import CheckoutSummary from './steps/CheckoutSummary';
import StepIndicator from './StepIndicator';
import './styles.css';

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const provider = location.state?.provider;

  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    phoneNumber: '',
    address: { area: '', city: '', state: '', zipCode: '' },
    slot: '',
    date: null,
    time: '',
  });

  const steps = [
    { icon: Phone, label: 'Phone' },
    { icon: MapPin, label: 'Address' },
    { icon: Clock, label: 'Slot' },
    { icon: Calendar, label: 'Date & Time' },
    { icon: CreditCard, label: 'Checkout' },
  ];

  const handleNext = () => setStep(prev => Math.min(prev + 1, 5));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <StepIndicator currentStep={step} steps={steps} />

        <div className="mt-8">
          {step === 1 && (
            <PhoneNumberForm
              phoneNumber={bookingData.phoneNumber}
              onSubmit={({ phoneNumber }) => {
                setBookingData(prev => ({ ...prev, phoneNumber }));
                handleNext();
              }}
            />
          )}
          {step === 2 && (
            <AddressForm
              data={bookingData.address}
              onSubmit={(address) => {
                setBookingData(prev => ({ ...prev, address }));
                handleNext();
              }}
            />
          )}
          {step === 3 && (
            <SlotSelection
              selectedSlot={bookingData.slot}
              onSelect={(slot) => {
                setBookingData(prev => ({ ...prev, slot }));
                handleNext();
              }}
            />
          )}
          {step === 4 && (
            <DateTimeSelection
              selectedDate={bookingData.date}
              selectedTime={bookingData.time}
              onSelect={(date, time) => {
                setBookingData(prev => ({ ...prev, date, time }));
                handleNext();
              }}
            />
          )}
          {step === 5 && (
            <CheckoutSummary
              bookingData={bookingData}
              provider={provider}
              onEdit={(stepToEdit) => setStep(stepToEdit)}
              onCheckout={async () => {
                const token = localStorage.getItem('token');
                if (!token) {
                  toast.error('Please login to complete your booking.');
                  navigate('/login');
                  return;
                }
                if (!provider) {
                  toast.error('No service provider selected. Please select a provider first.');
                  navigate('/');
                  return;
                }

                // Combine date and time
                let scheduledDate = bookingData.date;
                if (scheduledDate && bookingData.time) {
                  const [hours, minutes] = bookingData.time.split(':').map(Number);
                  scheduledDate = new Date(scheduledDate);
                  scheduledDate.setHours(hours, minutes, 0, 0);
                } else if (!scheduledDate) {
                  scheduledDate = new Date();
                }

                const payload = {
                  service: provider.id, // maps to the backend Service model (ServicesProvider)
                  scheduledDate: scheduledDate.toISOString(),
                  address: {
                    street: bookingData.address.area,
                    city: bookingData.address.city,
                    state: bookingData.address.state,
                    zipCode: bookingData.address.zipCode || '111111'
                  },
                  totalAmount: Number(provider.amountPerHour)
                };

                try {
                  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3010';
                  const response = await fetch(`${API_BASE}/api/bookings`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'x-auth-token': token
                    },
                    body: JSON.stringify(payload)
                  });

                  const result = await response.json();
                  if (!response.ok) {
                    throw new Error(result.message || 'Booking failed');
                  }

                  toast.success('Booking placed successfully!');
                  setTimeout(() => {
                    navigate('/');
                  }, 1500);
                } catch (error) {
                  console.error(error);
                  toast.error(error.message || 'Something went wrong');
                }
              }}
            />
          )}
        </div>

        <div className="btn">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="back"
            >
              Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;