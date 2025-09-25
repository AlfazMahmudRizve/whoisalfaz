
import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  onNavClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, onNavClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Showcase', href: '#showcase' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    onNavClick();
    setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else if (href === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, 0);
  };


  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-dark-bg/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick('#'); }} className="text-2xl font-bold text-gray-900 dark:text-white">
          <span className="text-primary">whois</span>
          <span className="text-secondary">alfaz</span>
          <span className="text-primary">.me</span>
        </a>
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-300 font-medium"
            >
              {link.name}
            </a>
          ))}
        </nav>
        <div className="flex items-center space-x-
