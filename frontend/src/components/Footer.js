import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <h3>🛍️ E-Commerce</h3>
            </div>
            <p className="footer-description">
              Your one-stop destination for quality products at great prices. 
              We offer a wide range of electronics, clothing, books, and more 
              with fast delivery and excellent customer service.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                📘
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                🐦
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                📷
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                💼
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#products">All Products</a></li>
              <li><a href="#products?category=Electronics">Electronics</a></li>
              <li><a href="#products?category=Clothing">Clothing</a></li>
              <li><a href="#products?category=Books">Books</a></li>
              <li><a href="#products?category=Sports">Sports</a></li>
              <li><a href="#products?category=Toys">Toys</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-section">
            <h4 className="footer-title">Customer Service</h4>
            <ul className="footer-links">
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#shipping">Shipping Info</a></li>
              <li><a href="#returns">Returns & Exchanges</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#support">Support Center</a></li>
              <li><a href="#track-order">Track Your Order</a></li>
            </ul>
          </div>

          {/* Company Info */}
          <div className="footer-section">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#press">Press</a></li>
              <li><a href="#investors">Investors</a></li>
              <li><a href="#sustainability">Sustainability</a></li>
              <li><a href="#partnerships">Partnerships</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="footer-section">
            <h4 className="footer-title">Stay Updated</h4>
            <p className="newsletter-text">
              Subscribe to our newsletter for the latest deals and updates!
            </p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="newsletter-input"
              />
              <button className="newsletter-btn">Subscribe</button>
            </div>
            <div className="contact-info">
              <p>📧 support@ecommerce.com</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>📍 123 Commerce St, City, State 12345</p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; {currentYear} E-Commerce Store. All rights reserved.</p>
            </div>
            <div className="footer-bottom-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#cookies">Cookie Policy</a>
              <a href="#accessibility">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
