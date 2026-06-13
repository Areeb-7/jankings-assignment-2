import React from 'react';
import { Send } from 'lucide-react';

const FooterNewsletter = () => {
  return (
    <div className="footer-newsletter">
      <h3>Subscribe to Our Newsletter</h3>
      <p>Stay updated with our latest services and offers</p>
      <div className="newsletter-form">
        <input type="email" placeholder="Enter your email" />
        <button type="submit">
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default FooterNewsletter;