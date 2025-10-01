'use client';

import React, { useState, useEffect } from 'react';

const Header = () => {
  const menuItems = ['Home', 'Servizi', 'Matrimoni', 'Eventi Privati', 'Piazze & Locali', 'Recensioni', 'Contatti'];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`p-4 fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-gradient-to-r from-oxford-blue via-black to-oxford-blue shadow-lg'
            : 'bg-white/90 backdrop-blur-md shadow-md'
        }`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="Joyful Time Logo"
              className={`h-12 transition-all duration-300 ${
                scrolled ? 'brightness-0 invert' : ''
              }`}
            />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 items-center">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`transition-colors duration-300 font-sans-modern ${
                  scrolled
                    ? 'text-white hover:text-orange-web'
                    : 'text-oxford-blue hover:text-orange-web'
                }`}
              >
                {item}
              </a>
            ))}
            <button className="bg-orange-web text-white font-bold py-2 px-4 rounded-full hover:bg-black transition-all duration-300">
                Scrivici su WhatsApp
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`focus:outline-none transition-colors duration-300 ${
                scrolled ? 'text-white' : 'text-oxford-blue'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black bg-opacity-95 z-40 transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {menuItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white text-2xl font-sans-modern hover:text-orange-web transition-colors duration-300"
              onClick={() => setMenuOpen(false)} // Close menu on click
            >
              {item}
            </a>
          ))}
          <button className="mt-8 bg-orange-web text-white font-bold py-3 px-6 rounded-full">
              Scrivici su WhatsApp
          </button>
           <button className="border-2 border-white text-white font-bold py-3 px-6 rounded-full">
                Chiama ora
            </button>
        </div>
      </div>
    </>
  );
};

export default Header;
