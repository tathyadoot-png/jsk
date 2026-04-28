import hi from "@/locales/hi";
import en from "@/locales/en";
import type { Lang } from "@/layouts/MainLayout";
import logo from "@/assets/SociyoLogo.png";
import { ArrowUpRight } from "lucide-react";

const Footer = ({ lang }: { lang: Lang }) => {
  const isHi = lang === "hi";

  const navLinks = [
    { label: isHi ? "होम" : "Home", path: "/" },
    { label: isHi ? "परिचय" : "About", path: "#about" },
    { label: isHi ? "विकास यात्रा" : "Journey", path: "#journey" },
    { label: isHi ? "उपलब्धियाँ" : "Achievements", path: "#achievements" },
    { label: isHi ? "नेतृत्व" : "Leadership", path: "#leadership" },
    { label: isHi ? "गैलरी" : "Gallery", path: "#gallery" },
  ];

  return (
    <footer className="bg-white pt-16 border-t border-gray-100">
      <div className="mx-auto max-w-full px-6 lg:px-20">
        
        {/* Identity & Navigation Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 pb-12">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="font-[Gotu] text-2xl md:text-3xl font-black text-secondary  uppercase leading-none">
              {isHi ? "संपतिया उइके" : "Sampatiya Uikey"}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="h-[1px] w-4 bg-primary hidden md:block" />
              <span className="text-[10px] font-bold text-primary  uppercase">
                {isHi ? "जन सेवा संकल्प" : "Public Service Resolve"}
              </span>
            </div>
          </div>

          <nav className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4">
            {navLinks.map((link, idx) => (
              <a 
                key={idx} 
                href={link.path} 
                className="relative group text-[11px] font-bold text-secondary/50 hover:text-secondary transition-all uppercase "
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
        </div>

        {/* Premium Action Bar */}
        <div className="mb-10 rounded-2xl md:rounded-full bg-secondary p-2 pl-6 pr-2 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl shadow-secondary/10">
          
          <div className="flex items-center gap-6 py-2 md:py-0">
            <div className="hidden lg:flex flex-col border-r border-white/10 pr-6">
              <p className="text-white/20 text-[8px] font-black uppercase ">Year</p>
              <p className="text-white/60 text-[10px] font-bold ">{new Date().getFullYear()}</p>
            </div>
            
            <p className="text-white/80 text-[11px] md:text-xs font-medium  uppercase">
              {isHi ? "सशक्त समाज, समृद्ध भविष्य" : "Strong Society, Prosperous Future"}
            </p>
          </div>

          <a 
            href="https://thesociyo.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full md:w-auto flex items-center justify-between md:justify-start gap-6 bg-white/5 hover:bg-white/10 p-1 pl-6 rounded-xl md:rounded-full border border-white/5 transition-all group"
          >
            <span className="text-[9px] font-bold text-white/40 uppercase ">Digital Partner</span>
            <div className="flex items-center gap-4">
              <img 
                src={logo} 
                alt="The Sociyo" 
                className="h-5 md:h-6 w-auto object-contain brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity" 
              />
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center group-hover:bg-white transition-all duration-300">
                <ArrowUpRight className="w-4 h-4 text-white group-hover:text-secondary" />
              </div>
            </div>
          </a>
        </div>

        {/* Minimal Copyright Row */}
        <div className="border-t border-gray-50 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] font-bold text-secondary/20 uppercase ">
            © {new Date().getFullYear()} {isHi ? "संपतिया उइके" : "Sampatiya Uikey"}
          </p>
          <p className="text-[9px] font-bold text-secondary/20 uppercase  hidden md:block">
            All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;