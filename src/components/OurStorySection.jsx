import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { FaHeart } from 'react-icons/fa';

const StoryParagraph = ({ text, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });
  
  // Staggered left/right alignment based on index
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`flex w-full mb-12 md:mb-16 ${isEven ? 'justify-start' : 'justify-end'}`}
      initial={{ opacity: 0, y: 50, x: isEven ? -30 : 30 }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 50, x: isEven ? -30 : 30 }}
      transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
    >
      <div className={`w-[90%] md:w-[70%] relative ${isEven ? 'text-left' : 'text-right'}`}>
        {/* Decorative flourish line above each paragraph */}
        <div className={`h-px w-16 bg-gold mb-4 ${isEven ? 'ml-0' : 'ml-auto'}`}></div>
        
        <p className="text-gray-700 font-serif leading-relaxed text-lg md:text-xl lg:text-2xl">
          {text}
        </p>
      </div>
    </motion.div>
  );
};

const OurStorySection = () => {
  const { config } = useLanguage();
  const closingRef = useRef(null);
  const isClosingInView = useInView(closingRef, { once: true, amount: 0.5 });

  return (
    <section id="our-story" className="relative py-24 px-4 bg-transparent overflow-hidden">
      {/* Decorative top ornament */}
      <div className="flex items-center justify-center gap-4 mb-16">
        <div className="h-px flex-1 max-w-xs bg-gradient-to-l from-gold/60 to-transparent" />
        <h2 className="text-4xl md:text-5xl font-serif text-primary text-center">
          {config.nav.ourStory || "Our Story"}
        </h2>
        <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-gold/60 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* A subtle vertical line connecting the story pieces, visible only on desktop */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gold/30 -translate-x-1/2"></div>
        
        <div className="py-8">
          {config.ourStory.paragraphs.map((text, idx) => (
            <StoryParagraph key={idx} text={text} index={idx} />
          ))}
        </div>

        {/* Closing statement / heart */}
        <motion.div
          ref={closingRef}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isClosingInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mt-16 text-center border-4 border-double border-gold/40 p-8 rounded-full w-48 h-48 mx-auto flex flex-col justify-center items-center bg-ivory shadow-lg"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <FaHeart className="text-red-600 text-3xl mb-2" />
          </motion.div>
          <p className="font-serif text-primary font-bold text-lg">
            {config.ourStory.closing || "Forever"}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OurStorySection;
