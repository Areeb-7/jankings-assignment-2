import React from 'react';
import '../styles.css'
const SlotSelection = ({ selectedSlot, onSelect }) => {
  const slots = [
    { id: 'morning', label: 'Morning', time: '9:00 AM - 12:00 PM' },
    { id: 'afternoon', label: 'Afternoon', time: '12:00 PM - 4:00 PM' },
    { id: 'evening', label: 'Evening', time: '4:00 PM - 8:00 PM' },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Select a Time Slot</h3>
      <div className="grid grid-cols-1 gap-4 div1">
        {slots.map((slot) => (
          <button
            key={slot.id}
            onClick={() => onSelect(slot.id)}
            className={`p-4 border rounded-lg btntimeslot ${
              selectedSlot === slot.id
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
          >
            <div className="labe font-medium text-gray-900">{slot.label}</div>
            <div className=" time text-sm text-gray-900">{slot.time}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SlotSelection;