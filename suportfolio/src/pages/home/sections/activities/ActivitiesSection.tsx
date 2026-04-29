import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Calendar, MapPin } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import { activitiesData, Activity } from "@/data/activitiesData";

const ActivitiesSection = ({ lang }: { lang: "hi" | "en" }) => {
  const isHi = lang === "hi";
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [activeItem, setActiveItem] = useState<Activity | null>(null);
  const [currentImage, setCurrentImage] = useState<number>(0);

  // Reversing the data so the newest items (at the end of the array) appear first
  const displayedActivities = [...activitiesData].reverse().slice(0, visibleCount);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.1 } 
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 } 
    },
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeItem) return;
    setCurrentImage((prev) => (prev === activeItem.images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeItem) return;
    setCurrentImage((prev) => (prev === 0 ? activeItem.images.length - 1 : prev - 1));
  };

  return (
    <div className="w-full bg-slate-50/50 overflow-hidden font-sans">
      <div className="w-full">
        <SectionHeading title={isHi ? "गतिविधियाँ" : "Recent Activities"} />
      </div>

      <section id="activities" className="relative py-12 lg:py-20">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/40 rounded-full blur-3xl -mr-64 -mt-64" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-50/60 rounded-full blur-3xl -ml-64 -mb-64" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
          className="mx-auto px-6 lg:px-28 relative z-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedActivities.map((item) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ y: -10 }}
                onClick={() => {
                  setActiveItem(item);
                  setCurrentImage(0);
                }}
                className="group cursor-pointer relative bg-white rounded-3xl overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.img
                    src={item.cover}
                    alt={item.title.en}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12574c]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <span className="text-white text-sm font-medium  uppercase">View Images</span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[10px] font-bold   uppercase text-orange-600">
                    <span className="px-2 py-1 bg-orange-50 rounded-md">{item.location}</span>
                    <span className="px-2 py-1 bg-orange-50 rounded-md">{item.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#12574c] leading-tight group-hover:text-orange-600 transition-colors">
                    {isHi ? item.title.hi : item.title.en}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          {visibleCount < activitiesData.length && (
            <div className="flex justify-center mt-16">
              <button
                onClick={() => setVisibleCount((prev) => Math.min(prev + 3, activitiesData.length))}
                className="group relative px-8 py-4 bg-[#12574c] text-white rounded-full overflow-hidden transition-all hover:pr-12 shadow-lg hover:shadow-[#12574c]/20"
              >
                <span className="relative z-10 font-semibold">{isHi ? "और गतिविधियाँ देखें" : "Discover More"}</span>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 w-5 h-5" />
              </button>
            </div>
          )}
        </motion.div>

        <AnimatePresence>
          {activeItem && (
            <motion.div
              className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-6 lg:p-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute inset-0 bg-[#0a1a18]/95 backdrop-blur-xl" onClick={() => setActiveItem(null)} />
              
              <button 
                onClick={() => setActiveItem(null)}
                className="absolute top-6 right-6 z-[210] p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
              >
                <X size={24} />
              </button>

              <motion.div
                className="relative bg-white w-full max-w-6xl h-full md:h-auto md:max-h-[90vh] rounded-none md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row"
                initial={{ y: 50, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 50, opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative flex-1 bg-black group h-[50vh] lg:h-auto overflow-hidden">
                  <img 
                    src={activeItem.images[currentImage]} 
                    className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 scale-110" 
                  />
                  
                  <motion.img
                    key={currentImage}
                    src={activeItem.images[currentImage]}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="relative w-full h-full object-contain z-10"
                  />

                  {activeItem.images.length > 1 && (
                    <>
                      <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-4 bg-white/10 hover:bg-white/90 hover:text-[#12574c] text-white rounded-full transition-all backdrop-blur-md">
                        <ChevronLeft size={28} />
                      </button>
                      <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-4 bg-white/10 hover:bg-white/90 hover:text-[#12574c] text-white rounded-full transition-all backdrop-blur-md">
                        <ChevronRight size={28} />
                      </button>
                    </>
                  )}
                </div>

                <div className="w-full lg:w-[400px] p-8 lg:p-12 bg-white flex flex-col justify-center border-l border-slate-100">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-orange-600 font-bold text-xs  er uppercase">
                        <Calendar size={14} /> {activeItem.date}
                      </div>
                      <h2 className="text-3xl font-black text-[#12574c] leading-[1.1]">
                        {isHi ? activeItem.title.hi : activeItem.title.en}
                      </h2>
                      <div className="flex items-center gap-2 text-slate-400 font-medium py-2">
                        <MapPin size={16} /> {activeItem.location}
                      </div>
                    </div>
                    
                    <div className="h-px bg-slate-100 w-full" />
                    
                    <p className="text-slate-600 leading-relaxed text-lg italic">
                      {isHi ? activeItem.description.hi : activeItem.description.en}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default ActivitiesSection;