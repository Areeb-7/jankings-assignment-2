import React from 'react';

const FooterLinks = ({ section }) => {
  return (
    <div className="footer-link-section">
      <h3>{section.title}</h3>
      <ul>
        {section.links.map((link, index) => (
          <li key={index}>
            <a href="#">{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinks;