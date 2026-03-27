import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { slides } from "@/data/slides";
import SlideContent from "./SlideContent";
import SlideImage from "./SlideImage";
import SliderControls from "./SliderControls";

const LuxurySlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSlideChange = useCallback((newIndex) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(newIndex);
    setTimeout(() => setIsTransitioning(false), 2000);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    const newIndex = (currentSlide + 1) % slides.length;
    handleSlideChange(newIndex);
  }, [currentSlide, handleSlideChange]);

  const prevSlide = useCallback(() => {
    const newIndex = (currentSlide - 1 + slides.length) % slides.length;
    handleSlideChange(newIndex);
  }, [currentSlide, handleSlideChange]);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [nextSlide, isTransitioning]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1.2 }}
        className="absolute top-8 left-8 md:left-16 lg:left-24 z-30"
      >
      </motion.div>

      {/* Full Screen Background Images */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <SlideImage 
            key={slide.id} 
            slide={slide} 
            isActive={index === currentSlide} 
          />
        ))}
      </div>

      {/* Text Content Overlay */}
      <div className="absolute inset-0 z-10">
        {slides.map((slide, index) => (
          <SlideContent 
            key={slide.id} 
            slide={slide} 
            isActive={index === currentSlide} 
          />
        ))}
      </div>

      {/* Controls */}
      <SliderControls
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onPrev={prevSlide}
        onNext={nextSlide}
      />
    </div>
  );
};

export default LuxurySlider;
