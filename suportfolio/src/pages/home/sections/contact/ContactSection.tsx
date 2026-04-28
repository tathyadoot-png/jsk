import { useState } from "react";
import { useOutletContext } from "react-router-dom"; 
import { motion } from "framer-motion";
import type { Lang } from "@/layouts/MainLayout";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import { Send, Mail, Facebook, Twitter, Instagram, CheckCircle2 } from "lucide-react";

const ContactSection = () => {
  const { lang } = useOutletContext<{ lang: Lang }>(); 
  const isHi = lang === "hi";

  const [form, setForm] = useState({
    name: "", phone: "", email: "", city: "", message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = isHi ? "जनसंपर्क वेबसाइट से नया संदेश" : "New Message";
    const body = `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nCity: ${form.city}\n\nMessage:\n${form.message}`;
    window.location.href = `mailto:sampatiyauikey@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const labels = {
    title: isHi ? "अपनी बात हम तक पहुँचाएँ" : "Share Your Message With Us",
    subtitle: isHi ? "संपर्क करें" : "Contact Us",
    desc: isHi ? "मध्य प्रदेश के विकास और आपकी समस्याओं के समाधान के लिए हम सदैव तत्पर हैं।" : "We are always ready for the development of MP and to solve your problems.",
    name: isHi ? "पूra नाम" : "Full Name",
    phone: isHi ? "मोबाइल" : "Mobile",
    email: isHi ? "ईमेल" : "Email",
    city: isHi ? "शहर / जिला" : "City / District",
    msg: isHi ? "संदेश लिखें...(वैकल्पिक)" : "Message...(optional)",
    btn: isHi ? "संदेश भेजें" : "Send Message"
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-white py-10 md:py-24">
      {/* Background Blurs */}
      <div className="absolute top-0 right-0 w-48 h-48 md:w-72 md:h-72 bg-primary/5 rounded-full blur-[80px] md:blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-40 h-40 md:w-64 md:h-64 bg-green/10 rounded-full blur-[80px] md:blur-[100px] -z-10" />

      <div className="mx-auto px-4 lg:px-28 relative z-10">
        
        <div className="mb-8 md:mb-16">
          <SectionHeading title={labels.title} />
        </div>

        {/* ORDER CHANGED: Form first on mobile (order-1), Content second (order-2) */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          
          {/* RIGHT FORM CARD (Top on mobile) */}
          <div className="w-full lg:w-7/12 order-1 lg:order-2 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-green/10 rounded-[1.5rem] blur opacity-25"></div>
            
            <div className="relative bg-white border border-gray-100 p-5 md:p-8 lg:p-10 rounded-[1.5rem] shadow-xl shadow-secondary/5">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                
                {[
                  { id: 'name', label: labels.name, type: 'text', name: 'name' },
                  { id: 'phone', label: labels.phone, type: 'tel', name: 'phone' },
                  { id: 'email', label: labels.email, type: 'email', name: 'email' },
                  { id: 'city', label: labels.city, type: 'text', name: 'city' },
                ].map((input) => (
                  <div key={input.id} className="space-y-1">
                    <label className="text-[10px] md:text-[12px] font-bold text-secondary/40 uppercase ml-1">
                      {input.label}
                    </label>
                    <input 
                      type={input.type} 
                      name={input.name} 
                      required 
                      className="w-full rounded-lg md:rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-2.5 md:px-4 md:py-3 focus:ring-2 focus:ring-green/10 focus:border-green transition-all outline-none text-xs md:text-sm" 
                      onChange={handleChange} 
                    />
                  </div>
                ))}

                <div className="md:col-span-2 space-y-1">
                  <label className="text-[10px] md:text-[12px] font-bold text-secondary/40 uppercase ml-1">
                    {labels.msg}
                  </label>
                  <textarea 
                    name="message" 
                    rows={3} 
                    className="w-full rounded-lg md:rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-2.5 md:px-4 md:py-3 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all outline-none resize-none text-xs md:text-sm" 
                    onChange={handleChange} 
                  />
                </div>

                <button 
                  type="submit" 
                  className="md:col-span-2 bg-secondary py-3 md:py-4 rounded-xl text-white font-black text-xs md:text-sm uppercase flex items-center justify-center gap-3 hover:bg-primary transition-all shadow-lg active:scale-[0.98]"
                >
                  {labels.btn} <Send size={16} />
                </button>
              </form>
            </div>
          </div>

          {/* LEFT CONTENT (Bottom on mobile) */}
          <div className="w-full lg:w-5/12 order-2 lg:order-1 space-y-6 md:space-y-10">
            <div className="space-y-3">
              <h3 className="text-xl md:text-3xl lg:text-4xl font-black text-secondary leading-tight">
                {isHi ? "आपकी आवाज़, हमारी प्राथमिकता" : "Your Voice, Our Priority"}
              </h3>
              <p className="text-secondary/60 text-xs md:text-base lg:text-lg leading-relaxed">
                {labels.desc}
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-3 p-3 md:p-4 rounded-xl md:rounded-2xl bg-gray-50 border border-gray-100 group transition-all">
                <div className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0 flex items-center justify-center rounded-lg md:rounded-xl bg-white text-green shadow-sm">
                  <Mail size={18} />
                </div>
                <span className="font-bold text-[11px] md:text-sm text-secondary break-all">
                  sampatiyauikey@gmail.com
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
               <div className="flex items-center gap-2 py-1.5 px-3 bg-green/5 border border-green/10 rounded-full">
                <CheckCircle2 size={12} className="text-green" />
                <span className="text-[10px] md:text-[12px] font-bold text-green uppercase">
                  {isHi ? "हमसे जुड़ें" : "Connect With Us"}
                </span>
              </div>

              <div className="flex gap-3">
                {[
                  { Icon: Facebook, link: "https://www.facebook.com/OfficeOfSUikey" },
                  { Icon: Twitter, link: "https://x.com/OfficeOfS_Uikey" },
                  { Icon: Instagram, link: "https://www.instagram.com/officeofsuikey" },
                ].map(({ Icon, link }, i) => (
                  <a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-9 w-9 md:h-11 md:w-11 flex items-center justify-center rounded-full bg-secondary text-white hover:bg-primary transition-all shadow-md active:scale-90"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;