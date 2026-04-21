import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { FaHeart } from 'react-icons/fa';

const HeroSection = () => {
  const { config } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  const hearts = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
      scale: Math.random() * 0.5 + 0.5,
      yOffset: Math.random() * 100 + 50
    }));
  }, []);

  useEffect(() => {
    const targetDate = new Date(config.weddingDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [config.weddingDate]);

  return (
    <section id="home" className="relative h-screen flex flex-col justify-center items-center text-center bg-ivory overflow-hidden">
      <div className="absolute inset-0 bg-mandala-pattern opacity-10 pointer-events-none"></div>
      
      {/* Small Hearts Popping Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {hearts.map((heart) => (
          <motion.div
            key={`heart-${heart.id}`}
            className="absolute text-red-500/50"
            style={{
              left: heart.left,
              top: heart.top,
            }}
            initial={{ scale: 0, opacity: 0, y: 0 }}
            animate={{ 
              scale: [0, heart.scale, 0], 
              opacity: [0, 0.9, 0],
              y: [0, -heart.yOffset]
            }}
            transition={{ 
              duration: heart.duration, 
              repeat: Infinity, 
              delay: heart.delay,
              ease: "easeInOut"
            }}
          >
            <FaHeart className="w-6 h-6 md:w-10 md:h-10" />
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 px-4"
      >
        <p className="text-accent-green font-medium tracking-widest uppercase mb-4 text-sm md:text-base">
          {config.hero.title}
        </p>
        
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif mb-6 text-primary drop-shadow-sm leading-tight py-2"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 1 },
            visible: {
              opacity: 1,
              transition: {
                delay: 0.4,
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {config.couple.groom.split("").map((char, index) => (
            <motion.span key={`groom-${index}`} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
              {char}
            </motion.span>
          ))}
          <motion.span 
            variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1 } }} 
            className="text-gold mx-2 md:mx-4 inline-block origin-bottom"
          >
            &
          </motion.span>
          {config.couple.bride.split("").map((char, index) => (
            <motion.span key={`bride-${index}`} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
              {char}
            </motion.span>
          ))}
        </motion.h1>
        
        <p className="text-gray-700 italic max-w-lg mx-auto mb-10 text-lg">
          {config.hero.subtitle}
        </p>
        
        <div className="flex justify-center gap-2 sm:gap-4 md:gap-8">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="flex flex-col items-center p-3 md:p-5 border-y-2 border-gold/40 rounded-3xl bg-white/40 backdrop-blur-sm shadow-inner min-w-[60px] sm:min-w-[70px] md:min-w-[100px]">
              <span className="text-3xl md:text-5xl font-serif text-primary">
                {String(value).padStart(2, '0')}
              </span>
              <span className="text-xs md:text-sm uppercase tracking-wider text-gray-700 mt-2 font-medium">
                {config.countdown[unit]}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
