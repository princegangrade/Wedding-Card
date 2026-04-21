import { FaWhatsapp, FaMusic, FaPause } from 'react-icons/fa';
import { useState, useRef } from 'react';
import config from '../config.json';

const FloatingWidgets = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // NOTE: Using a placeholder audio path as per instructions, user will provide actual file
      if (!audioRef.current.src) {
        audioRef.current.src = '/assets/background-music.mp3';
      }
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const shareText = encodeURIComponent(`We cordially invite you strictly via website: ${window.location.href}`);
  const whatsappUrl = `https://wa.me/?text=${shareText}`;

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 flex flex-col gap-4 scale-90 md:scale-100 origin-bottom-right">
      <button 
        onClick={toggleAudio}
        className="bg-gold text-primary p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
        aria-label="Toggle traditional music"
      >
        {isPlaying ? <FaPause size={20} /> : <FaMusic size={20} />}
      </button>
      
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
        aria-label="Share via WhatsApp"
      >
        <FaWhatsapp size={24} />
      </a>
      
      {/* Hidden audio element */}
      <audio ref={audioRef} loop />
    </div>
  );
};

export default FloatingWidgets;
