import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const FooterSocial = () => {
  return (
    <div className="footer-social">
      <h3>Connect With Us</h3>
      <div className="social-icons">
        <a href="#" className="social-icon"><Facebook size={20} /></a>
        <a href="#" className="social-icon"><Twitter size={20} /></a>
        <a href="#" className="social-icon"><Instagram size={20} /></a>
        <a href="#" className="social-icon"><Linkedin size={20} /></a>
        <a href="#" className="social-icon"><Youtube size={20} /></a>
      </div>
    </div>
  );
};

export default FooterSocial;