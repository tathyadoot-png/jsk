import { motion, Variants } from "framer-motion";
import { User, GraduationCap, Award, MapPin, Calendar, Heart, Home, Briefcase } from "lucide-react";
import aboutImg from "@/assets/img2.jpeg";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";

const AboutSection = ({ lang }: { lang: "hi" | "en" }) => {
  const isHi = lang === "hi";

  const personalDetails = [
    {
      icon: <User className="text-[#E46B2E]" size={18} />,
      label: isHi ? "नाम" : "Name",
      value: isHi ? "श्रीमती संपतिया उइके" : "Smt. Sampatiya Uikey",
    },
    {
      icon: <Award className="text-[#E46B2E]" size={18} />,
      label: isHi ? "पद" : "Position",
      value: isHi ? "लोक स्वास्थ्य यांत्रिकी मंत्री, म.प्र. शासन" : "Minister, PHED, Govt. of MP",
    },
    {
      icon: <Briefcase className="text-[#E46B2E]" size={18} />,
      label: isHi ? "विधायक" : "MLA",
      value: isHi ? "मण्डला विधानसभा क्षेत्र" : "Mandla Constituency",
    },
    {
      icon: <Calendar className="text-[#E46B2E]" size={18} />,
      label: isHi ? "जन्म तिथि" : "Date of Birth",
      value: isHi ? "04 सितम्बर 1967" : "04 September 1967",
    },
    {
      icon: <MapPin className="text-[#E46B2E]" size={18} />,
      label: isHi ? "जन्म स्थान" : "Place of Birth",
      value: isHi ? "ग्राम सुर्खी, जिला मण्डला (म.प्र.)" : "Surkhi, Mandla (M.P.)",
    },
    {
      icon: <Home className="text-[#E46B2E]" size={18} />,
      label: isHi ? "स्थायी पता" : "Permanent Address",
      value: isHi ? "ग्राम टिकरवारा, पोस्ट हिरदेनगर, जिला मण्डला" : "Tikrawara, Hirdenagar, Mandla",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 40, 
      filter: "blur(8px)" 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { 
        duration: 1, 
        ease: [0.22, 1, 0.36, 1] 
      }
    },
  };

  return (
    <div className="w-full bg-[#ffffff]  overflow-hidden">
      <div className="pt-6">

      <SectionHeading  title={isHi ? "जीवन परिचय" : "Biography"} />
      </div>
      
      <section id="about" className="relative py-10 lg:py-3">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-[-5%] w-72 h-72 bg-[#12574c]/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 left-[-5%] w-72 h-72 bg-[#E46B2E]/5 rounded-full blur-[100px]" />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto px-4 lg:px-28 relative z-10"
        >
          {/* UPPER SECTION: INTRODUCTION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-16 lg:mb-28">
            <motion.div variants={itemVariants} className="lg:col-span-5 relative group">
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20">
                <img 
                  src={aboutImg} 
                  alt="Smt. Sampatiya Uikey" 
                  className="w-full h-auto object-cover transition-all duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12574c]/40 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-b-2 border-r-2 border-[#E46B2E] rounded-br-[3rem] -z-0 opacity-50" />
              <div className="absolute -top-4 -left-4 w-32 h-32 border-t-2 border-l-2 border-[#12574c]/30 rounded-tl-[3rem] -z-0 opacity-50" />
            </motion.div>

      <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6 md:space-y-8 px-2 md:px-0">
  {/* Badge Section */}
  <div className="inline-flex items-center gap-2 sm:gap-3 bg-[#12574c]/5 px-4 sm:px-5 py-2 rounded-full border border-[#12574c]/10">
    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#E46B2E] animate-pulse shadow-[0_0_8px_rgba(228,107,46,0.8)]" />
    <h2 className="text-[#12574c] font-black uppercase  text-[9px] sm:text-xs">
      {isHi ? "जननेत्री का परिचय" : "The Leader's Vision"}
    </h2>
  </div>
  
  {/* Main Heading */}
  <h3 className="text-[#12574c] text-3xl sm:text-4xl lg:text-6xl font-black  ">
    {isHi ? "सेवा ही संकल्प" : "service is determination"}
  </h3>

  {/* Description Text */}
  <div className="space-y-5 md:space-y-6 text-[#12574c]/80 text-base sm:text-lg md:text-xl text-left md:text-justify leading-relaxed font-light">
    {/* Highlighted Paragraph */}
    <p className="border-l-[3px] md:border-l-4 border-[#E46B2E]/30 pl-4 md:pl-6 italic bg-gradient-to-r from-[#E46B2E]/5 to-transparent py-3 md:py-4 rounded-r-2xl text-justify">
      {isHi 
        ? "श्रीमती संपतिया उइके जी का जन्म 04 सितम्बर 1967 को ग्राम सुर्खी, जिला मण्डला, मध्यप्रदेश में हुआ। जमीनी स्तर से सार्वजनिक जीवन की शुरुआत कर उन्होंने सेवा, समर्पण और संघर्ष को अपना मूल मंत्र बनाया।"
        : "Mrs. Sampatiya Uikey was born on September 4, 1967, in Surkhi village, Mandla district, Madhya Pradesh. Beginning her public life from the grassroots, she embraced service, dedication, and struggle as her core values."}
    </p>

    {/* Standard Paragraph */}
    <p className="pl-1 md:pl-2 text-sm sm:text-base md:text-xl text-justify">
      {isHi
        ? "जनजातीय समाज, महिलाओं के सशक्तिकरण, ग्रामीण विकास एवं जनस्वास्थ्य के क्षेत्र में उनके सतत प्रयासों के माध्यम से उन्होंने जन-जन का विश्वास अर्जित किया है। जनसेवा के ध्येय के साथ अपने क्षेत्र की समस्याओं के समाधान और समग्र विकास के लिए निरंतर कार्यरत रही हैं। जनता के विश्वास और समर्थन के बल पर वे आज मण्डला विधानसभा क्षेत्र से विधायक हैं तथा वर्तमान में लोक स्वास्थ्य यांत्रिकी मंत्री, मध्यप्रदेश शासन के पद पर कार्यरत हैं। जनसेवा और समावेशी विकास के ध्येय के साथ वे पूर्ण निष्ठा से मध्यप्रदेश के विकास के लिए समर्पित हैं।"
        : "Through her sustained efforts in the fields of tribal society, women’s empowerment, rural development, and public health, she has earned the trust of the people. With the objective of public service, she has continuously worked toward resolving the problems of her constituency and ensuring its overall development. On the strength of the people’s trust and support, she is today a Member of the Legislative Assembly from the Mandla Assembly constituency and is currently serving as the Minister of Public Health Engineering in the Government of Madhya Pradesh. With the commitment to public service and inclusive development, she is wholeheartedly dedicated to the development of Madhya Pradesh."}
    </p>
  </div>
</motion.div>
          </div>

          {/* LOWER SECTION: DETAILS GRID */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
  {/* Personal Details Card */}
  <motion.div 
    variants={itemVariants}
    className="group bg-white p-6 sm:p-10 lg:p-12 rounded-[2rem] sm:rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] border border-[#12574c]/5 relative overflow-hidden hover:border-[#E46B2E]/20 transition-colors duration-500"
  >
    <div className="flex items-center gap-4 sm:gap-5 mb-8 sm:mb-10">
      <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-[#E46B2E]/10 flex items-center justify-center group-hover:bg-[#E46B2E]/20 transition-colors">
        <Heart className="text-[#E46B2E] w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <h4 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#12574c]">
        {isHi ? "व्यक्तिगत विवरण" : "Personal Profile"}
      </h4>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 sm:gap-y-8">
      {personalDetails.map((detail, idx) => (
        <div key={idx} className="relative pl-5 sm:pl-6 border-l-2 border-[#E46B2E]/20 hover:border-[#E46B2E] transition-all duration-300">
          <div className="flex items-center gap-2 mb-1 sm:mb-2">
            <span className="shrink-0 scale-90 sm:scale-100">{detail.icon}</span>
            <span className="text-[#E46B2E]/60 text-[9px] sm:text-[10px] uppercase font-black">{detail.label}</span>
          </div>
          <p className="text-[#12574c] font-bold text-base sm:text-lg leading-snug">
            {detail.value}
          </p>
        </div>
      ))}
    </div>
  </motion.div>

  {/* Education Card */}
  <motion.div 
    variants={itemVariants}
    className="bg-[#12574c] p-6 sm:p-10 lg:p-12 rounded-[2rem] sm:rounded-[3rem] shadow-2xl relative overflow-hidden group"
  >
    <div className="relative z-10 flex items-center gap-4 sm:gap-5 mb-8 sm:mb-10">
      <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10">
        <GraduationCap className="text-[#E46B2E] w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <h4 className="text-xl sm:text-2xl lg:text-3xl font-black text-white">
        {isHi ? "शिक्षा" : "Education"}
      </h4>
    </div>

    <div className="relative z-10 space-y-6 sm:space-y-8">
      <div className="bg-white/5 p-5 sm:p-7 rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 backdrop-blur-sm group-hover:bg-white/10 transition-colors duration-500">
        <p className="text-white text-lg sm:text-xl md:text-2xl font-bold">
          {isHi ? "एम.ए. – हिन्दी" : "M.A. – Hindi"}
        </p>
        <p className="text-[#E46B2E] text-[9px] sm:text-[10px] uppercase font-black mt-1 sm:mt-2">
          Post Graduate (स्नातकोत्तर)
        </p>
      </div>
      <p className="text-white/70 leading-relaxed text-sm sm:text-base md:text-lg text-left md:text-justify font-light italic pl-4 border-l-2 border-[#E46B2E]/40 text-justify">
        {isHi
          ? "श्रीमती उइके जी ने स्नातक एवं स्नातकोत्तर तक शिक्षा प्राप्त की है। उनकी शैक्षणिक यात्रा ने उन्हें विचारशीलता, संवेदनशीलता और प्रभावी संवाद क्षमता प्रदान की है।"
          : "Smt. Uikey has completed her Graduation and Post-Graduation. Her academic journey has provided her with thoughtfulness and effective communication skills."}
      </p>
    </div>
    
    {/* Background Icon - Responsive sizing */}
    <GraduationCap className="absolute -bottom-10 -right-10 sm:-bottom-16 sm:-right-16 text-white opacity-[0.03] h-48 w-48 sm:h-72 sm:w-72 transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-12" />
  </motion.div>
</div>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutSection;