import { motion } from "framer-motion";
import type { Lang } from "@/layouts/MainLayout";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import { Droplets, CheckCircle2, ShieldCheck, Sun, Activity, Users, Target, Heart } from "lucide-react";
import img3 from "@/assets/img13.jpg";

interface JalJeevanSectionProps {
  lang: Lang;
}

const JalJeevanSection = ({ lang }: JalJeevanSectionProps) => {
  const isHi = lang === "hi";

  return (
    <section className="bg-white py-12 md:py-24 relative overflow-hidden" id="jalJeevan">
      {/* Dynamic Background Shapes */}
      <div className="absolute top-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-green/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      
      <div className="mx-auto px-4 lg:px-28 relative z-10">
        <SectionHeading title={isHi ? "जल जीवन मिशन / हर घर जल" : "Jal Jeevan Mission / Har Ghar Jal"} />

        <div className="mt-10 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: Content Core (7 Columns) */}
          <div className="lg:col-span-7 space-y-8 md:space-y-10">
            
            {/* 1. Main Mission Block */}
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-[2px] w-8 md:w-12 bg-primary" />
                <span className="text-[10px] md:text-xs font-black uppercase  text-green">
                  {isHi ? "शुद्ध जल – स्वस्थ जीवन – सशक्त मध्यप्रदेश" : "Pure Water – Healthy Life – Empowered MP"}
                </span>
              </div>
              <p className="font-Poppins text-gray-700 text-base md:text-xl leading-relaxed  text-justify">
                {isHi 
                  ? "लोक स्वास्थ्य यांत्रिकी मंत्री के रूप में श्रीमती संपतिया उइके जी का प्रमुख संकल्प “हर घर तक सुरक्षित एवं शुद्ध पेयजल” पहुँचाना है। भारत सरकार के महत्वाकांक्षी जल जीवन मिशन के अंतर्गत वे मध्यप्रदेश में हर घर जल लक्ष्य को समयबद्ध, पारदर्शी और प्रभावी ढंग से साकार करने हेतु सतत प्रयासरत हैं।"
                  : "As PHED Minister, Smt. Sampatiya Uikey’s primary resolution is to deliver safe and pure drinking water to every home. Under the Jal Jeevan Mission, she is working to realize the goals in a transparent and effective manner."}
              </p>
              <div className="p-5 md:p-6 bg-gray-50 rounded-[1.5rem] md:rounded-[2rem] border-l-4 md:border-l-8 border-green">
                <p className="font-Poppins text-gray-600 italic text-sm md:text-base leading-relaxed text-justify">
                  {isHi 
                    ? "आदरणीय प्रधानमंत्री श्री नरेंद्र मोदी जी के मार्गदर्शन एवं माननीय मुख्यमंत्री डॉ. मोहन यादव जी के नेतृत्व में वे प्रदेश के प्रत्येक परिवार तक नल से जल उपलब्ध कराने के लिए पूर्ण प्रतिबद्धता के साथ कार्य कर रही हैं।"
                    : "Under the guidance of PM Narendra Modi and CM Dr. Mohan Yadav, she is working with full commitment to provide tap water to every family."}
                </p>
              </div>
            </div>

            {/* 2. Key Works Grid */}
            <div className="space-y-4 md:space-y-6">
              <h4 className="text-lg md:text-xl font-gotu font-bold text-gray-900 flex items-center gap-3">
                <Activity className="text-green w-5 h-5 md:w-6 md:h-6" /> {isHi ? "नेतृत्व में हो रहे प्रमुख कार्य" : "Key Initiatives"}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {[
                  isHi ? "ग्रामीण एवं दूरस्थ जनजातीय अंचलों तक नल से जल आपूर्ति का विस्तार" : "Tap water expansion in rural/tribal areas",
                  isHi ? "जल स्रोतों का सुदृढ़ीकरण एवं संरक्षण" : "Conservation of water sources",
                  isHi ? "पाइपलाइन नेटवर्क का आधुनिकीकरण" : "Modernization of pipeline networks",
                  isHi ? "जल गुणवत्ता परीक्षण की सुदृढ़ एवं नियमित व्यवस्था" : "Regular water quality testing",
                  isHi ? "ग्राम जल समितियों के माध्यम से स्थायी जल प्रबंधन" : "Sustainable management via committees"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 md:p-4 bg-white border border-gray-100 rounded-xl md:rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green shrink-0 mt-0.5" />
                    <span className="font-Poppins text-sm md:text-lg text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Tribal Focus & Quote */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
              <div className="space-y-4">
                <h4 className="text-lg md:text-xl font-gotu font-bold text-primary flex items-center gap-3">
                  <Sun className="w-5 h-5 md:w-6 md:h-6" /> {isHi ? "दूरस्थ एवं जनजातीय क्षेत्रों पर विशेष फोकस" : "Tribal Focus"}
                </h4>
                <ul className="space-y-2 md:space-y-3">
                  {[
                    isHi ? "पहाड़ी एवं वन क्षेत्रों में विशेष योजनाएँ" : "Hilly area schemes",
                    isHi ? "सोलर आधारित पंपिंग सिस्टम" : "Solar pumping systems",
                    isHi ? "स्थानीय जल स्रोतों का पुनर्जीवन" : "Revival of local sources",
                    isHi ? "नियमित मॉनिटरिंग एवं फील्ड निरीक्षण" : "Regular field inspections"
                  ].map((p, i) => (
                    <li key={i} className="flex items-center gap-2 font-Poppins text-sm md:text-lg text-gray-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-green p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] text-white relative shadow-xl overflow-hidden">
                <Heart className="absolute -right-4 -bottom-4 w-16 h-16 md:w-24 md:h-24 opacity-10" />
                <p className="relative z-10 font-Poppins italic text-base md:text-lg leading-relaxed">
                  {isHi 
                    ? "“स्वच्छ पेयजल केवल सुविधा नहीं, बल्कि जनस्वास्थ्य की आधारशिला है।”" 
                    : "“Clean water is the foundation of public health.”"}
                </p>
                <span className="block mt-4 text-[10px] md:text-xs font-bold uppercase  opacity-70">— Smt. Sampatiya Uikey</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Visual Side & Impact (5 Columns) */}
          <div className="lg:col-span-5 space-y-8 mt-8 lg:mt-0">
            <div className="relative px-2 md:px-0">
              <div className="rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl border-[6px] md:border-[12px] border-gray-50 h-[400px] md:h-[650px]">
                <img src={img3} className="w-full h-full object-cover" alt="Minister" />
              </div>
              
              {/* Overlapping Impact Cards */}
              <div className="absolute -bottom-4 -left-2 md:-bottom-6 md:-left-12 bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl border border-gray-100 max-w-[200px] md:max-w-[280px]">
                <h5 className="font-gotu font-bold text-secondary text-xs md:text-base mb-2 md:mb-3">{isHi ? "जनस्वास्थ्य दृष्टिकोण" : "Public Health Focus"}</h5>
                <div className="space-y-1.5 md:space-y-2">
                  {[
                    isHi ? "जलजनित बीमारियों की रोकथाम" : "Preventing diseases",
                    isHi ? "महिलाओं को कठिनाइयों से मुक्ति" : "Relief for women",
                    isHi ? "स्वच्छता एवं पोषण में सुधार" : "Better nutrition"
                  ].map((txt, i) => (
                    <div key={i} className="text-[12px] md:text-xs font-Poppins text-gray-400 flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-green shrink-0" /> {txt}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Goal Final Section */}
            <div className="bg-secondary p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] text-white space-y-4 md:space-y-6">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="p-2 md:p-3 bg-white/10 rounded-xl md:rounded-2xl">
                  <Target className="text-primary w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-gotu font-bold leading-tight">{isHi ? "लक्ष्य: जल-सुरक्षित मध्यप्रदेश" : "Goal: Water-Secure MP"}</h4>
                  <p className="text-[9px] md:text-xs opacity-60 uppercase  font-bold">The Ultimate Vision</p>
                </div>
              </div>
              <p className="font-Poppins text-sm md:text-lg leading-relaxed opacity-90 text-left text-justify">
                {isHi 
                  ? "उनका स्पष्ट लक्ष्य है कि मध्यप्रदेश का प्रत्येक परिवार नियमित, पर्याप्त और गुणवत्तापूर्ण पेयजल प्राप्त करे और जल संकट से मुक्त गरिमापूर्ण जीवन जी सके।"
                  : "Her goal is for every family to receive regular and quality water for a life of dignity."}
              </p>
              
              {/* Equality Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {(isHi ? ["समानता", "स्वास्थ्य", "महिला सम्मान", "ग्रामीण सशक्तिकरण"] : ["Equality", "Health", "Women Respect", "Rural Empowerment"]).map((tag, i) => (
                  <span key={i} className="px-2 md:px-3 py-1 md:py-1.5 bg-white/10 border border-white/10 rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-black uppercase ">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default JalJeevanSection;