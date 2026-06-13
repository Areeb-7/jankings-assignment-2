import React from 'react';
import { Scissors, Home, Paintbrush, Wrench, Sparkles, Car } from 'lucide-react';
import ServiceCard from './ServiceCard';
import PopularServices from './PopularServices';
import NewArrivals from './NewArrivals';
import './Services.css';
import { useNavigate } from 'react-router-dom';

const mainServices = [
  { 
    icon: <Sparkles size={32} />, 
    name: 'spa', 
    description: 'Relaxing spa treatments' 
  },
  { 
    icon: <Home size={32} />, 
    name: 'cleaning', 
    description: 'Deep home cleaning services' 
  },
  { 
    icon: <Paintbrush size={32} />, 
    name: 'painting', 
    description: 'Professional home painting' 
  },
  { 
    icon: <Wrench size={32} />, 
    name: 'repairs', 
    description: 'Appliance and furniture repairs' 
  },
];

const Services = () => {
  
  return (
    <div className="services-container">
      <section className="services-section">
        <div className="services-header">
          <h2>Our Services</h2>
          <p>Book trusted, reliable services at your doorstep</p>
        </div>
        <div className="services-grid">
          {mainServices.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </section>
      
      <PopularServices />
      <NewArrivals />
    </div>
  );
};

export default Services; 