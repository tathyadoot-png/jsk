import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote, Feather, Award, Heart, Sparkles, ArrowUpRight } from 'lucide-react';
import img32 from "@/assets/img32.jpg";
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading';

const ArticleSection = ({ lang }: { lang: "hi" | "en" }) => {
  const isHi = lang === "hi";

  const content = {
    sectionTitle: isHi ? "विकास की मुख्यधारा में जनजातीय महिलाएँ" : "Empowering Tribal Women",
    quote: isHi 
      ? "जब महिलाएँ सशक्त होंगी, तभी समाज और देश प्रगति की नई ऊँचाइयों को छुएगा।"
      : "When women are empowered, society and the nation will scale new heights of progress.",
    intro: isHi
      ? "भारत में महिला सशक्तिकरण की चर्चा तब तक पूर्ण नहीं मानी जा सकती, जब तक जनजातीय महिलाओं की भूमिका और उनके योगदान को केंद्र में न रखा जाए।"
      : "Discussions on women's empowerment in India remain incomplete without placing the role and contributions of tribal women at the forefront.",
    card1Title: isHi ? "राष्ट्र निर्माण की आधारशिला" : "Foundations of Nation Building",
    card1Desc: isHi
      ? "प्रधानमंत्री नरेंद्र मोदी के दूरदर्शी नेतृत्व में महिला सशक्तिकरण को केवल एक सामाजिक मुद्दा नहीं, बल्कि राष्ट्र निर्माण की आधारशिला माना गया है। शिक्षा, स्वास्थ्य, पोषण और स्वरोजगार जैसे क्षेत्रों में सरकार की योजनाएँ जनजातीय महिलाओं को आत्मनिर्भर बना रही हैं।"
      : "Under the visionary leadership of PM Narendra Modi, women's empowerment is seen not just as a social issue, but as a cornerstone of nation-building.",
    card2Title: isHi ? "मध्य प्रदेश की प्रतिबद्धता" : "Commitment of MP",
    card2Desc: isHi
      ? "मुख्यमंत्री डॉ. मोहन यादव के नेतृत्व में राज्य सरकार ने जनजातीय एवं अनुसूचित जाति वर्ग की महिलाओं के उत्थान को प्राथमिकता बनाया है। आदिवासी महिलाएँ आज सामाजिक-आर्थिक बदलाव की सशक्त वाहक बन रही हैं।"
      : "Under the leadership of CM Dr. Mohan Yadav, the state has prioritized the upliftment of tribal women as drivers of socio-economic change.",
    impactTitle: isHi ? "योजनाओं का जमीनी प्रभाव" : "Ground Impact",
    impactDesc: isHi
      ? "प्रधानमंत्री वन धन योजना, स्टैंड-अप इंडिया और मुख्यमंत्री लाड़ली बहना योजना ने महिलाओं के आत्मसम्मान को सुदृढ़ किया है। पेसा अधिनियम ने ग्राम सभाओं में उनकी निर्णय-निर्माण की शक्ति को और भी सशक्त बनाया है।"
      : "Schemes like PM Van Dhan Yojana, Stand-Up India, and CM Ladli Behna Yojana have strengthened women's self-esteem and decision-making.",
    journeyTitle: isHi ? "संघर्ष से नेतृत्व तक" : "Struggle to Leadership",
    journeyDesc: isHi
      ? "मैं स्वयं एक जनजातीय महिला हूँ और मेरा जीवन संघर्षों से भरा रहा है। ईंट-भट्टों में मजदूरी से लेकर सरपंच, जिला पंचायत अध्यक्ष, राज्यसभा सदस्य और आज कैबिनेट मंत्री बनने तक का सफर आसान नहीं था। यह सब भारतीय जनता पार्टी के संगठनात्मक विश्वास के कारण संभव हो पाया।"
      : "From working in brick kilns to becoming a Minister, my journey was made possible by the organizational trust of the BJP.",
    name: isHi ? "श्रीमती संपतिया उइके" : "Smt. Sampatiya Uikey",
    designation: isHi ? "लोक स्वास्थ्य यांत्रिकी मंत्री" : "Minister of Public Health Engineering",
    govt: isHi ? "मध्यप्रदेश शासन" : "Govt of MP",
    footer: isHi ? "लेख साभार: अंतरराष्ट्रीय महिला दिवस विशेष संदेश" : "Article Credit: Women's Day Special Message"
  };

  return (
    <section className="relative w-full py-1 md:py-10 bg-[#f8fafc] overflow-hidden" id="article">
      
      <div className="mb-8">
         <SectionHeading title={content.sectionTitle} />
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-4">
        <motion.div 
          key={lang}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm"
        >
          {/* 2. Image Section - Compacted Height */}
          <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden">
            <img 
              src={img32} 
              alt="Tribal Empowerment" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10">
              <div className="backdrop-blur-md bg-black/20 border border-white/20 p-5 md:p-8 rounded-2xl max-w-xl text-justify">
                <p className="text-white text-base md:text-xl font-light italic leading-relaxed">
                  "{content.quote}"
                </p>
              </div>
            </div>
          </div>

          {/* 3. Main Content Body - Reduced Padding */}
          <div className="p-3 md:p-12 relative">
            <Quote className="absolute top-6 right-6 w-16 h-16 md:w-32 md:h-32 text-gray-100 opacity-20 pointer-events-none" />

            <div className="max-w-4xl mx-auto space-y-10 md:space-y-8">
              
              {/* Intro - Slightly smaller font */}
              <p className="text-xl md:text-2xl font-medium text-[#12574c] leading-snug italic border-l-8 border-[#E46B2E] pl-6  text-justify">
                {content.intro}
              </p>

              {/* Info Grid - Tighter gap */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:space-y-3">
                  <div className="flex items-center gap-3">
                    <Award size={24} className="text-[#E46B2E]" />
                    <h4 className="text-lg font-bold text-[#12574c]  text-justify">{content.card1Title}</h4>
                  </div>
                  <p className="text-gray-600 text-base leading-relaxed text-justify">
                    {content.card1Desc}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Heart size={24} className="text-[#E46B2E]" />
                    <h4 className="text-lg font-bold text-[#12574c]">{content.card2Title}</h4>
                  </div>
                  <p className="text-gray-600 text-base leading-relaxed text-justify">
                    {content.card2Desc}
                  </p>
                </div>
              </div>

              {/* Highlight Box - Less padding */}
              <div className="bg-[#12574c]/5 p-2 md:p-3 rounded-3xl border border-[#12574c]/10 relative overflow-hidden">
                <h4 className="text-[#12574c] font-black uppercase text-[10px] mb-4 opacity-70">
                  {content.impactTitle}
                </h4>
                <p className="text-lg md:text-xl text-gray-800 leading-relaxed  text-justify">
                  {content.impactDesc}
                </p>
              </div>

              {/* Personal Section - Compacted Journey */}
              <div className="">
                <div className="flex items-center gap-3">
                  <Feather className="text-[#E46B2E] w-6 h-6" />
                  <h4 className="text-xl font-black text-[#12574c] uppercase italic">
                    {content.journeyTitle}
                  </h4>
                </div>
                <div className="text-lg md:text-xl text-gray-700 leading-relaxed  text-justify font-serif italic bg-gray-50/50 p-6 md:p-10 rounded-2xl border-l-4 border-[#12574c]/10">
                  "{content.journeyDesc}"
                </div>
              </div>

              {/* Signature Block - Smaller fonts */}
              <div className="pt-5 border-t border-gray-100 flex flex-col items-end">
                <div className="text-right">
                  <p className="text-[#12574c] font-black text-3xl md:text-4xl ">
                    {content.name}
                  </p>
                  <p className="text-[#E46B2E] font-bold text-sm uppercase mt-2">
                    {content.designation}
                  </p>
                  <p className="text-gray-400 text-[10px] uppercase mt-1 font-bold ">
                    {content.govt}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <p className="mt-5 text-center text-gray-400 text-[10px] italic  uppercase">
          {content.footer}
        </p>
      </div>
    </section>
  );
};

export default ArticleSection;