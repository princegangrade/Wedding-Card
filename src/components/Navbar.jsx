import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { language, toggleLanguage, config } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'invitation', 'events'];
      let current = 'home';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= 100) {
            current = section;
          }
        }
      }
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: config.nav.home, to: 'home' },
    { name: config.nav.invitation, to: 'invitation' },
    { name: config.nav.events, to: 'events' },
  ];

  // Dynamic Styles based on section
  let navBg = 'bg-transparent py-5';
  let textStyle = 'text-primary drop-shadow-md';
  let btnStyle = 'border-primary text-primary bg-white/70 hover:bg-primary hover:text-white backdrop-blur-sm shadow-sm';
  let logoStyle = 'text-primary';

  if (scrolled) {
    if (activeSection === 'invitation') {
      navBg = 'bg-primary shadow-md py-3';
      textStyle = 'text-gold';
      btnStyle = 'border-gold text-gold hover:bg-gold hover:text-primary';
      logoStyle = 'text-gold';
    } else if (activeSection === 'events') {
      navBg = 'bg-ivory border-b border-gold/30 shadow-md py-3';
      textStyle = 'text-primary';
      btnStyle = 'border-primary text-primary hover:bg-primary hover:text-ivory';
      logoStyle = 'text-primary';
    } else {
      navBg = 'bg-white shadow-md py-3';
      textStyle = 'text-gray-800 md:text-gray-900';
      btnStyle = 'border-primary text-primary hover:bg-primary hover:text-white';
      logoStyle = 'text-primary';
    }
  }

  return (
    <nav className={`fixed w-full z-40 transition-all duration-500 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 cursor-pointer">
            <Link to="home" smooth={true} duration={500} className={`font-serif text-xl sm:text-2xl font-bold transition-colors duration-500 ${logoStyle}`}>
              {config.couple.groom[0]} & {config.couple.bride[0]}
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                smooth={true}
                duration={500}
                spy={true}
                activeClass={activeSection === link.to ? "opacity-100 scale-105 font-bold" : ""}
                offset={0}
                className={`cursor-pointer font-medium hover:scale-105 transition-all duration-300 ${textStyle}`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Language Toggle Button */}
            <button 
              onClick={toggleLanguage}
              className={`px-4 py-1.5 rounded-full border-2 font-medium transition-colors duration-500 ${btnStyle}`}
            >
              {language === 'en' ? 'తెలుగు' : 'English'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className={`px-3 py-1 rounded-full border-2 text-sm font-medium transition-colors ${btnStyle}`}
            >
              {language === 'en' ? 'తెలుగు' : 'English'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${textStyle} hover:scale-110 transition-transform focus:outline-none`}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-xl absolute w-full left-0 top-full border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                smooth={true}
                duration={500}
                offset={0}
                className="cursor-pointer block px-3 py-4 text-base font-medium text-gray-800 hover:text-gold transition-colors border-b border-gray-50 w-full text-center"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
