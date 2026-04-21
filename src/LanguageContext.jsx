import { createContext, useContext, useState } from 'react';
import fullConfig from './config.json';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'te' : 'en'));
  };

  const config = fullConfig[language];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, config }}>
      {children}
    </LanguageContext.Provider>
  );
};
