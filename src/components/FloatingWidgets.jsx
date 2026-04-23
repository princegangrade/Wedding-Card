import { FaWhatsapp, FaMusic, FaPause } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import config from '../config.json';

const FloatingWidgets = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = '/Dheeni Premantara - Hesham Abdul Wahab (192k).mp3.mpeg';

      const playAudio = async () => {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log("Autoplay prevented by browser. Waiting for user interaction.");

          const handleFirstInteraction = () => {
            if (audioRef.current && !isPlaying) {
              audioRef.current.play().then(() => {
                setIsPlaying(true);
              }).catch(e => console.error(e));
            }
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('touchstart', handleFirstInteraction);
            document.removeEventListener('scroll', handleFirstInteraction);
          };

          document.addEventListener('click', handleFirstInteraction);
          document.addEventListener('touchstart', handleFirstInteraction);
          document.addEventListener('scroll', handleFirstInteraction, { once: true });
        }
      };

      playAudio();
    }
  }, []);

  const toggleAudio = (e) => {
    if (e) e.stopPropagation();
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.error("Audio playback failed:", e));
    }
  };

  const shareText = encodeURIComponent(`With hearts full of love and joy,
we invite you to witness the union of
Rajkumar & Alekya

As they promise a lifetime together,
please join us in celebrating their special day.

26-04-2026 • Siri Function Hall - Godavarikhani City

We look forward to sharing this beautiful moment with you.: ${window.location.href}`);
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
