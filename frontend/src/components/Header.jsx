import React from 'react';
import logo from '../assets/react.svg'; // Make sure to add your logo image in the assets folder

const Header = () => {
  return (
    <header className="bg-gray-900 py-8 shadow-xl">
      <div className="container mx-auto flex items-center justify-between px-6">
        <div className="flex items-center">
          <img src={logo} alt="ShopTalkBot Logo" className="h-16 w-16 mr-4" />
          <h1 className="text-5xl font-extrabold text-white">ShopTalkBot</h1>
        </div>
        <nav className="flex space-x-4">
          <a href="#home" className="text-lg text-white hover:text-gray-200">Home</a>
          <a href="#features" className="text-lg text-white hover:text-gray-200">Features</a>
          <a href="#about" className="text-lg text-white hover:text-gray-200">About</a>
          <a href="#contact" className="text-lg text-white hover:text-gray-200">Contact</a>
        </nav>
      </div>
      <p className="text-lg text-gray-100 text-center mt-4">
        Your AI-powered assistant for ShopTalk
      </p>
    </header>
  );
};

export default Header;