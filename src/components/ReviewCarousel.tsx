import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronLeft, ChevronRight, Quote, User } from "lucide-react";
import { Review } from "../types";

const REVIEWS_DATA: Review[] = [
  {
    id: "rev-1",
    name: "",
    location: "",
    avatar: "",
    rating: 5,
    comment: "Pero mas ganahan jud mis dubai chewy cookie nimo maam kay aside sa affordable ganahan kaayo akong anak asta ko.. Hehe.. Akong ginansya sa pag resell ikaon na namo daan.. Hehe..",
    date: "2 days ago",
  },
  {
    id: "rev-2",
    name: "",
    location: "",
    avatar: "",
    rating: 5,
    comment: "received thank you so much pooo i keep buying kay lamiii judd kaayo sya",
    date: "1 week ago",
  },
  {
    id: "rev-3",
    name: "",
    location: "",
    avatar: "",
    rating: 5,
    comment: "delivered po! ❤️ so yummy, surely order again soon😊",
    date: "3 days ago",
  },
  {
    id: "rev-4",
    name: "",
    location: "",
    avatar: "",
    rating: 5,
    comment: "Hello received it na po. Sakto ra ang sweetness, lami sha 😊.",
    date: "5 days ago",
  },
   {
    id: "rev-5",
    name: "",
    location: "",
    avatar: "",
    rating: 5,
    comment: "hello maam nakuha na nako AHHHH super lami kaau thank you!! buy ko sunod puhon2 😆❤️",
    date: "5 days ago",
  },
     {
    id: "rev-6",
    name: "t",
    location: "",
    avatar: "",
    rating: 5,
    comment: "Naabot na mam thankkyouuu lami sya huhu, hope Maka order ko balik ❤️❤️❤️",
    date: "5 days ago",
  },
];

export default function ReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1: left, 1: right
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slideNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % REVIEWS_DATA.length);
  };

  const slidePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + REVIEWS_DATA.length) % REVIEWS_DATA.length);
  };

  useEffect(() => {
    // Autoplay carousel every 6 seconds
    timerRef.current = setInterval(slideNext, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const resetAutoplay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(slideNext, 6000);
    }
  };

  const handleNextClick = () => {
    resetAutoplay();
    slideNext();
  };

  const handlePrevClick = () => {
    resetAutoplay();
    slidePrev();
  };

  // Carousel slider animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 200, damping: 25 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 200, damping: 25 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
      },
    }),
  };

  const currentReview = REVIEWS_DATA[currentIndex];

  return (
    <div id="testimonials-carousel" className="relative w-full max-w-4xl mx-auto px-4 py-8">
      {/* Decorative quotes background */}
      <div className="absolute top-0 left-8 text-[#EE74AA]/10 pointer-events-none select-none">
        <Quote className="w-40 h-40 transform rotate-180" />
      </div>

      <div className="relative overflow-hidden min-h-[300px] md:min-h-[260px] flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full bg-white rounded-none border border-[#EE74AA]/20 p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-8 shadow-xl relative"
          >
            {/* Reviewer Avatar */}
            {currentReview.avatar ? (
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-full bg-[#EE74AA] p-0.5 scale-105" />
                <img
                  src={currentReview.avatar}
                  alt={currentReview.name || "Customer review"}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover relative border-4 border-white z-10"
                />
                <div className="absolute -bottom-2 -right-2 bg-[#EE74AA] text-white border border-[#EE74AA] rounded-full p-2 shadow-lg z-20">
                  <Quote className="w-3 h-3 fill-current" />
                </div>
              </div>
            ) : (
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-full bg-[#EE74AA] p-0.5 scale-105" />
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#EE74AA] flex items-center justify-center relative border-4 border-white z-10 text-white text-xl font-serif font-black uppercase">
                  {currentReview.name ? currentReview.name.charAt(0) : <User className="w-6 h-6 stroke-[2]" />}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[#EE74AA] text-white border border-[#EE74AA]/10 rounded-full p-2 shadow-lg z-20">
                  <Quote className="w-2.5 h-2.5 fill-current" />
                </div>
              </div>
            )}

            {/* Testimonial Text & Metadata */}
            <div className="flex-1 text-center md:text-left">
              {/* Star Rating */}
              <div className="flex items-center justify-center md:justify-start gap-1 mb-3 text-[#EE74AA]">
                {Array.from({ length: currentReview.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-[#EE74AA]" />
                ))}
              </div>

              {/* Review Comment */}
              <p className="text-base md:text-lg text-[#3D1B2B]/95 font-serif font-medium italic leading-relaxed mb-4">
                "{currentReview.comment}"
              </p>

              {/* Reviewer Details */}
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 text-[#3D1B2B]/60 text-xs font-sans">
                <span className="font-bold text-[#3D1B2B] text-sm font-serif">
                  {currentReview.name || "Verified Customer"}
                </span>
                {currentReview.location && (
                  <>
                    <span className="hidden md:inline-block text-[#EE74AA] font-sans font-bold text-[14px]">•</span>
                    <span className="uppercase tracking-widest text-[10px] font-bold">{currentReview.location}</span>
                  </>
                )}
                {currentReview.date && (
                  <>
                    <span className="hidden md:inline-block text-[#EE74AA] font-sans font-bold text-[14px]">•</span>
                    <span className="text-[#3D1B2B]/45 uppercase tracking-widest text-[9px] font-bold">{currentReview.date}</span>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={handlePrevClick}
          className="p-3 rounded-none border border-[#EE74AA]/15 bg-white text-[#EE74AA] hover:bg-[#FFF9FB] transition-all active:scale-90 cursor-pointer"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Carousel indicator dots */}
        <div className="flex gap-2">
          {REVIEWS_DATA.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                resetAutoplay();
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-1.5 rounded-none transition-all duration-300 ${
                idx === currentIndex ? "w-6 bg-[#EE74AA]" : "w-1.5 bg-[#EE74AA]/25"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNextClick}
          className="p-3 rounded-none border border-[#EE74AA]/15 bg-white text-[#EE74AA] hover:bg-[#FFF9FB] transition-all active:scale-90 cursor-pointer"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
