import React from 'react';
import FooterLinks from './FooterLinks';
import FooterSocial from './FooterSocial';
import FooterNewsletter from './FooterNewsletter';
import './Footer.css';

const footerSections = [
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Terms & Conditions', 'Privacy Policy', 'Blog']
  },
  {
    title: 'For Customers',
    links: ['How it Works', 'Security', 'Pricing', 'FAQs', 'Contact Us']
  },
  {
    title: 'For Partners',
    links: ['Join as Professional', 'Partner Success Stories', 'Partner Support', 'Partner App']
  }
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-links-grid">
            {footerSections.map((section, index) => (
              <FooterLinks key={index} section={section} />
            ))}
          </div>
          <div className="footer-right">
            <FooterNewsletter />
            <FooterSocial />
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Urban Company. All rights reserved.</p>
          <div className="app-downloads">
            <a href="#" className="app-link">Download iOS App</a>
            <a href="#" className="app-link">Download Android App</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;