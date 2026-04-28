import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import type { Lang } from "@/layouts/MainLayout";
import { X, ArrowRight, Maximize2, Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryCategories } from "@/data/galleryData";
import SectionHeading from "../../../../components/ui/SectionHeading/SectionHeading"; 

const GallerySection = () => {
  const { lang } = useOutletContext<{ lang: Lang }>();
  const isHi = lang === "hi";

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [selectedCat, setSelectedCat] = useState<typeof galleryCategories[0] | null>(null);
  const [imgIndex, setImgIndex] = useState<number | null>(null);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedCat && imgIndex !== null) {
      setImgIndex((imgIndex + 1) % selectedCat.images.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedCat && imgIndex !== null) {
      setImgIndex((imgIndex - 1 + selectedCat.images.length) % selectedCat.images.length);
    }
  };

  return (
    <>
      <div className="pt-20">
        <SectionHeading 
          title={isHi ? "जनसेवा की स्मृतियाँ" : "Moments of Service"} 
        />
      </div>

      <section id="gallery" className="relative py-12 bg-secondary min-h-[70vh] overflow-hidden text-white">
        
        <div className="absolute inset-0 z-0 transition-opacity duration-700 opacity-20 pointer-events-none">
          <AnimatePresence mode="wait">
            {hoveredIdx !== null && (
              <motion.img
                key={hoveredIdx}
                src={galleryCategories[hoveredIdx].thumbnail}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full object-cover"
              />
            )}
          </AnimatePresence>
        </div>

        <div className="px-6 md:px-28 mx-auto relative z-10">
          <div className="flex flex-col border-t border-white/5">
            {galleryCategories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => setSelectedCat(cat)}
                className="group relative py-10 md:py-14 border-b border-white/10 cursor-pointer flex items-center justify-between transition-colors hover:bg-white/[0.02]"
              >
                <div className="flex items-center gap-4 md:gap-8 z-10">
                  <span className="text-white/20 font-mono text-base md:text-xl group-hover:text-primary transition-colors">
                    0{idx + 1}
                  </span>
                  <h3 className="text-xl md:text-4xl font-bold group-hover:translate-x-2 md:group-hover:translate-x-4 transition-transform duration-500">
                    {isHi ? cat.titleHi : cat.titleEn}
                  </h3>
                </div>
                <div className="hidden md:flex items-center gap-10 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                    <ArrowRight size={20} />
                  </div>
                </div>
                {/* Mobile only indicator */}
                <div className="md:hidden text-white/20">
                  <ArrowRight size={18} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selectedCat && (
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 150 }}
              className="fixed inset-0 z-[100] bg-white text-black overflow-y-auto"
            >
              <div className="sticky top-0 w-full p-4 md:p-6 md:px-12 flex justify-between items-center bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
                <div className="flex items-center gap-3 md:gap-4">
                  <Camera className="text-primary w-5 h-5 md:w-6 md:h-6" />
                  <h4 className="font-black uppercase text-lg md:text-2xl ">
                    {isHi ? selectedCat.titleHi : selectedCat.titleEn}
                  </h4>
                </div>
                <button 
                  onClick={() => setSelectedCat(null)} 
                  className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black text-white hover:bg-primary transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
                  {selectedCat.images.map((img, i) => (
                    <motion.div 
                      key={i} 
                      onClick={() => setImgIndex(i)} 
                      className="relative group overflow-hidden rounded-xl md:rounded-2xl cursor-pointer shadow-sm"
                    >
                      <img src={img} alt="" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <Maximize2 className="text-white" size={28} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {imgIndex !== null && selectedCat && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 md:p-8"
              onClick={() => setImgIndex(null)}
            >
              <div className="relative flex items-center justify-center w-full h-full max-w-6xl group">
                
                {/* Navigation Arrows - Adjusted for Mobile */}
                <button 
                  onClick={handlePrev} 
                  className="absolute left-0 md:-left-16 z-[220] w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md md:bg-white/10 hover:bg-primary text-white border border-white/20 transition-all duration-300"
                >
                  <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                </button>

                <div className="relative">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={imgIndex}
                      src={selectedCat.images[imgIndex]}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      className="max-w-full max-h-[70vh] md:max-h-[80vh] object-contain rounded-lg shadow-2xl"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </AnimatePresence>
                  
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/40 font-mono text-[10px] md:text-xs">
                    {imgIndex + 1} / {selectedCat.images.length}
                  </div>
                </div>

                <button 
                  onClick={handleNext} 
                  className="absolute right-0 md:-right-16 z-[220] w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md md:bg-white/10 hover:bg-primary text-white border border-white/20 transition-all duration-300"
                >
                  <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </div>

              <button 
                onClick={() => setImgIndex(null)}
                className="absolute top-6 right-6 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-8 h-8 md:w-10 md:h-10" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
};

export default GallerySection;