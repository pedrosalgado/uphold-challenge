import React from 'react';
import Image from 'next/image';
import '../styles/header.css';

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <a href="#">Personal</a>
        <a href="#">Business</a>
        <a href="#">Partners</a>
      </nav>
      <div className="logo-container">
        <Image
          src="/assets/logo.svg"
          alt="Uphold Logo"
          width={120}
          height={40}
        />
      </div>
      <div className="login-button-container">
        <button className="login-button">Log In</button>
      </div>
    </header>
  );
};

export default Header;
