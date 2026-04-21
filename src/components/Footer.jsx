import { FaHeart } from 'react-icons/fa';
import { useLanguage } from '../LanguageContext';

const Footer = () => {
  const year = new Date().getFullYear();
  const { config } = useLanguage();

  return (
    <footer className="relative bg-primary-dark text-ivory py-10 md:py-16 px-4 text-center">
      {/* Intricate top border overlay */}
      <div className="absolute top-0 left-0 w-full h-3 bg-gold-gradient"></div>
      <div className="absolute inset-0 bg-mandala-pattern opacity-10 pointer-events-none mix-blend-overlay"></div>
      
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 relative z-10">
        <h2 className="text-3xl md:text-4xl font-serif bg-gold-gradient text-transparent bg-clip-text">
          {config.couple.groom} & {config.couple.bride}
        </h2>
        
        <p className="flex items-center justify-center gap-2 text-sm text-gray-300 mt-2">
          {config.footer.madeWith} <FaHeart className="text-red-500" /> {config.footer.forSpecialDay}
        </p>
        
        <p className="text-xs text-gray-400 mt-4 font-light">
          &copy; {year} {config.couple.groom} & {config.couple.bride}. {config.footer.allRights}
        </p>

        <p className="text-xs text-gray-500 mt-2">
          {config.footer.contact}: {config.contact.whatsappNumber} | {config.contact.email}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
