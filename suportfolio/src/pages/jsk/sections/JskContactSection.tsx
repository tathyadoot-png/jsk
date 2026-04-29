import React from "react";

type Props = {
    lang: "hi" | "en";
};

const JskContactPage: React.FC<Props> = ({ lang }) => {
    return (
        <section className="w-full bg-[#fafafa] py-16 md:py-24 px-6">
            {/* Wrapper to maintain consistency with other sections */}
            <div className="max-w-7xl mx-auto">

                {/* --- SECTION HEADER --- */}
                <div className="mb-16 md:mb-24">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-1 w-12 bg-[#E46B2E] rounded-full"></div>
                        <span className="text-[#12574c] font-black uppercase   text-xs md:text-sm">
                            {lang === "hi" ? "संपर्क करें" : "Get In Touch"}
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-7xl font-black text-[#12574c] leading-[1.1]  ">
                        {lang === "hi" ? (
                            <>आपकी समस्या, <br /><span className="text-[#E46B2E]">हमारा समाधान।</span></>
                        ) : (
                            <>Your Voice, <br /><span className="text-[#E46B2E]">Our Priority.</span></>
                        )}
                    </h2>
                </div>

                {/* Main Layout Grid */}
                <div className="grid lg:grid-cols-12 gap-8 items-stretch">

                    {/* --- LEFT SIDE: Info Card (Col-span 5) --- */}
                    <div className="lg:col-span-5 bg-[#12574c] rounded-[2.5rem] p-8 md:p-12 lg:p-16 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl shadow-[#12574c]/20">
                        {/* Decorative Background Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E46B2E] opacity-10 blur-[100px] rounded-full"></div>

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-8">
                                <span className="w-2 h-2 bg-[#E46B2E] rounded-full animate-pulse"></span>
                                <span className="text-[10px] font-black   uppercase opacity-80">
                                    {lang === "hi" ? "सहायता केंद्र" : "Support Center"}
                                </span>
                            </div>

                            <h2 className="text-4xl md:text-6xl font-black leading-tight mb-6">
                                {lang === "hi" ? "जनता" : "Janta"} <br />
                                <span className="text-[#E46B2E]">
                                    {lang === "hi" ? "सुविधा" : "Suvidha"}
                                </span>
                            </h2>

                            <p className="text-white/70 text-lg leading-relaxed max-w-sm mb-12">
                                {lang === "hi"
                                    ? "मंडला विधानसभा क्षेत्र के नागरिकों के लिए सीधी सेवा। अपनी समस्याओं का त्वरित निराकरण पाएं।"
                                    : "Direct service for Mandla citizens. Get quick resolution of your grievances."}
                            </p>
                        </div>

                        <div className="relative z-10 space-y-6 pt-12 border-t border-white/10">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl">📍</div>
                                <p className="text-sm font-medium opacity-90">Mandla, Madhya Pradesh</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl">📞</div>
                                <p className="text-sm font-bold opacity-90">+91 94251 72508</p>
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT SIDE: Form Card (Col-span 7) --- */}
                    <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-200/50">
                        <div className="mb-10">
                            <h3 className="text-2xl font-black text-[#12574c] mb-2 uppercase  ">
                                {lang === "hi" ? "शिकायत फॉर्म" : "Grievance Form"}
                            </h3>
                            <p className="text-slate-400 text-sm font-medium">
                                {lang === "hi" ? "सभी अनिवार्य जानकारी भरें" : "Please fill in all mandatory fields"}
                            </p>
                        </div>

                        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="group space-y-2">
                                    <label className="text-[10px] font-black uppercase   text-slate-400 group-focus-within:text-[#12574c] transition-colors">
                                        {lang === "hi" ? "पूरा नाम" : "Full Name"}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="E.g. Ram Kumar"
                                        className="w-full bg-transparent border-b-2 border-slate-100 py-3 focus:outline-none focus:border-[#12574c] text-lg font-medium transition-all placeholder:text-slate-200"
                                    />
                                </div>
                                <div className="group space-y-2">
                                    <label className="text-[10px] font-black uppercase   text-slate-400 group-focus-within:text-[#12574c] transition-colors">
                                        {lang === "hi" ? "मोबाइल नंबर" : "Mobile Number"}
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="9000000000"
                                        className="w-full bg-transparent border-b-2 border-slate-100 py-3 focus:outline-none focus:border-[#12574c] text-lg font-medium transition-all placeholder:text-slate-200"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="group space-y-2">
                                    <label className="text-[10px] font-black uppercase   text-slate-400 group-focus-within:text-[#12574c] transition-colors">
                                        {lang === "hi" ? "क्षेत्र / वार्ड" : "Area / Ward"}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Mandla"
                                        className="w-full bg-transparent border-b-2 border-slate-100 py-3 focus:outline-none focus:border-[#12574c] text-lg font-medium transition-all placeholder:text-slate-200"
                                    />
                                </div>
                                <div className="group space-y-2">
                                    <label className="text-[10px] font-black uppercase   text-slate-400 group-focus-within:text-[#12574c] transition-colors">
                                        {lang === "hi" ? "पहचान पत्र संख्या" : "Identity Number"}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Aadhaar / Voter ID"
                                        className="w-full bg-transparent border-b-2 border-slate-100 py-3 focus:outline-none focus:border-[#12574c] text-lg font-medium transition-all placeholder:text-slate-200"
                                    />
                                </div>
                            </div>

                            <div className="group space-y-2">
                                <label className="text-[10px] font-black uppercase   text-slate-400 group-focus-within:text-[#12574c] transition-colors">
                                    {lang === "hi" ? "समस्या का विवरण" : "Grievance Details"}
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder={lang === "hi" ? "यहाँ विस्तार से लिखें..." : "Describe here..."}
                                    className="w-full bg-transparent border-b-2 border-slate-100 py-3 focus:outline-none focus:border-[#12574c] text-lg font-medium transition-all placeholder:text-slate-200 resize-none"
                                ></textarea>
                            </div>

                            <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-6">
                                <p className="text-[10px] text-slate-400 font-bold max-w-xs text-center md:text-left uppercase  ">
                                    {lang === "hi"
                                        ? "सबमिट करने से पहले सुनिश्चित करें कि दी गई जानकारी सही है।"
                                        : "Ensure all information is correct before submitting."}
                                </p>
                                <button className="w-full md:w-auto bg-[#12574c] hover:bg-[#E46B2E] text-white px-14 py-5 rounded-2xl font-black   uppercase text-sm transition-all duration-300 shadow-xl shadow-[#12574c]/20 hover:shadow-[#E46B2E]/40 hover:-translate-y-1 active:scale-95">
                                    {lang === "hi" ? "भेजें" : "Send Now"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default JskContactPage;