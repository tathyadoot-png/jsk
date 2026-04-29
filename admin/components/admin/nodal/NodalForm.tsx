// "use client";

// import { useEffect } from "react";
// import { PERMISSIONS } from "@/utils/permissions";
// import { useAdminForm } from "@/hooks/useAdminForm";

// export default function NodalForm({ initialData, onSubmit }: any) {
//   const { form, setForm, permissions, setPermissions } =
//     useAdminForm(initialData);

//   // 🔥 IMPORTANT: sync data for edit mode
//   useEffect(() => {
//     if (initialData) {
//       setForm({
//         name: initialData.name || "",
//         email: initialData.email || "",
//         password: "",
//       });

//       setPermissions(initialData.permissions || []);
//     }
//   }, [initialData]);

//   const togglePermission = (perm: string) => {
//     setPermissions((prev: string[]) =>
//       prev.includes(perm)
//         ? prev.filter((p) => p !== perm)
//         : [...prev, perm]
//     );
//   };

//   const handleSubmit = () => {
//     const payload: any = {
//       ...form,
//       permissions,
//       role: "nodal",
//     };

//     // 🔥 password only if entered
//     if (!payload.password) {
//       delete payload.password;
//     }

//     onSubmit(payload);
//   };

//   return (
//     <div className="p-6 border rounded-lg space-y-4 max-w-md">
//       <h2 className="text-xl font-semibold">
//         {initialData ? "Edit Nodal" : "Create Nodal"}
//       </h2>

//       <input
//         placeholder="Name"
//         className="border p-2 w-full"
//         value={form.name}
//         onChange={(e) =>
//           setForm({ ...form, name: e.target.value })
//         }
//       />

//       <input
//         placeholder="Email"
//         className="border p-2 w-full"
//         value={form.email}
//         onChange={(e) =>
//           setForm({ ...form, email: e.target.value })
//         }
//       />

//       <input
//         type="password"
//         placeholder={
//           initialData
//             ? "New Password (optional)"
//             : "Password"
//         }
//         className="border p-2 w-full"
//         onChange={(e) =>
//           setForm({ ...form, password: e.target.value })
//         }
//       />

//       <div>
//         <h3 className="font-medium mb-2">Permissions</h3>

//         <div className="grid grid-cols-2 gap-2">
//           {PERMISSIONS.map((perm) => (
//             <label
//               key={perm}
//               className="flex items-center gap-2"
//             >
//               <input
//                 type="checkbox"
//                 checked={permissions.includes(perm)}
//                 onChange={() => togglePermission(perm)}
//               />
//               <span className="text-sm">{perm}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       <button
//         onClick={handleSubmit}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         {initialData ? "Update" : "Create"}
//       </button>
//     </div>
//   );
// }


"use client";

import { useEffect } from "react";
import { PERMISSIONS } from "@/utils/permissions";
import { useAdminForm } from "@/hooks/useAdminForm";
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
          <h2 className="text-xl font-black   text-gray-800">
            {initialData ? "Edit Nodal Officer" : "Create Nodal Officer"}
          </h2>
          <p className="text-[10px] font-black text-gray-400 uppercase   italic">
            Administration Control Panel
          </p>
        </div>
      </div>

      {/* --- MAIN FORM CARD --- */}
      <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
        
        {/* Personal Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase ml-2 text-gray-400  ">Official Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input
                className="w-full bg-gray-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl py-4 pl-12 pr-4 transition-all font-bold text-gray-900 outline-none text-sm"
                placeholder="Ex: Rajesh Kumar"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase ml-2 text-gray-400  ">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input
                className="w-full bg-gray-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl py-4 pl-12 pr-4 transition-all font-bold text-gray-900 outline-none text-sm"
                placeholder="nodal@dept.gov.in"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Password Section */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase ml-2 text-gray-400  ">Security credentials</label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input
              type="password"
              className="w-full bg-gray-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl py-4 pl-12 pr-4 transition-all font-bold text-gray-900 outline-none text-sm"
              placeholder={initialData ? "•••••••• (Leave blank to keep current)" : "Create Secure Password"}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
        </div>

        {/* Permissions Grid Section */}
        <div className="space-y-4 pt-4 border-t border-gray-50">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-indigo-600" />
              <h3 className="text-xs font-black uppercase   text-gray-700">Access Permissions</h3>
            </div>
            <span className="text-[10px] font-black text-indigo-400 italic">
              {permissions.length} Selected
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PERMISSIONS.map((perm) => {
              const isSelected = permissions.includes(perm);
              return (
                <label
                  key={perm}
                  className={`relative flex items-center gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer group select-none ${
                    isSelected 
                    ? "border-indigo-500 bg-indigo-50/50" 
                    : "border-gray-100 bg-white hover:border-gray-200"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center border-2 transition-all ${
                    isSelected ? "bg-indigo-600 border-indigo-600 shadow-md shadow-indigo-100" : "border-gray-200 group-hover:border-indigo-300"
                  }`}>
                    {isSelected && <CheckCircle2 size={12} className="text-white" />}
                  </div>
                  
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={isSelected}
                    onChange={() => togglePermission(perm)}
                  />
                  
                  <span className={`text-[11px] font-black uppercase   transition-colors ${
                    isSelected ? "text-indigo-900" : "text-gray-500"
                  }`}>
                    {perm.replace(/_/g, ' ')}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- ACTION BUTTON --- */}
      <div className="px-4">
        <button
          onClick={handleSubmit}
          className="w-full bg-gray-900 text-white py-5 rounded-[2rem] font-black text-xs uppercase   shadow-2xl shadow-gray-300 hover:bg-indigo-600 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 group"
        >
          {initialData ? (
            <>
              <UserCog size={18} className="group-hover:rotate-12 transition-transform" />
              Update Nodal Profile
            </>
          ) : (
            <>
              <ShieldAlert size={18} className="group-hover:animate-pulse" />
              Deploy Nodal Access
            </>
          )}
        </button>
      </div>
      
      {/* --- FOOTER HINT --- */}
      <p className="text-center text-[10px] font-black text-gray-300 uppercase   italic">
        All actions are logged for security auditing
      </p>
    </div>
  );
}