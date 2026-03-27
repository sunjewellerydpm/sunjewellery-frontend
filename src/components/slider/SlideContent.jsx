import { motion, AnimatePresence } from "framer-motion";

const SlideContent = ({ slide, isActive }) => {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bg-black/60 inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24"
        >
          {/* Script Title */}
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.8,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="font-script text-white text-5xl md:text-6xl lg:text-7xl leading-none mb-2 drop-shadow-lg"
          >
            {slide.scriptTitle}
          </motion.span>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.8,
              delay: 0.6,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="font-serif font-light text-white text-3xl md:text-4xl lg:text-6xl tracking-[0.3em] uppercase leading-tight drop-shadow-lg"
          >
            {slide.mainTitle}
          </motion.h1>

          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{
              duration: 1.4,
              delay: 0.8,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="w-16 h-px bg-white/80 my-6 origin-left"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.8,
              delay: 1.0,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="font-serif text-white/90 text-sm md:text-base lg:text-lg tracking-widest max-w-sm leading-relaxed italic drop-shadow-md"
          >
            {slide.subtitle}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SlideContent;
