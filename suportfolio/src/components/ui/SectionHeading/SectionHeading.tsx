import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
}

const SectionHeading = ({ title }: SectionHeadingProps) => {
  const words = title.split(" ");

  return (
    <div className="relative w-full flex flex-col items-center justify-center px-4 py-4 md:py-10 overflow-hidden">
      
      {/* 1. ANIMATED TOP LINE & TAGLINE */}
      <div className="flex flex-col items-center mb-0 md:mb-2">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: 30 }}
          viewport={{ once: true }}
          className="h-[1.5px] bg-[#E46B2E] mb-1"
        />
        <motion.span 
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-[7px] md:text-[12px] font-black uppercase text-[#12574c]"
        >
         Development Driven by Strong Leadership
        </motion.span>
      </div>

      {/* 2. MAIN HEADING - COMPACT FOR MOBILE */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <h2 className="font-gotu text-[28px] sm:text-4xl md:text-6xl  font-black text-center uppercase flex flex-wrap justify-center items-center gap-x-2 md:gap-x-4  ">
          {words.map((word, idx) => (
            <div key={idx} className="relative overflow-hidden pt-1 pb-1 md:pt-4 md:pb-3">
              <motion.span 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: idx * 0.1, 
                  duration: 0.8, 
                  ease: [0.33, 1, 0.68, 1] 
                }}
                className={`relative inline-block ${idx % 2 === 0 ? "text-[#E46B2E]" : "text-[#12574c]"}`}
              >
                {word}
                
                {/* INNOCATIVE LIGHT BEAM (Shimmer) */}
                <motion.span
                  animate={{ 
                    left: ["-100%", "200%"],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    repeatDelay: 2
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-20 pointer-events-none"
                />
              </motion.span>
            </div>
          ))}
        </h2>
      </div>

      {/* 3. INNOVATIVE ORBITING DOT UNDERLINE - TIGHTER SPACING */}
      <div className="mt-1 md:mt-4 relative flex items-center justify-center w-24 md:w-32 h-2">
        <div className="absolute h-[1px] w-full bg-[#12574c]/10 rounded-full" />
        
        <motion.div 
          animate={{ 
            width: ["0%", "100%", "0%"],
            left: ["0%", "0%", "100%"] 
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute h-[1.5px] bg-[#12574c] shadow-[0_0_8px_rgba(18,87,76,0.2)]"
        />

        <motion.div 
          animate={{ 
            x: [-40, 40, -40],
            scale: [1, 1.3, 1],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute h-1 w-1 rounded-full bg-[#E46B2E] shadow-[0_0_10px_#E46B2E]"
        />
      </div>

      {/* BACKGROUND MASK - Subtle */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 overflow-hidden">
        <motion.div 
          animate={{ opacity: [0.01, 0.03, 0.01] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="text-[12vw] font-black text-[#12574c] uppercase select-none blur-xl opacity-5 whitespace-nowrap"
        >
          {title}
        </motion.div>
      </div>
    </div>
  );
};

export default SectionHeading;