import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MoveUpRight, Zap } from "lucide-react";

// Images
import slid1 from "@/assets/img21_copy.jpg";
import slid2 from "@/assets/img20.jpg";
import slid3 from "@/assets/img22.jpg";
import slid4 from "@/assets/slid2.jpeg";
import slid8 from "@/assets/img31.jpg";
import slid5 from "@/assets/img19.jpg";
import slid6 from "@/assets/slid3.jpeg";
import slid7 from "@/assets/slid5.jpeg";
import slid9 from "@/assets/slid8.jpeg";

const HeroSection = ({ lang = "hi" }: { lang?: "hi" | "en" }) => {
  const isHi = lang === "hi";
  const images = [slid1, slid2, slid3, slid5, slid8, slid6, slid7,slid9];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id="home" className="relative min-h-screen w-full bg-green flex flex-col lg:flex-row overflow-hidden ">
      
      {/* 1. RIGHT SIDE: THE VISUAL (Top on Mobile, 45% Width on Desktop) */}
      <div className="relative w-full lg:w-[45%] h-[50vh] lg:h-screen order-first lg:order-last md:top-0 top-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img 
              src={images[currentIndex]} 
              className="w-full h-full object-cover object-top brightness-[0.9]" 
              alt="Sampatiya Uikey"
            />
            {/* Smooth Blending Overlays */}
            {/* <div className="absolute inset-0 bg-gradient-to-t from-[#021411] via-transparent to-transparent lg:bg-gradient-to-l lg:from-[#021411] lg:via-transparent" />
            <div className="absolute inset-0 bg-[#021411]/20 mix-blend-multiply" /> */}
          </motion.div>
        </AnimatePresence>

        {/* Experience Label - Clean & Vertical */}
        <div className="absolute bottom-8 right-6 lg:bottom-12 lg:right-8 flex items-center gap-4 lg:gap-8 rotate-[-90deg] origin-right translate-x-4">
           <div className="h-[1px] w-12 lg:w-16 bg-white/20" />
           <p className="flex items-center gap-3 lg:gap-4">
             <span className="text-white/40 text-[7px] lg:text-[9px] font-bold uppercase">Service</span>
             <span className="text-primary font-gotu text-3xl lg:text-5xl font-black italic">20+</span>
             <Zap className="text-primary -rotate-90" size={16} fill="currentColor" />
           </p>
        </div>
      </div>

      {/* 2. LEFT SIDE: CONTENT AREA (Bottom on Mobile, 55% Width on Desktop) */}
      <div className="relative w-full lg:w-[55%] flex flex-col justify-center px-6 sm:px-10 md:px-12 lg:px-24 py-12 lg:pt-48  lg:py-20 z-20">
        
        {/* Minimalist Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-6 lg:mb-8"
        >
          <span className="h-[1px] w-6 lg:w-8 bg-primary/40" />
         
        </motion.div>

        {/* Name Section */}
        <div className="relative">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="font-gotu text-[15vw] sm:text-[12vw] lg:text-[9rem] font-black text-white leading-[1.1] lg:leading-[1] "
          >
            {isHi ? "संपतिया" : "SAMPATIYA"}
          </motion.h1>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-gotu text-[15vw] sm:text-[12vw] lg:text-[9rem] font-black text-primary italic leading-[1.1] lg:leading-[1]  mt-1"
          >
            {isHi ? "उइके" : "UIKEY"}
          </motion.h1>
          
          <span className="absolute -top-12 -left-4 lg:-top-16 lg:-left-8 text-[12rem] lg:text-[18rem] font-black text-white/[0.02] pointer-events-none select-none hidden sm:block">
            MP
          </span>
        </div>

        {/* Clean Sub-content Block */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 lg:mt-12 max-w-lg"
        >
          <div className="pl-4 lg:pl-6 border-l border-primary/30 space-y-3 lg:space-y-4">
            <p className="text-white/90 text-lg sm:text-xl lg:text-2xl font-medium font-gotu leading-normal ">
            {isHi 
    ? "लोक स्वास्थ्य यांत्रिकी मंत्री,म.प्र. शासन | विधायक: मण्डला" 
    : "Minister of Public Health Engineering, Govt. of MP | MLA: Mandla"}
            </p>
            <p className="text-white/50 text-sm lg:text-lg leading-relaxed font-Poppins">
              {isHi 
                ? "स्वच्छ जल और सशक्त समाज के निर्माण हेतु समर्पित नेतृत्व।" 
                : "Dedicated leadership for clean water and an empowered society."}
            </p>
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-6 lg:gap-8 mt-10 lg:mt-12">
            <button className="group relative flex items-center justify-center h-12 w-12 lg:h-20 lg:w-20 rounded-full border border-white/10 hover:border-primary/50 transition-all duration-500 overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <a href="#contact">

              <MoveUpRight size={24} className="relative z-10 text-white lg:size-[28px] group-hover:scale-110 transition-transform" />
              </a>
            </button>
            <div className="flex flex-col">
              <span className="text-white font-black text-[10px] lg:text-xs uppercase ">{isHi ? "संपर्क सूत्र" : "Get In Touch"}</span>
              <span className="text-white/30 text-[8px] lg:text-[9px] uppercase  mt-1">{isHi ? "मध्यप्रदेश शासन" : "Govt. of MP"}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;