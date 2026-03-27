import { motion, AnimatePresence } from "framer-motion";

const SlideImage = ({ slide, isActive }) => {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.15, filter: "blur(20px)" }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            filter: "blur(0px)",
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.95, 
            filter: "blur(15px)" 
          }}
          transition={{ 
            duration: 1.8, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          className="absolute inset-0 w-full h-full overflow-hidden"
        >
          <motion.img
            src={slide.image}
            alt={`${slide.scriptTitle} ${slide.mainTitle}`}
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ 
              duration: 12, 
              ease: "easeOut" 
            }}
            className="w-full h-full object-cover"
          />
          {/* Subtle vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background/40" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SlideImage;
