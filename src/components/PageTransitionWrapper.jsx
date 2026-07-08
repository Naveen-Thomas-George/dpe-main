import { motion } from 'framer-motion';

// Premium cinematic easing curves
const easing = [0.25, 1, 0.5, 1]; // Equivalent to easeOutQuart
const exitEasing = [0.25, 0, 0.5, 1];

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.97, // Slight scale down initially
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easing,
      when: 'beforeChildren', // Let the route container load before triggering children
    },
  },
  exit: {
    opacity: 0,
    scale: 1.02, // Slight zoom in towards the camera to create continuous depth
    transition: {
      duration: 0.3,
      ease: exitEasing,
    },
  },
};

export default function PageTransitionWrapper({ children, pageKey }) {
  return (
    <motion.main
      key={pageKey}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="w-full h-full min-h-screen origin-center transform-gpu"
    >
      {children}
    </motion.main>
  );
}
