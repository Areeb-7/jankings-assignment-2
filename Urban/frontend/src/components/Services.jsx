import React from 'react';
import { Scissors, Home, Paintbrush, Wrench, Sparkles, Car } from 'lucide-react';
import '../styles/Services.css';
import { useNavigate } from "react-router-dom";

const services = [
  // { icon: <Scissors size={32} />, name: 'Salon', description: 'Professional salon services at home' },
  { icon: <Home size={32} />, name: 'Cleaning', description: 'Deep home cleaning services' },
  { icon: <Paintbrush size={32} />, name: 'Painting', description: 'Professional home painting' },
  { icon: <Wrench size={32} />, name: 'Repairs', description: 'Appliance and furniture repairs' },
  { icon: <Sparkles size={32} />, name: 'Spa', description: 'Relaxing spa treatments' },
  // { icon: <Car size={32} />, name: 'Car Wash', description: 'Professional car cleaning' },
];

const Services = () => {
  const navigate = useNavigate();

  const handleServiceClick = (serviceName) => {
    console.log(serviceName)
    navigate(`/service-providers/${serviceName}`);
  };

  return (
    <section className="services">
      <h2>Our Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card" onClick={() => handleServiceClick(service.name)}>
            <div className="service-icon">{service.icon}</div>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;