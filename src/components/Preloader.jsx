import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [step, setStep] = useState('text'); // 'text', 'image', 'done'

  useEffect(() => {
    // Show text for 2 seconds, then transition to image
    const textTimer = setTimeout(() => {
      setStep('image');
    }, 2000);

    // Show image for 2.5 seconds, then clear out
    const imageTimer = setTimeout(() => {
      setStep('done');
    }, 4500);
    
    // Complete preloader after 5 seconds
    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 5000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(imageTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary overflow-hidden">
      <AnimatePresence mode="wait">
        {step === 'text' && (
          <motion.div
            key="namaskaram"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
            transition={{ duration: 1.5, ease: "easeInOut", exit: { duration: 0.5 } }}
            className="flex flex-col items-center absolute"
          >
            <div className="w-24 h-24 border-4 border-gold rounded-full border-t-transparent animate-spin mb-4"></div>
            <h2 className="text-gold font-serif text-2xl tracking-widest text-glow">NAMASKARAM</h2>
          </motion.div>
        )}
        
        {step === 'image' && (
          <motion.div
            key="image"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <img src="/namaskaram-bg.jpg" alt="Namaskaram" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-black/40"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Preloader;
