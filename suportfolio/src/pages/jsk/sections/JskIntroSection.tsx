import React from "react";

type Props = {
  lang: "hi" | "en";
};

const JskIntroSection: React.FC<Props> = ({ lang }) => {
  return (
    <section className="w-full py-20 md:py-32 px-6 md:px-16 lg:px-24 bg-white text-slate-900 overflow-hidden relative">
      
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#12574c]/5 -skew-x-12 translate-x-20 hidden md:block"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          
          {/* Left Content (Main Info) */}
          <div className="lg:col-span-3 space-y-8">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#12574c]/10 text-[#12574c] text-sm font-bold  uppercase">
              {lang === "hi" ? "नया शुभारंभ" : "New Initiative"}
            </div>

            <h1 className="text-4xl md:text-6xl font-black leading-[1.1] text-[#12574c]">
              {lang === "hi"
                ? "जनता सुविधा केंद्र"
                : "Janta Suvidha Kendra"}
            </h1>

            <div className="space-y-6">
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                {lang === "hi"
                  ? "मंडला विधानसभा क्षेत्र के नागरिकों तक मूलभूत सुविधाएं पहुँचाने एवं आपकी समस्याओं के त्वरित समाधान के उद्देश्य से एक विशेष पहल।"
                  : "A dedicated initiative to deliver essential services and ensure rapid resolution of issues for the citizens of Mandla constituency."}
              </p>

              <div className="p-5 bg-slate-50 border-l-4 border-[#E46B2E] rounded-r-2xl">
                <p className="text-sm md:text-base text-slate-700 leading-relaxed italic">
                  {lang === "hi"
                    ? "कृपया फॉर्म भरते समय पहचान पत्र के रूप में अपना आधार कार्ड एवं वोटर आईडी कार्ड साथ रखें।"
                    : "Please keep your identity proofs (Aadhaar and Voter ID) ready while filling out the application form."}
                </p>
              </div>

              <p className="text-base md:text-lg text-slate-500">
                {lang === "hi"
                  ? "अब सेवाओं का लाभ प्राप्त करना हुआ और भी सरल — बस एक क्लिक दूर।"
                  : "Accessing government services is now easier than ever — just one click away."}
              </p>
            </div>

            {/* CTA Buttons */}
            {/* <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-[#E46B2E] text-white px-8 py-4 rounded-2xl text-base font-bold shadow-xl shadow-[#E46B2E]/30 hover:bg-[#c5551f] hover:scale-105 transition-all duration-300">
                {lang === "hi" ? "फॉर्म भरें" : "Fill Application Form"}
              </button>

              <button className="bg-white text-[#12574c] border-2 border-[#12574c] px-8 py-4 rounded-2xl text-base font-bold hover:bg-[#12574c] hover:text-white transition-all duration-300">
                {lang === "hi" ? "स्थिति जांचें" : "Check Status"}
              </button>
            </div> */}
          </div>

          {/* Right Content (Visual Badge/Card) */}
          <div className="lg:col-span-2 hidden lg:flex justify-center">
            <div className="relative">
              <div className="w-72 h-96 bg-[#12574c] rounded-[3rem] rotate-3 shadow-2xl flex flex-col items-center justify-center p-8 text-center text-white border-8 border-white">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 text-3xl font-bold">
                  JSK
                </div>
                <h3 className="text-2xl font-black mb-2 leading-tight">
                  {lang === "hi" ? "सेवा का संकल्प" : "Committed to Service"}
                </h3>
                <div className="w-12 h-1 bg-[#E46B2E] my-4"></div>
                <p className="text-sm text-white/70">
                  {lang === "hi" ? "मंडला विधानसभा क्षेत्र" : "Mandla Constituency"}
                </p>
              </div>
              {/* Decorative circle */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#E46B2E] rounded-full -z-10 shadow-lg"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default JskIntroSection;