"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchAPI } from "@/lib/api";
import { useLang } from "@/context/LanguageContext";
import { editUserContent } from "@/modules/pages/user/editUser.content";
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Navigation, 
  MessageCircle, 
  Save, 
  Loader2, 
  ArrowLeft, 
  Users
} from "lucide-react";
import { toast } from "sonner"; // Assuming you use sonner for notifications

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();
  const { lang } = useLang();
  const t = editUserContent[lang];

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    whatsapp: "",
    email: "",
    gender: "",
    address: "",
    constituency: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchAPI(`/user/profile/${id}`).then((res) => {
      const u = res.user;
      setForm({
        name: u.name || "",
        mobile: u.mobile || "",
        whatsapp: u.whatsapp || "",
        email: u.email || "",
        gender: u.gender || "",
        address: u.address || "",
        constituency: u.constituency || "",
      });
    });
  }, [id]);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const res = await fetchAPI(`/user/${id}`, {
        method: "PUT",
        body: JSON.stringify(form),
      });

      if (res.success) {
        toast.success(t.alerts.success);
        router.push(`/dashboard/user/${id}`);
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-10">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h2 className="text-xl font-black text-gray-800">{t.header.title}</h2>
            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Update Profile Details</p>
          </div>
        </div>
        <div className="bg-blue-50 p-3 rounded-2xl">
          <User className="text-blue-600" size={24} />
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
        
        {/* Basic Info Group */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase ml-2 text-gray-400">{t.fields.name}</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl py-4 pl-12 pr-4 font-bold outline-none transition-all"
                placeholder={t.fields.name}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase ml-2 text-gray-400">{t.fields.mobile} (Locked)</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input
                className="w-full bg-gray-100 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-400 cursor-not-allowed outline-none"
                value={form.mobile}
                disabled
              />
            </div>
          </div>
        </div>

        {/* Contact Info Group */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase ml-2 text-gray-400">{t.fields.whatsapp}</label>
            <div className="relative">
              <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl py-4 pl-12 pr-4 font-bold outline-none transition-all"
                placeholder={t.fields.whatsapp}
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase ml-2 text-gray-400">{t.fields.email}</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl py-4 pl-12 pr-4 font-bold outline-none transition-all"
                placeholder={t.fields.email}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Gender Select */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase ml-2 text-gray-400">{t.fields.gender}</label>
          <div className="relative">
            <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select
              className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl py-4 pl-12 pr-4 font-bold outline-none transition-all appearance-none"
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            >
              <option value="">{t.fields.gender}</option>
              <option value="male">{t.genderOptions.male}</option>
              <option value="female">{t.genderOptions.female}</option>
              <option value="other">{t.genderOptions.other}</option>
            </select>
          </div>
        </div>

        {/* Location Info */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase ml-2 text-gray-400">{t.fields.address}</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl py-4 pl-12 pr-4 font-bold outline-none transition-all"
              placeholder={t.fields.address}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase ml-2 text-gray-400">{t.fields.constituency}</label>
          <div className="relative">
            <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl py-4 pl-12 pr-4 font-bold outline-none transition-all"
              placeholder={t.fields.constituency}
              value={form.constituency}
              onChange={(e) => setForm({ ...form, constituency: e.target.value })}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full bg-gray-900 hover:bg-black text-white py-5 rounded-[2rem] font-black text-xs uppercase shadow-xl shadow-gray-200 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70"
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin text-blue-400" />
            ) : (
              <>
                <Save size={18} />
                {t.buttons.update}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}