import React from 'react';
import { Scissors, Sparkles, Home, Wrench } from 'lucide-react';
import ServiceCard from './ServiceCard';

const popularServices = [
  {
    icon: <Scissors size={32} />,
    name: 'Haircut & Styling',
    description: 'Professional haircut and styling at home',
    price: '₹1499',
    rating: 4.8,
    bookings: '10k+'
  },
  {
    icon: <Sparkles size={32} />,
    name: 'Deep Cleaning',
    description: 'Complete home deep cleaning service',
    price: '₹5999',
    rating: 4.9,
    bookings: '15k+'
  },
  {
    icon: <Home size={32} />,
    name: 'Interior Painting',
    description: 'Professional interior wall painting',
    price: '₹14999',
    rating: 4.7,
    bookings: '8k+'
  },
  {
    icon: <Wrench size={32} />,
    name: 'AC Repair',
    description: 'AC service and repair at doorstep',
    price: '₹3999',
    rating: 4.6,
    bookings: '12k+'
  }
];

const PopularServices = () => {
  return (
    <section className="services-section">
      <div className="services-header">
        <h2>Most Popular Services</h2>
        <p>Trusted by millions of happy customers</p>
      </div>
      <div className="services-grid">
        {popularServices.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  );
};

export default PopularServices;