import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import type { Lang } from "@/layouts/MainLayout";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";

// Images
import img12 from "@/assets/img7.jpg";
import img13 from "@/assets/13.jpeg";
import img14 from "@/assets/img15.jpg";
import img15 from "@/assets/img16.jpg";
import img17 from "@/assets/img17.jpg";

gsap.registerPlugin(ScrollTrigger);

interface JourneySectionProps {
  lang: Lang;
}

const JourneySection = ({ lang }: JourneySectionProps) => {
  const isHi = lang === "hi";
  const containerRef = useRef<HTMLDivElement>(null);

   const journeyData = [
    {
      period: "ABVP",
      title: isHi ? "छात्र जीवन से जनसेवा तक" : "From Student Life to Public Service",
      desc: isHi 
        ? "उनका सार्वजनिक जीवन छात्र अवस्था से ही प्रारंभ हो गया था। अखिल भारतीय विद्यार्थी परिषद से जुड़कर उन्होंने अनुशासन, राष्ट्रवादी विचारधारा और संगठनात्मक कार्यशैली को आत्मसात किया। यही अनुभव आगे चलकर उनके राजनीतिक और सामाजिक नेतृत्व की मजबूत नींव बना।" 
        : "Her public life embarked during her student years. By joining ABVP, she internalized discipline, nationalist ideology, and organizational proficiency. This experience later became the strong foundation of her political and social leadership.",
      img: img12,
      accent: "#E46B2E", 
    },
    {
      period: "RSS",
      title: isHi ? "संघ परिवार से वैचारिक संस्कार" : "Ideological Values from RSS",
      desc: isHi 
        ? "लगभग 12 वर्षों तक राष्ट्रीय स्वयंसेवक संघ से सक्रिय जुड़ाव ने उनके व्यक्तित्व को सेवा, समरसता और राष्ट्रनिर्माण के मूल्यों से सुदृढ़ किया। संघ की वैचारिक प्रेरणा उनके प्रत्येक निर्णय और जनकल्याणकारी प्रयासों में स्पष्ट रूप से परिलक्षित होती है।" 
        : "Active association with the RSS for nearly 12 years strengthened her personality with values of service, harmony, and nation-building. This ideological inspiration is clearly reflected in her every decision.",
      img: img13,
      accent: "#196458", 
    },
    {
      period: "Education",
      title: isHi ? "शिक्षा के क्षेत्र में योगदान" : "Contribution to Education",
      desc: isHi 
        ? "राजनीति के साथ-साथ उन्होंने आचार्य सरस्वती शिशु मंदिर में लगभग 5 वर्षों तक आचार्य के रूप में सेवा दी। इस भूमिका में उन्होंने विद्यार्थियों के नैतिक, शैक्षणिक एवं सांस्कृतिक विकास में महत्वपूर्ण योगदान दिया।" 
        : "Alongside politics, she served as an 'Acharya' at Saraswati Shishu Mandir for about 5 years. In this role, she made significant contributions to the moral, academic, and cultural development of students.",
      img: img14,
      accent: "#E46B2E",
    },
    {
      period: "1999–2004",
      title: isHi ? "ग्राम पंचायत टिकरवारा की सरपंच" : "Sarpanch, Gram Panchayat Tikarwara",
      desc: isHi 
        ? "सन् 1998 में ग्राम पंचायत टिकरवारा की सरपंच निर्वाचित हुईं। ग्राम विकास, स्वच्छता, शिक्षा और बुनियादी सुविधाओं के क्षेत्र में उल्लेखनीय कार्य किया। उनके इस उल्लखेनीय विकास कार्यों के लिए उनकी पंचायत को श्रेष्ठ पंचायत का सम्मान मिला।" 
        : "In 1998, she was elected Sarpanch of the Tikarwara Gram Panchayat. She accomplished remarkable work in the areas of village development, sanitation, education, and infrastructure. For her remarkable development work, her Panchayat was awarded the Best Panchayat Award.",
      img: img15,
      accent: "#196458",
    },
    {
      period: "2004–2017",
      title: isHi ? "जिला पंचायत अध्यक्ष, मण्डला" : "Chairperson, Zila Panchayat Mandla",
      desc: isHi 
        ? "तीन लगातार कार्यकाल। 2015 में निर्विरोध निर्वाचन – जनविश्वास का सशक्त प्रमाण। ग्रामीण विकास, महिला सशक्तिकरण, स्वास्थ्य, शिक्षा और आजीविका पर विशेष फोकस।" 
        : "Three consecutive terms. Her unopposed election in 2015 is a powerful testament to public trust. A special focus remained on rural development, women empowerment, health, and education.",
      img: img17,
      accent: "#E46B2E",
    },
    {
      period: "2018–2023",
      title: isHi ? "राज्यसभा सदस्य" : "Rajya Sabha member",
      desc: isHi 
        ? "वर्ष 2017 में मध्य प्रदेश से राज्यसभा सांसद के रूप में निर्विरोध निर्वाचित हुईं। राज्यसभा सांसद के रूप में उनका संसदीय योगदान उल्लेखनीय रहा। संसद में उन्होंने जनजातीय विकास, महिला सशक्तिकरण, सामाजिक न्याय और जनस्वास्थ्य जैसे महत्वपूर्ण विषयों को सदन में प्रमुखता से उठाया। वर्ष 2018 में स्वास्थ्य एवं परिवार कल्याण समिति की संसदीय समिति की सदस्य भी रहीं।" 
        : "Three consecutive terms. Her unopposed election in 2015 is a powerful testament to public trust. A special focus remained on rural development, women empowerment, health, and education.",
      img: img15,
      accent: "#E46B2E",
    },
    // {
    //   period: "2018–2023",
    //   title: isHi ? "राज्यसभा सदस्य" : "Rajya Sabha member",
    //   desc: isHi 
    //     ? "वर्ष 2017 में मध्य प्रदेश से राज्यसभा सांसद के रूप में निर्विरोध निर्वाचित हुईं। राज्यसभा सांसद के रूप में उनका संसदीय योगदान उल्लेखनीय रहा। संसद में उन्होंने जनजातीय विकास, महिला सशक्तिकरण, सामाजिक न्याय और जनस्वास्थ्य जैसे महत्वपूर्ण विषयों को सदन में प्रमुखता से उठाया। वर्ष 2018 में स्वास्थ्य एवं परिवार कल्याण समिति की संसदीय समिति की सदस्य भी रहीं।" 
    //     : "In the year 2017, she was elected unopposed as a Rajya Sabha Member of Parliament from Madhya Pradesh. Her parliamentary contributions as a Rajya Sabha MP were noteworthy. In Parliament, she prominently raised important issues such as tribal development, women’s empowerment, social justice, and public health. In 2018, she also served as a member of the Parliamentary Committee on Health and Family Welfare.",
    //   img: img15,
    //   accent: "#E46B2E",
    // },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".bg-float", {
        y: -50,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5
      });

      journeyData.forEach((_, i) => {
        const row = `.row-${i}`;
        const img = `.img-${i}`;
        const content = `.content-${i}`;

        gsap.from(img, {
          x: i % 2 === 0 ? -100 : 100,
          opacity: 0,
          scale: 0.9,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
          }
        });

        gsap.from(content, {
          y: 80,
          opacity: 0,
          filter: "blur(10px)",
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: row,
            start: "top 75%",
          }
        });
      });

      gsap.fromTo(".timeline-path", 
        { strokeDashoffset: 1000 },
        { 
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: ".journey-container",
            start: "top center",
            end: "bottom center",
            scrub: 1
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [journeyData]);

  return (
    <section ref={containerRef} className="py-12 md:py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="bg-float absolute top-1/4 left-[5%] w-48 h-48 md:w-64 md:h-64 bg-[#E46B2E]/5 rounded-full blur-[80px] md:blur-[100px]" />
        <div className="bg-float absolute bottom-1/4 right-[5%] w-64 h-64 md:w-96 md:h-96 bg-[#12574c]/5 rounded-full blur-[100px] md:blur-[120px]" />
      </div>

      <div className="relative z-10 px-4 md:px-28 mx-auto">
        <SectionHeading title={isHi ? "विकास यात्रा" : "The Journey of Progress"} />

        <div className="journey-container mt-12 lg:mt-32 relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 hidden lg:block">
            <svg width="100%" height="100%" className="overflow-visible">
              <path 
                className="timeline-path"
                d="M 1,0 L 1,4500" 
                stroke="#e46b2e" 
                strokeWidth="2" 
                strokeDasharray="10 10" 
                fill="none"
              />
            </svg>
          </div>

          <div className="space-y-16 md:space-y-32 lg:space-y-40">
            {journeyData.map((item, index) => (
              <div 
                key={index} 
                className={`journey-row row-${index} flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-32 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={`img-${index} w-full lg:w-1/2 relative group px-2 md:px-0`}>
                  <div className="relative z-10 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] md:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] aspect-[16/10]">
                    <img 
                      src={item.img} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                      alt={item.title} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#12574c]/40 to-transparent mix-blend-overlay" />
                  </div>
                  
                  <div 
                    className={`absolute -top-4 md:-top-6 ${index % 2 !== 0 ? 'right-4 md:right-6' : 'left-4 md:left-6'} z-20 px-4 md:px-6 py-1.5 md:py-2 rounded-full backdrop-blur-xl bg-white/90 border border-white/20 shadow-lg md:shadow-xl`}
                  >
                    <span className="text-[10px] md:text-sm font-black uppercase" style={{ color: item.accent }}>
                      {item.period}
                    </span>
                  </div>
                </div>

                <div className={`content-${index} w-full lg:w-1/2 space-y-4 md:space-y-6 px-2 md:px-0 ${index % 2 !== 0 ? 'lg:text-right' : 'text-left'}`}>
                  <div className={`flex items-center gap-3 md:gap-4 ${index % 2 !== 0 ? 'lg:justify-end' : 'justify-start'}`}>
                    <span className="h-[2px] w-8 md:w-12 rounded-full" style={{ backgroundColor: item.accent }} />
                  </div>

                  <h3 className="text-2xl md:text-4xl lg:text-5xl font-black text-[#12574c] leading-tight ">
                    {item.title}
                  </h3>

                  <div className="relative">
                    <p className="text-sm md:text-lg lg:text-xl text-gray-600  leading-relaxed font-light text-justify">
                      {item.desc}
                    </p>
                    <div className={`h-1 w-12 md:w-20 mt-4 rounded-full opacity-30 ${index % 2 !== 0 ? 'lg:ml-auto' : 'mr-auto'}`} style={{ backgroundColor: item.accent }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;