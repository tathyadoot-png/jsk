import React from "react";

type Props = {
  lang: "hi" | "en";
};

const JskAboutSection: React.FC<Props> = ({ lang }) => {
  return (
    <section className="w-full py-20 md:py-32 px-6 md:px-16 lg:px-24 bg-white text-slate-900">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#12574c] mb-6">
            {lang === "hi" ? "जनता सुविधा केंद्र" : "Janta Suvidha Kendra"}
          </h2>
          <div className="flex justify-center gap-1 mb-8">
            <div className="h-1.5 w-16 bg-[#12574c] rounded-full"></div>
            <div className="h-1.5 w-4 bg-[#E46B2E] rounded-full"></div>
          </div>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-600 leading-relaxed">
            {lang === "hi"
              ? "जनता सुविधा केंद्र, मंडला विधानसभा क्षेत्र के नागरिकों तक मूलभूत सुविधाएं पहुँचाने एवं समस्याओं के त्वरित समाधान के उद्देश्य से प्रारंभ किया गया है।"
              : "Janta Suvidha Kendra is dedicated to delivering essential services and ensuring efficient resolution of public grievances for the citizens of Mandla."}
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {[
            {
              num: "01",
              hiTitle: "आपकी समस्या, हमारी प्राथमिकता",
              enTitle: "Priority Focus",
              hiDesc: "हर समस्या का समाधान प्राथमिकता से सुनिश्चित किया जाता है.",
              enDesc: "Every public issue is handled with the highest level of priority."
            },
            {
              num: "02",
              hiTitle: "मूलभूत सुविधाएं",
              enTitle: "Essential Services",
              hiDesc: "सरकारी योजनाओं और सेवाओं को हर नागरिक तक पहुँचाना.",
              enDesc: "Bridging the gap between government services and every citizen."
            },
            {
              num: "03",
              hiTitle: "त्वरित समाधान",
              enTitle: "Quick Resolution",
              hiDesc: "तकनीक और सक्रियता के माध्यम से बिना देरी समाधान.",
              enDesc: "Fast-track resolution systems to eliminate unnecessary delays."
            }
          ].map((item, index) => (
            <div key={index} className="group p-8 bg-slate-50 border-b-4 border-slate-100 hover:border-[#12574c] rounded-3xl transition-all duration-300 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 hover:-translate-y-2">
              <div className="w-12 h-12 bg-[#12574c]/10 rounded-2xl flex items-center justify-center mb-6 text-[#12574c] font-bold">
                {item.num}
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#12574c]">
                {lang === "hi" ? item.hiTitle : item.enTitle}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {lang === "hi" ? item.hiDesc : item.enDesc}
              </p>
            </div>
          ))}
        </div>

        {/* Documentation Section */}
        <div className="bg-[#12574c] rounded-[2.5rem] p-8 md:p-16 text-white overflow-hidden relative shadow-2xl shadow-[#12574c]/20">
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-10 text-center">
              {lang === "hi" ? "आवश्यक दस्तावेज" : "Required Documentation"}
            </h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start space-x-4 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/15 transition-colors">
                <div className="min-w-[4px] h-12 bg-[#E46B2E] rounded-full"></div>
                <div>
                  <h4 className="font-bold text-lg text-white">
                    {lang === "hi" ? "आधार कार्ड" : "Aadhaar Card"}
                  </h4>
                  <p className="text-white/70 text-sm italic">
                    {lang === "hi" ? "[आधार रेडाक्टेड]" : "[Aadhaar Redacted]"}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/15 transition-colors">
                <div className="min-w-[4px] h-12 bg-[#E46B2E] rounded-full"></div>
                <div>
                  <h4 className="font-bold text-lg text-white">
                    {lang === "hi" ? "वोटर आईडी" : "Voter ID"}
                  </h4>
                  <p className="text-white/70 text-sm">
                    {lang === "hi" ? "स्थानीय निवास की पुष्टि हेतु" : "Used for residency verification"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-black/20 blur-[80px] rounded-full"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#E46B2E]/20 blur-[100px] rounded-full"></div>
        </div>

       
      </div>
    </section>
  );
};

export default JskAboutSection;