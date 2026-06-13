import React, { useState } from 'react';
import { format, addDays, isSameDay } from 'date-fns';

const DateTimeSelection = ({ selectedDate, selectedTime, onSelect }) => {
  const [date, setDate] = useState(selectedDate || new Date());
  const [time, setTime] = useState(selectedTime || '');

  const availableDates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));
  
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const handleSubmit = () => {
    onSelect(date, time);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Select Date</h3>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {availableDates.map((d) => (
            <button
              key={d.toISOString()}
              onClick={() => setDate(d)}
              className={`p-3 text-center border rounded-lg ${
                isSameDay(date, d)
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
            >
              <div className="text-sm font-medium">{format(d, 'EEE')}</div>
              <div className="text-lg">{format(d, 'd')}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Select Time</h3>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {timeSlots.map((t) => (
            <button
              key={t}
              onClick={() => setTime(t)}
              className={`p-3 text-center border rounded-lg ${
                time === t
                  ? 'border-indigo-900 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!date || !time}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
};

export default DateTimeSelection;