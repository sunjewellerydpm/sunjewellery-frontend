import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const SliderControls = ({ currentSlide, totalSlides, onPrev, onNext }) => {
  const formatNumber = (num) => num.toString().padStart(2, "0");

  return (
    <>
      {/* Slide Counter - Bottom Left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-8 md:left-16 lg:left-24 z-20 flex items-center gap-3"
      >
        <span className="font-serif text-primary text-2xl md:text-3xl font-light">
          {formatNumber(currentSlide + 1)}
        </span>
        <span className="w-8 h-px bg-muted-foreground/50" />
        <span className="font-serif text-muted-foreground text-lg md:text-xl font-light">
          {formatNumber(totalSlides)}
        </span>
      </motion.div>

      {/* Navigation Buttons - Bottom Right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 right-8 md:right-16 lg:right-24 z-20 flex items-center gap-4"
      >
        <button
          onClick={onPrev}
          className="group w-12 h-12 md:w-14 md:h-14 rounded-full border border-primary/40 flex items-center justify-center transition-all duration-500 hover:border-primary hover:bg-primary/10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-primary transition-transform duration-300 group-hover:-translate-x-0.5" />
        </button>
        <button
          onClick={onNext}
          className="group w-12 h-12 md:w-14 md:h-14 rounded-full border border-primary/40 flex items-center justify-center transition-all duration-500 hover:border-primary hover:bg-primary/10"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-primary transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </motion.div>
    </>
  );
};

export default SliderControls;
