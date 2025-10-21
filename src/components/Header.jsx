import React, { useState, useEffect } from 'react';
import '../styles/components/Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const handleLoginClick = () => {
    alert('Staff Login clicked! This would open login modal.');
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <div className="logo">
          <i className="fas fa-hospital-alt logo-icon"></i>
          <span className="logo-text">HealthSync</span>
        </div>
        
        <nav className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <a href="#features" onClick={(e) => handleNavClick(e, '#features')}>Features</a>
          <a href="#how-it-works" onClick={(e) => handleNavClick(e, '#how-it-works')}>How It Works</a>
          <a href="#testimonials" onClick={(e) => handleNavClick(e, '#testimonials')}>Testimonials</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a>
        </nav>
        
        <button className="login-btn" onClick={handleLoginClick}>Staff Login</button>
        
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>
    </header>
  );
};

export default Header;