import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';

const LocationPicker = () => {
  return (
    <div className="location-picker">
      <MapPin size={20} />
      <span>New York</span>
      <ChevronDown size={16} className="chevron" />
    </div>
  );
};

export default LocationPicker;