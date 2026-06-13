// App.jsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login.jsx";
import CreateAccount from "./pages/createaccount.jsx";
import Home from "./Home.jsx";
import ServiceProviderTable from "./components/ServiceProviderTable.jsx";
import Booking from "./Booking.jsx";

import { ApolloProvider } from "@apollo/client";
import { client } from "./apolloClient.js"; // Import your Apollo Client instance

const App = () => {
  return (
    <div>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/createaccount" element={<CreateAccount />}></Route>
            <Route path="/booking" element={<Booking/>}></Route>
            <Route path="/service-providers/:service" element={<ServiceProviderTable />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </div>
  );
};

export default App;
