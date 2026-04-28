import { motion } from "framer-motion";
import type { Lang } from "@/layouts/MainLayout";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import { Briefcase, Users, Building2, Landmark, Droplets, CheckCircle2 } from "lucide-react";

interface GovernanceSectionProps {
  lang: Lang;
}

const GovernanceSection = ({ lang }: GovernanceSectionProps) => {
  const isHi = lang === "hi";

  const data = [
    {
      titleHi: "सहकारिता एवं बैंकिंग में भूमिका",
      titleEn: "Role in Cooperation & Banking",
      contentHi: [
        "संचालक, जिला सहकारी केन्द्रीय बैंक, मण्डला",
        "संचालक, एपेक्स बैंक, मध्यप्रदेश",
        "इन भूमिकाओं में उन्होंने कृषक साख व्यवस्था, सार्वजनिक वितरण प्रणाली और आर्थिक समावेशन को सुदृढ़ करने में योगदान दिया।"
      ],
      contentEn: [
        "Director, District Cooperative Central Bank, Mandla",
        "Director, Apex Bank, Madhya Pradesh",
        "Contributed to strengthening the farmer credit system, PDS, and financial inclusion."
      ],
      icon: <Building2 className="w-5 h-5" />,
      color: "#E46B2E" // Saffron
    },
    {
      titleHi: "भाजपा में संगठनात्मक नेतृत्व",
      titleEn: "Organizational Leadership in BJP",
      contentHi: [
        "श्रीमती संपतिया उइके जी भारतीय जनता पार्टी की प्रतिबद्ध और कर्मठ कार्यकर्ता रही हैं।",
        "जिला अध्यक्ष एवं प्रदेश मंत्री – भाजपा महिला मोर्चा",
        "प्रदेश मंत्री – अनुसूचित जनजाति मोर्चा",
        "प्रदेश मंत्री – भारतीय जनता पार्टी, मध्यप्रदेश (तीन कार्यकाल)"
      ],
      contentEn: [
        "A committed and dedicated worker of the Bharatiya Janata Party.",
        "District President & State Secretary – BJP Mahila Morcha",
        "State Secretary – Scheduled Tribe Morcha",
        "State Secretary – BJP Madhya Pradesh (Three Terms)"
      ],
      icon: <Users className="w-5 h-5" />,
      color: "#196458" // Green
    },
    {
      titleHi: "राज्यसभा सांसद के रूप में संसदीय योगदान",
      titleEn: "Parliamentary Contribution as Rajya Sabha MP",
      contentHi: [
        "वर्ष 2017 में मध्यप्रदेश से राज्यसभा सांसद के रूप में निर्विरोध निर्वाचन",
        "संसद में उन्होंने— जनजातीय विकास, महिला सशक्तिकरण, सामाजिक न्याय, जनस्वास्थ्य जैसे विषयों पर सशक्त एवं तथ्यपरक प्रस्तुति दी।",
        "वे स्वास्थ्य एवं परिवार कल्याण समिति (2018) की सदस्य भी रहीं।"
      ],
      contentEn: [
        "Unopposed election as Rajya Sabha MP from MP in 2017.",
        "Strong representation on Tribal Development, Women Empowerment, Social Justice, and Public Health.",
        "Member of the Health and Family Welfare Committee (2018)."
      ],
      icon: <Landmark className="w-5 h-5" />,
      color: "#196458" // Green
    },
    {
      titleHi: "वर्तमान दायित्व",
      titleEn: "Current Responsibility",
      contentHi: [
        "वर्तमान में श्रीमती संपतिया उइके जी लोक स्वास्थ्य यांत्रिकी मंत्री, मध्यप्रदेश शासन के रूप में कार्यरत हैं।",
        "उन्होंने दिसंबर 2023 में कैबिनेट मंत्री पद की शपथ ली।"
      ],
      contentEn: [
        "Currently serving as the Minister of Public Health Engineering, Govt of MP.",
        "Took oath as a Cabinet Minister in December 2023."
      ],
      icon: <Briefcase className="w-5 h-5" />,
      color: "#E46B2E" // Saffron
    }
  ];

  return (
    <section className="bg-white relative px-4 md:px-8 lg:px-28 py-10 md:py-16" id="governance">
      <div className=" mx-auto">
        <SectionHeading title={isHi ? "प्रशासन एवं नेतृत्व" : "Governance & Leadership"} />

        {/* Compact Grid with Full Content */}
        <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative flex flex-col sm:flex-row gap-5 bg-[#F9FAFB] p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-transparent hover:border-gray-200 hover:bg-white hover:shadow-xl transition-all duration-500"
            >
              {/* Vertical Color Accent */}
              <div className="absolute left-0 top-8 bottom-8 w-1.5 rounded-r-full hidden sm:block" style={{ backgroundColor: item.color }} />
              
              {/* Icon Box */}
              <div 
                className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-500"
                style={{ backgroundColor: item.color }}
              >
                {item.icon}
              </div>

              {/* Text Area */}
              <div className="flex-1 space-y-4">
                <h3 className="text-lg md:text-xl lg:text-2xl font-gotu font-bold text-gray-900 leading-tight border-b border-gray-100 pb-3">
                  {isHi ? item.titleHi : item.titleEn}
                </h3>
                <div className="space-y-3">
                  {(isHi ? item.contentHi : item.contentEn).map((point, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0 opacity-40" style={{ color: item.color }} />
                      <p className="font-Poppins text-gray-600 text-sm md:text-base leading-relaxed text-left md:text-justify">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sankalp Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-12 md:mt-20 p-6 md:p-10 lg:p-14 rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br from-[#196458] to-[#124d43] text-white relative overflow-hidden shadow-2xl"
        >
          {/* Decorative Pattern - Scaled for mobile */}
          <div className="absolute top-0 right-0 p-1 opacity-10 pointer-events-none">
              <Droplets className="w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row gap-3 lg:items-center">
            <div className="text-center lg:text-left space-y-3 md:space-y-2">
              <h4 className="text-xl md:text-2xl lg:text-3xl font-gotu font-bold text-[#E46B2E] italic">
                {isHi ? "संकल्प—" : "Resolution—"}
              </h4>
              <p className="font-Poppins text-sm md:text-lg lg:text-xl opacity-90 max-w-2xl leading-relaxed">
                {isHi 
                  ? "स्वस्थ, सशक्त और विकसित मध्यप्रदेश का निर्माण है।" 
                  : "To build a healthy, empowered and developed Madhya Pradesh."}
              </p>
            </div>

            <div className="flex flex-col gap-3  flex-1 w-full">
               {[
                 isHi ? "हर घर शुद्ध पेयजल" : "Pure water for every home",
                 isHi ? "जल संरचनाओं का सुदृढ़ीकरण" : "Strengthening water structures",
                 isHi ? "ग्रामीण एवं शहरी जनस्वास्थ्य में सुधार" : "Improving rural & urban health"
               ].map((text, idx) => (
                 <div key={idx} className="bg-white/10 backdrop-blur-md px-4 md:px-6 py-3 rounded-xl border text-xl border-white/10 flex items-center gap-3 transition-transform hover:translate-x-2 duration-300">
                    <div className="w-2 h-2 rounded-full bg-[#E46B2E] shrink-0" />
                    <span className="text-xs md:text-lg font-bold uppercase  leading-tight">{text}</span>
                 </div>
               ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GovernanceSection;