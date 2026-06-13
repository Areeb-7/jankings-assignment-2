import React from 'react';
import { Palette, Camera, Laptop, Dumbbell } from 'lucide-react';
import ServiceCard from './ServiceCard';

const newServices = [
  {
    icon: <Palette size={32} />,
    name: 'Nail Art',
    description: 'Professional nail art and care',
    price: '₹3399',
    rating: 4.9,
    bookings: '2k+'
  },
  {
    icon: <Camera size={32} />,
    name: 'Event Photography',
    description: 'Professional event photography service',
    price: '₹1999',
    rating: 4.8,
    bookings: '1k+'
  },
  {
    icon: <Laptop size={32} />,
    name: 'Tech Support',
    description: 'At-home tech support and setup',
    price: '₹5999',
    rating: 4.7,
    bookings: '3k+'
  },
  {
    icon: <Dumbbell size={32} />,
    name: 'Personal Training',
    description: 'Personalized fitness training at home',
    price: '₹3999',
    rating: 4.8,
    bookings: '5k+'
  }
];

const NewArrivals = () => {
  return (
    <section className="services-section new-arrivals">
      <div className="services-header">
        <h2>New on Urban Company</h2>
        <p>Try our latest services and offerings</p>
      </div>
      <div className="services-grid">
        {newServices.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;