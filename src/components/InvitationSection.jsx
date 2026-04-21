import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

const FlowerConfetti = ({ isActive }) => {
  const flowers = Array.from({ length: 35 });
  const symbols = ['🌸', '🌺', '💮', '🌹', '✨'];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {isActive && flowers.map((_, i) => {
        const symbol = symbols[i % symbols.length];
        const left = Math.random() * 100;
        const delay = Math.random() * 0.5;
        const duration = 1.5 + Math.random() * 2;
        
        return (
          <motion.div
            key={i}
            initial={{ y: -50, x: `${left}vw`, rotate: 0 }}
            animate={{ 
              y: [ -50, 400, 800 ], 
              x: [ `${left}vw`, `${left + (Math.random() * 10 - 5)}vw`, `${left + (Math.random() * 20 - 10)}vw` ],
              rotate: Math.random() * 360
            }}
            transition={{
              duration,
              delay,
              ease: "linear",
              repeat: Infinity
            }}
            className="absolute -top-10 text-2xl md:text-3xl drop-shadow-md"
          >
            {symbol}
          </motion.div>
        );
      })}
    </motion.div>
  );
};

const InvitationSection = () => {
  const { config } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  return (
    <section ref={sectionRef} id="invitation" className="min-h-screen flex flex-col justify-center py-20 px-4 bg-white relative overflow-hidden z-10">
      <FlowerConfetti isActive={isInView} />
      
      <div className="max-w-3xl mx-auto text-center border-8 md:border-[14px] border-double border-gold/60 bg-ivory rounded-tl-3xl rounded-br-3xl p-6 sm:p-8 md:p-16 relative shadow-2xl z-10 bg-opacity-95">
        {/* Ornamental Top Border */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-gold-gradient rounded-b-full opacity-80 z-20"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-gold-gradient rounded-t-full opacity-80 z-20"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold font-serif text-primary mb-6 drop-shadow-sm px-4 py-2 border-b-2 border-gold inline-block">
            {config.invitation.greeting}
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-10 mt-6 invisible"></div>
          
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-8 font-light">
            {config.invitation.message}
          </p>
          
          <p className="font-serif text-xl text-primary font-semibold">
            {config.invitation.signOff}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default InvitationSection;
