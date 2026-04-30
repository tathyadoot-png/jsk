"use client";

import { useEffect } from "react";
import { permissionsMap } from "@/utils/permissions";
import { useAdminForm } from "@/hooks/useAdminForm";
import { useLang } from "@/context/LanguageContext";
import { nodalFormContent } from "@/modules/pages/nodal/nodalForm.content";
import {
  User,
  Mail,
  Lock,
  ShieldCheck,
  UserPlus,
  UserCog,
  CheckCircle2,
  ShieldAlert
} from "lucide-react";

export default function NodalForm({ initialData, onSubmit }: any) {
  const { form, setForm, permissions, setPermissions } = useAdminForm(initialData);
  const { lang } = useLang();
  const t = nodalFormContent[lang];

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        email: initialData.email || "",
        password: "",
      });
      setPermissions(initialData.permissions || []);
    }
  }, [initialData, setForm, setPermissions]);

  const togglePermission = (perm: string) => {
    setPermissions((prev: string[]) =>
      prev.includes(perm)
        ? prev.filter((p) => p !== perm)
        : [...prev, perm]
    );
  };

  const handleSubmit = () => {
    const payload: any = {
      ...form,
      permissions,
      role: "nodal",
    };

    if (!payload.password) {
      delete payload.password;
    }

    onSubmit(payload);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-1 sm:p-4">
      {/* --- HEADER --- */}
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
        <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-200">
          {initialData ? <UserCog className="text-white" size={24} /> : <UserPlus className="text-white" size={24} />}
        </div>
        <div>
          <h2 className="text-xl font-black text-gray-800">
            {initialData ? t.header.edit : t.header.create}
          </h2>
          <p className="text-[10px] font-black text-gray-400 uppercase italic">
            {t.header.subtitle}
          </p>
        </div>
      </div>

      {/* --- FORM CARD --- */}
      <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">

        {/* Personal Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase ml-2 text-gray-400">
              {t.fields.name}
            </label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500" size={18} />
              <input
                className="w-full bg-gray-50 rounded-2xl py-4 pl-12 pr-4 font-bold text-sm"
                placeholder={t.fields.namePlaceholder}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase ml-2 text-gray-400">
              {t.fields.email}
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500" size={18} />
              <input
                className="w-full bg-gray-50 rounded-2xl py-4 pl-12 pr-4 font-bold text-sm"
                placeholder={t.fields.emailPlaceholder}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase ml-2 text-gray-400">
            {t.fields.password}
          </label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500" size={18} />
            <input
              type="password"
              className="w-full bg-gray-50 rounded-2xl py-4 pl-12 pr-4 font-bold text-sm"
              placeholder={initialData ? t.fields.passwordEdit : t.fields.passwordCreate}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
        </div>

        {/* Permissions */}
        <div className="space-y-4 pt-4 border-t">
          <div className="flex justify-between">
            <h3 className="text-xs font-black uppercase text-gray-700 flex items-center gap-2">
              <ShieldCheck size={16} /> {t.permissions.title}
            </h3>
            <span className="text-[10px] font-black text-indigo-400">
              {permissions.length} {t.permissions.selected}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.keys(permissionsMap).map((perm) => {
              const isSelected = permissions.includes(perm);

              return (
                <label
                  key={perm}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer ${
                    isSelected ? "border-indigo-500 bg-indigo-50" : "border-gray-100"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center ${
                    isSelected ? "bg-indigo-600 border-indigo-600" : "border-gray-300"
                  }`}>
                    {isSelected && <CheckCircle2 size={12} className="text-white" />}
                  </div>

                  <input
                    type="checkbox"
                    className="hidden"
                    checked={isSelected}
                    onChange={() => togglePermission(perm)}
                  />

                  <span className="text-[11px] font-black uppercase">
                    {permissionsMap[perm]?.[lang]}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-gray-900 text-white py-5 rounded-[2rem] font-black text-xs uppercase"
      >
        {initialData ? t.buttons.update : t.buttons.create}
      </button>

      {/* Footer */}
      <p className="text-center text-[10px] font-black text-gray-300 uppercase">
        {t.footer.note}
      </p>
    </div>
  );
}