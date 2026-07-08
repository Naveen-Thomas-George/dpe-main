import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { EncryptedText } from './ui/encrypted-text';

export default function Loader({ onComplete }) {
  // Automatically trigger completion after decryption
  useEffect(() => {
    // text length is 32 chars, at 50ms = 1600ms, plus we give it some buffer to stay readable
    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 3800); 

    return () => clearTimeout(timer);
  }, [onComplete]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
      scale: 1.15, // Expands outwards as it fades out to reveal the hero
      transition: { 
        duration: 0.8, 
        ease: [0.25, 1, 0.5, 1] 
      }
    }
  };

  return (
    <motion.div
      key="loader"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="flex px-4 md:px-8 items-center justify-center w-full max-w-5xl">
        <EncryptedText
          text="Department of Physical Education"
          className="text-4xl md:text-5xl lg:text-7xl font-bold italic font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-zinc-50 to-zinc-500 block text-center break-words"
          revealDelayMs={50}
        />
      </div>
    </motion.div>
  );
}
