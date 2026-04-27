"use client";

import { useEffect, useState } from "react";
import { createTicket } from "@/services/ticket.service";
import { useRouter } from "next/navigation";
import imageCompression from "browser-image-compression";
import { toast } from "sonner";
import { fetchAPI } from "@/lib/api";
import { sendOtp, verifyOtp } from "@/services/auth.service";
import {
    User,
    Users,
    Phone,
    MapPin,
    MessageSquare,
    Mail,
    ChevronDown,
    Upload,
    FileText,
    CheckCircle2,
    ShieldCheck,
    Loader2,
    X
} from "lucide-react";

export default function TicketForm({
    visitId,
    visitUserId,
    formData,
    setFormData,
    visitUserMobile
}: {
    visitId: string;
    visitUserId: string;
    formData: any;
    setFormData: any;
    visitUserMobile: string;
}) {
    const router = useRouter();


    const [userFound, setUserFound] = useState(false);
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<File[]>([]);
    const [preview, setPreview] = useState<string[]>([]);
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [ticketFor, setTicketFor] = useState<"SELF" | "OTHER">("SELF");
    const isRepresentative = ticketFor === "OTHER";
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [resendLoading, setResendLoading] = useState(false);

    const isValid =
        formData.department;

    // 🔍 MOBILE SEARCH
    const handleMobileChange = async (value: string) => {
        setFormData((prev: any) => ({ ...prev, mobile: value }));

        if (value.length !== 10) return;

        try {
            const res = await fetchAPI(`/user/search?mobile=${value}`);
            if (res.user) {
                setUserFound(true);
                setSelectedUserId(res.user._id);
                setFormData((prev: any) => ({
                    ...prev,
                    name: res.user.name || "",
                    address: res.user.address || "",
                    constituency: res.user.constituency || "",
                    whatsapp: res.user.whatsapp || "",
                    email: res.user.email || "",
                    gender: res.user.gender || "",
                }));
            } else {
                setUserFound(false);
                setSelectedUserId(null);
                setFormData((prev: any) => ({
                    ...prev,
                    name: "",
                    address: "",
                    constituency: "",
                    whatsapp: "",
                    email: "",
                    gender: "",
                }));
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (
            ticketFor === "SELF" &&
            visitUserMobile?.length === 10 &&
            !otpSent
        ) {
            setFormData((prev: any) => ({
                ...prev,
                mobile: visitUserMobile,
            }));
        }
    }, [ticketFor, visitUserMobile]);



    // 📸 IMAGE
    const handleImageChange = async (e: any) => {
        const files = Array.from(e.target.files);

        const compressedImages: File[] = [];
        const previewUrls: string[] = [];

        for (let file of files) {
            const compressed = await imageCompression(file as File, {
                maxSizeMB: 1,
                maxWidthOrHeight: 1200,
                useWebWorker: true,
            });

            compressedImages.push(compressed);
            previewUrls.push(URL.createObjectURL(compressed));
        }

        setImages(compressedImages);
        setPreview(previewUrls);
    };

    const handleSubmit = async () => {
        try {
            if (!visitId) {
                toast.error("Invalid visit");
                return;
            }

            if (!formData.department) {
                toast.error("Please fill required fields");
                return;
            }

            if (!formData.mobile || formData.mobile.length !== 10) {
                toast.error("Enter valid mobile");
                return;
            }

            // 🔥 STEP 1: अगर OTP नहीं भेजा गया → भेजो और रोक दो
            if (!otpSent) {
                await handleSendOtp();
                toast.info("OTP sent, please verify");
                return; // 🚨 STOP यहाँ
            }

            // 🔥 STEP 2: अगर verify नहीं हुआ → रोक दो
            if (!otpVerified) {
                toast.error("Please verify OTP first");
                return;
            }

            // 🔥 STEP 3: अब ticket create
            setLoading(true);

            const fd = new FormData();

            fd.append("visitId", visitId);

            const finalUserId =
                ticketFor === "SELF"
                    ? visitUserId
                    : selectedUserId;

            if (!finalUserId) {
                toast.error("Invalid user");
                return;
            }

            fd.append("userId", finalUserId);

            fd.append("department", formData.department);
            fd.append("subject", formData.subject);
            fd.append("description", formData.description);
            fd.append("letterBody", formData.letterBody);
            fd.append("aadhar", formData.aadhar);
            fd.append("voterId", formData.voterId);

            images.forEach((img) => {
                fd.append("images", img);
            });

            await createTicket(fd);

            toast.success("Ticket Created 🚀");
            router.push("/dashboard/visits");

        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };
    const handleSendOtp = async () => {
        if (!formData.mobile || formData.mobile.length !== 10) {
            toast.error("Enter valid mobile");
            return;
        }

        try {
            const res = await sendOtp({ mobile: formData.mobile });

            console.log("OTP RESPONSE:", res);

            // 🔥 DEV MODE SHOW OTP
            if (res?.otp && process.env.NODE_ENV === "development") {
                alert(`Your OTP is: ${res.otp}`); // ✅ THIS
            }

            setOtpSent(true);
            toast.success("OTP sent");

        } catch (err: any) {
            toast.error(err.message);
        }
    };


    const handleVerifyOtp = async () => {
        try {
            const res = await verifyOtp({
                mobile: formData.mobile,
                otp,
                name: formData.name,
                email: formData.email,
                whatsapp: formData.whatsapp,
                gender: formData.gender,
            });

            setOtpVerified(true);
            if (ticketFor === "OTHER") {
                setSelectedUserId(res.user._id);
            }
            toast.success("User verified ✅");
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    const handleTypeChange = (type: "SELF" | "OTHER") => {
        setTicketFor(type);

        if (type === "SELF") {
            setUserFound(false);
            setOtp("");
            setOtpSent(false);
            setOtpVerified(false);
            setSelectedUserId(null);

            setFormData((prev: any) => ({
                ...prev,
                mobile: "",
            }));
        }

        if (type === "OTHER") {
            // 🔥 FULL RESET
            setUserFound(false);
            setOtp("");
            setOtpSent(false);
            setOtpVerified(false);
            setSelectedUserId(null);

            setFormData({
                name: "",
                mobile: "",
                address: "",
                constituency: "",
                whatsapp: "",
                email: "",
                gender: "",
                department: "",
                subject: "",
                description: "",
                letterBody: "",
                aadhar: "",
                voterId: "",
            });
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6 pb-10">
            {/* --- HEADER --- */}
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-200">
                    <FileText className="text-white" size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-black tracking-tight text-gray-800">Create Ticket</h2>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">New Grievance Entry</p>
                </div>
            </div>

            {/* --- SELECTION TOGGLE --- */}
            <div className="bg-gray-100/50 p-1.5 rounded-2xl flex gap-2 border border-gray-200">
                <button
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all ${ticketFor === "SELF"
                        ? "bg-white text-blue-600 shadow-sm scale-[1.02]"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                    onClick={() => handleTypeChange("SELF")}
                >
                    <User size={16} /> Self
                </button>
                <button
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all ${ticketFor === "OTHER"
                        ? "bg-white text-blue-600 shadow-sm scale-[1.02]"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                    onClick={() => handleTypeChange("OTHER")}
                >
                    <Users size={16} /> Other Person
                </button>
            </div>

            {/* --- CORE FORM CARD --- */}
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">

                {/* Mobile & User Status Section */}
                {ticketFor === "OTHER" && (
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase ml-2 text-gray-400 tracking-widest">Beneficiary Identity</label>
                        <div className="relative group">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                            <input
                                className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl py-4 pl-12 pr-4 transition-all font-bold text-gray-900 outline-none"
                                placeholder="Enter Mobile Number"
                                maxLength={10}
                                value={formData.mobile || ""}
                                onChange={(e) => handleMobileChange(e.target.value.replace(/\D/g, ""))}
                            />
                        </div>
                        <div className="flex items-center gap-2 ml-2">
                            {userFound || otpVerified ? (
                                <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600 uppercase italic">
                                    <CheckCircle2 size={12} /> {userFound ? "Existing User Found" : "User Verified"}
                                </span>
                            ) : (
                                <span className="flex items-center gap-1.5 text-[10px] font-black text-amber-500 uppercase italic">
                                    <ShieldCheck size={12} /> New User (OTP Required)
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Name Field */}
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase ml-2 text-gray-400 tracking-widest">Full Name</label>
                    <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl py-4 pl-12 pr-4 transition-all font-bold text-gray-900 outline-none"
                            placeholder="Beneficiary Name"
                            value={formData.name || ""}
                            onChange={(e) => setFormData((prev: any) => ({ ...prev, name: e.target.value }))}
                        />
                    </div>
                </div>

                {/* Representative Extra Fields (Bento Grid) */}
                {isRepresentative && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-4 duration-300">
                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                className="w-full bg-gray-50 border-none rounded-xl py-3 pl-11 pr-4 font-bold text-sm"
                                placeholder="Address"
                                value={formData.address || ""}
                                onChange={(e) => setFormData((prev: any) => ({ ...prev, address: e.target.value }))}
                            />
                        </div>
                        <div className="relative">
                            <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                className="w-full bg-gray-50 border-none rounded-xl py-3 pl-11 pr-4 font-bold text-sm"
                                placeholder="WhatsApp No."
                                value={formData.whatsapp || ""}
                                onChange={(e) => setFormData((prev: any) => ({ ...prev, whatsapp: e.target.value }))}
                            />
                        </div>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                className="w-full bg-gray-50 border-none rounded-xl py-3 pl-11 pr-4 font-bold text-sm"
                                placeholder="Email ID"
                                value={formData.email || ""}
                                onChange={(e) => setFormData((prev: any) => ({ ...prev, email: e.target.value }))}
                            />
                        </div>
                        <select
                            className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 font-bold text-sm appearance-none cursor-pointer"
                            value={formData.gender || ""}
                            onChange={(e) => setFormData((prev: any) => ({ ...prev, gender: e.target.value }))}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                )}

                {/* Department Selection */}
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase ml-2 text-gray-400 tracking-widest">Department</label>
                    <div className="relative">
                        <select
                            className="w-full bg-blue-50/50 border-none rounded-2xl py-4 px-6 font-black text-blue-700 appearance-none cursor-pointer focus:ring-2 focus:ring-blue-200 transition-all"
                            value={formData.department || ""}
                            onChange={(e) => setFormData((prev: any) => ({ ...prev, department: e.target.value }))}
                        >
                            <option value="">Choose Department</option>
                            <option value="bpl">BPL Card Services</option>
                            <option value="pmawas">PM Awas Yojana</option>
                            <option value="medical">Medical Help</option>
                            <option value="anudam">Swechha Anudan</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none" size={18} />
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase ml-2 text-gray-400 tracking-widest">Grievance Description</label>
                    <textarea
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-[2rem] py-4 px-6 font-bold text-gray-900 min-h-[120px] outline-none transition-all"
                        placeholder="Please describe the issue in detail..."
                        value={formData.description || ""}
                        onChange={(e) => setFormData((prev: any) => ({ ...prev, description: e.target.value }))}
                    />
                </div>

                {/* Image Upload Area */}
                <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase ml-2 text-gray-400 tracking-widest">Evidence / Attachments</label>
                    <div className="flex gap-3 flex-wrap">
                        {preview.map((img: string, i: number) => (
                            <div key={i} className="relative group w-20 h-20">
                                <img src={img} className="w-full h-full object-cover rounded-xl border-2 border-gray-100 shadow-sm" />
                                <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <X className="text-white cursor-pointer" size={16} />
                                </div>
                            </div>
                        ))}
                        <label className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-200 hover:bg-blue-50 transition-all cursor-pointer">
                            <Upload size={20} />
                            <span className="text-[8px] font-black uppercase mt-1">Add</span>
                            <input type="file" multiple onChange={handleImageChange} className="hidden" />
                        </label>
                    </div>
                </div>
            </div>

            {/* --- OTP VERIFICATION CARD --- */}
            {formData.mobile?.length === 10 &&
                !otpVerified &&
                otpSent && (
                    <div className="bg-amber-50 p-6 rounded-[2rem] border border-amber-100 space-y-4 shadow-sm animate-in zoom-in-95 duration-300">
                        <div className="flex items-center gap-2 text-amber-700">
                            <ShieldCheck size={20} />
                            <h4 className="font-black text-xs uppercase tracking-wider">Verification Required</h4>
                        </div>


                        {otpSent && !otpVerified && (
                            <button
                                disabled={resendLoading}
                                onClick={async () => {
                                    setResendLoading(true);
                                    await handleSendOtp();
                                    setTimeout(() => setResendLoading(false), 30000);
                                }}
                            >
                                Resend OTP
                            </button>
                        )}


                        {!otpSent ? (
                            <button
                                onClick={handleSendOtp}
                                className="w-full bg-amber-500 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-amber-200 hover:bg-amber-600 transition-all"
                            >
                                Send Verification Code
                            </button>
                        ) : !otpVerified ? (
                            <div className="flex gap-2">
                                <input
                                    className="flex-1 bg-white border-none rounded-xl py-3 px-4 font-black text-center tracking-[0.5em] text-lg text-amber-700 outline-none ring-2 ring-amber-200 focus:ring-amber-400"
                                    placeholder="000000"
                                    value={otp}
                                    onChange={(e) => {
                                        setOtp(e.target.value);
                                        setOtpVerified(false); // 🔥 important
                                    }}
                                />
                                <button
                                    onClick={handleVerifyOtp}
                                    className="bg-emerald-500 text-white px-6 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200"
                                >
                                    Verify
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-2 py-2 text-emerald-600 font-black text-xs uppercase tracking-widest italic bg-white/50 rounded-xl">
                                <CheckCircle2 size={16} /> Identity Verified Securely
                            </div>
                        )}
                    </div>
                )}

            {/* --- SUBMIT BUTTON --- */}
            <div className="px-4">
                <button
                    onClick={handleSubmit}
                    disabled={!isValid || loading}
                    className="w-full bg-gray-900 text-white py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-gray-300 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-20 flex items-center justify-center gap-3"
                >
                    {loading ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            Processing...
                        </>
                    ) : !otpSent ? (
                        "Send OTP"
                    ) : !otpVerified ? (
                        "Verify & Submit"
                    ) : (
                        "Generate Ticket"
                    )}
                </button>
            </div>
        </div>
    );
}
