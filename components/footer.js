import React from 'react';
import Image from 'next/image';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <div>
          <h4>Products</h4>
          <a href="#">Consumers</a>
          <a href="#">Business</a>
          <a href="#">Partners</a>
        </div>
        <div>
          <h4>Company</h4>
          <a href="#">About</a>
          <a href="#">Careers</a>
          <a href="#">Press</a>
          <a href="#">Blog</a>
        </div>
        <div>
          <h4>Help</h4>
          <a href="#">FAQ & Support</a>
          <a href="#">Platform Status</a>
          <a href="#">Criptionary</a>
          <a href="#">Pricing</a>
          <a href="#">Legal</a>
        </div>
        <div>
          <h4>Social</h4>
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
        </div>
        <div className="footer-icons">
          <div className="top-icons">
            <Image
              src="/assets/playstore.svg"
              alt="Play Store"
              width={20}
              height={20}
            />
            <Image
              src="/assets/appstore.svg"
              alt="App Store"
              width={20}
              height={20}
            />
          </div>
          <Image
            src="/assets/qr-code.svg"
            alt="QR Code"
            width={40}
            height={40}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
