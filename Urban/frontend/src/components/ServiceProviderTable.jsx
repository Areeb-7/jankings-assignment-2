import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const GET_SERVICE_PROVIDERS = gql`
  query GetServiceProvidersByService($service: String!) {
    getServiceProvidersByService(service: $service) {
      id
      firstName
      lastName
      mobileNumber
      service
      location
      amountPerHour
    }
  }
`;

const ServiceProviderTable = () => {
  const { service } = useParams();
  const navigate =useNavigate()

  const handleBooking = (provider) => {
    navigate('/booking', { state: { provider } });
  };

  // Use Apollo Client's useQuery hook to fetch data
  const { loading, error, data } = useQuery(GET_SERVICE_PROVIDERS, {
    variables: { service },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  const serviceProviders = data.getServiceProvidersByService;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Service Providers for {service}</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>First Name</th>
            <th style={styles.th}>Last Name</th>
            <th style={styles.th}>Mobile Number</th>
            <th style={styles.th}>Service</th>
            <th style={styles.th}>Location</th>
            <th style={styles.th}>Amount Per Hour</th>
          </tr>
        </thead>
        <tbody>
          {serviceProviders.length > 0 ? (
            serviceProviders.map((provider) => (
              <tr key={provider.id} onClick={() => handleBooking(provider)}>
                <td style={styles.td}>{provider.firstName}</td>
                <td style={styles.td}>{provider.lastName}</td>
                <td style={styles.td}>{provider.mobileNumber}</td>
                <td style={styles.td}>{provider.service}</td>
                <td style={styles.td}>{provider.location}</td>
                <td style={styles.td}>₹{provider.amountPerHour}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td style={styles.td} colSpan="6">
                No service providers found for {service}.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px",
    textAlign: "left",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  },
};

export default ServiceProviderTable;
