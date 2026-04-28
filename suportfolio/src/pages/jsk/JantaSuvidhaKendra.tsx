import React from "react";
import desktopImg from "@/assets/jsk/jsk-desktop.jpeg";
import mobileImg from "@/assets/jsk/jsk-mobile.jpeg";
import JskIntroSection from "./sections/JskIntroSection";
import JskAboutSection from "./sections/JskAboutSection";
import JskContactSection from "./sections/JskContactSection";

type Props = {
    lang: "hi" | "en";
};

const JantaSuvidhaKendra = ({ lang = "hi" }: Props) => {
    return (
        <div className="w-full min-h-screen bg-white text-slate-900">

            {/* --- HERO SECTION --- */}
            {/* pt-20 ya pt-24 add kiya hai mobile ke liye taki navbar ke niche se image start ho */}
            <section className="w-full bg-[#fdf2d8] pt-[65px] md:pt-0"> 
                <div className="w-full mx-auto max-w-[1920px]">
                    
                    {/* 📱 Mobile Image */}
                    <img
                        src={mobileImg}
                        alt="JSK Mobile"
                        className="w-full h-auto block md:hidden object-contain"
                    />

                    {/* 💻 Desktop Image */}
                    <img
                        src={desktopImg}
                        alt="JSK Desktop"
                        className="w-full h-auto hidden md:block object-contain"
                    />
                </div>
            </section>

            {/* --- CONTENT SECTIONS --- */}
            <div className="relative">
                <JskIntroSection lang={lang} />
                <JskAboutSection lang={lang} />
                <JskContactSection lang={lang} />
            </div>

        </div>
    );
};

export default JantaSuvidhaKendra;