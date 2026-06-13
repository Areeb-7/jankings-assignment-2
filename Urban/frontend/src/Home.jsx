import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero';
import Services from './components/Services/Services';
import Footer from './components/Footer/Footer';

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Services />
      <Footer />
    </div>
  );
}

export default Home;