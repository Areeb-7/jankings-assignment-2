import React from 'react';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ icon, name, description, price, rating, bookings }) => {
  const navigate = useNavigate();

  const handleServiceClick = (serviceName) => {
    console.log(serviceName)
    navigate(`/service-providers/${serviceName}`);
  };
  return (
    <div className="service-card" onClick={() => handleServiceClick(name)}>
      <div className="service-icon">{icon}</div>
      <h3>{name}</h3>
      <p className="description">{description}</p>
      {(price || rating || bookings) && (
        <div className="service-details">
          {price && <span className="price">Starts at {price}</span>}
          {rating && <span className="rating">★ {rating}</span>}
          {bookings && <span className="bookings">{bookings} bookings</span>}
        </div>
      )}
    </div>
  );
};

export default ServiceCard;