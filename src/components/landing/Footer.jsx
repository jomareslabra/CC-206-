import React from 'react';
import '../../styles/components/Footer.css'; // Fixed path

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <FooterColumn 
            title="HealthSync"
            links={['About Us', 'Careers', 'Press', 'Blog']}
          />
          <FooterColumn 
            title="Product"
            links={['Features', 'Pricing', 'Security', 'Updates']}
          />
          <FooterColumn 
            title="Support"
            links={['Help Center', 'Training', 'Contact Us', 'Status']}
          />
          <FooterColumn 
            title="Connect"
            links={['Twitter', 'LinkedIn', 'Facebook', 'Instagram']}
          />
        </div>
        <div className="copyright">
          <p>&copy; {currentYear} HealthSync. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, links }) => {
  return (
    <div className="footer-column">
      <h3>{title}</h3>
      <ul className="footer-links">
        {links.map((link, index) => (
          <li key={index}>
            <a href="#">{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;